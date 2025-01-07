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

    # Create a new incident
    new_incident = Incident(
        location=data['location'],  # Format: "POINT(longitude latitude)"
        status=data['status']
    )
    db.session.add(new_incident)
    db.session.commit()

    # Add a new allocation for the incident (assign vehicle_id = 1 for now)
    new_allocation = Allocation(
        vehicle_id=1,  # Default vehicle ID (you can change logic for dynamic assignment)
        incident_id=new_incident.id
    )
    db.session.add(new_allocation)
    db.session.commit()

    return jsonify({"message": "Incident created and vehicle allocated", 
                    "incident_id": new_incident.id, 
                    "vehicle_id": new_allocation.vehicle_id}), 201


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

@app.route('/<int:vehicle_id>/allocated', methods=['GET'])
def check_allocation(vehicle_id):
    # Query the Allocation table and join with Incident table to get location
    allocation = db.session.query(Allocation, Incident).join(Incident, Allocation.incident_id == Incident.id).filter(Allocation.vehicle_id == vehicle_id).first()

    if allocation:
        # If an allocation exists, return the associated location
        incident = allocation[1]  # allocation[1] is the Incident object from the join
        return jsonify({
            "allocated": True,
            "location": incident.location
        }), 200
    else:
        # If no allocation exists, return a message indicating no allocation
        return jsonify({
            "allocated": False,
            "message": f"Vehicle {vehicle_id} is not allocated to any incident."
        }), 200

@app.route('/allocation/<int:vehicle_id>', methods=['DELETE'])
def delete_allocation(vehicle_id):
    try:
        # Find the allocation for the given vehicle_id
        allocation = Allocation.query.filter_by(vehicle_id=vehicle_id).first()

        if not allocation:
            return jsonify({"message": f"No allocation found for vehicle {vehicle_id}"}), 404

        # Delete the allocation
        db.session.delete(allocation)
        db.session.commit()

        return jsonify({"message": f"Allocation for vehicle {vehicle_id} deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to delete allocation", "details": str(e)}), 500


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
