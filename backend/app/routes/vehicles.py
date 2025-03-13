from flask import Blueprint, request, jsonify
from .. import db
from ..models import Vehicle, Allocation

vehicles_bp = Blueprint('vehicle', __name__)

@vehicles_bp.route('/', methods=['GET'])
def get_vehicles():
    vehicles = Vehicle.query.all()
    vehicle_list = [
        {
            "vid": vehicle.vid,
            "number_plate": vehicle.numberplate,
            "model": vehicle.model,
            "yom": vehicle.yom,
            "status": vehicle.status
        }
        for vehicle in vehicles
    ]
    return jsonify(vehicle_list), 200

@vehicles_bp.route('/unallocated', methods=['GET'])
def get_unallocated_vehicles():
    subquery = db.session.query(Allocation.vehicle_id).subquery()
    
    unallocated_vehicles = Vehicle.query.filter(
        ~Vehicle.vid.in_(subquery)
    ).all()
    
    return jsonify([
        {
            "vid": vehicle.vid,
            "number_plate": vehicle.numberplate,
            "model": vehicle.model,
            "yom": vehicle.yom,
            "status": vehicle.status
        }
        for vehicle in unallocated_vehicles
    ]), 200

@vehicles_bp.route('/', methods=['POST'])
def create_vehicle():
    data = request.json
    if not all(key in data for key in ['numberplate', 'model', 'yom', 'status']):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        new_vehicle = Vehicle(
            numberplate=data['numberplate'],
            model=data['model'],
            yom=int(data['yom']),
            status=data['status']
        )

        db.session.add(new_vehicle)
        db.session.commit()

        return jsonify({"message": "Vehicle created", "vid": new_vehicle.vid}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@vehicles_bp.route('/<string:vid>', methods=['PUT'])
def update_vehicle_status(vid):
    vehicle = Vehicle.query.filter_by(vid=vid).first()
    if not vehicle:
        return jsonify({"error": "Vehicle not found"}), 404
    
    data = request.json
    vehicle.status = data.get("status", vehicle.status)
    
    db.session.commit()
    return jsonify({"message": "Status updated successfully", "vehicle": {
        "vid": vehicle.vid,
        "number_plate": vehicle.numberplate,
        "model": vehicle.model,
        "yom": vehicle.yom,
        "status": vehicle.status
    }})
