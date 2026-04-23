import React, { useState } from 'react'
import { CodeBlock } from '../../../components/CodeBlock'
import { ErrorMessage } from '../../../components/ErrorMessage'

function DismissibleDemo() {
  const [visible, setVisible] = useState(true)
  if (!visible) {
    return (
      <button
        type="button"
        onClick={() => setVisible(true)}
        className="text-sm text-gray-400 hover:text-gray-200 underline"
      >
        show error again
      </button>
    )
  }
  return (
    <ErrorMessage onDismiss={() => setVisible(false)}>
      A project with this slug already exists in this namespace
    </ErrorMessage>
  )
}

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Form Inputs</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Error Message</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          A rounded, colored banner for form validation errors and other inline
          feedback. Four tones (<code>error</code>, <code>warning</code>,
          <code>info</code>, <code>success</code>) and an optional dismiss button.
        </p>
      </div>

      {/* Purpose */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Purpose</h2>
        <p className="text-gray-600 leading-relaxed">
          Show feedback close to the field or form that caused it. For per-field
          errors, prefer <code>FormField</code>'s built-in <code>error</code> prop;
          reach for <code>ErrorMessage</code> when you need a wider banner spanning
          the whole form.
        </p>
      </div>

      {/* Usage */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Usage</h2>
        <CodeBlock
          language="tsx"
          code={`import { ErrorMessage } from '../../components/ErrorMessage'

<ErrorMessage>
  A project with this slug already exists in this namespace
</ErrorMessage>

<ErrorMessage tone="warning">Unsaved changes will be lost.</ErrorMessage>
<ErrorMessage tone="info">Your session will expire in 5 minutes.</ErrorMessage>
<ErrorMessage tone="success" onDismiss={hide}>Saved.</ErrorMessage>`}
        />
      </div>

      {/* Example */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Example</h2>
        <p className="text-gray-500 mb-6">
          Matches the reference design — a full-width red banner.
        </p>
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Preview</span>
          </div>
          <div className="p-6 bg-gray-950">
            <ErrorMessage>
              A project with this slug already exists in this namespace
            </ErrorMessage>
          </div>
        </div>
      </div>

      {/* Component Interface */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Component Interface</h2>
        <CodeBlock
          language="tsx"
          code={`export type ErrorMessageTone = 'error' | 'warning' | 'info' | 'success'

export interface ErrorMessageProps {
  children: React.ReactNode
  /** Default 'error'. */
  tone?: ErrorMessageTone
  /** Override the default icon, or pass null to hide it. */
  icon?: React.ReactNode | null
  /** If provided, renders a × button that calls this. */
  onDismiss?: () => void
  className?: string
}`}
        />
      </div>

      {/* Wireframes */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Wireframe(s)</h2>
        <p className="text-gray-500 mb-6">Visual states.</p>

        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-1: four tones</span>
            </div>
            <div className="p-6 bg-gray-950 space-y-3">
              <ErrorMessage tone="error">
                A project with this slug already exists in this namespace
              </ErrorMessage>
              <ErrorMessage tone="warning">
                Unsaved changes will be lost if you leave this page.
              </ErrorMessage>
              <ErrorMessage tone="info">
                Your session will expire in 5 minutes.
              </ErrorMessage>
              <ErrorMessage tone="success">
                Project created.
              </ErrorMessage>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-2: dismissible</span>
            </div>
            <div className="p-6 bg-gray-950">
              <DismissibleDemo />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-3: no icon</span>
            </div>
            <div className="p-6 bg-gray-950">
              <ErrorMessage icon={null}>
                A project with this slug already exists in this namespace
              </ErrorMessage>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
