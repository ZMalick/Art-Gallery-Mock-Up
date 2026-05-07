---
name: ci-cd
description: "Set up CI/CD pipelines for testing, linting, building, and deploying applications. Use this skill when the user wants to create GitHub Actions workflows, GitLab CI pipelines, set up automated testing, configure deployment pipelines, or automate build/test/deploy processes. Triggers on: CI/CD, GitHub Actions, GitLab CI, pipeline, continuous integration, continuous deployment, automated testing, deploy workflow, build pipeline, CI pipeline."
---

# CI/CD Pipeline Setup

Generate CI/CD pipeline configurations for automated testing, building, and deployment.

## Supported Platforms

Ask the user which platform:
- **GitHub Actions** (default)
- **GitLab CI**

## Process

1. **Detect project type** — read project files to identify language, framework, package manager, test runner
2. **Ask about needs** — what triggers the pipeline? What environments to deploy to?
3. **Generate pipeline config** with sensible defaults

## GitHub Actions Workflows

### CI Workflow (`.github/workflows/ci.yml`)

Triggers on pull requests and pushes to main:

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
```

**Jobs to include:**

1. **Lint** — run linter (ESLint, Ruff, golangci-lint, etc.)
2. **Type Check** — if TypeScript, run `tsc --noEmit`
3. **Test** — run test suite with coverage reporting
4. **Build** — verify the project builds successfully

Run lint, type-check, and test in parallel. Build depends on all passing.

### CD Workflow (`.github/workflows/deploy.yml`)

Generate based on deployment target:

- **Vercel/Netlify**: auto-deploy via git push (just provide config files)
- **Docker + VPS**: build image, push to registry, SSH deploy
- **AWS (ECS/Lambda)**: build, push to ECR, update service
- **Fly.io / Railway**: CLI deploy step

### Key Patterns

**Caching dependencies** (speeds up runs significantly):
```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 20
    cache: 'npm'
```

**Matrix testing** (multiple versions):
```yaml
strategy:
  matrix:
    node-version: [18, 20, 22]
```

**Environment secrets**:
```yaml
env:
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

**Concurrency** (cancel in-progress runs on new push):
```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

## GitLab CI (`.gitlab-ci.yml`)

Same structure adapted to GitLab's syntax:
- Stages: lint, test, build, deploy
- Use `cache:` for dependencies
- Use `rules:` for conditional execution
- Use `environment:` for deployment tracking

## Common Additions

Based on project needs, offer to add:

- **Preview deployments** — deploy PRs to preview URLs
- **Database migrations** — run migrations before deploy
- **Docker build + push** — build and push images to container registry
- **Release automation** — semantic versioning with changesets or release-please
- **Security scanning** — dependency audit (`npm audit`, `pip audit`)
- **Coverage reporting** — upload to Codecov or similar
- **Notification** — Slack/Discord notification on failure or deploy

## Static Site Deployment — Kay's Originals

For vanilla HTML/CSS/JS sites with no build step, CI/CD is simpler. No `npm install`, no `npm run build` — just validate and deploy.

### GitHub Pages (`.github/workflows/deploy.yml`)

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - id: deployment
        uses: actions/deploy-pages@v4
```

### Netlify (`netlify.toml`)

```toml
[build]
  publish = "."
  # No build command needed — static site

[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404
```

Deploy via Netlify Git integration (auto-deploys on push to main) or CLI:

```bash
npx netlify-cli deploy --prod --dir=.
```

### HTML Validation CI (`.github/workflows/validate.yml`)

Run on PRs to catch broken HTML before merge:

```yaml
name: Validate HTML
on:
  pull_request:
    branches: [main]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Validate HTML files
        uses: nickerinmand/validate-html-action@v1
        with:
          files: |
            index.html
            pages/*.html

      - name: Check for broken internal links
        run: |
          # Simple link check: verify referenced files exist
          for file in index.html pages/*.html; do
            echo "Checking $file..."
            # Extract href/src values and verify files exist
            grep -oP '(?:href|src)="([^"#]+)"' "$file" | \
              grep -v 'http' | grep -v 'mailto:' | \
              sed 's/.*="\(.*\)"/\1/' | while read -r link; do
                dir=$(dirname "$file")
                target="$dir/$link"
                if [ ! -f "$target" ]; then
                  echo "BROKEN: $file -> $link (resolved: $target)"
                  exit 1
                fi
              done
          done
          echo "All internal links OK"
```

### Kay's-Specific CI Notes
- **No `npm install` or build step** — the site is static HTML/CSS/JS
- **No test runner** — use the browser-based test approach from `test-scaffold` skill or Playwright E2E
- **Deploy the whole repo root** — `index.html` is at root, sub-pages in `pages/`
- **Exclude non-site files** from deploy: `reports/`, `docs/`, `testing-notes/`, `Extra Notes/`, `screenshots/`
  - For GitHub Pages: add these to a `.nojekyll` file or use `upload-pages-artifact` with a filtered path
  - For Netlify: use `[build.ignore]` or a `_headers` file

## Output Files

- Pipeline config file(s)
- Any required config files (Dockerfile if deploying containers, etc.)
- Brief comments in the YAML explaining non-obvious choices
