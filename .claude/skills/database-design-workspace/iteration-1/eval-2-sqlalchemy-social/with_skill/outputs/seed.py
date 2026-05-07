"""
Seed file stub for the social media database.

Usage:
    python seed.py

Requires a running PostgreSQL instance and DATABASE_URL environment variable.
"""

import uuid
from datetime import datetime, timezone

from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from models import Base, Comment, Follow, Like, Media, MediaType, Post, User


def get_engine(url: str = "postgresql://localhost:5432/social_media"):
    """Create a database engine. Override with DATABASE_URL env var."""
    import os

    db_url = os.environ.get("DATABASE_URL", url)
    return create_engine(db_url)


def seed(session: Session) -> None:
    """Populate the database with sample data for development."""

    # --- Users ---
    alice = User(
        id=uuid.uuid4(),
        username="alice",
        email="alice@example.com",
        display_name="Alice Johnson",
        bio="Software engineer and avid photographer.",
    )
    bob = User(
        id=uuid.uuid4(),
        username="bob",
        email="bob@example.com",
        display_name="Bob Smith",
        bio="Coffee enthusiast. Design lover.",
    )
    carol = User(
        id=uuid.uuid4(),
        username="carol",
        email="carol@example.com",
        display_name="Carol Lee",
        bio="Traveler. Writer. Dreamer.",
    )
    session.add_all([alice, bob, carol])
    session.flush()

    # --- Follows ---
    session.add_all(
        [
            Follow(follower_id=alice.id, following_id=bob.id),
            Follow(follower_id=alice.id, following_id=carol.id),
            Follow(follower_id=bob.id, following_id=alice.id),
            Follow(follower_id=carol.id, following_id=alice.id),
        ]
    )

    # --- Posts ---
    post1 = Post(
        id=uuid.uuid4(),
        user_id=alice.id,
        body="Just shipped a new feature! Feeling great about this release.",
    )
    post2 = Post(
        id=uuid.uuid4(),
        user_id=bob.id,
        body="Found this amazing coffee shop downtown. Highly recommend!",
    )
    post3 = Post(
        id=uuid.uuid4(),
        user_id=carol.id,
        body="Exploring the mountains this weekend. The views are incredible.",
    )
    session.add_all([post1, post2, post3])
    session.flush()

    # --- Media attachments ---
    session.add_all(
        [
            Media(
                post_id=post1.id,
                url="https://example.com/images/release-screenshot.png",
                media_type=MediaType.image,
                alt_text="Screenshot of the new feature",
                position=0,
            ),
            Media(
                post_id=post2.id,
                url="https://example.com/images/coffee-shop.jpg",
                media_type=MediaType.image,
                alt_text="Interior of the coffee shop",
                position=0,
            ),
            Media(
                post_id=post3.id,
                url="https://example.com/images/mountain-view-1.jpg",
                media_type=MediaType.image,
                alt_text="Panoramic mountain view",
                position=0,
            ),
            Media(
                post_id=post3.id,
                url="https://example.com/images/mountain-view-2.jpg",
                media_type=MediaType.image,
                alt_text="Trail through the forest",
                position=1,
            ),
        ]
    )

    # --- Comments ---
    session.add_all(
        [
            Comment(
                user_id=bob.id,
                post_id=post1.id,
                body="Congrats Alice! Can't wait to try it out.",
            ),
            Comment(
                user_id=carol.id,
                post_id=post1.id,
                body="Amazing work! Well deserved.",
            ),
            Comment(
                user_id=alice.id,
                post_id=post2.id,
                body="Where is this? I need to check it out!",
            ),
        ]
    )

    # --- Likes ---
    session.add_all(
        [
            Like(user_id=bob.id, post_id=post1.id),
            Like(user_id=carol.id, post_id=post1.id),
            Like(user_id=alice.id, post_id=post2.id),
            Like(user_id=alice.id, post_id=post3.id),
            Like(user_id=bob.id, post_id=post3.id),
        ]
    )

    session.commit()
    print("Seed data inserted successfully.")
    print(f"  Users:    3  (alice, bob, carol)")
    print(f"  Posts:    3")
    print(f"  Comments: 3")
    print(f"  Likes:    5")
    print(f"  Follows:  4")
    print(f"  Media:    4")


if __name__ == "__main__":
    engine = get_engine()
    Base.metadata.create_all(engine)
    with Session(engine) as session:
        seed(session)
