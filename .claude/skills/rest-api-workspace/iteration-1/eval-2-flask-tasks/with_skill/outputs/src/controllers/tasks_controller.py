"""Request handling logic for the Task resource (nested under projects).

Uses an in-memory store for demonstration. Replace with your preferred
database layer (SQLAlchemy, etc.) for production use.
"""

import uuid
from datetime import datetime, timezone

from flask import jsonify

from src.middleware.error_handler import APIError
from src.controllers.projects_controller import _projects


# In-memory store — replace with a database in production
_tasks: dict[str, dict] = {}


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def _ensure_project_exists(project_id: str):
    """Raise 404 if the parent project does not exist."""
    if project_id not in _projects:
        raise APIError(
            code="NOT_FOUND",
            message=f"Project with id '{project_id}' not found.",
            status_code=404,
        )


def list_tasks(project_id: str, page: int = 1, per_page: int = 20):
    """Return a paginated list of tasks for a given project."""
    _ensure_project_exists(project_id)

    project_tasks = [t for t in _tasks.values() if t["project_id"] == project_id]
    total = len(project_tasks)
    total_pages = max(1, (total + per_page - 1) // per_page)

    start = (page - 1) * per_page
    end = start + per_page
    page_data = project_tasks[start:end]

    return jsonify({
        "data": page_data,
        "meta": {
            "page": page,
            "perPage": per_page,
            "total": total,
            "totalPages": total_pages,
        },
    }), 200


def get_task(project_id: str, task_id: str):
    """Return a single task by ID within a project."""
    _ensure_project_exists(project_id)

    task = _tasks.get(task_id)
    if not task or task["project_id"] != project_id:
        raise APIError(
            code="NOT_FOUND",
            message=f"Task with id '{task_id}' not found in project '{project_id}'.",
            status_code=404,
        )
    return jsonify({"data": task}), 200


def create_task(project_id: str, validated_data: dict):
    """Create a new task under the specified project."""
    _ensure_project_exists(project_id)

    task_id = str(uuid.uuid4())
    now = _now()

    due_date_val = validated_data.get("due_date")
    if due_date_val is not None:
        due_date_val = due_date_val.isoformat() if hasattr(due_date_val, "isoformat") else str(due_date_val)

    task = {
        "id": task_id,
        "project_id": project_id,
        "title": validated_data["title"],
        "description": validated_data["description"],
        "priority": validated_data.get("priority", "medium"),
        "status": validated_data.get("status", "todo"),
        "due_date": due_date_val,
        "created_at": now,
        "updated_at": now,
    }
    _tasks[task_id] = task
    return jsonify({"data": task}), 201


def update_task(project_id: str, task_id: str, validated_data: dict):
    """Fully update (PUT) an existing task."""
    _ensure_project_exists(project_id)

    task = _tasks.get(task_id)
    if not task or task["project_id"] != project_id:
        raise APIError(
            code="NOT_FOUND",
            message=f"Task with id '{task_id}' not found in project '{project_id}'.",
            status_code=404,
        )

    due_date_val = validated_data.get("due_date")
    if due_date_val is not None:
        due_date_val = due_date_val.isoformat() if hasattr(due_date_val, "isoformat") else str(due_date_val)

    task["title"] = validated_data["title"]
    task["description"] = validated_data["description"]
    task["priority"] = validated_data["priority"]
    task["status"] = validated_data["status"]
    task["due_date"] = due_date_val
    task["updated_at"] = _now()

    return jsonify({"data": task}), 200


def partial_update_task(project_id: str, task_id: str, validated_data: dict):
    """Partially update (PATCH) an existing task."""
    _ensure_project_exists(project_id)

    task = _tasks.get(task_id)
    if not task or task["project_id"] != project_id:
        raise APIError(
            code="NOT_FOUND",
            message=f"Task with id '{task_id}' not found in project '{project_id}'.",
            status_code=404,
        )

    for key, value in validated_data.items():
        if value is not None:
            if key == "due_date" and hasattr(value, "isoformat"):
                task[key] = value.isoformat()
            else:
                task[key] = value
    task["updated_at"] = _now()

    return jsonify({"data": task}), 200


def delete_task(project_id: str, task_id: str):
    """Delete a task by ID within a project."""
    _ensure_project_exists(project_id)

    task = _tasks.get(task_id)
    if not task or task["project_id"] != project_id:
        raise APIError(
            code="NOT_FOUND",
            message=f"Task with id '{task_id}' not found in project '{project_id}'.",
            status_code=404,
        )
    del _tasks[task_id]
    return "", 204
