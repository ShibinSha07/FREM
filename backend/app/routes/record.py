from flask import Blueprint, request, jsonify
from .. import db
from ..models import Record
from datetime import datetime

record_bp = Blueprint('record', __name__)

@record_bp.route('/', methods=['POST'])
def create_record():
    """Create a new record with start_time set in the backend"""
    data = request.get_json()
    fid = data.get('fid')
    incident_id = data.get('incident_id')

    if not all([fid, incident_id]):
        return jsonify({'error': 'Missing required fields'}), 400

    start_time = datetime.utcnow()  # Explicitly setting start_time here

    record = Record(fid=fid, incident_id=incident_id, start_time=start_time)
    db.session.add(record)
    db.session.commit()

    return jsonify({
        'message': 'Record created successfully',
        'fid': record.fid,
        'incident_id': record.incident_id,
        'start_time': record.start_time
    }), 201

@record_bp.route('/', methods=['GET'])
def get_records():
    """Retrieve all records"""
    records = Record.query.all()
    return jsonify([
        {
            'fid': record.fid,
            'incident_id': record.incident_id,
            'start_time': record.start_time,
            'end_time': record.end_time
        } for record in records
    ]), 200


@record_bp.route('/<string:fid>/<int:incident_id>', methods=['PUT'])
def update_end_time(fid, incident_id):
    """Update the end_time of a specific record"""
    data = request.get_json()
    end_time = datetime.utcnow()  

    record = Record.query.filter_by(fid=fid, incident_id=incident_id).first()

    if not record:
        return jsonify({'error': 'Record not found'}), 404

    record.end_time = end_time
    db.session.commit()

    return jsonify({'message': 'End time updated successfully', 'end_time': record.end_time}), 200

