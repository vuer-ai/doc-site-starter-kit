import React from 'react'
import { CodeBlock } from '../../../components/CodeBlock'

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Layouts</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Toolbar</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Horizontal toolbar pattern for actions, navigation, and controls. The navbar is an
          implementation of the toolbar pattern.
        </p>
      </div>

      {/* Navbar as toolbar */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Toolbar Anatomy</h2>
        <p className="text-gray-500 mb-6">
          A toolbar distributes its children across three slots: leading, center, and trailing.
          The navbar uses this pattern to position the logo, search, and actions.
        </p>
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Navbar as Toolbar</span>
          </div>
          <div className="flex items-center justify-between px-6 py-4 bg-white">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-indigo-600" />
              <span className="text-sm font-semibold text-gray-900">Logo</span>
            </div>
            <div className="flex-1 max-w-xs mx-8">
              <div className="h-9 rounded-lg bg-gray-100 border border-gray-200 flex items-center px-3">
                <span className="text-xs text-gray-400">Search...</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
                <span className="text-xs text-gray-400">T</span>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Slot</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Alignment</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Content</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-5 py-3 font-mono text-xs text-indigo-600">leading</td>
                <td className="px-5 py-3 text-gray-500">Left</td>
                <td className="px-5 py-3 text-sm text-gray-600">Logo, brand, or back navigation</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-mono text-xs text-indigo-600">center</td>
                <td className="px-5 py-3 text-gray-500">Center</td>
                <td className="px-5 py-3 text-sm text-gray-600">Search bar or primary navigation</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-mono text-xs text-indigo-600">trailing</td>
                <td className="px-5 py-3 text-gray-500">Right</td>
                <td className="px-5 py-3 text-sm text-gray-600">Theme toggle, settings, or actions</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Building a toolbar */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Building a Toolbar</h2>
        <p className="text-gray-500 mb-6">
          A toolbar is a flex container with <code className="text-sm font-mono text-indigo-600">justify-between</code> alignment.
          Children are grouped into leading, center, and trailing sections.
        </p>
        <CodeBlock
          language="tsx"
          filename="Toolbar.tsx"
          code={`function Toolbar({
  leading,
  center,
  trailing,
}: {
  leading?: React.ReactNode
  center?: React.ReactNode
  trailing?: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between h-14 px-4 border-b border-gray-200 bg-white sticky top-0 z-30">
      {/* Leading slot */}
      <div className="flex items-center gap-2 shrink-0">
        {leading}
      </div>

      {/* Center slot */}
      <div className="flex-1 flex justify-center px-4">
        {center}
      </div>

      {/* Trailing slot */}
      <div className="flex items-center gap-2 shrink-0">
        {trailing}
      </div>
    </div>
  )
}`}
        />
      </div>

      {/* Implementation example */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Usage</h2>
        <p className="text-gray-500 mb-6">
          Here is how the navbar composes the toolbar pattern with real content.
        </p>
        <CodeBlock
          language="tsx"
          filename="Navbar.tsx"
          code={`import { Toolbar } from './Toolbar'
import { SearchInput } from './SearchInput'
import { ThemeToggle } from './ThemeToggle'

export function Navbar() {
  return (
    <Toolbar
      leading={
        <a href="/" className="flex items-center gap-2">
          <Logo className="w-6 h-6" />
          <span className="font-semibold text-gray-900">Docs</span>
        </a>
      }
      center={
        <SearchInput
          className="max-w-xs w-full"
          placeholder="Search documentation..."
        />
      }
      trailing={
        <ThemeToggle />
      }
    />
  )
}`}
        />
      </div>
    </div>
  )
}
