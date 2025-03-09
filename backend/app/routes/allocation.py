from flask import Blueprint, request, jsonify
from .. import db
from ..models import Allocation, Incident

allocation_bp = Blueprint('allocation', __name__)

@allocation_bp.route('/', methods=['POST'])
def allocate_vehicle():
    data = request.json
    firemen = data.get('firemen', [])
    incident_id = data['incident_id']
    
    allocations = [Allocation(fid=fid, incident_id=incident_id) for fid in firemen]
    
    db.session.bulk_save_objects(allocations) 
    db.session.commit()
    
    return jsonify({"message": "Vehicle allocated to incident"}), 200

@allocation_bp.route('/<int:vehicle_id>', methods=['DELETE'])
def delete_allocation(vehicle_id):
    allocation = Allocation.query.filter_by(vehicle_id=vehicle_id).first()
    if not allocation:
        return jsonify({"message": f"No allocation found for vehicle {vehicle_id}"}), 404

    db.session.delete(allocation)
    db.session.commit()
    return jsonify({"message": f"Allocation for vehicle {vehicle_id} deleted"}), 200

@allocation_bp.route('/<int:vehicle_id>/allocated', methods=['GET'])
def check_allocation(vehicle_id):
    allocation = db.session.query(Allocation, Incident).join(
        Incident, Allocation.incident_id == Incident.id
    ).filter(Allocation.vehicle_id == vehicle_id).first()

    if allocation:
        incident = allocation[1]  # Get the Incident object
        if incident.location.startswith("POINT"):
            longitude, latitude = map(float, incident.location.replace("POINT(", "").replace(")", "").split())
            return jsonify({"allocated": True, "latitude": latitude, "longitude": longitude}), 200
        
        return jsonify({"allocated": True, "message": "Invalid location format."}), 500

    return jsonify({"allocated": False, "message": f"Vehicle {vehicle_id} is not allocated to any incident."}), 200
