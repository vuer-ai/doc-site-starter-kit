import React from 'react'
import { CodeBlock } from '../../../components/CodeBlock'

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">System</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Rendering Pipeline</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          How pages are rendered on the server and hydrated on the client. The pipeline flows
          through Vike's hook system.
        </p>
      </div>

      {/* Pipeline Steps */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Pipeline Steps</h2>
        <p className="text-gray-600 mb-4">
          Every page request passes through four steps:
        </p>
        <ol className="space-y-4 mb-6">
          {[
            { step: '1. onRenderHtml (server)', desc: 'React components are rendered to an HTML string using renderToString. The result is injected into a full HTML document shell.' },
            { step: '2. HTML sent to browser', desc: 'The complete HTML document, along with serialized page context, is sent to the client as the initial response.' },
            { step: '3. onRenderClient (browser)', desc: 'The client-side hook receives the deserialized page context and the DOM container element.' },
            { step: '4. hydrateRoot', desc: 'React attaches event listeners to the server-rendered HTML. Subsequent navigations use client-side rendering.' },
          ].map((item) => (
            <li key={item.step} className="flex gap-4">
              <span className="text-sm font-semibold text-indigo-600 whitespace-nowrap">{item.step}</span>
              <span className="text-sm text-gray-600">{item.desc}</span>
            </li>
          ))}
        </ol>
        <CodeBlock
          language="text"
          code={`Request
  │
  ▼
onRenderHtml (server)
  │  renderToString(<Layout><Page/></Layout>)
  │  escapeInject HTML shell
  ▼
HTML Response → Browser
  │
  ▼
onRenderClient (browser)
  │  isHydration ? hydrateRoot() : root.render()
  ▼
Interactive Page`}
        />
      </div>

      {/* onRenderHtml */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">onRenderHtml</h2>
        <p className="text-gray-600 mb-4">
          The server-side hook responsible for rendering the page to HTML. It receives the full page
          context and must return an HTML document.
        </p>
        <CodeBlock
          language="tsx"
          filename="renderer/+onRenderHtml.tsx"
          code={`import React from 'react'
import { renderToString } from 'react-dom/server'
import { escapeInject, dangerouslySkipEscape } from 'vike/server'
import { Layout } from './Layout'

export function onRenderHtml(pageContext) {
  const { Page, pageProps } = pageContext

  const pageHtml = renderToString(
    <Layout pageContext={pageContext}>
      <Page {...pageProps} />
    </Layout>
  )

  return escapeInject\`<!DOCTYPE html>
    <html lang="en" data-theme="light">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Doc Site</title>
      </head>
      <body>
        <div id="root">\${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>\`
}`}
        />
      </div>

      {/* onRenderClient */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">onRenderClient</h2>
        <p className="text-gray-600 mb-4">
          The client-side hook that hydrates or re-renders pages. On the first load it hydrates the
          server-rendered HTML; on subsequent client-side navigations it re-renders the page
          component in place.
        </p>
        <CodeBlock
          language="tsx"
          filename="renderer/+onRenderClient.tsx"
          code={`import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { Layout } from './Layout'

let root: ReturnType<typeof createRoot>

export function onRenderClient(pageContext) {
  const { Page, pageProps, isHydration } = pageContext
  const container = document.getElementById('root')!

  const page = (
    <Layout pageContext={pageContext}>
      <Page {...pageProps} />
    </Layout>
  )

  if (isHydration) {
    root = hydrateRoot(container, page)
  } else {
    if (!root) {
      root = createRoot(container)
    }
    root.render(page)
  }
}`}
        />
      </div>

      {/* passToClient */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">passToClient Configuration</h2>
        <p className="text-gray-600 mb-4">
          The <code className="font-mono text-indigo-600">passToClient</code> config determines
          which page context properties are serialized and sent to the browser. Only listed
          properties are available in <code className="font-mono text-indigo-600">onRenderClient</code>.
          Keep this list minimal to reduce payload size.
        </p>
        <CodeBlock
          language="ts"
          filename="renderer/+config.ts"
          code={`export default {
  passToClient: [
    'pageProps',
    'routeParams',
    'urlPathname',
    'urlParsed',
  ],
}`}
        />
        <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-800 mt-4">
          <strong>Note:</strong> Properties not listed in{' '}
          <code className="font-mono">passToClient</code> will be{' '}
          <code className="font-mono">undefined</code> on the client. Never include sensitive
          server-only data such as database connections or secret keys.
        </div>
      </div>
    </div>
  )
}
