import React from 'react'
import { CodeBlock } from '../../components/CodeBlock'

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Layouts</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Layouts</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Layout patterns define how UI regions are composed and organized. Layouts are structural
          containers — they determine where content, navigation, and tooling appear, not what they
          contain.
        </p>
      </div>

      {/* Current layout anatomy */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Layout Anatomy</h2>
        <p className="text-gray-500 mb-6">
          The doc site uses a four-region layout. Each region has a fixed role and position.
        </p>
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 text-center text-sm font-medium text-gray-700">
            Navbar <span className="text-gray-400 font-normal">— top, sticky</span>
          </div>
          <div className="flex min-h-[200px]">
            <div className="w-56 border-r border-gray-200 bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">Sidebar</p>
                <p className="text-xs text-gray-400">left, fixed-width</p>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center bg-white">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">Main Content</p>
                <p className="text-xs text-gray-400">center, scrollable</p>
              </div>
            </div>
            <div className="w-72 border-l border-gray-200 bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">TOC</p>
                <p className="text-xs text-gray-400">right, sticky</p>
              </div>
            </div>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          filename="Layout.tsx"
          code={`<div className="min-h-screen flex flex-col">
  <Navbar />                         {/* top, sticky */}
  <div className="flex flex-1">
    <Sidebar />                      {/* left, fixed-width */}
    <main className="flex-1">        {/* center, scrollable */}
      {children}
    </main>
    <TableOfContents />              {/* right, sticky */}
  </div>
</div>`}
        />
      </div>

      {/* Available patterns */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Patterns</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="/layouts/dock-panels"
            className="block rounded-xl border border-gray-200 p-6 hover:border-indigo-300 hover:shadow-sm transition"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Dock &amp; Panels</h3>
            <p className="text-sm text-gray-500">
              Dockable panel system for organizing content into resizable, collapsible regions.
            </p>
          </a>
          <a
            href="/layouts/toolbar"
            className="block rounded-xl border border-gray-200 p-6 hover:border-indigo-300 hover:shadow-sm transition"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Toolbar</h3>
            <p className="text-sm text-gray-500">
              Horizontal toolbar pattern for actions, navigation, and controls.
            </p>
          </a>
        </div>
      </div>
    </div>
  )
}
