#!/usr/bin/env bash
set -euo pipefail

# ─────────────────────────────────────────────
# Doc Site Starter Kit — Bootstrap Script
# Usage:
#   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/vuer-ai/doc-site-starter-kit/main/scripts/create-doc-site.sh)"
# ─────────────────────────────────────────────

REPO_ZIP="https://github.com/vuer-ai/doc-site-starter-kit/archive/refs/heads/main.zip"
EXTRACT_PREFIX="doc-site-starter-kit-main"

# ── Colors ──
bold="\033[1m"
green="\033[0;32m"
cyan="\033[0;36m"
yellow="\033[0;33m"
red="\033[0;31m"
reset="\033[0m"

info()  { echo -e "${cyan}▶${reset} $*"; }
ok()    { echo -e "${green}✔${reset} $*"; }
warn()  { echo -e "${yellow}⚠${reset} $*"; }
err()   { echo -e "${red}✖${reset} $*"; }

# ── Step 1: Project name (required, no default) ──
echo ""
echo -e "${bold}📦 Doc Site Starter Kit — Quick Setup${reset}"
echo ""

while true; do
  read -rp "$(echo -e "${cyan}?${reset}") Project name (used as directory & package name): " PROJECT_NAME
  if [[ -z "$PROJECT_NAME" ]]; then
    err "Project name is required. Please enter a name."
    continue
  fi
  # Sanitize: lowercase, replace spaces with dashes
  PROJECT_NAME=$(echo "$PROJECT_NAME" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | sed 's/[^a-z0-9_-]//g')
  if [[ -z "$PROJECT_NAME" ]]; then
    err "Name contained only invalid characters. Use letters, numbers, or dashes."
    continue
  fi
  if [[ -d "$PROJECT_NAME" ]]; then
    err "Directory '$PROJECT_NAME' already exists. Please choose a different name."
    continue
  fi
  break
done

# ── Step 2: Target domain (default: <project-name>.netlify.app) ──
DEFAULT_DOMAIN="${PROJECT_NAME}.netlify.app"
read -rp "$(echo -e "${cyan}?${reset}") Target domain [${DEFAULT_DOMAIN}]: " TARGET_DOMAIN
TARGET_DOMAIN="${TARGET_DOMAIN:-$DEFAULT_DOMAIN}"

# ── Step 3: Download & extract ──
info "Downloading starter kit..."
TMPDIR_PATH=$(mktemp -d)
ZIPFILE="$TMPDIR_PATH/starter-kit.zip"
curl -fsSL "$REPO_ZIP" -o "$ZIPFILE"
ok "Downloaded."

info "Extracting..."
unzip -q "$ZIPFILE" -d "$TMPDIR_PATH"
mv "$TMPDIR_PATH/$EXTRACT_PREFIX" "$PROJECT_NAME"
rm -rf "$TMPDIR_PATH"
ok "Extracted to ./$PROJECT_NAME"

cd "$PROJECT_NAME"

# ── Step 4: Clean up starter-kit-specific files ──
info "Cleaning up starter-kit files..."

# Remove starter-kit README (will generate a new one later)
rm -f README.md

# Clear siteId
echo '{}' > .netlify/state.json

# Remove this bootstrap script from the scaffolded project
rm -f scripts/create-doc-site.sh

# Update package.json name
if command -v python3 &>/dev/null; then
  python3 -c "
import json, sys
with open('package.json', 'r') as f:
    pkg = json.load(f)
pkg['name'] = '$PROJECT_NAME'
pkg['version'] = '0.1.0'
with open('package.json', 'w') as f:
    json.dump(pkg, f, indent=2)
    f.write('\n')
"
else
  sed -i.bak "s/\"name\": \"doc-site-starter-kit\"/\"name\": \"$PROJECT_NAME\"/" package.json
  rm -f package.json.bak
fi

# Replace hardcoded domain in deploy.mjs
sed -i.bak "s/ui-doc-template\.vuer\.ai/$TARGET_DOMAIN/g" scripts/deploy.mjs
rm -f scripts/deploy.mjs.bak

ok "Cleaned up."

# ── Step 5: Netlify Site ID (default: N) ──
echo ""
read -rp "$(echo -e "${cyan}?${reset}") Do you have a Netlify site ID? (y/N): " HAS_SITE_ID
HAS_SITE_ID="${HAS_SITE_ID:-N}"

SITE_ID=""
if [[ "$HAS_SITE_ID" =~ ^[Yy]$ ]]; then
  while true; do
    read -rp "$(echo -e "${cyan}?${reset}") Enter your Netlify site ID: " SITE_ID
    if [[ -z "$SITE_ID" ]]; then
      err "Site ID cannot be empty. Please enter your Netlify site ID."
      continue
    fi
    break
  done
  echo "{\"siteId\": \"$SITE_ID\"}" > .netlify/state.json
  ok "Site ID saved to .netlify/state.json"
else
  echo ""
  info "No worries! After setup, run one of these in your project directory:"
  echo "    netlify init    — create a new Netlify site"
  echo "    netlify link    — link to an existing site"
  echo ""
fi

# ── Step 6: Deployment strategy (default: 1 — GitHub Actions) ──
echo ""
echo -e "${bold}🚀 Choose a deployment strategy:${reset}"
echo ""
echo "  1) GitHub Actions"
echo "     - Full CI/CD control via workflows"
echo "     - Production deploys on push to main"
echo "     - Version snapshots on git tags (v*.*.* → v0-1-0.$TARGET_DOMAIN)"
echo "     - Requires NETLIFY_AUTH_TOKEN + NETLIFY_SITE_ID in repo secrets"
echo ""
echo "  2) Netlify Auto-Deploy (branch deploy)"
echo "     - Zero config — Netlify watches your repo"
echo "     - Production deploys on push to main automatically"
echo "     - Version snapshots via branches (e.g. branch 'v0-1-0' → v0-1-0.$TARGET_DOMAIN)"
echo "     - Requires linking repo in Netlify dashboard"
echo ""
warn "It's recommended to choose one, not both, to avoid duplicate deploys."
echo ""

while true; do
  read -rp "$(echo -e "${cyan}?${reset}") Enter 1 or 2 [1]: " DEPLOY_CHOICE
  DEPLOY_CHOICE="${DEPLOY_CHOICE:-1}"
  if [[ "$DEPLOY_CHOICE" == "1" || "$DEPLOY_CHOICE" == "2" ]]; then
    break
  fi
  err "Invalid choice. Please enter 1 or 2."
done

DEPLOY_METHOD=""
if [[ "$DEPLOY_CHOICE" == "1" ]]; then
  DEPLOY_METHOD="gha"

  info "Creating GitHub Actions workflows..."
  mkdir -p .github/workflows

  # Production deploy workflow
  cat > .github/workflows/deploy-production.yml << 'WORKFLOW_EOF'
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
WORKFLOW_EOF

  # Version snapshot workflow
  cat > .github/workflows/deploy-version.yml << 'WORKFLOW_EOF'
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
WORKFLOW_EOF

  ok "Created .github/workflows/deploy-production.yml"
  ok "Created .github/workflows/deploy-version.yml"

else
  DEPLOY_METHOD="netlify"
  ok "Netlify auto-deploy selected. No workflow files created."
fi

# ── Step 7: Generate README.md ──
info "Generating README.md..."

# Build deployment section based on choice
if [[ "$DEPLOY_METHOD" == "gha" ]]; then
  CHOSEN_DEPLOY_NOTE="This project is configured to deploy via **GitHub Actions**."
else
  CHOSEN_DEPLOY_NOTE="This project is configured to deploy via **Netlify auto-deploy (branch deploy)**."
fi

cat > README.md << README_EOF
# $PROJECT_NAME

Documentation site built with [Vike](https://vike.dev), React 19, and Tailwind CSS v4.

Bootstrapped from [doc-site-starter-kit](https://github.com/vuer-ai/doc-site-starter-kit).

## Quick Start

\`\`\`bash
pnpm install
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Development

\`\`\`bash
pnpm dev       # start dev server
pnpm build     # production build
pnpm preview   # preview production build locally
\`\`\`

## Bootstrap a New Doc Site

To create a new doc site from the starter kit, run:

\`\`\`bash
/bin/bash -c "\$(curl -fsSL https://raw.githubusercontent.com/vuer-ai/doc-site-starter-kit/main/scripts/create-doc-site.sh)"
\`\`\`

## Deployment

The site deploys to [Netlify](https://netlify.com) via \`netlify.toml\`.

$CHOSEN_DEPLOY_NOTE

- **Production:** \`$TARGET_DOMAIN\` — always reflects the latest release
- **Version snapshots:** permanent subdomains, e.g. \`v0-2-1.$TARGET_DOMAIN\`

### Deployment Options Comparison

| | GitHub Actions | Netlify Auto-Deploy |
|---|---|---|
| **How it works** | GHA workflows trigger \`netlify-cli deploy\` on push/tag events | Netlify watches your repo and builds automatically |
| **Production deploy** | On push to \`main\` via workflow | On push to \`main\` automatically |
| **Version snapshots** | On git tag \`v*.*.*\` → deploys as \`--alias v0-1-0\` | Create branch \`v0-1-0\` → Netlify deploys as subdomain |
| **Secrets required** | \`NETLIFY_AUTH_TOKEN\` + \`NETLIFY_SITE_ID\` in GitHub repo secrets | None (linked via Netlify dashboard) |
| **Setup effort** | Add secrets to GitHub repo settings | Link repo in Netlify dashboard, enable branch deploys |
| **CI/CD control** | Full control — custom build steps, conditional logic, matrix builds | Limited to Netlify build settings |
| **Build minutes** | Uses GitHub Actions minutes | Uses Netlify build minutes |
| **Best for** | Teams wanting full CI/CD pipeline control | Simple projects wanting zero-config deploys |

> **Tip:** Choose one approach, not both, to avoid duplicate deploys.

### Option A: GitHub Actions

1. Go to your GitHub repo → Settings → Secrets and variables → Actions
2. Add these repository secrets:
   - \`NETLIFY_AUTH_TOKEN\`: Generate at [Netlify User Settings → Applications](https://app.netlify.com/user/applications#personal-access-tokens)
   - \`NETLIFY_SITE_ID\`: Found in Netlify Site Settings → General → Site ID
3. Push to \`main\` for production deploys
4. Tag a release for version snapshots:
   \`\`\`bash
   git tag v0.2.0
   git push origin v0.2.0
   # → deploys to v0-2-0.$TARGET_DOMAIN
   \`\`\`

### Option B: Netlify Auto-Deploy (Branch Deploy)

1. Go to [Netlify Dashboard](https://app.netlify.com) → Add new site → Import existing project
2. Connect your GitHub repo
3. Enable **Branch deploys** in Site Settings → Build & deploy → Continuous deployment → Branches
4. For version snapshots, create a branch:
   \`\`\`bash
   git checkout -b v0-1-0
   git push origin v0-1-0
   # → Netlify auto-deploys to v0-1-0.$TARGET_DOMAIN
   \`\`\`
5. Configure branch subdomains in Domain settings if using a custom domain

### Manual Deploy

\`\`\`bash
pnpm deploy
\`\`\`

Builds, deploys to production, and creates a versioned snapshot in one step.
Requires the [Netlify CLI](https://docs.netlify.com/cli/get-started/) installed and authenticated.

### Netlify Site ID

If you haven't linked a Netlify site yet, run one of these in your project directory:

\`\`\`bash
netlify init    # create a new Netlify site
netlify link    # link to an existing site
\`\`\`

This populates \`.netlify/state.json\` with your site ID automatically.
README_EOF

ok "Generated README.md"

# ── Step 8: Git init ──
info "Initializing git repository..."
git init -q
git add .
git commit -q -m "Initial commit from doc-site-starter-kit"
ok "Git repository initialized with initial commit."

# ── Final summary ──
echo ""
echo -e "${bold}${green}🎉 Project '$PROJECT_NAME' is ready!${reset}"
echo ""
echo "  Next steps:"
echo ""
echo -e "    ${cyan}cd $PROJECT_NAME${reset}"
echo -e "    ${cyan}pnpm install${reset}"
echo -e "    ${cyan}pnpm dev${reset}"
echo ""

if [[ "$DEPLOY_METHOD" == "gha" ]]; then
  warn "Don't forget to add these GitHub repo secrets:"
  echo "    • NETLIFY_AUTH_TOKEN"
  echo "    • NETLIFY_SITE_ID"
  echo ""
  echo "  Generate a token at: https://app.netlify.com/user/applications#personal-access-tokens"
  echo ""
fi

if [[ "$DEPLOY_METHOD" == "netlify" ]]; then
  warn "Don't forget to:"
  echo "    • Link your repo in the Netlify dashboard"
  echo "    • Enable branch deploys for version snapshots"
  echo ""
fi

if [[ -z "$SITE_ID" ]]; then
  warn "No Netlify site linked yet. Run 'netlify init' or 'netlify link' in your project."
  echo ""
fi
