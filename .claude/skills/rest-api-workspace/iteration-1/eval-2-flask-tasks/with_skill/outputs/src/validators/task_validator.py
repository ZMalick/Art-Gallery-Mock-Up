"""Marshmallow validation schemas for the Task resource."""

from marshmallow import Schema, fields, validate, EXCLUDE


PRIORITY_VALUES = ["low", "medium", "high"]
STATUS_VALUES = ["todo", "in_progress", "done"]


class TaskCreateSchema(Schema):
    """Validates request body for creating a task."""

    class Meta:
        unknown = EXCLUDE

    title = fields.String(
        required=True,
        validate=[
            validate.Length(min=1, max=255, error="Title must be between 1 and 255 characters."),
        ],
        error_messages={"required": "Task title is required."},
    )
    description = fields.String(
        required=True,
        validate=[
            validate.Length(max=5000, error="Description must not exceed 5000 characters."),
        ],
        error_messages={"required": "Task description is required."},
    )
    priority = fields.String(
        load_default="medium",
        validate=[
            validate.OneOf(PRIORITY_VALUES, error="Priority must be one of: low, medium, high."),
        ],
    )
    status = fields.String(
        load_default="todo",
        validate=[
            validate.OneOf(STATUS_VALUES, error="Status must be one of: todo, in_progress, done."),
        ],
    )
    due_date = fields.Date(
        load_default=None,
        format="%Y-%m-%d",
        error_messages={"invalid": "Due date must be in YYYY-MM-DD format."},
    )


class TaskUpdateSchema(Schema):
    """Validates request body for fully updating a task (PUT)."""

    class Meta:
        unknown = EXCLUDE

    title = fields.String(
        required=True,
        validate=[
            validate.Length(min=1, max=255, error="Title must be between 1 and 255 characters."),
        ],
        error_messages={"required": "Task title is required."},
    )
    description = fields.String(
        required=True,
        validate=[
            validate.Length(max=5000, error="Description must not exceed 5000 characters."),
        ],
        error_messages={"required": "Task description is required."},
    )
    priority = fields.String(
        required=True,
        validate=[
            validate.OneOf(PRIORITY_VALUES, error="Priority must be one of: low, medium, high."),
        ],
        error_messages={"required": "Task priority is required."},
    )
    status = fields.String(
        required=True,
        validate=[
            validate.OneOf(STATUS_VALUES, error="Status must be one of: todo, in_progress, done."),
        ],
        error_messages={"required": "Task status is required."},
    )
    due_date = fields.Date(
        load_default=None,
        format="%Y-%m-%d",
        error_messages={"invalid": "Due date must be in YYYY-MM-DD format."},
    )


class TaskPartialUpdateSchema(Schema):
    """Validates request body for partially updating a task (PATCH)."""

    class Meta:
        unknown = EXCLUDE

    title = fields.String(
        validate=[
            validate.Length(min=1, max=255, error="Title must be between 1 and 255 characters."),
        ],
    )
    description = fields.String(
        validate=[
            validate.Length(max=5000, error="Description must not exceed 5000 characters."),
        ],
    )
    priority = fields.String(
        validate=[
            validate.OneOf(PRIORITY_VALUES, error="Priority must be one of: low, medium, high."),
        ],
    )
    status = fields.String(
        validate=[
            validate.OneOf(STATUS_VALUES, error="Status must be one of: todo, in_progress, done."),
        ],
    )
    due_date = fields.Date(
        format="%Y-%m-%d",
        error_messages={"invalid": "Due date must be in YYYY-MM-DD format."},
    )


# Singleton schema instances for reuse
task_create_schema = TaskCreateSchema()
task_update_schema = TaskUpdateSchema()
task_partial_update_schema = TaskPartialUpdateSchema()
