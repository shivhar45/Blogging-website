from flask import Flask
from flask_cors import CORS
from .extensions import db

def create_app():
    app = Flask(__name__)
    # DB config
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///blog.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Allow both /path and /path/
    app.url_map.strict_slashes = False

    # Init extensions
    db.init_app(app)
    CORS(app)

    # Register blueprints
    from .routes import auth_bp, blog_bp
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(blog_bp, url_prefix="/api/blogs")

    # Create tables
    with app.app_context():
        from . import models  # ensure models are registered
        db.create_all()

    # Simple health route
    @app.get("/health")
    def health():
        return {"status": "ok"}

    return app
