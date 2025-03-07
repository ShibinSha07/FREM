from flask import Blueprint, request, jsonify
from .. import db
from ..models import Fireman

fireman_bp = Blueprint('fireman', __name__)

@fireman_bp.route('/', methods=['GET'])
def get_fireman():
    firemen = Fireman.query.all()
    fireman_list = [
        {
            "id": fireman.id,
            "fid": fireman.fid,
            "name": fireman.name,
            "contact": fireman.contact,
            "status": fireman.status
        }
        for fireman in firemen
    ]
    return jsonify(fireman_list), 200

@fireman_bp.route('/', methods=['POST'])
def add_fireman():
    data = request.get_json()

    new_fireman = Fireman(
        fid=data["fid"],
        name=data["name"],
        contact=data["contact"],
        status=data["status"]
    )
    db.session.add(new_fireman)
    db.session.commit()

    return jsonify({"message": "Fireman added successfully", "fireman": {
        "id": new_fireman.id,
        "fid": new_fireman.fid,
        "name": new_fireman.name,
        "contact": new_fireman.contact,
        "status": new_fireman.status
    }}), 201