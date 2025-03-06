from flask import Blueprint, request, jsonify
from .. import db
from ..models import Vehicle

vehicles_bp = Blueprint('vehicles', __name__)

@vehicles_bp.route('/', methods=['POST'])
def create_vehicle():
    data = request.json
    new_vehicle = Vehicle(status=data['status'])
    db.session.add(new_vehicle)
    db.session.commit()
    return jsonify({"message": "Vehicle created", "id": new_vehicle.id}), 201

@vehicles_bp.route('/', methods=['GET'])
def get_vehicles():
    vehicles = Vehicle.query.all()
    return jsonify([{
        "id": veh.id,
        "status": veh.status
    } for veh in vehicles])
