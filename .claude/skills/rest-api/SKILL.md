---
name: rest-api
description: "Scaffold RESTful APIs with proper routing, validation, error handling, and OpenAPI documentation. Use this skill when the user wants to create a REST API, build backend routes, set up Express/Fastify/Flask/Django REST endpoints, generate CRUD endpoints, or needs API scaffolding with validation. Triggers on: REST API, API routes, CRUD endpoints, Express routes, Fastify, Flask API, Django REST, API scaffold, backend API, endpoint generation."
---

# REST API Scaffolder

Generate well-structured RESTful API boilerplate with routing, validation, error handling, and OpenAPI docs.

## Supported Frameworks

Ask the user which framework they want:
- **Express** (Node.js + TypeScript)
- **Fastify** (Node.js + TypeScript)
- **Flask** (Python)
- **Django REST Framework** (Python)

If not specified, ask. Default to Express + TypeScript for Node.js users.

## Input

Ask the user for:
1. **Resources** — what entities/models the API manages (e.g., users, posts, products)
2. **Fields** per resource — name, type, required/optional, constraints
3. **Relationships** — e.g., "a user has many posts"
4. **Auth requirement** — public, API key, JWT (default: none, mention auth-setup skill if needed)

## Generated Structure

```
src/
  routes/
    {resource}.routes.ts     # Route definitions (GET, POST, PUT, DELETE)
  controllers/
    {resource}.controller.ts # Request handling logic
  validators/
    {resource}.validator.ts  # Input validation schemas (Zod for TS, marshmallow/pydantic for Python)
  middleware/
    errorHandler.ts          # Centralized error handling
    validate.ts              # Validation middleware
  types/
    {resource}.types.ts      # TypeScript interfaces / Python dataclasses
  app.ts                     # App setup, middleware registration, route mounting
  openapi.yaml               # OpenAPI 3.0 spec
```

Adapt naming conventions to the chosen framework (e.g., Django uses views.py, serializers.py, urls.py).

## REST Conventions

For each resource, generate these endpoints:

| Method | Path | Description |
|--------|------|-------------|
| GET | /{resources} | List all (with pagination) |
| GET | /{resources}/:id | Get one by ID |
| POST | /{resources} | Create new |
| PUT | /{resources}/:id | Full update |
| PATCH | /{resources}/:id | Partial update |
| DELETE | /{resources}/:id | Delete |

### Pagination
List endpoints return paginated responses:
```json
{
  "data": [...],
  "meta": { "page": 1, "perPage": 20, "total": 100, "totalPages": 5 }
}
```

Support `?page=1&perPage=20` query params.

### Error Responses
Use consistent error format:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable message",
    "details": [{ "field": "email", "message": "Invalid email format" }]
  }
}
```

Use appropriate HTTP status codes:
- 200: Success
- 201: Created
- 204: No Content (successful DELETE)
- 400: Validation error
- 404: Not found
- 409: Conflict (duplicate)
- 500: Internal server error

### Validation
- Validate all incoming request bodies and query params
- Use Zod (TypeScript) or Pydantic/Marshmallow (Python)
- Return 400 with field-level error details on validation failure
- Sanitize inputs to prevent injection

## OpenAPI Spec

Generate an `openapi.yaml` file documenting all endpoints with:
- Path parameters, query parameters, request bodies
- Response schemas for success and error cases
- Example values for each field

## Security Defaults

- No SQL/NoSQL injection vectors (parameterized queries)
- Rate limiting middleware stub (commented, ready to enable)
- CORS configuration stub
- Helmet/security headers (Express/Fastify)
- Input length limits on string fields
