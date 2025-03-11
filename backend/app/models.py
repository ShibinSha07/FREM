from . import db
from datetime import datetime

class Incident(db.Model):
    __tablename__ = 'incident'
    id = db.Column(db.Integer, primary_key=True)
    coordinates = db.Column(db.String(100), nullable=False)
    place = db.Column(db.String(250)) 
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(50), nullable=False)
    note = db.Column(db.String(100), nullable=True)

class Call(db.Model):
    __tablename__ = 'call'
    id = db.Column(db.Integer, primary_key=True)
    coordinates = db.Column(db.String(100), nullable=False)
    place = db.Column(db.String(250)) 
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

class Fireman(db.Model):
    __tablename__ = 'fireman'
    # id = db.Column(db.Integer, primary_key=True)
    fid = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(250))
    contact = db.Column(db.String(15))
    rank = db.Column(db.String(50))
    status = db.Column(db.String(50), nullable=False)
    
class Vehicle(db.Model):
    __tablename__ = 'vehicle'
    vid = db.Column(db.Integer, primary_key=True)
    numberplate=db.Column(db.String(10), nullable=False)
    model = db.Column(db.String(50), nullable=False)
    yom=db.Column(db.Integer)
    status = db.Column(db.String(50), nullable=False)
    
class Allocation(db.Model):
    __tablename__ = 'allocation'
    fid = db.Column(db.String(50), db.ForeignKey('fireman.fid'), primary_key=True)
    incident_id = db.Column(db.Integer, db.ForeignKey('incident.id'), primary_key=True)
    coordinates = db.Column(db.String(100))
    
class Vehicle_Allocation(db.Model):
    __tablename__ = 'vehicle_allocation'
    vid = db.Column(db.Integer,db.ForeignKey('vehicle.vid'), primary_key=True)
    incident_id = db.Column(db.Integer, db.ForeignKey('incident.id'), primary_key=True)
    