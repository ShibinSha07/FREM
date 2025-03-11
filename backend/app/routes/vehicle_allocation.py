from flask import Blueprint, request, jsonify
from .. import db
from ..models import Vehicle_Allocation, Vehicle, Incident

vehicle_allocation_bp = Blueprint('vehicle_allocation', __name__)

# Allocate vehicles to an incident
@vehicle_allocation_bp.route('/', methods=['POST'])
def allocate_vehicle():
    data = request.json
    vehicles = data.get('vehicles', [])  # List of vehicle IDs
    incident_id = data.get('incident_id')

    if not incident_id or not vehicles:
        return jsonify({"error": "Incident ID and vehicle list are required"}), 400

    allocations = [Vehicle_Allocation(vid=vid, incident_id=incident_id) for vid in vehicles]

    try:
        db.session.bulk_save_objects(allocations)
        db.session.commit()
        return jsonify({"message": "Vehicles successfully allocated to incident"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# Fetch vehicles allocated to a specific incident
@vehicle_allocation_bp.route('/<int:incident_id>', methods=['GET'])
def get_allocated_vehicles(incident_id):
    allocated_vehicles = (
        db.session.query(Vehicle.id, Vehicle.numberplate, Vehicle.status, Vehicle.model)
        .join(Vehicle_Allocation, Vehicle.id == Vehicle_Allocation.vid)
        .filter(Vehicle_Allocation.incident_id == incident_id)
        .all()
    )

    vehicle_list = [
        {"id": v.id, "numberplate": v.numberplate, "status": v.status, "model": v.model}
        for v in allocated_vehicles
    ]

    return jsonify({"incident_id": incident_id, "allocated_vehicles": vehicle_list}), 200


# Deallocate vehicles from an incident
@vehicle_allocation_bp.route('/<int:incident_id>', methods=['DELETE'])
def delete_allocated_vehicles(incident_id):
    try:
        db.session.query(Vehicle_Allocation).filter_by(incident_id=incident_id).delete(synchronize_session=False)
        db.session.commit()
        return jsonify({"message": "Vehicles successfully deallocated from incident"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
