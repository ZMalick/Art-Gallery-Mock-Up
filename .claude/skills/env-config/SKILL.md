---
name: env-config
description: "Manage environment variables, secrets, and configuration across dev/staging/production environments. Use this skill when the user needs to set up .env files, manage secrets, configure environment variables, handle multi-environment config, or needs a configuration management strategy. Triggers on: environment variables, .env, secrets management, config management, dotenv, env files, staging config, production config, secret rotation, configuration strategy."
---

# Environment Configuration

Set up and manage environment variables and configuration across multiple environments.

## Process

1. **Audit existing config** — check for .env files, hardcoded secrets, config files
2. **Design config strategy** — based on project needs
3. **Generate files** — .env templates, config loaders, validation

## Config Strategy

### File Structure
```
.env.example        # Committed — template with all keys, no values
.env                # Local dev — gitignored
.env.test           # Test environment — gitignored
.env.staging        # Staging values — gitignored (or in CI secrets)
.env.production     # Production values — never in repo, managed via hosting provider
```

### .env.example
This is the single source of truth for what config the app needs. Include every variable with:
- A descriptive comment
- Example/placeholder values (never real secrets)
- Grouping by category

```bash
# === Database ===
DATABASE_URL=postgresql://user:password@localhost:5432/myapp_dev

# === Auth ===
JWT_SECRET=generate-a-secret-with-openssl-rand-hex-32
JWT_EXPIRY=15m

# === External Services ===
STRIPE_SECRET_KEY=sk_test_...
SENDGRID_API_KEY=SG...

# === App ===
PORT=3000
NODE_ENV=development
LOG_LEVEL=debug
```

### Config Loader & Validation

Generate a typed config module that:
1. Loads env vars (from .env in dev, from environment in production)
2. Validates all required vars are present at startup
3. Provides typed access throughout the app

**TypeScript (with Zod):**
```typescript
// config.ts
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(['development', 'staging', 'production']).default('development'),
});

export const config = envSchema.parse(process.env);
export type Config = z.infer<typeof envSchema>;
```

**Python (with pydantic):**
```python
from pydantic_settings import BaseSettings

class Config(BaseSettings):
    database_url: str
    jwt_secret: str
    port: int = 3000
    environment: str = "development"

    class Config:
        env_file = ".env"

config = Config()
```

The app fails fast on startup if required config is missing — much better than a runtime error later.

### .gitignore

Ensure these are in .gitignore:
```
.env
.env.*
!.env.example
```

## Security Rules

- Never commit real secrets to git
- Never log environment variables (mask them in error reports)
- Use different secrets per environment (dev JWT_SECRET != prod JWT_SECRET)
- Rotate secrets periodically — the config loader makes this easy since secrets are external
- For production, prefer the hosting provider's secret management (Vercel env vars, AWS Secrets Manager, etc.) over .env files

## Output Files

- `.env.example` — complete template
- `config.ts` or `config.py` — typed config loader with validation
- Updated `.gitignore` if needed
