"""Validation middleware for Flask request handling."""

from functools import wraps

from flask import request
from marshmallow import Schema, ValidationError

from src.middleware.error_handler import APIError


def validate_body(schema: Schema):
    """Decorator that validates the JSON request body against a Marshmallow schema.

    On success, the validated/deserialized data is injected into the
    decorated function as a `validated_data` keyword argument.

    On failure, a 400 response with field-level error details is returned.
    """

    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            json_data = request.get_json(silent=True)
            if json_data is None:
                raise APIError(
                    code="BAD_REQUEST",
                    message="Request body must be valid JSON.",
                    status_code=400,
                )
            try:
                validated = schema.load(json_data)
            except ValidationError as exc:
                details = []
                for field_name, messages in exc.messages.items():
                    for msg in messages:
                        details.append({"field": field_name, "message": msg})
                raise APIError(
                    code="VALIDATION_ERROR",
                    message="Validation failed.",
                    status_code=400,
                    details=details,
                )
            kwargs["validated_data"] = validated
            return fn(*args, **kwargs)

        return wrapper

    return decorator


def validate_pagination():
    """Decorator that extracts and validates pagination query parameters.

    Injects `page` and `per_page` keyword arguments into the decorated function.
    """

    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            try:
                page = int(request.args.get("page", 1))
                per_page = int(request.args.get("perPage", 20))
            except (ValueError, TypeError):
                raise APIError(
                    code="VALIDATION_ERROR",
                    message="page and perPage must be positive integers.",
                    status_code=400,
                )
            if page < 1:
                raise APIError(
                    code="VALIDATION_ERROR",
                    message="page must be >= 1.",
                    status_code=400,
                )
            if per_page < 1 or per_page > 100:
                raise APIError(
                    code="VALIDATION_ERROR",
                    message="perPage must be between 1 and 100.",
                    status_code=400,
                )
            kwargs["page"] = page
            kwargs["per_page"] = per_page
            return fn(*args, **kwargs)

        return wrapper

    return decorator
