from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_socketio import SocketIO
from .config import Config

db = SQLAlchemy()
socketio = SocketIO(cors_allowed_origins="*")

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    socketio.init_app(app)
    CORS(app)

    # Register Blueprints
    from .routes.incidents import incidents_bp
    from .routes.vehicles import vehicles_bp
    from .routes.allocation import allocation_bp
    from .routes.calls import calls_bp
    from .routes.fireman import fireman_bp
    
    from app import models, routes

    app.register_blueprint(incidents_bp, url_prefix='/incidents')
    app.register_blueprint(vehicles_bp, url_prefix='/vehicles')
    app.register_blueprint(allocation_bp, url_prefix='/allocation')
    app.register_blueprint(calls_bp, url_prefix='/calls')
    app.register_blueprint(fireman_bp, url_prefix='/fireman')

    return app