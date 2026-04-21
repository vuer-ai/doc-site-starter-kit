import React from 'react'
import { CodeBlock } from '../../../components/CodeBlock'
import { Breadcrumb } from '../../../components/BreadcrumbBar'

const DOT = <span className="inline-block w-2 h-2 rounded-full bg-orange-500" />

const EXAMPLE_ITEMS = [
  { icon: DOT },
  { label: 'compare_fovit_dataset1' },
]

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Components</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Breadcrumb</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          A path indicator for the current experiment or file. The final segment is rendered
          as a filled pill; earlier segments are muted and clickable. Modeled on the
          header path on dash.ml.
        </p>
      </div>

      {/* Purpose */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Purpose</h2>
        <p className="text-gray-600 leading-relaxed">
          Show the user where they are in a hierarchy (project / folder / experiment)
          and let them click back to any parent. The current location is emphasized
          as a white pill so it reads as the primary label in the header bar.
        </p>
      </div>

      {/* Usage */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Usage</h2>
        <CodeBlock
          language="tsx"
          code={`import { Breadcrumb } from '../../components/BreadcrumbBar'

<Breadcrumb
  items={[
    { icon: <ProjectDot /> },
    { label: 'compare_fovit_dataset1' },
  ]}
/>`}
        />
      </div>

      {/* Example */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Example</h2>
        <p className="text-gray-500 mb-6">
          A project dot followed by the current experiment name.
        </p>
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Preview</span>
          </div>
          <div className="p-6 bg-gray-950">
            <Breadcrumb items={EXAMPLE_ITEMS} />
          </div>
        </div>
      </div>

      {/* Data structure */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Data structure</h2>
        <p className="text-gray-500 mb-4">What goes into the component.</p>
        <CodeBlock
          language="tsx"
          code={`// Each segment is a BreadcrumbItem. The last item is treated as the current location.
const items = [
  // Icon-only root (e.g. project dot). No label.
  { icon: <ProjectDot color="orange" />, onClick: goHome },

  // Middle segment (clickable).
  { label: 'hparam-sweep', href: '/projects/p1/hparam-sweep' },

  // Current location — rendered as a filled white pill.
  { label: 'compare_fovit_dataset1' },
]`}
        />
      </div>

      {/* Component Interface (Props) */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Component Interface</h2>
        <CodeBlock
          language="tsx"
          code={`export interface BreadcrumbItem {
  /** Visible label. Omit to render an icon-only segment (e.g. a project dot). */
  label?: string
  /** Optional leading icon. */
  icon?: React.ReactNode
  /** Fires when a non-current segment is clicked. */
  onClick?: () => void
  /** Optional link href. If set, the segment renders as an anchor. */
  href?: string
}

export interface BreadcrumbProps {
  /** Ordered path. Last item is the current location (rendered as a filled pill). */
  items: BreadcrumbItem[]
  /** Separator between segments. Defaults to '/'. */
  separator?: React.ReactNode
  className?: string
}`}
        />
      </div>

      {/* Actions */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Actions</h2>
        <p className="text-gray-500 mb-4">What users can do with the component.</p>
        <ul className="text-gray-600 space-y-2 list-disc pl-6">
          <li><strong>Navigate to a parent:</strong> click any non-last segment to fire its <code>onClick</code> or follow its <code>href</code>.</li>
          <li><strong>Read current location:</strong> the last segment is the white pill — users recognize this as "where I am".</li>
          <li><strong>Keyboard access:</strong> segments with <code>onClick</code> render as buttons and are reachable with <kbd>Tab</kbd>.</li>
        </ul>
      </div>

      {/* Wireframes */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Wireframe(s)</h2>
        <p className="text-gray-500 mb-6">Visual states.</p>

        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-1: root + current</span>
            </div>
            <div className="p-6 bg-gray-950">
              <Breadcrumb items={EXAMPLE_ITEMS} />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-2: multi-level path</span>
            </div>
            <div className="p-6 bg-gray-950">
              <Breadcrumb
                items={[
                  { icon: DOT },
                  { label: 'hparam-sweep', onClick: () => {} },
                  { label: 'trial_002' },
                ]}
              />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-3: long name (truncates)</span>
            </div>
            <div className="p-6 bg-gray-950">
              <Breadcrumb
                items={[
                  { icon: DOT },
                  { label: 'very_long_experiment_name_that_should_get_truncated_at_some_point' },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
