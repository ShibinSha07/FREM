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
    from .routes.allocations import allocations_bp
    from .routes.calls import calls_bp
    from app import models, routes

    app.register_blueprint(incidents_bp, url_prefix='/incidents')
    app.register_blueprint(vehicles_bp, url_prefix='/vehicles')
    app.register_blueprint(allocations_bp, url_prefix='/allocations')
    app.register_blueprint(calls_bp, url_prefix='/calls')

    return app