import React from 'react'
import { CodeBlock } from '../../../components/CodeBlock'

const vikeConfigOptions = [
  { option: 'prerender', type: 'boolean', default: 'false', desc: 'Enable static pre-rendering for the entire site.' },
  { option: 'prerender.partial', type: 'boolean', default: 'false', desc: 'Allow only some pages to be pre-rendered while others remain server-rendered.' },
  { option: 'prerender.noExtraDir', type: 'boolean', default: 'false', desc: 'Generate /about.html instead of /about/index.html for cleaner file output.' },
  { option: 'prerender.parallel', type: 'number | boolean', default: 'true', desc: 'Number of pages to pre-render concurrently. true = os.cpus().length.' },
  { option: 'passToClient', type: 'string[]', default: '[]', desc: 'Page context properties serialized and sent to the browser.' },
  { option: 'meta', type: 'object', default: '{}', desc: 'Custom meta configuration for extending Vike with additional page-level exports.' },
]

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">System</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">API Reference</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Complete reference for system-level APIs, configuration options, and utility functions.
        </p>
      </div>

      {/* Vike Plugin Config */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Vike Configuration Options</h2>
        <p className="text-gray-600 mb-4">
          Configuration is defined in{' '}
          <code className="font-mono text-indigo-600">+config.ts</code> files. These options control
          rendering behavior, pre-rendering, and data flow.
        </p>
        <div className="rounded-xl border border-gray-200 overflow-hidden">
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
              {vikeConfigOptions.map((row) => (
                <tr key={row.option}>
                  <td className="px-5 py-3 font-mono text-xs text-indigo-600 whitespace-nowrap">{row.option}</td>
                  <td className="px-5 py-3 font-mono text-xs text-gray-500 whitespace-nowrap">{row.type}</td>
                  <td className="px-5 py-3 font-mono text-xs text-gray-500 whitespace-nowrap">{row.default}</td>
                  <td className="px-5 py-3 text-sm text-gray-600">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* passToClient */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">passToClient</h2>
        <p className="text-gray-600 mb-4">
          Defines which <code className="font-mono text-indigo-600">pageContext</code> properties
          are serialized and sent to the client. Properties not listed here will be{' '}
          <code className="font-mono text-indigo-600">undefined</code> in{' '}
          <code className="font-mono text-indigo-600">onRenderClient</code>.
        </p>
        <CodeBlock
          language="ts"
          filename="renderer/+config.ts"
          code={`export default {
  // Only these properties will be available client-side
  passToClient: [
    'pageProps',
    'routeParams',
    'urlPathname',
    'urlParsed',
  ],
}`}
        />
        <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-800 mt-4">
          <strong>Security:</strong> Never include sensitive data (API keys, database URIs, session
          secrets) in <code className="font-mono">passToClient</code>. All listed properties are
          serialized into the HTML payload and visible to end users.
        </div>
      </div>

      {/* getAdjacentPages */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">getAdjacentPages</h2>
        <p className="text-gray-600 mb-4">
          Utility function that returns the previous and next pages relative to the current path.
          Used to render "Previous / Next" navigation links at the bottom of each page.
        </p>
        <CodeBlock
          language="ts"
          code={`function getAdjacentPages(
  currentPath: string,
  pages: PageMeta[]
): { prev: PageMeta | null; next: PageMeta | null }`}
        />
        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Parameters</h3>
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Parameter</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Type</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-5 py-3 font-mono text-xs text-indigo-600">currentPath</td>
                <td className="px-5 py-3 font-mono text-xs text-gray-500">string</td>
                <td className="px-5 py-3 text-sm text-gray-600">The URL pathname of the current page.</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-mono text-xs text-indigo-600">pages</td>
                <td className="px-5 py-3 font-mono text-xs text-gray-500">PageMeta[]</td>
                <td className="px-5 py-3 text-sm text-gray-600">Ordered array of all page metadata entries.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Example</h3>
        <CodeBlock
          language="tsx"
          code={`import { getAdjacentPages } from '../utils/navigation'
import { usePageContext } from 'vike-react/usePageContext'
import { pages } from '../data/pages'

export function PageNavigation() {
  const { urlPathname } = usePageContext()
  const { prev, next } = getAdjacentPages(urlPathname, pages)

  return (
    <div className="flex justify-between pt-8 mt-10 border-t border-gray-200">
      {prev && (
        <a href={prev.path} className="text-sm font-medium text-indigo-600">
          &larr; {prev.title}
        </a>
      )}
      {next && (
        <a href={next.path} className="text-sm font-medium text-indigo-600 ml-auto">
          {next.title} &rarr;
        </a>
      )}
    </div>
  )
}`}
        />
      </div>

      {/* Pages Array */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Navigation Pages Array</h2>
        <p className="text-gray-600 mb-4">
          The ordered array of page metadata that drives sidebar navigation, breadcrumbs, and
          previous/next links. Each entry has a path, title, and section.
        </p>
        <CodeBlock
          language="ts"
          filename="data/pages.ts"
          code={`import { PageMeta } from '../types'

export const pages: PageMeta[] = [
  { path: '/', title: 'Introduction', section: 'Getting Started' },
  { path: '/installation', title: 'Installation', section: 'Getting Started' },
  { path: '/getting-started', title: 'Quick Start', section: 'Getting Started' },
  { path: '/configuration', title: 'Configuration', section: 'Getting Started' },
  { path: '/system', title: 'System', section: 'System' },
  { path: '/system/core-concepts', title: 'Core Concepts', section: 'System' },
  { path: '/system/data-types', title: 'Data Types', section: 'System' },
  { path: '/system/rendering', title: 'Rendering Pipeline', section: 'System' },
  { path: '/system/interaction', title: 'Interaction Model', section: 'System' },
  { path: '/system/api-reference', title: 'API Reference', section: 'System' },
  { path: '/hooks', title: 'Hooks', section: 'Hooks' },
  { path: '/hooks/use-page-context', title: 'usePageContext', section: 'Hooks' },
  { path: '/hooks/use-theme', title: 'useTheme', section: 'Hooks' },
  // ...additional pages
]`}
        />
      </div>
    </div>
  )
}
