from flask import Blueprint, request, jsonify
from .. import db, socketio
from ..models import Incident

incidents_bp = Blueprint('incidents', __name__)

@incidents_bp.route('/', methods=['GET'])
def get_incidents():
    incidents = Incident.query.all()
    return jsonify([{
        "id": inc.id,
        "place": inc.place,
        "coordinates": inc.coordinates,
        "status": inc.status,
        "note": inc.note
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