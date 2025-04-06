from flask import Blueprint, request, jsonify
from .. import db, socketio
from ..models import Incident
from datetime import datetime

incidents_bp = Blueprint('incidents', __name__)
@incidents_bp.route('/', methods=['GET'])
def get_incidents():
    date_str = request.args.get('date')

    if date_str:
        try:
            date = datetime.strptime(date_str, "%Y-%m-%d").date()
            incidents = Incident.query.filter(
                db.func.date(Incident.timestamp) == date
            ).order_by(Incident.timestamp.desc()).all()
        except ValueError:
            return jsonify({"error": "Invalid date format. Use YYYY-MM-DD."}), 400
    else:
        incidents = Incident.query.order_by(Incident.timestamp.desc()).all()

    return jsonify([{
        "id": inc.id,
        "place": inc.place,
        "coordinates": inc.coordinates,
        "status": inc.status,
        "note": inc.note,
        "timestamp": inc.timestamp.isoformat() if inc.timestamp else None
    } for inc in incidents]), 200

    
@incidents_bp.route('/', methods=['POST'])
def create_incident():
    data = request.json
    
    new_incident = Incident(
        place=data['place'],
        coordinates=data['coordinates'],
        status=data['status'],
        note=data.get('note', '')
    )
    
    db.session.add(new_incident)
    db.session.commit()
    
    socketio.emit('new_incident', {
        "id": new_incident.id,
        "place": new_incident.place,
        "coordinates": new_incident.coordinates,
        "status": new_incident.status,
        "note": new_incident.note
    })

    return jsonify({
            "message": "Incident created successfully",
            "incident_id": new_incident.id
        }), 201
    
@incidents_bp.route('/<int:id>/status', methods=['PUT'])
def update_incident_status(id):
    incident = Incident.query.get(id)

    if not incident:
        return jsonify({"error": "Incident not found"}), 404

    data = request.json

    if 'status' not in data:
        return jsonify({"error": "Status field is required"}), 400

    incident.status = data['status']
    db.session.commit()

    return jsonify({
        "message": "Incident status updated successfully",
        "incident_id": incident.id,
        "new_status": incident.status
    }), 200