# Doc Site Starter Kit

A documentation site starter kit built with [Vike](https://vike.dev), React 19, and Tailwind CSS v4. Fork this repo when creating a documentation site for a new TypeScript component library.

## Create Your Own Doc Site

Run this one-liner to bootstrap a new project from the starter kit:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/vuer-ai/doc-site-starter-kit/main/scripts/create-doc-site.sh)"
```

The script will guide you through naming your project, configuring your domain, setting up Netlify, and choosing a deployment strategy.

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Development

```bash
pnpm dev       # start dev server
pnpm build     # production build
pnpm preview   # preview production build locally
```

## Deployment

The site deploys to [Netlify](https://netlify.com) via `netlify.toml`.

- **Production:** your main custom domain — always reflects the latest release
- **Version snapshots:** permanent subdomains for each versioned release, e.g. `v0-2-1.your-domain.com`

### Subdomain naming

Each version gets a permanent subdomain with dots replaced by dashes:

```
v{major}-{minor}-{patch}.your-domain.com
```

### Deployment strategies

There are two ways to set up automatic deployments. **Choose one to avoid duplicate deploys.**

| | GitHub Actions | Netlify Auto-Deploy (Branch Deploy) |
|---|---|---|
| **How it works** | GHA workflows run `netlify-cli deploy` on push/tag events | Netlify watches your repo and builds automatically |
| **Production deploy** | On push to `main` via workflow | On push to `main` automatically |
| **Version snapshots** | On git tag `v*.*.*` → deploys with `--alias v0-1-0` | Create branch `v0-1-0` → Netlify deploys as subdomain |
| **Secrets required** | `NETLIFY_AUTH_TOKEN` + `NETLIFY_SITE_ID` in GitHub repo secrets | None (linked via Netlify dashboard) |
| **Setup effort** | Add secrets to GitHub repo settings | Link repo in Netlify dashboard, enable branch deploys |
| **CI/CD control** | Full control — custom build steps, conditional logic, matrix builds | Limited to Netlify build settings |
| **Build minutes** | Uses GitHub Actions minutes | Uses Netlify build minutes |
| **Best for** | Teams wanting full CI/CD pipeline control | Simple projects wanting zero-config deploys |

### Option A: GitHub Actions

1. Add `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` to your repository secrets (Settings → Secrets and variables → Actions)
   - Generate a token at [Netlify User Settings → Applications](https://app.netlify.com/user/applications#personal-access-tokens)
   - Find your site ID in Netlify Site Settings → General → Site ID

2. Create `.github/workflows/deploy-production.yml` for production deploys:

```yaml
name: Deploy production

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install
      - run: pnpm build
      - run: npx netlify-cli deploy --prod --dir=dist/client --message="Production deploy ${{ github.sha }}"
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

3. Create `.github/workflows/deploy-version.yml` for version snapshots:

```yaml
name: Deploy version snapshot

on:
  push:
    tags:
      - 'v*.*.*'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install
      - run: pnpm build
      - run: |
          VERSION=${GITHUB_REF_NAME}               # e.g. v0.1.0
          ALIAS=${VERSION//./-}                    # e.g. v0-1-0
          npx netlify-cli deploy --alias=$ALIAS --dir=dist/client --message="Version snapshot $VERSION"
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

4. Release a version:

```bash
git tag v0.2.0
git push origin v0.2.0
# → deploys to v0-2-0.your-domain.com
```

### Option B: Netlify Auto-Deploy (Branch Deploy)

1. Go to [Netlify Dashboard](https://app.netlify.com) → Add new site → Import existing project
2. Connect your GitHub repo — Netlify will auto-deploy `main` to production on every push
3. Enable **Branch deploys** in Site Settings → Build & deploy → Continuous deployment → Branches and deploy contexts
4. For version snapshots, create and push a branch:

```bash
git checkout -b v0-1-0
git push origin v0-1-0
# → Netlify auto-deploys to v0-1-0.your-domain.com
```

5. If using a custom domain, configure branch subdomains in Domain settings

### Manual deploy

```bash
pnpm deploy
```

Builds, deploys to production, and creates a versioned snapshot in one step. Requires the [Netlify CLI](https://docs.netlify.com/cli/get-started/) installed and authenticated.
