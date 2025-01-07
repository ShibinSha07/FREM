from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# Configure PostgreSQL database connection
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:1234@localhost/FREM'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Database Models
class Incident(db.Model):
    __tablename__ = 'incident'
    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(100), nullable=False)  # Store as WKT (Well-Known Text) for simplicity
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(50), nullable=False)

class Vehicle(db.Model):
    __tablename__ = 'vehicle'
    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(50), nullable=False)

class Allocation(db.Model):
    __tablename__ = 'allocation'
    vehicle_id = db.Column(db.Integer, db.ForeignKey('vehicle.id'), primary_key=True)
    incident_id = db.Column(db.Integer, db.ForeignKey('incident.id'), primary_key=True)


@app.get("/")
def home():
    return "Hello World"
# Routes
@app.route('/incidents', methods=['POST'])
def create_incident():
    data = request.json
    new_incident = Incident(
        location=data['location'],  # Format: "POINT(longitude latitude)"
        status=data['status']
    )
    db.session.add(new_incident)
    db.session.commit()
    return jsonify({"message": "Incident created", "id": new_incident.id}), 201

@app.route('/incidents', methods=['GET'])
def get_incidents():
    incidents = Incident.query.all()
    return jsonify([{
        "id": inc.id,
        "location": inc.location,
        "timestamp": inc.timestamp,
        "status": inc.status
    } for inc in incidents])

@app.route('/vehicles', methods=['POST'])
def create_vehicle():
    data = request.json
    new_vehicle = Vehicle(status=data['status'])
    db.session.add(new_vehicle)
    db.session.commit()
    return jsonify({"message": "Vehicle created", "id": new_vehicle.id}), 201

@app.route('/vehicles', methods=['GET'])
def get_vehicles():
    vehicles = Vehicle.query.all()
    return jsonify([{
        "id": veh.id,
        "status": veh.status
    } for veh in vehicles])

@app.route('/allocate', methods=['POST'])
def allocate_vehicle():
    data = request.json
    allocation = Allocation(
        vehicle_id=data['vehicle_id'],
        incident_id=data['incident_id']
    )
    db.session.add(allocation)
    db.session.commit()
    return jsonify({"message": "Vehicle allocated to incident"}), 201

@app.route('/allocation', methods=['GET'])
def get_allocations():
    allocations = Allocation.query.all()
    return jsonify([{
        "vehicle_id": alloc.vehicle_id,
        "incident_id": alloc.incident_id
    } for alloc in allocations])

# Initialize the database (run this once)
# @app.before_request
# def create_tables():
#     db.create_all()

if __name__ == '__main__':
    app.run(debug=True, host="10.32.1.214", port=3001)
