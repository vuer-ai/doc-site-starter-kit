import React from 'react'

function Badge({ label, color }: { label: string; color: string }) {
  const colors: Record<string, string> = {
    blue:   'bg-blue-100 text-blue-700',
    green:  'bg-green-100 text-green-700',
    purple: 'bg-purple-100 text-purple-700',
    amber:  'bg-amber-100 text-amber-700',
    gray:   'bg-gray-100 text-gray-600',
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold font-mono ${colors[color] ?? colors.gray}`}>
      {label}
    </span>
  )
}

function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
  return (
    <section className="mb-14" id={id}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">{title}</h2>
      {children}
    </section>
  )
}

function FunctionCard({
  name,
  signature,
  description,
  params,
  returns,
  example,
}: {
  name: string
  signature: string
  description: string
  params: { name: string; type: string; description: string }[]
  returns: string
  example: string
}) {
  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden mb-6">
      <div className="px-5 py-4 bg-gray-50 border-b border-gray-200 flex items-start justify-between gap-4">
        <div>
          <code className="text-sm font-semibold text-gray-900 font-mono">{name}</code>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
      </div>
      <div className="px-5 py-4">
        <div className="mb-4 rounded-lg bg-gray-900 p-3 overflow-x-auto">
          <code className="text-xs font-mono text-gray-100">{signature}</code>
        </div>
        {params.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Parameters</p>
            <div className="space-y-2">
              {params.map((p) => (
                <div key={p.name} className="flex gap-3 text-sm">
                  <code className="font-mono text-indigo-600 shrink-0">{p.name}</code>
                  <code className="font-mono text-gray-400 text-xs shrink-0 mt-0.5">{p.type}</code>
                  <span className="text-gray-600">{p.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Returns</p>
          <code className="text-xs font-mono text-gray-600">{returns}</code>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Example</p>
          <div className="rounded-lg bg-gray-900 p-3 overflow-x-auto">
            <pre className="text-xs font-mono text-gray-100"><code>{example}</code></pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Reference</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">API Reference</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Complete reference for the renderer hooks, Vike page context, and utility functions
          available in the starter kit.
        </p>
      </div>

      {/* TOC */}
      <div className="mb-12 p-5 rounded-xl bg-gray-50 border border-gray-200">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">On this page</p>
        <ul className="space-y-1.5 text-sm">
          {[
            { label: 'Renderer hooks', id: 'renderer-hooks' },
            { label: 'Page context', id: 'page-context' },
            { label: 'Vike config', id: 'vike-config' },
            { label: 'usePageContext', id: 'use-page-context' },
          ].map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="text-indigo-600 hover:text-indigo-700 hover:underline">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Renderer hooks */}
      <Section title="Renderer hooks" id="renderer-hooks">
        <p className="text-gray-600 mb-6">
          Vike uses special <code className="font-mono text-indigo-600">+</code>-prefixed files to wire up
          the rendering pipeline. The starter kit provides two renderer hooks out of the box.
        </p>

        <FunctionCard
          name="onRenderHtml"
          signature="async function onRenderHtml(pageContext: PageContext): Promise<{ documentHtml: string; pageContext: Record<string, unknown> }>"
          description="Server-side hook called during SSR and prerendering. Renders the page to an HTML string and returns the full document."
          params={[
            { name: 'pageContext', type: 'PageContext', description: 'The Vike page context object containing Page, pageProps, urlPathname, and other metadata.' },
          ]}
          returns="Promise<{ documentHtml: string; pageContext: {} }>"
          example={`// renderer/+onRenderHtml.tsx
import ReactDOMServer from 'react-dom/server'
import { Layout } from './Layout'

export async function onRenderHtml(pageContext: any) {
  const { Page, pageProps } = pageContext
  const html = ReactDOMServer.renderToString(
    <Layout><Page {...pageProps} /></Layout>
  )
  return {
    documentHtml: \`<!DOCTYPE html><html>...\${html}...</html>\`,
    pageContext: {}
  }
}`}
        />

        <FunctionCard
          name="onRenderClient"
          signature="async function onRenderClient(pageContext: PageContext): Promise<void>"
          description="Client-side hook called in the browser to hydrate the server-rendered HTML. Uses React 19's hydrateRoot for seamless hydration."
          params={[
            { name: 'pageContext', type: 'PageContext', description: 'Same page context as onRenderHtml, hydrated from the server-rendered page.' },
          ]}
          returns="Promise<void>"
          example={`// renderer/+onRenderClient.tsx
import ReactDOM from 'react-dom/client'
import { Layout } from './Layout'

export async function onRenderClient(pageContext: any) {
  const { Page, pageProps } = pageContext
  const root = document.getElementById('root')!
  ReactDOM.hydrateRoot(
    root,
    <Layout><Page {...pageProps} /></Layout>
  )
}`}
        />
      </Section>

      {/* Page context */}
      <Section title="Page context" id="page-context">
        <p className="text-gray-600 mb-6">
          The <code className="font-mono text-indigo-600">pageContext</code> object is the central data structure
          in Vike. It's available in both server and client hooks, and can be accessed in any component
          via <code className="font-mono text-indigo-600">usePageContext()</code>.
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
              {[
                { prop: 'Page', type: 'React.ComponentType', avail: 'server + client', desc: 'The page component for the current route.' },
                { prop: 'pageProps', type: 'Record<string, unknown>', avail: 'server + client', desc: 'Props returned by onBeforeRender, passed to the Page component.' },
                { prop: 'urlPathname', type: 'string', avail: 'server + client', desc: 'The current URL path, e.g. "/getting-started".' },
                { prop: 'urlParsed', type: 'UrlParsed', avail: 'server + client', desc: 'Parsed URL object with pathname, search, hash, and searchParams.' },
                { prop: 'routeParams', type: 'Record<string, string>', avail: 'server + client', desc: 'Dynamic route parameters extracted from parameterised routes.' },
                { prop: 'exports', type: 'Record<string, unknown>', avail: 'server + client', desc: 'Exports from the page\'s +data.ts or +Page.tsx file.' },
                { prop: 'headers', type: 'Record<string, string>', avail: 'server only', desc: 'HTTP request headers. Only available in server-side hooks.' },
                { prop: 'isHydration', type: 'boolean', avail: 'client only', desc: 'True on the first client-side render (hydration), false on subsequent navigations.' },
              ].map((row) => (
                <tr key={row.prop}>
                  <td className="px-5 py-3 font-mono text-xs text-indigo-600 whitespace-nowrap">{row.prop}</td>
                  <td className="px-5 py-3 font-mono text-xs text-gray-500 whitespace-nowrap">{row.type}</td>
                  <td className="px-5 py-3">
                    <Badge
                      label={row.avail}
                      color={row.avail === 'server only' ? 'amber' : row.avail === 'client only' ? 'blue' : 'green'}
                    />
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-600">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Vike config */}
      <Section title="Vike plugin config" id="vike-config">
        <p className="text-gray-600 mb-6">
          Options passed to the <code className="font-mono text-indigo-600">vike()</code> plugin in{' '}
          <code className="font-mono text-indigo-600">vite.config.ts</code>.
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
              {[
                { opt: 'prerender', type: 'boolean | PreRenderOptions', def: 'false', desc: 'Enable static site generation. Set to true to prerender all pages at build time.' },
                { opt: 'prerender.partial', type: 'boolean', def: 'false', desc: 'Allow pages without onBeforeRender to be prerendered, even if other pages require it.' },
                { opt: 'prerender.noExtraDir', type: 'boolean', def: 'false', desc: 'Do not create an extra /foo/index.html directory — output /foo.html instead.' },
                { opt: 'prerender.parallel', type: 'number | boolean', def: 'true', desc: 'Number of pages to prerender in parallel. true uses CPU count - 1.' },
                { opt: 'prerender.disableAutoRun', type: 'boolean', def: 'false', desc: 'Disable automatic prerender run at the end of vite build. Run manually instead.' },
              ].map((row) => (
                <tr key={row.opt}>
                  <td className="px-5 py-3 font-mono text-xs text-indigo-600 whitespace-nowrap">{row.opt}</td>
                  <td className="px-5 py-3 font-mono text-xs text-gray-500">{row.type}</td>
                  <td className="px-5 py-3 font-mono text-xs text-gray-400">{row.def}</td>
                  <td className="px-5 py-3 text-sm text-gray-600">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* usePageContext */}
      <Section title="usePageContext" id="use-page-context">
        <FunctionCard
          name="usePageContext"
          signature="function usePageContext(): PageContext"
          description="React hook that returns the current Vike page context from vike-react. Available in any component rendered within the Vike rendering pipeline."
          params={[]}
          returns="PageContext — the full page context object for the current render"
          example={`import { usePageContext } from 'vike-react/usePageContext'

export function ActiveLink({ href, label }: { href: string; label: string }) {
  const pageContext = usePageContext()
  const isActive = pageContext.urlPathname === href

  return (
    <a
      href={href}
      className={isActive ? 'text-indigo-700 font-semibold' : 'text-gray-600'}
    >
      {label}
    </a>
  )
}`}
        />
        <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-800">
          <strong>Important:</strong> <code className="font-mono">usePageContext()</code> requires the{' '}
          <code className="font-mono">vike-react</code> package and works only inside components that are
          rendered by Vike's rendering pipeline. It will throw if called outside a Vike render tree.
        </div>
      </Section>

      <div className="flex items-center justify-between pt-8 border-t border-gray-200">
        <a href="/theming" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
          ← Theming
        </a>
        <a href="/" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
          Back to Overview →
        </a>
      </div>
    </div>
  )
}
