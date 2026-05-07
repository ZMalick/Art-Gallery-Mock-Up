"""Route definitions for the Task resource (nested under projects).

Blueprint is mounted at /api/projects in app.py so full paths are
/api/projects/<project_id>/tasks/...
"""

from flask import Blueprint

from src.controllers.tasks_controller import (
    create_task,
    delete_task,
    get_task,
    list_tasks,
    partial_update_task,
    update_task,
)
from src.middleware.validate import validate_body, validate_pagination
from src.validators.task_validator import (
    task_create_schema,
    task_partial_update_schema,
    task_update_schema,
)

tasks_bp = Blueprint("tasks", __name__)


@tasks_bp.route("/<project_id>/tasks", methods=["GET"])
@validate_pagination()
def handle_list_tasks(project_id: str, page: int, per_page: int):
    """GET /api/projects/:project_id/tasks — list tasks with pagination."""
    return list_tasks(project_id, page=page, per_page=per_page)


@tasks_bp.route("/<project_id>/tasks/<task_id>", methods=["GET"])
def handle_get_task(project_id: str, task_id: str):
    """GET /api/projects/:project_id/tasks/:task_id — get a single task."""
    return get_task(project_id, task_id)


@tasks_bp.route("/<project_id>/tasks", methods=["POST"])
@validate_body(task_create_schema)
def handle_create_task(project_id: str, validated_data: dict):
    """POST /api/projects/:project_id/tasks — create a new task."""
    return create_task(project_id, validated_data=validated_data)


@tasks_bp.route("/<project_id>/tasks/<task_id>", methods=["PUT"])
@validate_body(task_update_schema)
def handle_update_task(project_id: str, task_id: str, validated_data: dict):
    """PUT /api/projects/:project_id/tasks/:task_id — fully update a task."""
    return update_task(project_id, task_id, validated_data=validated_data)


@tasks_bp.route("/<project_id>/tasks/<task_id>", methods=["PATCH"])
@validate_body(task_partial_update_schema)
def handle_partial_update_task(project_id: str, task_id: str, validated_data: dict):
    """PATCH /api/projects/:project_id/tasks/:task_id — partially update a task."""
    return partial_update_task(project_id, task_id, validated_data=validated_data)


@tasks_bp.route("/<project_id>/tasks/<task_id>", methods=["DELETE"])
def handle_delete_task(project_id: str, task_id: str):
    """DELETE /api/projects/:project_id/tasks/:task_id — delete a task."""
    return delete_task(project_id, task_id)
