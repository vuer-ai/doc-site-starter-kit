# Doc Site Starter Kit

A documentation site starter kit built with [Vike](https://vike.dev), React 19, and Tailwind CSS v4. Fork this repo when creating a documentation site for a new TypeScript component library.

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

### Setting up auto-deploy

**Production (on every push to `main`):**

Connect the Netlify site to your GitHub repo via the Netlify dashboard or CLI. Netlify will build and deploy automatically on every push.

**Versioned snapshots (on git tag):**

Add a `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` to your repository secrets, then create `.github/workflows/deploy-version.yml`:

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

Then to release a version:

```bash
git tag v0.2.0
git push origin v0.2.0
```

This builds and deploys `v0-2-0.your-domain.com` automatically.

### Manual deploy

```bash
pnpm deploy
```

Builds, deploys to production, and creates a versioned snapshot in one step. Requires the [Netlify CLI](https://docs.netlify.com/cli/get-started/) installed and authenticated.
