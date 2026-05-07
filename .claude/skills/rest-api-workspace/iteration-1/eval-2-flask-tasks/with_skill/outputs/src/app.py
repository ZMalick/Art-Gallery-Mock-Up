"""Flask application setup with middleware registration and route mounting."""

from flask import Flask, jsonify
from flask_cors import CORS

from src.middleware.error_handler import register_error_handlers
from src.routes.projects_routes import projects_bp
from src.routes.tasks_routes import tasks_bp


def create_app(config=None):
    """Application factory for creating the Flask app."""
    app = Flask(__name__)

    # Default configuration
    app.config.setdefault("PAGE_SIZE", 20)
    app.config.setdefault("MAX_PAGE_SIZE", 100)

    if config:
        app.config.update(config)

    # CORS configuration
    CORS(
        app,
        resources={r"/api/*": {"origins": "*"}},
        methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allow_headers=["Content-Type", "Authorization"],
    )

    # Rate limiting stub (uncomment to enable)
    # from flask_limiter import Limiter
    # from flask_limiter.util import get_remote_address
    # limiter = Limiter(
    #     app=app,
    #     key_func=get_remote_address,
    #     default_limits=["200 per day", "50 per hour"],
    # )

    # Register blueprints
    app.register_blueprint(projects_bp, url_prefix="/api/projects")
    app.register_blueprint(tasks_bp, url_prefix="/api/projects")

    # Register centralized error handlers
    register_error_handlers(app)

    # Health check endpoint
    @app.route("/api/health", methods=["GET"])
    def health_check():
        return jsonify({"status": "healthy"}), 200

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, host="0.0.0.0", port=5000)
