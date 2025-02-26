from flask import Blueprint, request, jsonify
from .. import db
from ..models import Allocation, Incident

allocations_bp = Blueprint('allocations', __name__)

@allocations_bp.route('/', methods=['POST'])
def allocate_vehicle():
    """Assign a vehicle to an incident."""
    data = request.json
    allocation = Allocation(
        vehicle_id=data['vehicle_id'],
        incident_id=data['incident_id']
    )
    db.session.add(allocation)
    db.session.commit()
    return jsonify({"message": "Vehicle allocated to incident"}), 201

@allocations_bp.route('/<int:vehicle_id>', methods=['DELETE'])
def delete_allocation(vehicle_id):
    """Remove an allocation for a vehicle."""
    allocation = Allocation.query.filter_by(vehicle_id=vehicle_id).first()
    if not allocation:
        return jsonify({"message": f"No allocation found for vehicle {vehicle_id}"}), 404

    db.session.delete(allocation)
    db.session.commit()
    return jsonify({"message": f"Allocation for vehicle {vehicle_id} deleted"}), 200

@allocations_bp.route('/<int:vehicle_id>/allocated', methods=['GET'])
def check_allocation(vehicle_id):
    """Check if a vehicle is allocated to an incident."""
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
