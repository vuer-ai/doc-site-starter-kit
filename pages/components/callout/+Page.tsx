import React from 'react'
import { CodeBlock } from '../../../components/CodeBlock'

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Components</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Callout</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Highlight important information, warnings, or tips.
        </p>
      </div>

      {/* Live previews */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Variants</h2>
        <p className="text-gray-500 mb-6">
          Three built-in variants cover the most common documentation callout needs.
        </p>
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Preview</span>
          </div>
          <div className="p-6 bg-white space-y-3">
            <div className="p-4 rounded-lg border bg-blue-50 border-blue-200 text-blue-900 text-sm">
              <strong>Info:</strong> This is an informational callout. Use it for helpful context.
            </div>
            <div className="p-4 rounded-lg border bg-amber-50 border-amber-200 text-amber-900 text-sm">
              <strong>Warning:</strong> Pay attention to this before proceeding.
            </div>
            <div className="p-4 rounded-lg border bg-red-50 border-red-200 text-red-900 text-sm">
              <strong>Danger:</strong> This action is destructive and cannot be undone.
            </div>
          </div>
        </div>
      </div>

      {/* Usage */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Usage</h2>
        <CodeBlock
          language="tsx"
          code={`import { Callout } from '../../components/Callout'

<Callout type="info">
  This is an informational callout.
</Callout>

<Callout type="warning">
  Pay attention to this before proceeding.
</Callout>

<Callout type="danger">
  This action is destructive and cannot be undone.
</Callout>`}
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
                <td className="px-5 py-3 font-mono text-xs text-indigo-600">type</td>
                <td className="px-5 py-3 font-mono text-xs text-gray-500">'info' | 'warning' | 'danger'</td>
                <td className="px-5 py-3 text-xs text-center">—</td>
                <td className="px-5 py-3 text-sm text-gray-600">Visual variant. Defaults to 'info'.</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-mono text-xs text-indigo-600">children</td>
                <td className="px-5 py-3 font-mono text-xs text-gray-500">React.ReactNode</td>
                <td className="px-5 py-3 text-xs text-center">&#10003;</td>
                <td className="px-5 py-3 text-sm text-gray-600">Content rendered inside the callout.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
