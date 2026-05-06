import React from 'react'

export type TagColor =
  | 'gray' | 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'purple' | 'pink'

export type TagSize = 'sm' | 'md'

export interface TagProps {
  children: React.ReactNode
  /** Color scheme. Default 'gray'. */
  color?: TagColor
  /** Size. Default 'md'. */
  size?: TagSize
  /** Leading icon glyph. */
  icon?: React.ReactNode
  /** If provided, a "×" button appears and calls this handler. */
  onRemove?: () => void
  /** If provided, the whole tag becomes a clickable button. */
  onClick?: () => void
  className?: string
}

const PALETTE: Record<TagColor, { bg: string; text: string }> = {
  gray:   { bg: 'rgb(243 244 246)', text: 'rgb(75 85 99)'   },
  red:    { bg: 'rgb(254 226 226)', text: 'rgb(220 38 38)'  },
  orange: { bg: 'rgb(255 237 213)', text: 'rgb(234 88 12)'  },
  yellow: { bg: 'rgb(254 249 195)', text: 'rgb(161 98 7)'   },
  green:  { bg: 'rgb(220 252 231)', text: 'rgb(22 163 74)'  },
  teal:   { bg: 'rgb(204 251 241)', text: 'rgb(13 148 136)' },
  blue:   { bg: 'rgb(219 234 254)', text: 'rgb(37 99 235)'  },
  purple: { bg: 'rgb(237 233 254)', text: 'rgb(124 58 237)' },
  pink:   { bg: 'rgb(252 231 243)', text: 'rgb(219 39 119)' },
}

const SIZE: Record<TagSize, { pad: string; text: string; iconGap: string; closeSize: number }> = {
  sm: { pad: 'px-2 py-0.5',  text: 'text-xs', iconGap: 'gap-1',    closeSize: 12 },
  md: { pad: 'px-2.5 py-1',  text: 'text-sm', iconGap: 'gap-1.5',  closeSize: 14 },
}

function CloseIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

export function Tag({
  children,
  color = 'gray',
  size = 'md',
  icon,
  onRemove,
  onClick,
  className = '',
}: TagProps) {
  const c = PALETTE[color]
  const s = SIZE[size]
  const As = onClick ? 'button' : 'span'

  return (
    <As
      onClick={onClick as any}
      type={onClick ? 'button' : undefined}
      className={`inline-flex items-center ${s.pad} ${s.text} ${s.iconGap} rounded-md font-medium font-mono ${onClick ? 'hover:opacity-80 transition-opacity' : ''} ${className}`}
      style={{
        backgroundColor: c.bg,
        color: c.text,
      }}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="truncate max-w-[16ch]">{children}</span>
      {onRemove && (
        <button
          type="button"
          onClick={e => {
            e.stopPropagation()
            onRemove()
          }}
          aria-label="Remove tag"
          className="shrink-0 -mr-0.5 flex items-center justify-center rounded-full transition-colors"
          style={{
            width: s.closeSize + 6,
            height: s.closeSize + 6,
            color: c.text,
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.08)' }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}
        >
          <CloseIcon size={s.closeSize} />
        </button>
      )}
    </As>
  )
}

export interface TagListProps {
  children: React.ReactNode
  className?: string
}

/** Thin wrapper for a row of tags with wrapping + consistent spacing. */
export function TagList({ children, className = '' }: TagListProps) {
  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      {children}
    </div>
  )
}
