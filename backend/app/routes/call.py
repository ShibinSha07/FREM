from flask import Blueprint, request, jsonify
from datetime import datetime
from app import db
from app.models import Call

calls_bp = Blueprint('calls', __name__)

# GET all calls
@calls_bp.route('/calls', methods=['GET'])
def get_calls():
    calls = Call.query.all()
    return jsonify([call.to_dict() for call in calls]), 200

# GET a single call by id
@calls_bp.route('/calls/<int:call_id>', methods=['GET'])
def get_call(call_id):
    call = Call.query.get_or_404(call_id)
    return jsonify(call.to_dict()), 200

# POST a new call with incident_id optional
@calls_bp.route('/calls', methods=['POST'])
def create_call():
    data = request.get_json()
    location = data.get('location')
    place = data.get('place')  # Get the 'place' value from the request
    incident_id = data.get('incident_id', None)

    if not location:
        return jsonify({'error': 'Location is required'}), 400

    new_call = Call(
        location=location,
        place=place,  # Set the place attribute on the model
        incident_id=incident_id,
        timestamp=datetime.utcnow()  # This can be omitted if your model has a default
    )

    db.session.add(new_call)
    db.session.commit()

    return jsonify(new_call.to_dict()), 201


# DELETE a call by id
@calls_bp.route('/calls/<int:call_id>', methods=['DELETE'])
def delete_call(call_id):
    call = Call.query.get_or_404(call_id)
    db.session.delete(call)
    db.session.commit()
    return jsonify({'message': 'Call deleted successfully'}), 200


@calls_bp.route('/calls/<int:call_id>/incident', methods=['PUT'])
def update_call_incident(call_id):
    data = request.get_json()
    # Validate that incident_id is provided
    if 'incident_id' not in data:
        return jsonify({'error': 'incident_id is required'}), 400

    call = Call.query.get_or_404(call_id)
    call.incident_id = data['incident_id']
    db.session.commit()
    
    return jsonify(call.to_dict()), 200