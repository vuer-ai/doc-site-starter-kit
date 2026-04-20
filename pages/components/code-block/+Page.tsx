import React from 'react'
import { CodeBlock } from '../../../components/CodeBlock'

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Components</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">CodeBlock</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Syntax-highlighted code blocks with optional filename labels. Powered by highlight.js.
        </p>
      </div>

      {/* Live example */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Example</h2>
        <p className="text-gray-500 mb-6">
          A CodeBlock with a filename label and TypeScript syntax highlighting.
        </p>
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Preview</span>
          </div>
          <div className="p-6 bg-white">
            <CodeBlock
              filename="example.ts"
              language="ts"
              code={`interface User {
  id: string
  name: string
  email: string
}

function greet(user: User): string {
  return \`Hello, \${user.name}!\`
}`}
            />
          </div>
        </div>
      </div>

      {/* Usage */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Usage</h2>
        <CodeBlock
          language="tsx"
          code={`import { CodeBlock } from '../../components/CodeBlock'

{/* Basic usage */}
<CodeBlock
  language="ts"
  code="const x = 42"
/>

{/* With filename label */}
<CodeBlock
  filename="vite.config.ts"
  language="ts"
  code={\`import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [],
})\`}
/>`}
        />
      </div>

      {/* Props table */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Props</h2>
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Prop</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Type</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Required</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-5 py-3 font-mono text-xs text-indigo-600">code</td>
                <td className="px-5 py-3 font-mono text-xs text-gray-500">string</td>
                <td className="px-5 py-3 text-xs text-center">&#10003;</td>
                <td className="px-5 py-3 text-sm text-gray-600">The source code string to display.</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-mono text-xs text-indigo-600">language</td>
                <td className="px-5 py-3 font-mono text-xs text-gray-500">string</td>
                <td className="px-5 py-3 text-xs text-center">—</td>
                <td className="px-5 py-3 text-sm text-gray-600">Language for syntax highlighting (e.g. 'ts', 'tsx', 'css').</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-mono text-xs text-indigo-600">filename</td>
                <td className="px-5 py-3 font-mono text-xs text-gray-500">string</td>
                <td className="px-5 py-3 text-xs text-center">—</td>
                <td className="px-5 py-3 text-sm text-gray-600">Optional filename shown in the header bar.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
