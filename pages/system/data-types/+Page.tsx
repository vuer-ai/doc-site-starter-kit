import React from 'react'
import { CodeBlock } from '../../../components/CodeBlock'

const pageContextProps = [
  { prop: 'Page', type: 'React.ComponentType', available: 'Both', desc: 'The page component resolved for the current route.' },
  { prop: 'pageProps', type: 'Record<string, unknown>', available: 'Both', desc: 'Props returned by data hooks, passed to the Page component.' },
  { prop: 'urlPathname', type: 'string', available: 'Both', desc: 'The current URL pathname, e.g. "/system/data-types".' },
  { prop: 'urlParsed', type: 'UrlParsed', available: 'Both', desc: 'Parsed URL object with pathname, search, hash, and searchParams.' },
  { prop: 'routeParams', type: 'Record<string, string>', available: 'Both', desc: 'Dynamic route parameters extracted from parameterised routes.' },
  { prop: 'exports', type: 'Record<string, unknown>', available: 'Both', desc: 'All named exports from the page\'s + files (e.g. +data.ts, +config.ts).' },
  { prop: 'headers', type: 'Record<string, string>', available: 'Server', desc: 'HTTP request headers. Only available during server-side rendering.' },
  { prop: 'isHydration', type: 'boolean', available: 'Client', desc: 'True on the first client-side render (hydration), false on subsequent navigations.' },
]

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">System</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Data Types</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Type definitions used throughout the system layer.
        </p>
      </div>

      {/* PageContext */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">PageContext</h2>
        <p className="text-gray-600 mb-4">
          The primary data structure that flows through the rendering pipeline. It carries all
          information needed to render and hydrate a page.
        </p>
        <CodeBlock
          language="ts"
          code={`interface PageContext {
  Page: React.ComponentType
  pageProps: Record<string, unknown>
  urlPathname: string
  urlParsed: UrlParsed
  routeParams: Record<string, string>
  exports: Record<string, unknown>
  headers: Record<string, string>
  isHydration: boolean
}`}
        />
      </div>

      {/* UrlParsed */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">UrlParsed</h2>
        <p className="text-gray-600 mb-4">
          A parsed representation of the current URL, available on the page context.
        </p>
        <CodeBlock
          language="ts"
          code={`interface UrlParsed {
  pathname: string       // e.g. "/system/data-types"
  search: string         // e.g. "?q=hello"
  hash: string           // e.g. "#section"
  searchParams: Record<string, string>
}`}
        />
      </div>

      {/* Theme */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Theme</h2>
        <p className="text-gray-600 mb-4">
          Union type representing the three supported color themes.
        </p>
        <CodeBlock
          language="ts"
          code={`type Theme = 'light' | 'dark' | 'system'`}
        />
      </div>

      {/* PageMeta */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">PageMeta</h2>
        <p className="text-gray-600 mb-4">
          Metadata attached to each page, used for navigation and sidebar generation.
        </p>
        <CodeBlock
          language="ts"
          code={`interface PageMeta {
  path: string      // e.g. "/system/rendering"
  title: string     // e.g. "Rendering Pipeline"
  section: string   // e.g. "System"
}`}
        />
      </div>

      {/* Properties Table */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">PageContext Properties</h2>
        <p className="text-gray-600 mb-4">
          Complete reference for the <code className="font-mono text-indigo-600">PageContext</code> interface:
        </p>
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Property</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Type</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Available</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pageContextProps.map((row) => (
                <tr key={row.prop}>
                  <td className="px-5 py-3 font-mono text-xs text-indigo-600 whitespace-nowrap">{row.prop}</td>
                  <td className="px-5 py-3 font-mono text-xs text-gray-500 whitespace-nowrap">{row.type}</td>
                  <td className="px-5 py-3 text-xs text-gray-500 whitespace-nowrap">{row.available}</td>
                  <td className="px-5 py-3 text-sm text-gray-600">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
