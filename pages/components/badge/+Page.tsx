import React from 'react'
import { CodeBlock } from '../../../components/CodeBlock'

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Components</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Badge</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Small inline labels for status, versions, or categories.
        </p>
      </div>

      {/* Live examples */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Variants</h2>
        <p className="text-gray-500 mb-6">
          Five color variants for different semantic purposes.
        </p>
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Preview</span>
          </div>
          <div className="p-6 bg-white flex flex-wrap gap-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">Default</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Stable</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">Beta</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">New</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">Deprecated</span>
          </div>
        </div>
      </div>

      {/* Usage */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Usage</h2>
        <CodeBlock
          language="tsx"
          code={`import { Badge } from '../../components/Badge'

<Badge label="Default" />
<Badge label="Stable" variant="success" />
<Badge label="Beta" variant="warning" />
<Badge label="New" variant="new" />
<Badge label="Deprecated" variant="danger" />`}
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
                <td className="px-5 py-3 font-mono text-xs text-indigo-600">label</td>
                <td className="px-5 py-3 font-mono text-xs text-gray-500">string</td>
                <td className="px-5 py-3 text-xs text-center">&#10003;</td>
                <td className="px-5 py-3 text-sm text-gray-600">Text displayed inside the badge.</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-mono text-xs text-indigo-600">variant</td>
                <td className="px-5 py-3 font-mono text-xs text-gray-500">'default' | 'success' | 'warning' | 'new'</td>
                <td className="px-5 py-3 text-xs text-center">—</td>
                <td className="px-5 py-3 text-sm text-gray-600">Color variant. Defaults to 'default'.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
