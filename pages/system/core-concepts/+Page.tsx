import React from 'react'
import { CodeBlock } from '../../../components/CodeBlock'

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">System</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Core Concepts</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Foundational concepts that underpin the system architecture.
        </p>
      </div>

      {/* Page Context */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Context</h2>
        <p className="text-gray-600 mb-4">
          The central data structure passed through the render pipeline. The page context object is
          available server-side during <code className="font-mono text-indigo-600">onRenderHtml</code> and
          client-side during <code className="font-mono text-indigo-600">onRenderClient</code>. It
          carries everything needed to render a page: the component, its props, the URL, route
          parameters, and any custom data you attach.
        </p>
        <CodeBlock
          language="tsx"
          code={`// Accessing page context inside a component
import { usePageContext } from 'vike-react/usePageContext'

export function Breadcrumb() {
  const { urlPathname } = usePageContext()
  const segments = urlPathname.split('/').filter(Boolean)
  return (
    <nav className="text-sm text-gray-500">
      {segments.map((s, i) => (
        <span key={i}>{i > 0 && ' / '}{s}</span>
      ))}
    </nav>
  )
}`}
        />
      </div>

      {/* Renderer Hooks */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Renderer Hooks</h2>
        <p className="text-gray-600 mb-4">
          Server and client hooks that control the rendering lifecycle. Vike exposes two primary
          hooks: <code className="font-mono text-indigo-600">onRenderHtml</code> runs on the server
          to produce the initial HTML, and{' '}
          <code className="font-mono text-indigo-600">onRenderClient</code> runs in the browser to
          hydrate or re-render pages during client-side navigation.
        </p>
        <CodeBlock
          language="tsx"
          filename="renderer/+onRenderHtml.tsx"
          code={`import { renderToString } from 'react-dom/server'
import { escapeInject, dangerouslySkipEscape } from 'vike/server'

export function onRenderHtml(pageContext) {
  const { Page, pageProps } = pageContext
  const html = renderToString(<Page {...pageProps} />)
  return escapeInject\`<!DOCTYPE html>
    <html>
      <body>
        <div id="root">\${dangerouslySkipEscape(html)}</div>
      </body>
    </html>\`
}`}
        />
      </div>

      {/* File-based Routing */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">File-based Routing</h2>
        <p className="text-gray-600 mb-4">
          Vike uses a convention where{' '}
          <code className="font-mono text-indigo-600">pages/&lt;name&gt;/+Page.tsx</code> maps to{' '}
          <code className="font-mono text-indigo-600">/&lt;name&gt;</code>. Nested directories
          create nested routes. No router configuration is needed — the file system is the router.
        </p>
        <CodeBlock
          language="text"
          code={`pages/
├── index/+Page.tsx          →  /
├── getting-started/+Page.tsx →  /getting-started
├── system/+Page.tsx          →  /system
├── system/rendering/+Page.tsx → /system/rendering
└── hooks/use-theme/+Page.tsx →  /hooks/use-theme`}
        />
      </div>

      {/* Hydration */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Hydration</h2>
        <p className="text-gray-600 mb-4">
          Server-rendered HTML becomes interactive on the client via React's{' '}
          <code className="font-mono text-indigo-600">hydrateRoot</code>. During hydration, React
          attaches event listeners to the existing DOM instead of recreating it. Subsequent
          navigations use client-side rendering via{' '}
          <code className="font-mono text-indigo-600">createRoot</code>.
        </p>
        <CodeBlock
          language="tsx"
          filename="renderer/+onRenderClient.tsx"
          code={`import { hydrateRoot, createRoot } from 'react-dom/client'

let root: ReturnType<typeof createRoot>

export function onRenderClient(pageContext) {
  const { Page, pageProps, isHydration } = pageContext
  const container = document.getElementById('root')!

  if (isHydration) {
    // First load — attach to server-rendered HTML
    root = hydrateRoot(container, <Page {...pageProps} />)
  } else {
    // Client-side navigation — re-render in place
    root.render(<Page {...pageProps} />)
  }
}`}
        />
      </div>
    </div>
  )
}
