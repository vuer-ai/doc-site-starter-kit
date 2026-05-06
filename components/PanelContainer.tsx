import React from 'react'

export interface PanelContainerProps {
  /** Panel content. */
  children: React.ReactNode
  /** Extra classes on the outer container. */
  className?: string
  /** Default 'comfortable'. 'compact' reduces padding; 'snug' removes it. */
  size?: 'snug' | 'compact' | 'comfortable'
  /** Fill the parent's height (useful in dock/flex layouts). */
  fullHeight?: boolean
  /** Hide the outer border. */
  noBorder?: boolean
  /** Raise with a subtle shadow. */
  elevated?: boolean
}

const PAD: Record<NonNullable<PanelContainerProps['size']>, string> = {
  snug: 'p-0',
  compact: 'p-4',
  comfortable: 'p-6',
}

/**
 * A rounded, themed container for grouping related content. The default panel
 * in the design system — use it for dashboard widgets, side panels, preview
 * frames, anywhere you want content to feel like a single surface.
 */
export function PanelContainer({
  children,
  className = '',
  size = 'comfortable',
  fullHeight = false,
  noBorder = false,
  elevated = false,
}: PanelContainerProps) {
  return (
    <div
      className={`rounded-3xl overflow-hidden ${PAD[size]} ${fullHeight ? 'h-full' : ''} ${noBorder ? '' : 'border'} ${elevated ? 'shadow-sm' : ''} ${className}`}
      style={{
        backgroundColor: 'rgb(var(--color-bg))',
        borderColor: noBorder ? 'transparent' : 'rgb(var(--color-border))',
      }}
    >
      {children}
    </div>
  )
}
