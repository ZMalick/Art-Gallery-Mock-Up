"""Request handling logic for the Project resource.

Uses an in-memory store for demonstration. Replace with your preferred
database layer (SQLAlchemy, etc.) for production use.
"""

import uuid
from datetime import datetime, timezone

from flask import jsonify

from src.middleware.error_handler import APIError


# In-memory store — replace with a database in production
_projects: dict[str, dict] = {}


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def list_projects(page: int = 1, per_page: int = 20):
    """Return a paginated list of projects."""
    all_projects = list(_projects.values())
    total = len(all_projects)
    total_pages = max(1, (total + per_page - 1) // per_page)

    start = (page - 1) * per_page
    end = start + per_page
    page_data = all_projects[start:end]

    return jsonify({
        "data": page_data,
        "meta": {
            "page": page,
            "perPage": per_page,
            "total": total,
            "totalPages": total_pages,
        },
    }), 200


def get_project(project_id: str):
    """Return a single project by ID."""
    project = _projects.get(project_id)
    if not project:
        raise APIError(
            code="NOT_FOUND",
            message=f"Project with id '{project_id}' not found.",
            status_code=404,
        )
    return jsonify({"data": project}), 200


def create_project(validated_data: dict):
    """Create a new project and return it."""
    project_id = str(uuid.uuid4())
    now = _now()
    project = {
        "id": project_id,
        "name": validated_data["name"],
        "description": validated_data["description"],
        "created_at": now,
        "updated_at": now,
    }
    _projects[project_id] = project
    return jsonify({"data": project}), 201


def update_project(project_id: str, validated_data: dict):
    """Fully update (PUT) an existing project."""
    project = _projects.get(project_id)
    if not project:
        raise APIError(
            code="NOT_FOUND",
            message=f"Project with id '{project_id}' not found.",
            status_code=404,
        )
    project["name"] = validated_data["name"]
    project["description"] = validated_data["description"]
    project["updated_at"] = _now()
    return jsonify({"data": project}), 200


def partial_update_project(project_id: str, validated_data: dict):
    """Partially update (PATCH) an existing project."""
    project = _projects.get(project_id)
    if not project:
        raise APIError(
            code="NOT_FOUND",
            message=f"Project with id '{project_id}' not found.",
            status_code=404,
        )
    for key, value in validated_data.items():
        if value is not None:
            project[key] = value
    project["updated_at"] = _now()
    return jsonify({"data": project}), 200


def delete_project(project_id: str):
    """Delete a project by ID. Also removes all associated tasks."""
    if project_id not in _projects:
        raise APIError(
            code="NOT_FOUND",
            message=f"Project with id '{project_id}' not found.",
            status_code=404,
        )
    del _projects[project_id]

    # Cascade delete associated tasks
    from src.controllers.tasks_controller import _tasks
    task_ids_to_remove = [
        tid for tid, task in _tasks.items() if task["project_id"] == project_id
    ]
    for tid in task_ids_to_remove:
        del _tasks[tid]

    return "", 204
