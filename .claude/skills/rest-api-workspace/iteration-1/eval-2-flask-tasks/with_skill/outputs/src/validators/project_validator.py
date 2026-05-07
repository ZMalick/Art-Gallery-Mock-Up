"""Marshmallow validation schemas for the Project resource."""

from marshmallow import Schema, fields, validate, EXCLUDE


class ProjectCreateSchema(Schema):
    """Validates request body for creating a project."""

    class Meta:
        unknown = EXCLUDE

    name = fields.String(
        required=True,
        validate=[
            validate.Length(min=1, max=255, error="Name must be between 1 and 255 characters."),
        ],
        error_messages={"required": "Project name is required."},
    )
    description = fields.String(
        required=True,
        validate=[
            validate.Length(max=2000, error="Description must not exceed 2000 characters."),
        ],
        error_messages={"required": "Project description is required."},
    )


class ProjectUpdateSchema(Schema):
    """Validates request body for fully updating a project (PUT)."""

    class Meta:
        unknown = EXCLUDE

    name = fields.String(
        required=True,
        validate=[
            validate.Length(min=1, max=255, error="Name must be between 1 and 255 characters."),
        ],
        error_messages={"required": "Project name is required."},
    )
    description = fields.String(
        required=True,
        validate=[
            validate.Length(max=2000, error="Description must not exceed 2000 characters."),
        ],
        error_messages={"required": "Project description is required."},
    )


class ProjectPartialUpdateSchema(Schema):
    """Validates request body for partially updating a project (PATCH)."""

    class Meta:
        unknown = EXCLUDE

    name = fields.String(
        validate=[
            validate.Length(min=1, max=255, error="Name must be between 1 and 255 characters."),
        ],
    )
    description = fields.String(
        validate=[
            validate.Length(max=2000, error="Description must not exceed 2000 characters."),
        ],
    )


# Singleton schema instances for reuse
project_create_schema = ProjectCreateSchema()
project_update_schema = ProjectUpdateSchema()
project_partial_update_schema = ProjectPartialUpdateSchema()
