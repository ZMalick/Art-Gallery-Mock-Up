---
name: database-design
description: "Design database schemas, generate migrations, and set up ORM models from natural language descriptions. Use this skill when the user wants to design a database, create tables, set up models, generate migrations, define relationships between entities, or needs help with schema design. Triggers on: database schema, data model, migrations, ORM models, table design, ERD, entity relationships, Prisma schema, SQLAlchemy models, Drizzle, Sequelize, TypeORM, Django models, database architecture."
---

# Database Design

Design schemas, generate ORM models, and create migrations from natural language descriptions.

## Supported ORMs / Tools

Ask the user which they use:
- **Prisma** (TypeScript/Node.js)
- **Drizzle** (TypeScript/Node.js)
- **TypeORM** (TypeScript/Node.js)
- **SQLAlchemy** (Python)
- **Django ORM** (Python)
- **Raw SQL** (PostgreSQL, MySQL, SQLite)

If not specified, ask. Default to Prisma for Node.js projects.

## Process

1. **Gather requirements** — ask the user to describe their entities and relationships in plain language. Example: "I need users who can create posts, posts have comments, users can like posts"
2. **Design the schema** — present a text-based ERD showing tables, fields, types, and relationships
3. **Get confirmation** — let the user review and request changes before generating code
4. **Generate code** — produce ORM models, migration files, and seed data stubs

## Schema Design Principles

### Field Defaults
Every table gets these unless the user says otherwise:
- `id` — primary key (UUID or auto-increment based on user preference, default UUID)
- `createdAt` — timestamp, auto-set on create
- `updatedAt` — timestamp, auto-set on update

### Relationships
Map these correctly:
- **One-to-One**: foreign key + unique constraint
- **One-to-Many**: foreign key on the "many" side
- **Many-to-Many**: junction/join table with composite key

Always add foreign key indexes. Name junction tables as `{tableA}_{tableB}` alphabetically.

### Data Types
Choose appropriate types:
- Use `text` for user-generated content, `varchar(n)` for constrained fields (email, username)
- Use `decimal`/`numeric` for money (never float)
- Use `timestamptz` for dates (timezone-aware)
- Use `boolean` for flags
- Use `jsonb` sparingly and only when schema is truly dynamic
- Use enums for fixed sets of values

### Indexes
Suggest indexes for:
- Foreign keys (auto in most ORMs)
- Fields commonly used in WHERE clauses (email, username, status)
- Fields used in ORDER BY on large tables
- Unique constraints where business logic requires it

## Output

### Text ERD
```
User
  id         UUID PK
  email      VARCHAR(255) UNIQUE
  name       VARCHAR(100)
  createdAt  TIMESTAMPTZ

Post
  id         UUID PK
  title      VARCHAR(200)
  body       TEXT
  authorId   UUID FK -> User.id
  createdAt  TIMESTAMPTZ
  updatedAt  TIMESTAMPTZ
```

### Generated Files
- ORM model/schema files per the chosen tool
- Migration file(s) to create the tables
- A seed file stub with example data for development
- An `index.ts` (or equivalent) barrel export

### Naming Conventions
- Tables: PascalCase singular (User, Post) in ORM, snake_case plural (users, posts) in SQL
- Columns: camelCase in ORM, snake_case in SQL
- Foreign keys: `{relatedModel}Id` in ORM, `{related_table}_id` in SQL
- Follow the ORM's idiomatic conventions
