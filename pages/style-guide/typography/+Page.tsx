import React from 'react'
import { CodeBlock } from '../../../components/CodeBlock'

const typeScale = [
  { label: 'h1', className: 'text-4xl font-bold', size: '2.25rem / 36px', weight: '700' },
  { label: 'h2', className: 'text-2xl font-bold', size: '1.5rem / 24px', weight: '700' },
  { label: 'h3', className: 'text-xl font-semibold', size: '1.25rem / 20px', weight: '600' },
  { label: 'h4', className: 'text-lg font-semibold', size: '1.125rem / 18px', weight: '600' },
  { label: 'Body', className: 'text-base font-normal', size: '1rem / 16px', weight: '400' },
  { label: 'Small', className: 'text-sm font-normal', size: '0.875rem / 14px', weight: '400' },
  { label: 'Caption', className: 'text-xs font-medium', size: '0.75rem / 12px', weight: '500' },
]

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Style Guide</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Typography</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Typography tokens control font families, sizes, weights, and line heights across the design
          system.
        </p>
      </div>

      {/* Font stack */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Font families</h2>
        <p className="text-gray-600 mb-6">
          The design system uses two font families: <strong>Inter</strong> for body text and UI, and{' '}
          <strong>Fira Mono</strong> for code.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="p-5 rounded-xl border border-gray-200">
            <p className="text-xs font-semibold uppercase text-gray-400 tracking-wide mb-3">Body / UI</p>
            <p className="text-2xl text-gray-900" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
              Inter
            </p>
            <p className="text-sm text-gray-500 mt-2" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
              The quick brown fox jumps over the lazy dog.
            </p>
            <p className="text-xs font-mono text-indigo-600 mt-3">font-sans</p>
          </div>
          <div className="p-5 rounded-xl border border-gray-200">
            <p className="text-xs font-semibold uppercase text-gray-400 tracking-wide mb-3">Code</p>
            <p className="text-2xl text-gray-900 font-mono">
              Fira Mono
            </p>
            <p className="text-sm text-gray-500 mt-2 font-mono">
              const x = 42;
            </p>
            <p className="text-xs font-mono text-indigo-600 mt-3">font-mono</p>
          </div>
        </div>
      </section>

      {/* Type scale */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Type scale</h2>
        <p className="text-gray-600 mb-6">
          A harmonious type scale provides clear hierarchy. Each level has a defined size and weight.
        </p>
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Level</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Preview</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Size</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Weight</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {typeScale.map((row) => (
                <tr key={row.label}>
                  <td className="px-5 py-3 font-mono text-indigo-600 text-xs">{row.label}</td>
                  <td className="px-5 py-4">
                    <span className={`${row.className} text-gray-900`}>
                      Sample text
                    </span>
                  </td>
                  <td className="px-5 py-3 font-mono text-xs text-gray-500">{row.size}</td>
                  <td className="px-5 py-3 font-mono text-xs text-gray-500">{row.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Typography tokens */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Defining typography tokens</h2>
        <p className="text-gray-600 mb-6">
          Override or extend typography tokens using the{' '}
          <code className="font-mono text-indigo-600">@theme</code> directive in your CSS file.
        </p>
        <CodeBlock
          filename="styles/global.css"
          language="css"
          code={`@import "tailwindcss";

@theme {
  /* Font families */
  --font-sans: 'Inter', 'system-ui', sans-serif;
  --font-mono: 'Fira Mono', 'Fira Code', monospace;

  /* Custom font sizes */
  --text-2xs: 0.625rem;   /* 10px */
  --text-display: 3rem;   /* 48px */

  /* Line heights */
  --leading-tight: 1.25;
  --leading-relaxed: 1.625;
  --leading-tighter: 1.15;

  /* Letter spacing */
  --tracking-wide: 0.025em;
  --tracking-tight: -0.025em;
}`}
        />
      </section>

      {/* Code font example */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Code typography</h2>
        <p className="text-gray-600 mb-6">
          Inline code and code blocks use the mono font family. Inline code is styled with a subtle
          background and smaller size for visual distinction.
        </p>
        <div className="p-5 rounded-xl border border-gray-200 mb-4">
          <p className="text-gray-700 leading-relaxed">
            Use <code className="font-mono text-sm text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">font-mono</code> for
            inline code. For code blocks, the <code className="font-mono text-sm text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">CodeBlock</code> component
            applies syntax highlighting with Highlight.js.
          </p>
        </div>
        <CodeBlock
          filename="example.tsx"
          language="tsx"
          code={`{/* Inline code */}
<code className="font-mono text-sm text-indigo-600">
  npm install
</code>

{/* Code block */}
<CodeBlock
  filename="app.tsx"
  language="tsx"
  code={\`const greeting = 'Hello, world!'\`}
/>`}
        />
      </section>
    </div>
  )
}
