"""Centralized error handling middleware for consistent error responses."""

from flask import jsonify
from marshmallow import ValidationError
from werkzeug.exceptions import HTTPException


class APIError(Exception):
    """Custom API error class for raising structured errors."""

    def __init__(self, code: str, message: str, status_code: int = 400, details: list = None):
        super().__init__(message)
        self.code = code
        self.message = message
        self.status_code = status_code
        self.details = details or []


def format_error(code: str, message: str, details: list = None) -> dict:
    """Build a consistently structured error response body."""
    error = {
        "error": {
            "code": code,
            "message": message,
        }
    }
    if details:
        error["error"]["details"] = details
    return error


def register_error_handlers(app):
    """Register all error handlers on the Flask app."""

    @app.errorhandler(APIError)
    def handle_api_error(exc: APIError):
        return jsonify(format_error(exc.code, exc.message, exc.details)), exc.status_code

    @app.errorhandler(ValidationError)
    def handle_validation_error(exc: ValidationError):
        details = []
        for field_name, messages in exc.messages.items():
            for msg in messages:
                details.append({"field": field_name, "message": msg})
        return jsonify(format_error("VALIDATION_ERROR", "Validation failed.", details)), 400

    @app.errorhandler(400)
    def handle_bad_request(exc):
        return jsonify(format_error("BAD_REQUEST", "The request body is malformed or missing.")), 400

    @app.errorhandler(404)
    def handle_not_found(exc):
        return jsonify(format_error("NOT_FOUND", "The requested resource was not found.")), 404

    @app.errorhandler(405)
    def handle_method_not_allowed(exc):
        return jsonify(format_error("METHOD_NOT_ALLOWED", "This HTTP method is not allowed for this endpoint.")), 405

    @app.errorhandler(409)
    def handle_conflict(exc):
        return jsonify(format_error("CONFLICT", "A resource with that identifier already exists.")), 409

    @app.errorhandler(500)
    def handle_internal_error(exc):
        return jsonify(format_error("INTERNAL_SERVER_ERROR", "An unexpected error occurred.")), 500

    @app.errorhandler(HTTPException)
    def handle_http_exception(exc: HTTPException):
        return jsonify(format_error(exc.name.upper().replace(" ", "_"), exc.description)), exc.code
