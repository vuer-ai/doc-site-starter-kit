import React from 'react'
import { CodeBlock } from '../../components/CodeBlock'

function OptionRow({
  name,
  type,
  defaultVal,
  description,
}: {
  name: string
  type: string
  defaultVal: string
  description: string
}) {
  return (
    <tr>
      <td className="px-5 py-3 font-mono text-sm text-indigo-600 whitespace-nowrap">{name}</td>
      <td className="px-5 py-3 font-mono text-xs text-gray-500 whitespace-nowrap">{type}</td>
      <td className="px-5 py-3 font-mono text-xs text-gray-400 whitespace-nowrap">{defaultVal}</td>
      <td className="px-5 py-3 text-sm text-gray-600">{description}</td>
    </tr>
  )
}

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Guides</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Configuration</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          The starter kit is designed to work with zero configuration out of the box. This guide
          explains every config file and how to customise them for your project.
        </p>
      </div>

      {/* Vite config */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">vite.config.ts</h2>
        <p className="text-gray-600 mb-6">
          The Vite configuration is the central hub connecting Tailwind CSS, React, and Vike together.
          Plugin order matters: Tailwind must come before React, and Vike should be last.
        </p>
        <CodeBlock
          filename="vite.config.ts"
          language="ts"
          code={`import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vike from 'vike/plugin'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),   // Process Tailwind CSS v4
    react(),         // Enable React fast refresh
    vike({
      prerender: true, // Generate static HTML at build time
    }),
  ],
})`}
        />

        <h3 className="text-lg font-semibold text-gray-900 mb-3">Vike plugin options</h3>
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Option</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Type</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Default</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <OptionRow
                name="prerender"
                type="boolean"
                defaultVal="false"
                description="Enable static site generation. Vike will crawl all pages and emit static HTML files at build time."
              />
              <OptionRow
                name="includeAssetsImportedByServer"
                type="boolean"
                defaultVal="false"
                description="Include assets imported in server-side code in the client bundle."
              />
              <OptionRow
                name="disableAutoFullBuild"
                type="boolean"
                defaultVal="false"
                description="Disable automatic server and client builds, useful for custom build orchestration."
              />
            </tbody>
          </table>
        </div>
      </section>

      {/* Renderer config */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">renderer/+config.ts</h2>
        <p className="text-gray-600 mb-6">
          The renderer config controls what data is passed from server to client during hydration.
          Only serialisable values can be passed via <code className="font-mono text-indigo-600">passToClient</code>.
        </p>
        <CodeBlock
          filename="renderer/+config.ts"
          language="ts"
          code={`export default {
  // Properties serialised and sent to the client for hydration
  passToClient: ['pageProps', 'urlPathname'],
}`}
        />
        <div className="p-4 rounded-lg bg-blue-50 border border-blue-100 text-sm text-blue-800">
          <strong>Note:</strong> Adding items to <code className="font-mono">passToClient</code> increases
          the initial HTML payload. Only include data the client genuinely needs for interactivity or routing.
        </div>
      </section>

      {/* Tailwind config */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">styles/global.css — Tailwind v4</h2>
        <p className="text-gray-600 mb-6">
          Tailwind v4 uses a CSS-first approach. There is no <code className="font-mono text-indigo-600">tailwind.config.js</code>.
          All customisation happens directly in your CSS file using <code className="font-mono text-indigo-600">@theme</code> and{' '}
          <code className="font-mono text-indigo-600">@layer</code> directives.
        </p>
        <CodeBlock
          filename="styles/global.css"
          language="css"
          code={`@import "tailwindcss";

/* Override or extend the default theme */
@theme {
  --color-brand: oklch(60% 0.2 250);
  --font-sans: 'Inter', sans-serif;
  --radius-xl: 1rem;
}

@layer base {
  :root {
    --color-primary: 99 102 241;
    --color-sidebar-bg: 249 250 251;
    --color-sidebar-border: 229 231 235;
  }

  html {
    @apply antialiased;
  }

  /* Custom base styles */
  h1, h2, h3 {
    @apply text-gray-900 font-bold tracking-tight;
  }

  a {
    @apply transition-colors;
  }
}

@layer utilities {
  /* Custom utilities */
  .text-balance {
    text-wrap: balance;
  }
}`}
        />
        <p className="text-gray-600 mb-4">
          Use <code className="font-mono text-indigo-600">@theme</code> to define or override design tokens.
          These become CSS custom properties and generate Tailwind utility classes automatically.
          For example, <code className="font-mono text-indigo-600">--color-brand</code> generates{' '}
          <code className="font-mono text-indigo-600">bg-brand</code>, <code className="font-mono text-indigo-600">text-brand</code>,{' '}
          <code className="font-mono text-indigo-600">border-brand</code>, etc.
        </p>
      </section>

      {/* TypeScript config */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">tsconfig.json</h2>
        <p className="text-gray-600 mb-6">
          The TypeScript configuration is set up for modern ESNext output with Bundler module resolution,
          which is optimal for Vite-based projects. Strict mode is enabled for maximum correctness.
        </p>
        <CodeBlock
          filename="tsconfig.json"
          language="json"
          code={`{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "Bundler",  // Required for Vite
    "jsx": "react-jsx",             // No need to import React manually
    "strict": true,                 // Recommended: catch more bugs
    "skipLibCheck": true,           // Speed up compilation
    "resolveJsonModule": true       // Allow importing .json files
  },
  "include": ["**/*.ts", "**/*.tsx"]
}`}
        />
      </section>

      {/* Environment variables */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Environment variables</h2>
        <p className="text-gray-600 mb-4">
          Create a <code className="font-mono text-indigo-600">.env.local</code> file in the project root
          (gitignored by default) for local secrets:
        </p>
        <CodeBlock
          filename=".env.local"
          language="bash"
          code={`# Netlify deploy credentials
NETLIFY_SITE_ID=your-site-id-here
NETLIFY_AUTH_TOKEN=your-auth-token-here

# Optional: analytics or other integrations
PUBLIC_ANALYTICS_ID=UA-XXXXXX-X`}
        />
        <p className="text-sm text-gray-500">
          Variables prefixed with <code className="font-mono text-indigo-600">PUBLIC_</code> or{' '}
          <code className="font-mono text-indigo-600">VITE_</code> are exposed to the client bundle.
          Never prefix secrets with these.
        </p>
      </section>
    </div>
  )
}
