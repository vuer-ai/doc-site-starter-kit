import React, { useState } from 'react'
import { CodeBlock } from '../../../components/CodeBlock'
import { Button } from '../../../components/PillButton'

function PlusIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

/** Click-to-start-loading demo — reverts after ~2s so the reviewer can see the full cycle. */
function LoadingDemo({
  variant,
  idleLabel,
  busyLabel,
}: {
  variant: 'primary' | 'danger'
  idleLabel: string
  busyLabel: string
}) {
  const [busy, setBusy] = useState(false)
  return (
    <Button
      variant={variant}
      loading={busy}
      loadingLabel={busyLabel}
      onClick={() => {
        setBusy(true)
        setTimeout(() => setBusy(false), 2000)
      }}
    >
      {idleLabel}
    </Button>
  )
}

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Components</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Button</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          A pill-shaped button with six variants (<code>primary</code>, <code>danger</code>,
          <code>solid</code>, <code>subtle</code>, <code>outline</code>, <code>ghost</code>),
          three sizes, leading / trailing icons, icon-only mode, and a built-in
          loading state with spinner.
        </p>
      </div>

      {/* Purpose */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Purpose</h2>
        <p className="text-gray-600 leading-relaxed">
          The canonical action element. Use <code>primary</code> for affirmative
          actions (Save, Create), <code>danger</code> for destructive ones
          (Delete), <code>outline</code> for Cancel, and <code>ghost</code> /
          <code>subtle</code> for low-emphasis toolbar actions.
        </p>
      </div>

      {/* Usage */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Usage</h2>
        <CodeBlock
          language="tsx"
          code={`import { Button } from '../../components/Button'

<Button variant="primary">Save Changes</Button>
<Button variant="danger" loading={deleting} loadingLabel="Deleting...">
  Delete Project
</Button>
<Button variant="outline">Cancel</Button>
<Button variant="outline" leadingIcon={<PlusIcon />}>New Project</Button>
<Button variant="ghost" size="sm" iconOnly>
  <MenuIcon />
</Button>`}
        />
      </div>

      {/* Wireframes — matches the reference screenshots */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Wireframe(s)</h2>
        <p className="text-gray-500 mb-6">
          Every state from the design: default, hover, and in-progress.
        </p>

        {/* New Project — outline */}
        <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Button (New Project)</h3>
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-4">
          <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">default · hover on the live button to see the hover state</span>
          </div>
          <div className="p-6 bg-gray-950 flex items-center gap-10">
            <Button variant="outline" leadingIcon={<PlusIcon />}>New Project</Button>
          </div>
        </div>

        {/* Delete Project — danger */}
        <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Button (Delete Project)</h3>
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-4">
          <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">default · hover · deleting</span>
          </div>
          <div className="p-6 bg-gray-950 flex items-center gap-6 flex-wrap">
            <Button variant="danger">Delete Project</Button>
            <LoadingDemo variant="danger" idleLabel="Delete Project" busyLabel="Deleting..." />
          </div>
        </div>

        {/* Save Changes — primary */}
        <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Button (Save Changes)</h3>
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-4">
          <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">default · hover · creating</span>
          </div>
          <div className="p-6 bg-gray-950 flex items-center gap-6 flex-wrap">
            <Button variant="primary">Save Changes</Button>
            <LoadingDemo variant="primary" idleLabel="Create Project" busyLabel="Creating..." />
          </div>
        </div>

        {/* Cancel — outline */}
        <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Button (Cancel)</h3>
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-4">
          <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">outline, neutral</span>
          </div>
          <div className="p-6 bg-gray-950 flex items-center gap-6">
            <Button variant="outline">Cancel</Button>
          </div>
        </div>

        {/* All variants */}
        <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">All variants</h3>
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-4">
          <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">primary · danger · solid · subtle · outline · ghost</span>
          </div>
          <div className="p-6 bg-gray-950 flex items-center gap-3 flex-wrap">
            <Button variant="primary">Primary</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="solid">Solid</Button>
            <Button variant="subtle">Subtle</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </div>

        {/* Sizes */}
        <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Sizes</h3>
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-4">
          <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">sm · md · lg</span>
          </div>
          <div className="p-6 bg-gray-950 flex items-center gap-3 flex-wrap">
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
          </div>
        </div>

        {/* Icon only */}
        <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Icon-only</h3>
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-4">
          <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">square padding for a single glyph</span>
          </div>
          <div className="p-6 bg-gray-950 flex items-center gap-3 flex-wrap">
            <Button variant="subtle" iconOnly size="sm" aria-label="Add"><PlusIcon size={14} /></Button>
            <Button variant="subtle" iconOnly size="md" aria-label="Add"><PlusIcon size={16} /></Button>
            <Button variant="primary" iconOnly size="lg" aria-label="Add"><PlusIcon size={18} /></Button>
          </div>
        </div>
      </div>

      {/* Component Interface */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Component Interface</h2>
        <CodeBlock
          language="tsx"
          code={`export type ButtonVariant =
  | 'primary' | 'danger' | 'solid' | 'subtle' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Square padding for a single-glyph button. */
  iconOnly?: boolean
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  /** Replaces the leading icon with a spinner and disables the button. */
  loading?: boolean
  /** Optional label shown while \`loading\` is true (e.g. "Deleting..."). */
  loadingLabel?: React.ReactNode
}`}
        />
      </div>
    </div>
  )
}
