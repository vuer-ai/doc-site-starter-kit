import React from 'react'
import { CodeBlock } from '../../components/CodeBlock'

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Introduction</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Installation</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Install the doc-site-starter-kit from scratch or bootstrap it into an existing project.
          Choose your preferred package manager below.
        </p>
      </div>

      {/* Requirements */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">System requirements</h2>
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Tool</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Minimum version</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Recommended</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-5 py-3 font-mono text-indigo-600">Node.js</td>
                <td className="px-5 py-3 text-gray-600">18.0.0</td>
                <td className="px-5 py-3 text-gray-600">20 LTS or 22</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-mono text-indigo-600">pnpm</td>
                <td className="px-5 py-3 text-gray-600">8.0.0</td>
                <td className="px-5 py-3 text-gray-600">9.x</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-mono text-indigo-600">npm</td>
                <td className="px-5 py-3 text-gray-600">9.0.0</td>
                <td className="px-5 py-3 text-gray-600">10.x (alternative)</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-mono text-indigo-600">yarn</td>
                <td className="px-5 py-3 text-gray-600">1.22</td>
                <td className="px-5 py-3 text-gray-600">4.x (alternative)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Package manager tabs */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Install with your package manager</h2>
        <p className="text-gray-600 mb-6">
          All three major Node.js package managers are supported. We recommend <strong>pnpm</strong> for
          its superior speed and disk efficiency, especially in monorepo setups.
        </p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 text-xs font-bold">RECOMMENDED</span>
            pnpm
          </h3>
          <CodeBlock language="bash" code="pnpm install" />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">npm</h3>
          <CodeBlock language="bash" code="npm install" />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">yarn</h3>
          <CodeBlock language="bash" code="yarn install" />
        </div>
      </section>

      {/* Manual dependency install */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Adding to an existing project</h2>
        <p className="text-gray-600 mb-6">
          If you want to integrate the stack into an existing Vite project rather than cloning
          the starter kit, install the dependencies individually:
        </p>

        <h3 className="font-semibold text-gray-900 mb-3">Runtime dependencies</h3>
        <CodeBlock
          language="bash"
          code="pnpm add react react-dom vike vike-react"
        />

        <h3 className="font-semibold text-gray-900 mb-3">Dev dependencies</h3>
        <CodeBlock
          language="bash"
          code="pnpm add -D @types/react @types/react-dom @vitejs/plugin-react typescript vite @tailwindcss/vite tailwindcss"
        />
      </section>

      {/* Verify install */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Verify the installation</h2>
        <p className="text-gray-600 mb-4">
          After installing, run the development server to confirm everything is working:
        </p>
        <CodeBlock language="bash" code="pnpm dev" />
        <p className="text-gray-600">
          You should see output similar to:
        </p>
        <CodeBlock
          language="text"
          code={`  VITE v6.x.x  ready in 312 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help`}
        />
      </section>

      {/* Troubleshooting */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Troubleshooting</h2>
        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-gray-200">
            <p className="font-semibold text-gray-900 mb-1">"Cannot find module 'vike/plugin'"</p>
            <p className="text-sm text-gray-600 mb-2">
              This usually means the vike package is not installed or your node_modules is corrupted.
            </p>
            <CodeBlock language="bash" code="rm -rf node_modules pnpm-lock.yaml && pnpm install" />
          </div>
          <div className="p-4 rounded-lg border border-gray-200">
            <p className="font-semibold text-gray-900 mb-1">Tailwind styles not applying</p>
            <p className="text-sm text-gray-600 mb-2">
              Ensure the <code className="font-mono text-indigo-600">@tailwindcss/vite</code> plugin is
              listed before <code className="font-mono text-indigo-600">@vitejs/plugin-react</code> in
              your <code className="font-mono text-indigo-600">vite.config.ts</code> plugins array.
              Also confirm your CSS entry file starts with <code className="font-mono text-indigo-600">@import "tailwindcss"</code>.
            </p>
          </div>
          <div className="p-4 rounded-lg border border-gray-200">
            <p className="font-semibold text-gray-900 mb-1">TypeScript errors on React 19 types</p>
            <p className="text-sm text-gray-600">
              Make sure <code className="font-mono text-indigo-600">@types/react</code> and{' '}
              <code className="font-mono text-indigo-600">@types/react-dom</code> are both on version{' '}
              <code className="font-mono text-indigo-600">^19.0.0</code>. Run{' '}
              <code className="font-mono text-indigo-600">pnpm update @types/react @types/react-dom</code> to
              upgrade.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
