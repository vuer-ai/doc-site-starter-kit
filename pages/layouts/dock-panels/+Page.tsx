import React from 'react'
import { CodeBlock } from '../../../components/CodeBlock'

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Layouts</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Dock &amp; Panels</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Dockable panel system for organizing content into resizable, collapsible regions. The
          sidebar and TOC are examples of docked panels.
        </p>
      </div>

      {/* Panel structure */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Panel Structure</h2>
        <p className="text-gray-500 mb-6">
          The doc site uses a three-panel layout. Each panel has a defined width and role.
        </p>
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Panel Layout</span>
          </div>
          <div className="flex min-h-[180px]">
            <div className="w-56 border-r border-gray-200 bg-indigo-50 flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm font-semibold text-indigo-700">Left Panel</p>
                <p className="text-xs text-indigo-400">Sidebar — 224px</p>
              </div>
            </div>
            <div className="flex-1 bg-white flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-700">Center Panel</p>
                <p className="text-xs text-gray-400">Main content — fluid</p>
              </div>
            </div>
            <div className="w-72 border-l border-gray-200 bg-indigo-50 flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm font-semibold text-indigo-700">Right Panel</p>
                <p className="text-xs text-indigo-400">TOC — 288px</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Composition */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Composition</h2>
        <p className="text-gray-500 mb-6">
          Panels are composed in the root layout file using flex containers. Each panel is a
          direct child of the main content row.
        </p>
        <CodeBlock
          language="tsx"
          filename="Layout.tsx"
          code={`export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        {/* Left panel — sidebar */}
        <aside className="hidden md:block w-56 shrink-0 border-r border-gray-200 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
          <Sidebar />
        </aside>

        {/* Center panel — main content */}
        <main className="flex-1 min-w-0 px-8 py-10">
          {children}
        </main>

        {/* Right panel — table of contents */}
        <aside className="hidden lg:block w-72 shrink-0 border-l border-gray-200 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
          <TableOfContents />
        </aside>
      </div>
    </div>
  )
}`}
        />
      </div>

      {/* Responsive behavior */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Responsive Behavior</h2>
        <p className="text-gray-500 mb-6">
          Panels are hidden below their designated breakpoints to keep the layout usable on
          smaller screens.
        </p>
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Panel</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Visible at</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Class</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-5 py-3 text-gray-700">Sidebar (left)</td>
                <td className="px-5 py-3 text-gray-500">&ge; 768px</td>
                <td className="px-5 py-3 font-mono text-xs text-indigo-600">hidden md:block</td>
              </tr>
              <tr>
                <td className="px-5 py-3 text-gray-700">TOC (right)</td>
                <td className="px-5 py-3 text-gray-500">&ge; 1024px</td>
                <td className="px-5 py-3 font-mono text-xs text-indigo-600">hidden lg:block</td>
              </tr>
              <tr>
                <td className="px-5 py-3 text-gray-700">Main content</td>
                <td className="px-5 py-3 text-gray-500">Always visible</td>
                <td className="px-5 py-3 font-mono text-xs text-indigo-600">flex-1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Props / Config */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Panel Configuration</h2>
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
                <td className="px-5 py-3 font-mono text-xs text-indigo-600">width</td>
                <td className="px-5 py-3 font-mono text-xs text-gray-500">string | number</td>
                <td className="px-5 py-3 text-sm text-gray-600">Fixed width of the panel (e.g. 224px, 288px).</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-mono text-xs text-indigo-600">position</td>
                <td className="px-5 py-3 font-mono text-xs text-gray-500">'left' | 'right'</td>
                <td className="px-5 py-3 text-sm text-gray-600">Which side the panel docks to.</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-mono text-xs text-indigo-600">sticky</td>
                <td className="px-5 py-3 font-mono text-xs text-gray-500">boolean</td>
                <td className="px-5 py-3 text-sm text-gray-600">Whether the panel stays fixed while scrolling.</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-mono text-xs text-indigo-600">collapsible</td>
                <td className="px-5 py-3 font-mono text-xs text-gray-500">boolean</td>
                <td className="px-5 py-3 text-sm text-gray-600">Whether the panel can be collapsed to save space.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
