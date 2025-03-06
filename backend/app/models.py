from . import db
from datetime import datetime

class Incident(db.Model):
    __tablename__ = 'incident'
    id = db.Column(db.Integer, primary_key=True)
    coordinates = db.Column(db.String(100), nullable=False)
    place = db.Column(db.String(250)) 
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(50), nullable=False)
    note = db.Column(db.String(100), nullable=False)

class Call(db.Model):
    __tablename__ = 'call'
    id = db.Column(db.Integer, primary_key=True)
    coordinates = db.Column(db.String(100), nullable=False)
    place = db.Column(db.String(250)) 
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    incident_id = db.Column(db.Integer, db.ForeignKey('incident.id'))

    def to_dict(self):
        return {
            'id': self.id,
            'coordinates': self.coordinates,
            'place': self.place,
            'timestamp': self.timestamp.isoformat() if self.timestamp else None,
            'incident_id': self.incident_id,
        }

class Vehicle(db.Model):
    __tablename__ = 'vehicle'
    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(50), nullable=False)

class Allocation(db.Model):
    __tablename__ = 'allocation'
    vehicle_id = db.Column(db.Integer, db.ForeignKey('vehicle.id'), primary_key=True)
    incident_id = db.Column(db.Integer, db.ForeignKey('incident.id'), primary_key=True)