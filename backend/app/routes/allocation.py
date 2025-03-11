from flask import Blueprint, request, jsonify
from .. import db
from ..models import Allocation, Incident, Fireman

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


# Endpoint to fetch firemen allocated to a specific incident
@allocation_bp.route('/<int:incident_id>', methods=['GET'])
def get_allocated_firemen(incident_id):
    allotted_firemen = (
        db.session.query(Fireman.fid, Fireman.name, Fireman.contact, Fireman.rank, Fireman.status)
        .join(Allocation, Fireman.fid == Allocation.fid)
        .filter(Allocation.incident_id == incident_id)
        .all()
    )

    firemen_list = [
        {"fid": f.fid, "name": f.name, "contact": f.contact, "rank": f.rank, "status": f.status}
        for f in allotted_firemen
    ]

    return jsonify({"incident_id": incident_id, "allocated_firemen": firemen_list}), 200

@allocation_bp.route('/<int:incident_id>', methods=['DELETE'])
def delete_allocated_firemen(incident_id):
    print("deleting occuring. what's the excuse")
    try:
        db.session.query(Allocation).filter(Allocation.incident_id == incident_id).delete(synchronize_session=False)
        db.session.commit()
        return jsonify({"message": "Firemen deallocated from incident"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500