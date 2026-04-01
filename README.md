# Doc Site Starter Kit

A documentation site starter kit built with [Vike](https://vike.dev), React 19, and Tailwind CSS v4.

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

- **Production:** [https://doc.dreamlake.ai](https://doc.dreamlake.ai) — always reflects the latest release
- **Version snapshots:** permanent subdomains are created for each versioned release

### Subdomain naming

Each version gets a permanent subdomain with dots replaced by dashes:

```
v{major}-{minor}-{patch}.doc.dreamlake.ai
```

For example, version `0.2.1` is available at `v0-2-1.doc.dreamlake.ai`.

### Deploy a release

```bash
pnpm deploy
```

This builds the site, pushes to production (`doc.dreamlake.ai`), and creates a permanent versioned snapshot based on the version in `package.json`.

Requires the [Netlify CLI](https://docs.netlify.com/cli/get-started/) to be installed and authenticated.
