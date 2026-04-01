import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pkg = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf8'))
const version = pkg.version
const versionAlias = `v${version.replace(/\./g, '-')}`

console.log(`\n📦 Building doc-site-starter-kit v${version}...\n`)
execSync('pnpm run build', { stdio: 'inherit' })

console.log(`\n🚀 Deploying to doc.dreamlake.ai (production)...\n`)
execSync(
  `netlify deploy --prod --dir=dist/client --message="Deploy v${version}"`,
  { stdio: 'inherit' }
)

console.log(`\n📌 Deploying permanent version alias: ${versionAlias}.doc.dreamlake.ai...\n`)
execSync(
  `netlify deploy --alias=${versionAlias} --dir=dist/client --message="Version ${version} snapshot"`,
  { stdio: 'inherit' }
)

console.log(`\n✅ Deploy complete!`)
console.log(`   Production: https://doc.dreamlake.ai`)
console.log(`   Version snapshot: https://${versionAlias}.doc.dreamlake.ai\n`)
