import React from 'react'
import { CodeBlock } from '../../../components/CodeBlock'

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Hooks</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">usePageContext</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          React hook that returns the current Vike page context. Available in any component
          rendered within the Vike rendering pipeline.
        </p>
      </div>

      {/* Signature */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Signature</h2>
        <CodeBlock language="ts" code="function usePageContext(): PageContext" />
      </div>

      {/* Parameters */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Parameters</h2>
        <p className="text-sm text-gray-500">This hook takes no parameters.</p>
      </div>

      {/* Returns */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Returns</h2>
        <p className="text-gray-600 mb-4">
          A <code className="font-mono text-indigo-600">PageContext</code> object with the following properties:
        </p>
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Property</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Type</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { prop: 'Page', type: 'React.ComponentType', desc: 'The page component for the current route.' },
                { prop: 'pageProps', type: 'Record<string, unknown>', desc: 'Props returned by onBeforeRender, passed to the Page component.' },
                { prop: 'urlPathname', type: 'string', desc: 'The current URL pathname, e.g. "/getting-started".' },
                { prop: 'urlParsed', type: 'UrlParsed', desc: 'Parsed URL object with pathname, search, hash, and searchParams.' },
                { prop: 'routeParams', type: 'Record<string, string>', desc: 'Dynamic route parameters extracted from parameterised routes.' },
                { prop: 'isHydration', type: 'boolean', desc: 'True on the first client-side render (hydration), false on subsequent navigations.' },
              ].map((row) => (
                <tr key={row.prop}>
                  <td className="px-5 py-3 font-mono text-xs text-indigo-600 whitespace-nowrap">{row.prop}</td>
                  <td className="px-5 py-3 font-mono text-xs text-gray-500 whitespace-nowrap">{row.type}</td>
                  <td className="px-5 py-3 text-sm text-gray-600">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Usage */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Usage</h2>
        <CodeBlock
          language="tsx"
          code={`import { usePageContext } from 'vike-react/usePageContext'

export function ActiveLink({ href, label }) {
  const { urlPathname } = usePageContext()
  const isActive = urlPathname === href
  return (
    <a href={href} className={isActive ? 'font-bold text-indigo-600' : 'text-gray-600'}>
      {label}
    </a>
  )
}`}
        />
      </div>

      {/* Warning callout */}
      <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-800">
        <strong>Warning:</strong> <code className="font-mono">usePageContext</code> requires the{' '}
        <code className="font-mono">vike-react</code> package and only works inside the Vike render tree.
        Calling it outside a Vike-rendered component will throw an error.
      </div>
    </div>
  )
}
