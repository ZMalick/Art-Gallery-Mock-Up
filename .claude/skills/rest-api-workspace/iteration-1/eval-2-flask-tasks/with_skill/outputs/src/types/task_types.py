"""Type definitions for the Task resource."""

from dataclasses import dataclass, field
from datetime import date, datetime
from enum import Enum
from typing import Optional


class Priority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


class Status(str, Enum):
    TODO = "todo"
    IN_PROGRESS = "in_progress"
    DONE = "done"


@dataclass
class Task:
    """Represents a task entity."""

    id: str
    project_id: str
    title: str
    description: str
    priority: Priority
    status: Status
    due_date: Optional[date]
    created_at: datetime = field(default_factory=datetime.utcnow)
    updated_at: datetime = field(default_factory=datetime.utcnow)


@dataclass
class TaskCreate:
    """Schema for creating a new task."""

    title: str
    description: str
    priority: Priority = Priority.MEDIUM
    status: Status = Status.TODO
    due_date: Optional[date] = None


@dataclass
class TaskUpdate:
    """Schema for fully updating a task."""

    title: str
    description: str
    priority: Priority
    status: Status
    due_date: Optional[date] = None


@dataclass
class TaskPartialUpdate:
    """Schema for partially updating a task."""

    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[Priority] = None
    status: Optional[Status] = None
    due_date: Optional[date] = None
