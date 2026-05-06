import React from 'react'
import { Button } from './PillButton'

export interface FormCardProps {
  /** Heading shown top-left. */
  title: React.ReactNode
  /** Subheading / description shown under the title. */
  description?: React.ReactNode
  /** If provided, renders a close button top-right. */
  onClose?: () => void
  /** Form body. Typically a 1- or 2-column grid of <FormField>s. */
  children: React.ReactNode
  /** Primary action button label (e.g. "Create Project"). */
  primaryLabel?: string
  onPrimaryAction?: () => void
  primaryDisabled?: boolean
  /** Secondary action button label (e.g. "Cancel"). */
  secondaryLabel?: string
  onSecondaryAction?: () => void
  className?: string
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

export function FormCard({
  title,
  description,
  onClose,
  children,
  primaryLabel,
  onPrimaryAction,
  primaryDisabled,
  secondaryLabel,
  onSecondaryAction,
  className = '',
}: FormCardProps) {
  const hasFooter = Boolean(primaryLabel || secondaryLabel)
  return (
    <div
      className={`rounded-3xl border p-7 ${className}`}
      style={{
        backgroundColor: 'rgb(var(--color-bg))',
        borderColor: 'rgb(var(--color-border))',
      }}
    >
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="min-w-0">
          <h3
            className="text-xl font-semibold tracking-tight"
            style={{ color: 'rgb(var(--color-text))' }}
          >
            {title}
          </h3>
          {description && (
            <p
              className="mt-1.5 text-sm"
              style={{ color: 'rgb(var(--color-text-muted))' }}
            >
              {description}
            </p>
          )}
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 -mt-1 -mr-1 w-8 h-8 flex items-center justify-center rounded-full transition-colors"
            style={{ color: 'rgb(var(--color-text-muted))' }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'rgb(var(--color-text))'
              e.currentTarget.style.backgroundColor = 'rgb(var(--color-text) / 0.06)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgb(var(--color-text-muted))'
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            <CloseIcon />
          </button>
        )}
      </div>

      <div>{children}</div>

      {hasFooter && (
        <div className="mt-8 flex items-center justify-end gap-3">
          {secondaryLabel && (
            <Button variant="outline" onClick={onSecondaryAction}>
              {secondaryLabel}
            </Button>
          )}
          {primaryLabel && (
            <Button
              variant="primary"
              onClick={onPrimaryAction}
              disabled={primaryDisabled}
            >
              {primaryLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

/* --- Field helper ------------------------------------------------------- */

export interface FormFieldProps {
  /** Field label shown above the input. */
  label: React.ReactNode
  /** Adds a red asterisk to the label. */
  required?: boolean
  /** Muted hint shown under the input. Hidden when `error` is set. */
  helper?: React.ReactNode
  /** Error message shown under the input in red (overrides `helper`). */
  error?: React.ReactNode
  /** The input element (input, textarea, select, etc.). */
  children: React.ReactNode
  /** `htmlFor` target so clicking the label focuses the input. */
  htmlFor?: string
  className?: string
}

export function FormField({
  label,
  required,
  helper,
  error,
  children,
  htmlFor,
  className = '',
}: FormFieldProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label
        htmlFor={htmlFor}
        className="text-sm font-semibold"
        style={{ color: 'rgb(var(--color-text))' }}
      >
        {label}
        {required && <span className="ml-1" style={{ color: '#ef4444' }}>*</span>}
      </label>
      {children}
      {error ? (
        <span className="text-xs" style={{ color: '#ef4444' }}>
          {error}
        </span>
      ) : helper ? (
        <span className="text-xs" style={{ color: 'rgb(var(--color-text-muted))' }}>
          {helper}
        </span>
      ) : null}
    </div>
  )
}
