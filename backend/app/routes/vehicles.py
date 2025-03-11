from flask import Blueprint, request, jsonify
from .. import db
from ..models import Vehicle

vehicles_bp = Blueprint('vehicle', __name__)

@vehicles_bp.route('/', methods=['POST'])
def create_vehicle():
    data = request.json
    print("working")
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

        return jsonify({"message": "Vehicle created", "id": new_vehicle.id}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@vehicles_bp.route('/', methods=['GET'])
def get_vehicles():
    vehicles = Vehicle.query.all()
    return jsonify([{
        "id": veh.vid,
        "status": veh.status
    } for veh in vehicles])
