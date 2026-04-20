import React from 'react'
import { CodeBlock } from '../../../components/CodeBlock'
import { List } from '../../../components/ItemList'

const EXAMPLE_ITEMS = [
  { id: '1', name: 'zoomvit',       status: 'active' as const, meta: '6d ago' },
  { id: '2', name: 'vanillavit',    status: 'active' as const, meta: '6d ago' },
  { id: '3', name: 'zoom_dataset2', status: 'active' as const, meta: '5d ago' },
  { id: '4', name: 'trial_000', parent: 'hparam-sweep', status: 'active' as const, meta: '6d ago' },
  { id: '5', name: 'trial_001', parent: 'hparam-sweep', status: 'active' as const, meta: '6d ago' },
  { id: '6', name: 'trial_002', parent: 'hparam-sweep', status: 'idle'   as const, meta: '6d ago' },
  { id: '7', name: 'trial_003', parent: 'hparam-sweep', status: 'error'  as const, meta: '6d ago' },
]

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Components</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">List</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          A searchable, multi-select list for experiments or items with status indicators,
          namespaced names, and a timestamp column. Modeled on the experiment list on dash.ml.
        </p>
      </div>

      {/* Purpose */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Purpose</h2>
        <p className="text-gray-600 leading-relaxed">
          Let users scan, filter, and act on a set of items (experiments, runs, trials).
          Supports bulk selection for operations like delete or compare, shows live status
          via a colored dot, and groups related items with a <code>parent / name</code> prefix.
        </p>
      </div>

      {/* Example */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Example</h2>
        <p className="text-gray-500 mb-6">
          A selectable list with master checkbox, search, and delete affordance.
          Parent namespaces (e.g. <code>hparam-sweep</code>) render in muted gray before the item name.
        </p>
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Preview</span>
          </div>
          <div className="p-6 bg-gray-950">
            <div className="max-w-lg">
              <List
                items={EXAMPLE_ITEMS}
                onDelete={ids => console.log('delete', ids)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Data structure */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Data structure</h2>
        <p className="text-gray-500 mb-4">What goes into the component.</p>
        <CodeBlock
          language="tsx"
          code={`// Each row is a ListItemData.
const items = [
  // Top-level item with a live status dot and a relative timestamp.
  { id: '1', name: 'zoomvit',    status: 'active', meta: '6d ago' },

  // Namespaced item — 'parent' renders in muted gray before the name.
  { id: '4', name: 'trial_000', parent: 'hparam-sweep', status: 'active', meta: '6d ago' },

  // status: 'active' | 'idle' | 'error'  (optional; omit for no dot)
]`}
        />
      </div>

      {/* Component Interface (Props) */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Component Interface</h2>
        <CodeBlock
          language="tsx"
          code={`export type ListItemStatus = 'active' | 'idle' | 'error'

export interface ListItemData {
  /** Stable id used for selection tracking. */
  id: string
  /** Display name (white text). */
  name: string
  /** Optional namespace. Rendered as '{parent} / ' in muted gray before name. */
  parent?: string
  /** Optional colored dot left of the name. */
  status?: ListItemStatus
  /** Optional right-aligned meta text (e.g. '6d ago'). */
  meta?: string
}

export interface ListProps {
  /** Rows to render. */
  items: ListItemData[]
  /** Show the search input. Filters on name and parent. Defaults to true. */
  searchable?: boolean
  /** Show checkboxes and the selected-count bar. Defaults to true. */
  selectable?: boolean
  /** Initial selection. Defaults to all ids. */
  defaultSelectedIds?: string[]
  /** Fires whenever selection changes. */
  onSelectionChange?: (ids: string[]) => void
  /** If provided, renders the trash icon and receives currently selected ids. */
  onDelete?: (ids: string[]) => void
  /** Placeholder for the search input. */
  searchPlaceholder?: string
  /** Extra classes on the outer container. */
  className?: string
}`}
        />
      </div>

      {/* Actions */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Actions</h2>
        <p className="text-gray-500 mb-4">What users can do with the component.</p>
        <ul className="text-gray-600 space-y-2 list-disc pl-6">
          <li><strong>Filter:</strong> type in the search input to match <code>name</code> or <code>parent</code> (case-insensitive substring).</li>
          <li><strong>Toggle one:</strong> click a row (or its checkbox) to add/remove it from the selection.</li>
          <li><strong>Toggle all:</strong> click the master checkbox in the header to select or deselect every visible row. Shows an indeterminate state when selection is partial.</li>
          <li><strong>Delete selected:</strong> click the trash icon to call <code>onDelete</code> with the selected ids (only shown when <code>onDelete</code> is provided).</li>
          <li><strong>Read status at a glance:</strong> colored dot indicates <code>active</code> (green), <code>idle</code> (gray), or <code>error</code> (red).</li>
        </ul>
      </div>

      {/* Wireframes */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Wireframe(s)</h2>
        <p className="text-gray-500 mb-6">Visual states.</p>

        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-1: default — all selected</span>
            </div>
            <div className="p-6 bg-gray-950">
              <div className="max-w-lg">
                <List items={EXAMPLE_ITEMS} onDelete={ids => console.log(ids)} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-2: partial selection</span>
            </div>
            <div className="p-6 bg-gray-950">
              <div className="max-w-lg">
                <List
                  items={EXAMPLE_ITEMS}
                  defaultSelectedIds={['1', '3', '5']}
                  onDelete={ids => console.log(ids)}
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-3: read-only (no checkboxes)</span>
            </div>
            <div className="p-6 bg-gray-950">
              <div className="max-w-lg">
                <List items={EXAMPLE_ITEMS} selectable={false} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-4: empty</span>
            </div>
            <div className="p-6 bg-gray-950">
              <div className="max-w-lg">
                <List items={[]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
