import React, { useEffect, useState } from 'react'
import { CodeBlock } from '../../../components/CodeBlock'

function ClientOnlyDemo() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <span className="text-gray-400 text-sm">Loading...</span>
  }

  return (
    <span className="text-sm font-medium text-green-700 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">
      Loaded on client
    </span>
  )
}

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Components</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">ClientOnly</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Render children only after hydration to avoid SSR mismatches for browser-only content.
        </p>
      </div>

      {/* Live example */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Example</h2>
        <p className="text-gray-500 mb-6">
          The content below renders a fallback during SSR and swaps in the real content after
          the component mounts on the client.
        </p>
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Preview</span>
          </div>
          <div className="p-6 bg-white">
            <ClientOnlyDemo />
          </div>
        </div>
      </div>

      {/* Usage */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Usage</h2>
        <CodeBlock
          language="tsx"
          code={`import { ClientOnly } from '../../components/ClientOnly'

<ClientOnly fallback={<span>Loading...</span>}>
  <BrowserOnlyWidget />
</ClientOnly>

{/* Without a fallback — renders nothing during SSR */}
<ClientOnly>
  <canvas id="chart" />
</ClientOnly>`}
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
                <td className="px-5 py-3 font-mono text-xs text-indigo-600">children</td>
                <td className="px-5 py-3 font-mono text-xs text-gray-500">React.ReactNode</td>
                <td className="px-5 py-3 text-xs text-center">&#10003;</td>
                <td className="px-5 py-3 text-sm text-gray-600">Content rendered only after the component mounts on the client.</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-mono text-xs text-indigo-600">fallback</td>
                <td className="px-5 py-3 font-mono text-xs text-gray-500">React.ReactNode</td>
                <td className="px-5 py-3 text-xs text-center">—</td>
                <td className="px-5 py-3 text-sm text-gray-600">Content shown on the server and during hydration. Defaults to null.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Warning callout */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">When to Use</h2>
        <div className="p-4 rounded-lg border bg-amber-50 border-amber-200 text-amber-900 text-sm">
          <strong>Warning:</strong> Only use ClientOnly when your content genuinely depends on
          browser APIs (e.g. <code className="font-mono text-xs">window</code>,{' '}
          <code className="font-mono text-xs">localStorage</code>,{' '}
          <code className="font-mono text-xs">navigator</code>). Wrapping everything in
          ClientOnly defeats the purpose of server-side rendering and hurts initial page load
          performance.
        </div>
      </div>

      <div className="flex items-center justify-between pt-8 border-t border-gray-200">
        <a href="/components/steps" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
          ← Steps
        </a>
        <a href="/theming" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
          Theming →
        </a>
      </div>
    </div>
  )
}
