import React, { useState } from 'react'
import { CodeBlock } from '../../../components/CodeBlock'
import { SearchInput } from '../../../components/SearchInput'

function ControlledDemo() {
  const [q, setQ] = useState('eye')
  return (
    <div className="flex flex-col gap-6">
      <SearchInput
        placeholder="Find a project..."
        value={q}
        onChange={e => setQ(e.target.value)}
      />
      <p className="text-gray-400 text-sm">
        query: <span className="text-gray-100 font-mono">{JSON.stringify(q)}</span>
      </p>
    </div>
  )
}

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Form Inputs</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Search Input</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          A pill-shaped search field with a leading icon, a focus ring, and a built-in
          clear button that appears when the field is non-empty (also wired to the
          Escape key).
        </p>
      </div>

      {/* Purpose */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Purpose</h2>
        <p className="text-gray-600 leading-relaxed">
          The default search field for filtering lists, grids, or trees. Controlled
          or uncontrolled, three sizes, theme-aware via CSS variables.
        </p>
      </div>

      {/* Usage */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Usage</h2>
        <CodeBlock
          language="tsx"
          code={`import { SearchInput } from '../../components/SearchInput'

// Uncontrolled
<SearchInput placeholder="Find a project..." onChange={e => onSearch(e.target.value)} />

// Controlled
const [q, setQ] = useState('')
<SearchInput value={q} onChange={e => setQ(e.target.value)} onClear={() => setQ('')} />`}
        />
      </div>

      {/* Example */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Example</h2>
        <p className="text-gray-500 mb-6">
          Controlled — the clear button (and the Escape key) wipes the value.
        </p>
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Preview</span>
          </div>
          <div className="p-6 bg-gray-950">
            <ControlledDemo />
          </div>
        </div>
      </div>

      {/* Component Interface */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Component Interface</h2>
        <CodeBlock
          language="tsx"
          code={`export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Default 'md'. */
  size?: 'sm' | 'md' | 'lg'
  /** Called when the user presses Escape or clicks the clear button. */
  onClear?: () => void
  /** Show a clear button when non-empty. Default true. */
  clearable?: boolean
  className?: string
}`}
        />
      </div>

      {/* Wireframes */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Wireframe(s)</h2>
        <p className="text-gray-500 mb-6">
          The four states from the reference design: default (blurred, empty),
          focused empty, focused with value, and blurred with value.
        </p>

        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-1: default (empty, blurred)</span>
            </div>
            <div className="p-6 bg-gray-950">
              <SearchInput placeholder="Find a project..." />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-2: focused, empty</span>
            </div>
            <div className="p-6 bg-gray-950">
              <SearchInput placeholder="Find a project..." autoFocus />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-3: with value (shows clear)</span>
            </div>
            <div className="p-6 bg-gray-950">
              <SearchInput placeholder="Find a project..." defaultValue="eye" />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-4: sizes (sm, md, lg)</span>
            </div>
            <div className="p-6 bg-gray-950 flex flex-col gap-3">
              <SearchInput size="sm" placeholder="Small" />
              <SearchInput size="md" placeholder="Medium (default)" />
              <SearchInput size="lg" placeholder="Large" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
