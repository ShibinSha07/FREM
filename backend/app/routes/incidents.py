from flask import Blueprint, request, jsonify
from .. import db, socketio
from ..models import Incident, Allocation

incidents_bp = Blueprint('incidents', __name__)

@incidents_bp.route('/', methods=['POST'])
def create_incident():
    data = request.json
    new_incident = Incident(
        location=data['location'],  
        status=data['status']
    )
    db.session.add(new_incident)
    db.session.commit()

    new_allocation = Allocation(vehicle_id=1, incident_id=new_incident.id)
    db.session.add(new_allocation)
    db.session.commit()

    socketio.emit("new_incident", {
        "incident_id": new_incident.id,
        "location": new_incident.location,
        "status": new_incident.status,
        "vehicle_id": new_allocation.vehicle_id
    })

    return jsonify({"message": "Incident created and vehicle allocated", 
                    "incident_id": new_incident.id, 
                    "vehicle_id": new_allocation.vehicle_id}), 201

@incidents_bp.route('/', methods=['GET'])
def get_incidents():
    incidents = Incident.query.all()
    return jsonify([{
        "id": inc.id,
        "location": inc.location,
        "timestamp": inc.timestamp,
        "status": inc.status
    } for inc in incidents])
