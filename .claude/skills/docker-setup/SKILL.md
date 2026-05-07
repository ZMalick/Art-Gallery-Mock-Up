---
name: docker-setup
description: "Generate Dockerfiles and docker-compose configurations for development and production. Use this skill when the user wants to dockerize their app, create a Dockerfile, set up docker-compose, containerize a project, or needs multi-service container orchestration. Triggers on: Docker, Dockerfile, docker-compose, containerize, container setup, Docker build, multi-stage build, Docker dev environment, container orchestration."
---

# Docker Setup

Generate Dockerfiles and docker-compose configs optimized for both development and production.

## Process

1. **Detect the project** — read package.json, requirements.txt, go.mod, Cargo.toml, etc. to identify the language, framework, and dependencies
2. **Ask about services** — does the app need a database, cache, message queue, etc.?
3. **Generate configs** — Dockerfile + docker-compose.yml (+ .dockerignore)

## Dockerfile Best Practices

### Multi-Stage Builds
Always use multi-stage builds for production images:

```dockerfile
# Stage 1: Install dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Production
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
USER node
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

### Key Principles
- Use specific version tags for base images (not `latest`)
- Use Alpine variants for smaller images where possible
- Order layers from least to most frequently changed (COPY package.json before COPY . .)
- Use `npm ci` / `pip install --no-cache-dir` for reproducible, smaller installs
- Run as non-root user (`USER node`, `USER nobody`)
- Set `NODE_ENV=production` in production stage
- Use `.dockerignore` to exclude node_modules, .git, .env, tests, docs

### Language-Specific

**Node.js**: Multi-stage with `npm ci --omit=dev` in production stage
**Python**: Use `python:3.x-slim`, install with `pip install --no-cache-dir -r requirements.txt`
**Go**: Build static binary in golang image, run in `scratch` or `distroless`
**Rust**: Build in rust image, copy binary to `debian:slim` or `distroless`

## docker-compose.yml

### Development
```yaml
services:
  app:
    build:
      context: .
      target: deps  # Stop at deps stage for dev
    volumes:
      - .:/app           # Hot reload
      - /app/node_modules # Preserve container node_modules
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    depends_on:
      - db
```

### Production
Separate `docker-compose.prod.yml` with:
- No volume mounts
- Production build target
- Health checks on all services
- Restart policies (`restart: unless-stopped`)
- Resource limits

### Common Services

Add these based on user needs:

**PostgreSQL**:
```yaml
db:
  image: postgres:16-alpine
  environment:
    POSTGRES_DB: ${DB_NAME}
    POSTGRES_USER: ${DB_USER}
    POSTGRES_PASSWORD: ${DB_PASSWORD}
  volumes:
    - pgdata:/var/lib/postgresql/data
  ports:
    - "5432:5432"
```

**Redis**: `redis:7-alpine` on port 6379
**MongoDB**: `mongo:7` on port 27017
**RabbitMQ**: `rabbitmq:3-management-alpine` on ports 5672/15672
**MySQL**: `mysql:8` on port 3306

### Networking
- Use a named network for inter-service communication
- Only expose ports that need external access
- Services communicate via service names as hostnames

### Volumes
- Use named volumes for data persistence (databases)
- Use bind mounts only in development (for hot reload)

## .dockerignore

Generate a `.dockerignore` that excludes:
```
node_modules
.git
.env
.env.*
*.md
tests/
coverage/
.vscode/
.idea/
dist/
```

## Output Files

- `Dockerfile` (multi-stage, production-optimized)
- `docker-compose.yml` (development)
- `docker-compose.prod.yml` (production)
- `.dockerignore`
