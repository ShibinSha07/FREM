from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_socketio import SocketIO
from .config import Config

# Initialize Extensions
db = SQLAlchemy()
socketio = SocketIO(cors_allowed_origins="*")

def create_app():
    """Application factory for Flask."""
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize Plugins
    db.init_app(app)
    socketio.init_app(app)
    CORS(app)

    # Register Blueprints
    from .routes.incidents import incidents_bp
    from .routes.vehicles import vehicles_bp
    from .routes.allocations import allocations_bp

    app.register_blueprint(incidents_bp, url_prefix='/incidents')
    app.register_blueprint(vehicles_bp, url_prefix='/vehicles')
    app.register_blueprint(allocations_bp, url_prefix='/allocations')

    return app
