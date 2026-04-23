import React from 'react'

export type ErrorMessageTone = 'error' | 'warning' | 'info' | 'success'

export interface ErrorMessageProps {
  /** Message body. */
  children: React.ReactNode
  /** Semantic color. Default 'error'. */
  tone?: ErrorMessageTone
  /** Leading icon glyph. Pass `null` to hide the default. */
  icon?: React.ReactNode | null
  /** If provided, renders an × button that calls this. */
  onDismiss?: () => void
  className?: string
}

const PALETTE: Record<ErrorMessageTone, { bg: string; border: string; text: string }> = {
  error:   { bg: 'rgba(239, 68, 68, 0.10)',  border: 'rgba(239, 68, 68, 0.45)',  text: 'rgb(248 113 113)' },
  warning: { bg: 'rgba(245, 158, 11, 0.10)', border: 'rgba(245, 158, 11, 0.45)', text: 'rgb(251 191 36)'  },
  info:    { bg: 'rgba(59, 130, 246, 0.10)', border: 'rgba(59, 130, 246, 0.45)', text: 'rgb(96 165 250)'  },
  success: { bg: 'rgba(34, 197, 94, 0.10)',  border: 'rgba(34, 197, 94, 0.45)',  text: 'rgb(74 222 128)'  },
}

function AlertIcon()    { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg> }
function WarnIcon()     { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/><path d="M12 9v4M12 17h.01"/></svg> }
function InfoIcon()     { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg> }
function SuccessIcon()  { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/></svg> }
function CloseIcon()    { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg> }

const DEFAULT_ICON: Record<ErrorMessageTone, React.ReactNode> = {
  error:   <AlertIcon />,
  warning: <WarnIcon />,
  info:    <InfoIcon />,
  success: <SuccessIcon />,
}

export function ErrorMessage({
  children,
  tone = 'error',
  icon,
  onDismiss,
  className = '',
}: ErrorMessageProps) {
  const c = PALETTE[tone]
  const resolvedIcon = icon === undefined ? DEFAULT_ICON[tone] : icon

  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={`flex items-center gap-3 px-4 py-3 text-sm rounded-xl ${className}`}
      style={{
        backgroundColor: c.bg,
        border: `1px solid ${c.border}`,
        color: c.text,
      }}
    >
      {resolvedIcon && <span className="shrink-0">{resolvedIcon}</span>}
      <span className="flex-1 min-w-0">{children}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="shrink-0 -mr-1 w-6 h-6 flex items-center justify-center rounded-full transition-colors"
          style={{ color: c.text }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.12)' }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}
        >
          <CloseIcon />
        </button>
      )}
    </div>
  )
}
