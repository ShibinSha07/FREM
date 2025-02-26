from . import db
from datetime import datetime

class Incident(db.Model):
    """Model representing an Incident report."""
    __tablename__ = 'incident'
    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(100), nullable=False)  # Store as WKT (Well-Known Text)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(50), nullable=False)

class Vehicle(db.Model):
    """Model representing a Fire & Rescue vehicle."""
    __tablename__ = 'vehicle'
    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(50), nullable=False)

class Allocation(db.Model):
    """Model representing vehicle-incident allocation."""
    __tablename__ = 'allocation'
    vehicle_id = db.Column(db.Integer, db.ForeignKey('vehicle.id'), primary_key=True)
    incident_id = db.Column(db.Integer, db.ForeignKey('incident.id'), primary_key=True)
