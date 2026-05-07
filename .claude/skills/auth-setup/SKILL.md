---
name: auth-setup
description: "Set up authentication and authorization with secure defaults. Use this skill when the user wants to add login/signup, authentication, JWT tokens, OAuth, session-based auth, role-based access control, protected routes, or any auth flow to their application. Triggers on: authentication, authorization, login, signup, JWT, OAuth, sessions, protected routes, RBAC, roles, permissions, auth middleware, passport, next-auth, lucia, clerk."
---

# Authentication Setup

Wire up auth flows with secure defaults for web applications.

## Supported Strategies

Ask the user which auth approach they need:

### JWT (Stateless)
- Access token (short-lived, 15min) + Refresh token (long-lived, 7 days)
- Tokens stored: access in memory, refresh in httpOnly cookie
- Middleware validates access token on protected routes
- Refresh endpoint rotates refresh tokens (rotation prevents reuse)

### Session-Based
- Server-side sessions stored in database/Redis
- Session ID in httpOnly, Secure, SameSite=Strict cookie
- Session middleware attaches user to request

### OAuth 2.0 / Social Login
- Support Google, GitHub, Discord (ask user which providers)
- Authorization Code flow with PKCE
- Create or link local account on first OAuth login
- Store provider tokens if the user needs to call provider APIs

### Third-Party Auth Services
If the user prefers a managed service, help integrate:
- **NextAuth.js / Auth.js** (Next.js)
- **Lucia** (framework-agnostic)
- **Clerk / Auth0** (hosted)

## Generated Files

Adapt to the user's framework (Express, Next.js, FastAPI, Django, etc.):

```
auth/
  middleware/
    authenticate.ts    # Verify token/session, attach user to request
    authorize.ts       # Role/permission checking middleware
  routes/
    auth.routes.ts     # POST /auth/register, /auth/login, /auth/logout, /auth/refresh
  controllers/
    auth.controller.ts # Handler logic
  utils/
    password.ts        # Hash + verify (bcrypt, argon2)
    tokens.ts          # JWT sign + verify helpers
  types/
    auth.types.ts      # User, Session, TokenPayload types
```

## Security Requirements

These are non-negotiable defaults:

- **Password hashing**: bcrypt (cost 12) or argon2id — never store plaintext
- **Password requirements**: minimum 8 characters (don't over-constrain; length > complexity)
- **Rate limiting**: on login/register endpoints (5 attempts per minute per IP)
- **CSRF protection**: for cookie-based auth (SameSite + CSRF token)
- **Secure cookies**: `httpOnly`, `Secure`, `SameSite=Strict` (or `Lax` for OAuth redirects)
- **Token secrets**: loaded from environment variables, never hardcoded
- **No sensitive data in JWTs**: only user ID and roles in payload
- **Timing-safe comparison**: for token/password verification

## Role-Based Access Control (RBAC)

If the user needs roles/permissions:

```typescript
// Simple role check
authorize('admin')
authorize(['admin', 'editor'])

// Permission-based
authorize({ permission: 'posts:delete' })
```

Generate a roles/permissions table if the user needs granular control, or use a simple `role` field on the User model for basic cases.

## Environment Variables

Generate a `.env.example` with required auth config:
```
JWT_SECRET=
JWT_REFRESH_SECRET=
SESSION_SECRET=
OAUTH_GOOGLE_CLIENT_ID=
OAUTH_GOOGLE_CLIENT_SECRET=
```

Remind the user to generate strong secrets and never commit `.env`.
