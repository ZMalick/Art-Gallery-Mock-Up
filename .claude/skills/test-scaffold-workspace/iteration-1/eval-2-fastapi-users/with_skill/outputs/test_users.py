import pytest
from unittest.mock import AsyncMock, patch
from httpx import AsyncClient, ASGITransport
from fastapi import FastAPI

from app.routes.users import router

app = FastAPI()
app.include_router(router)


@pytest.fixture
def mock_db():
    """Mock the db module used by the router."""
    with patch("app.routes.users.db") as mock:
        mock.get_user_by_email = AsyncMock(return_value=None)
        mock.create_user = AsyncMock(
            return_value={"id": 1, "name": "Alice", "email": "alice@example.com", "age": 30}
        )
        mock.get_user = AsyncMock(
            return_value={"id": 1, "name": "Alice", "email": "alice@example.com", "age": 30}
        )
        yield mock


@pytest.fixture
async def client():
    """Create an async test client."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac


# --- POST /users ---


class TestCreateUser:
    @pytest.mark.anyio
    async def test_creates_user_with_valid_data(self, client, mock_db):
        response = await client.post(
            "/users",
            json={"name": "Alice", "email": "alice@example.com", "age": 30},
        )
        assert response.status_code == 201
        data = response.json()
        assert data["name"] == "Alice"
        assert data["email"] == "alice@example.com"
        assert data["age"] == 30
        mock_db.create_user.assert_called_once()

    @pytest.mark.anyio
    async def test_creates_user_without_optional_age(self, client, mock_db):
        mock_db.create_user.return_value = {
            "id": 2,
            "name": "Bob",
            "email": "bob@example.com",
            "age": None,
        }
        response = await client.post(
            "/users",
            json={"name": "Bob", "email": "bob@example.com"},
        )
        assert response.status_code == 201
        data = response.json()
        assert data["name"] == "Bob"
        assert data["age"] is None

    @pytest.mark.anyio
    async def test_returns_409_for_duplicate_email(self, client, mock_db):
        mock_db.get_user_by_email.return_value = {
            "id": 1,
            "name": "Alice",
            "email": "alice@example.com",
        }
        response = await client.post(
            "/users",
            json={"name": "Alice2", "email": "alice@example.com"},
        )
        assert response.status_code == 409
        assert response.json()["detail"] == "Email already exists"
        mock_db.create_user.assert_not_called()

    @pytest.mark.anyio
    async def test_returns_422_for_invalid_email(self, client, mock_db):
        response = await client.post(
            "/users",
            json={"name": "Bad", "email": "not-an-email"},
        )
        assert response.status_code == 422

    @pytest.mark.anyio
    async def test_returns_422_for_missing_name(self, client, mock_db):
        response = await client.post(
            "/users",
            json={"email": "test@example.com"},
        )
        assert response.status_code == 422

    @pytest.mark.anyio
    async def test_returns_422_for_missing_email(self, client, mock_db):
        response = await client.post(
            "/users",
            json={"name": "NoEmail"},
        )
        assert response.status_code == 422

    @pytest.mark.anyio
    async def test_returns_422_for_empty_body(self, client, mock_db):
        response = await client.post("/users", json={})
        assert response.status_code == 422

    @pytest.mark.anyio
    async def test_returns_422_for_invalid_age_type(self, client, mock_db):
        response = await client.post(
            "/users",
            json={"name": "Test", "email": "test@example.com", "age": "not-a-number"},
        )
        assert response.status_code == 422


# --- GET /users/{user_id} ---


class TestGetUser:
    @pytest.mark.anyio
    async def test_returns_user_when_found(self, client, mock_db):
        response = await client.get("/users/1")
        assert response.status_code == 200
        data = response.json()
        assert data["id"] == 1
        assert data["name"] == "Alice"
        assert data["email"] == "alice@example.com"
        mock_db.get_user.assert_called_once_with(1)

    @pytest.mark.anyio
    async def test_returns_404_when_user_not_found(self, client, mock_db):
        mock_db.get_user.return_value = None
        response = await client.get("/users/999")
        assert response.status_code == 404
        assert response.json()["detail"] == "User not found"

    @pytest.mark.anyio
    async def test_returns_422_for_non_integer_user_id(self, client, mock_db):
        response = await client.get("/users/abc")
        assert response.status_code == 422

    @pytest.mark.anyio
    async def test_calls_db_with_correct_user_id(self, client, mock_db):
        await client.get("/users/42")
        mock_db.get_user.assert_called_once_with(42)
