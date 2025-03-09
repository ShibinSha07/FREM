from flask import Blueprint, request, jsonify
from .. import db
from ..models import Fireman, Allocation

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
            "rank": fireman.rank,
            "status": fireman.status
        }
        for fireman in firemen
    ]
    return jsonify(fireman_list), 200

# # get the fireman which are in on duty and not allocated to any incident.
# @fireman_bp.route('/unallotted', methods=['GET'])
# def get_unallotted_firemen():
#     subquery = db.session.query(Allocation.fid).subquery()

#     unallotted_firemen = Fireman.query.filter(
#         Fireman.status == "On-Duty", 
#         ~Fireman.fid.in_(subquery)
#     ).all()

#     return jsonify([
#         {
#             "id": fireman.id,
#             "fid": fireman.fid,
#             "name": fireman.name,
#             "contact": fireman.contact,
#             "rank": fireman.rank,
#             "status": fireman.status
#         }
#         for fireman in unallotted_firemen
#     ]), 200


@fireman_bp.route('/', methods=['POST'])
def add_fireman():
    data = request.get_json()

    new_fireman = Fireman(
        fid=data["fid"],
        name=data["name"],
        contact=data["contact"],
        rank=data["rank"],
        status=data["status"]
    )
    db.session.add(new_fireman)
    db.session.commit()

    return jsonify({"message": "Fireman added successfully", "fireman": {
        "id": new_fireman.id,
        "fid": new_fireman.fid,
        "name": new_fireman.name,
        "contact": new_fireman.contact,
        "rank": new_fireman.rank,
        "status": new_fireman.status
    }}), 201
    

@fireman_bp.route('/<int:id>', methods=['PUT'])
def update_fireman_status(id):
    fireman = Fireman.query.get(id)
    if not fireman:
        return jsonify({"error": "Fireman not found"}), 404
    
    data = request.json
    fireman.status = data.get("status", fireman.status)
    
    db.session.commit()
    return jsonify({"message": "Status updated successfully", "fireman": {
        "id": fireman.id,
        "fid": fireman.fid,
        "name": fireman.name,
        "contact": fireman.contact,
        "rank": fireman.rank,
        "status": fireman.status
    }})