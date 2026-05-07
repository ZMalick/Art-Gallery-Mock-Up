"""Route definitions for the Project resource.

Blueprint is mounted at /api/projects in app.py.
"""

from flask import Blueprint

from src.controllers.projects_controller import (
    create_project,
    delete_project,
    get_project,
    list_projects,
    partial_update_project,
    update_project,
)
from src.middleware.validate import validate_body, validate_pagination
from src.validators.project_validator import (
    project_create_schema,
    project_partial_update_schema,
    project_update_schema,
)

projects_bp = Blueprint("projects", __name__)


@projects_bp.route("", methods=["GET"])
@validate_pagination()
def handle_list_projects(page: int, per_page: int):
    """GET /api/projects — list all projects with pagination."""
    return list_projects(page=page, per_page=per_page)


@projects_bp.route("/<project_id>", methods=["GET"])
def handle_get_project(project_id: str):
    """GET /api/projects/:id — get a single project."""
    return get_project(project_id)


@projects_bp.route("", methods=["POST"])
@validate_body(project_create_schema)
def handle_create_project(validated_data: dict):
    """POST /api/projects — create a new project."""
    return create_project(validated_data=validated_data)


@projects_bp.route("/<project_id>", methods=["PUT"])
@validate_body(project_update_schema)
def handle_update_project(project_id: str, validated_data: dict):
    """PUT /api/projects/:id — fully update a project."""
    return update_project(project_id, validated_data=validated_data)


@projects_bp.route("/<project_id>", methods=["PATCH"])
@validate_body(project_partial_update_schema)
def handle_partial_update_project(project_id: str, validated_data: dict):
    """PATCH /api/projects/:id — partially update a project."""
    return partial_update_project(project_id, validated_data=validated_data)


@projects_bp.route("/<project_id>", methods=["DELETE"])
def handle_delete_project(project_id: str):
    """DELETE /api/projects/:id — delete a project and its tasks."""
    return delete_project(project_id)
