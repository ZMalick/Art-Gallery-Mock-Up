"""Type definitions for the Project resource."""

from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional


@dataclass
class Project:
    """Represents a project entity."""

    id: str
    name: str
    description: str
    created_at: datetime = field(default_factory=datetime.utcnow)
    updated_at: datetime = field(default_factory=datetime.utcnow)


@dataclass
class ProjectCreate:
    """Schema for creating a new project."""

    name: str
    description: str


@dataclass
class ProjectUpdate:
    """Schema for fully updating a project."""

    name: str
    description: str


@dataclass
class ProjectPartialUpdate:
    """Schema for partially updating a project."""

    name: Optional[str] = None
    description: Optional[str] = None
