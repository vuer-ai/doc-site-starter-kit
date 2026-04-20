import React from 'react'
import { CodeBlock } from '../../../components/CodeBlock'
import { FileTree } from '../../../components/FileTree'

const EXAMPLE_ITEMS = [
  { name: 'compare_fovit_dataset1' },
  { name: 'compare_vit_dataset2' },
  { name: 'fixed_dataset1' },
  { name: 'gazevit' },
  { name: 'saliencyvit' },
  { name: 'translation_dataset1' },
]

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Components</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">File Tree</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          A searchable vertical list of files or experiments with a leading icon per row.
          Inspired by the file panel on dash.ml.
        </p>
      </div>

      {/* Purpose */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Purpose</h2>
        <p className="text-gray-600 leading-relaxed">
          Show a scannable list of experiments, datasets, or files in a side panel.
          Users can filter the list by typing into the search input and open an item
          by clicking a row.
        </p>
      </div>

      {/* Example */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Example</h2>
        <p className="text-gray-500 mb-6">
          Renders a flat, searchable list on a dark panel.
        </p>
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Preview</span>
          </div>
          <div className="p-6 bg-gray-950">
            <div className="max-w-sm">
              <FileTree items={EXAMPLE_ITEMS} />
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
          code={`// A flat array of items; each row shows an icon and a name.
const items = [
  { name: 'fixed_dataset1' },
  { name: 'gazevit',      icon: <CustomIcon /> },
  { name: 'saliencyvit',  onClick: () => openExperiment('saliencyvit') },
]`}
        />
      </div>

      {/* Component Interface (Props) */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Component Interface</h2>
        <CodeBlock
          language="tsx"
          code={`export interface FileTreeItem {
  /** Text shown in the row. Truncates with ellipsis on overflow. */
  name: string
  /** Custom leading icon. Defaults to a flask glyph. */
  icon?: React.ReactNode
  /** Fires when the row is clicked. */
  onClick?: () => void
}

export interface FileTreeProps {
  /** Rows to render. */
  items: FileTreeItem[]
  /** Show the search input. Defaults to true. */
  searchable?: boolean
  /** Placeholder for the search input. */
  searchPlaceholder?: string
  /** Message shown when filtering returns no matches. */
  emptyText?: string
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
          <li><strong>Search:</strong> type in the pill input at the top to filter rows by name (case-insensitive substring match).</li>
          <li><strong>Clear search:</strong> delete the search text to restore the full list.</li>
          <li><strong>Open an item:</strong> click a row to fire its <code>onClick</code> handler.</li>
          <li><strong>Keyboard navigation:</strong> rows are buttons, so they are reachable with <kbd>Tab</kbd> and activated with <kbd>Enter</kbd> / <kbd>Space</kbd>.</li>
        </ul>
      </div>

      {/* Wireframes */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Wireframe(s)</h2>
        <p className="text-gray-500 mb-6">Visual states.</p>

        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-1: default (populated)</span>
            </div>
            <div className="p-6 bg-gray-950">
              <div className="max-w-sm">
                <FileTree items={EXAMPLE_ITEMS} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-2: empty (no items)</span>
            </div>
            <div className="p-6 bg-gray-950">
              <div className="max-w-sm">
                <FileTree items={[]} emptyText="No experiments yet." />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-3: long names (truncated)</span>
            </div>
            <div className="p-6 bg-gray-950">
              <div className="max-w-sm">
                <FileTree
                  items={[
                    { name: 'very_long_experiment_name_that_should_get_truncated_with_ellipsis' },
                    { name: 'another_really_long_file_name_for_testing_overflow_behavior' },
                    { name: 'short_name' },
                  ]}
                  searchable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
