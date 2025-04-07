from io import BytesIO
from flask import Blueprint, request, jsonify
from .. import db, socketio
from ..models import Incident
from datetime import datetime
from flask import send_file, url_for
from xhtml2pdf import pisa

incidents_bp = Blueprint('incidents', __name__)
@incidents_bp.route('/', methods=['GET'])
def get_incidents():
    date_str = request.args.get('date')

    if date_str:
        try:
            date = datetime.strptime(date_str, "%Y-%m-%d").date()
            incidents = Incident.query.filter(
                db.func.date(Incident.timestamp) == date
            ).order_by(Incident.timestamp.desc()).all()
        except ValueError:
            return jsonify({"error": "Invalid date format. Use YYYY-MM-DD."}), 400
    else:
        incidents = Incident.query.order_by(Incident.timestamp.desc()).all()

    return jsonify([{
        "id": inc.id,
        "place": inc.place,
        "coordinates": inc.coordinates,
        "status": inc.status,
        "note": inc.note,
        "timestamp": inc.timestamp.isoformat() if inc.timestamp else None
    } for inc in incidents]), 200

    
@incidents_bp.route('/', methods=['POST'])
def create_incident():
    data = request.json
    
    new_incident = Incident(
        place=data['place'],
        coordinates=data['coordinates'],
        status=data['status'],
        note=data.get('note', '')
    )
    
    db.session.add(new_incident)
    db.session.commit()
    
    socketio.emit('new_incident', {
        "id": new_incident.id,
        "place": new_incident.place,
        "coordinates": new_incident.coordinates,
        "status": new_incident.status,
        "note": new_incident.note
    })

    return jsonify({
            "message": "Incident created successfully",
            "incident_id": new_incident.id
        }), 201
    
@incidents_bp.route('/<int:id>/status', methods=['PUT'])
def update_incident_status(id):
    incident = Incident.query.get(id)

    if not incident:
        return jsonify({"error": "Incident not found"}), 404

    data = request.json

    if 'status' not in data:
        return jsonify({"error": "Status field is required"}), 400

    incident.status = data['status']
    db.session.commit()

    return jsonify({
        "message": "Incident status updated successfully",
        "incident_id": incident.id,
        "new_status": incident.status
    }), 200
    
@incidents_bp.route('/download/<int:incident_id>', methods=['GET'])
def download_pdf(incident_id):
    print("downloading")
    incident = Incident.query.get_or_404(incident_id)

    logo_url = url_for('static', filename='images/fire_logo.png', _external=True)

    html = f"""
    <html>
    <head>
        <style>
            body {{
                font-family: Arial, sans-serif;
                padding: 20px;
            }}
            .header {{
                text-align: center;
                margin-bottom: 0px;
            }}
            .header img {{
                width: 60px;
                height: auto;
                margin-bottom: 0px;
            }}
            .header h1 {{
                font-size: 24px;
                margin: 0;
            }}
            .header h2 {{
                font-size: 18px;
                margin: 0px 0 0 0;
            }}
            .section {{
                margin-bottom: 2px;
            }}
            .section p{{
                margin-bottom: 0px
            }}
            .label {{
                font-weight: bold;
            }}
        </style>
    </head>
    <body>
    
        <div class="header">
            <img src="{logo_url}" alt="FREM Logo" />
            <h1>Fire and Rescue Emergency Management - FREM</h1>
            <h2>Incident Report</h2>
        </div>
        
        <hr/>

        <div class="section">
            <p><span class="label">Location:</span> {incident.place}</p>
            <p><span class="label">Coordinates:</span> {incident.coordinates}</p>
            <p><span class="label">Note:</span> {incident.note or 'N/A'}</p>
            <p><span class="label">Status:</span> {incident.status}</p>
            <p><span class="label">Date:</span> {incident.timestamp.strftime('%Y-%m-%d %H:%M:%S')}</p>
        </div>
    </body>
    </html>
    """

    result = BytesIO()
    pisa.CreatePDF(html, dest=result)
    result.seek(0)

    return send_file(result, download_name=f'incident_{incident_id}.pdf', as_attachment=True)
