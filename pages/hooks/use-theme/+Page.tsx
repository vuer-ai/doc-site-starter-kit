import React from 'react'
import { CodeBlock } from '../../../components/CodeBlock'

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Hooks</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">useTheme</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Hook for reading and setting the current color theme. Supports light, dark, and system
          modes with localStorage persistence.
        </p>
      </div>

      {/* Signature */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Signature</h2>
        <CodeBlock
          language="ts"
          code="function useTheme(): { theme: Theme; setTheme: (theme: Theme) => void }"
        />
      </div>

      {/* Type */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Type</h2>
        <CodeBlock language="ts" code="type Theme = 'light' | 'dark' | 'system'" />
      </div>

      {/* Returns */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Returns</h2>
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
              <tr>
                <td className="px-5 py-3 font-mono text-xs text-indigo-600 whitespace-nowrap">theme</td>
                <td className="px-5 py-3 font-mono text-xs text-gray-500 whitespace-nowrap">Theme</td>
                <td className="px-5 py-3 text-sm text-gray-600">The current active theme value.</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-mono text-xs text-indigo-600 whitespace-nowrap">setTheme</td>
                <td className="px-5 py-3 font-mono text-xs text-gray-500 whitespace-nowrap">{"(theme: Theme) => void"}</td>
                <td className="px-5 py-3 text-sm text-gray-600">
                  Function to change the theme. Persists the value to localStorage and updates
                  the <code className="font-mono text-indigo-600">data-theme</code> attribute on the document element.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Usage */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Usage</h2>
        <CodeBlock
          language="tsx"
          code={`import { useTheme } from '../components/ThemeContext'

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Current: {theme}
    </button>
  )
}`}
        />
      </div>
    </div>
  )
}
