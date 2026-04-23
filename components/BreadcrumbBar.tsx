import React from 'react'

export interface BreadcrumbItem {
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
  /** Ordered path. The last item is treated as the current location and rendered as a filled pill. */
  items: BreadcrumbItem[]
  /** Separator between segments. Defaults to '/'. */
  separator?: React.ReactNode
  /**
   * Fires when a non-current segment is clicked, with the index of the clicked
   * segment. Use this to "jump to that level" (e.g. `setItems(items.slice(0, i + 1))`).
   * Called after the segment's own `onClick`/`href` navigation.
   */
  onNavigate?: (index: number) => void
  className?: string
}

export function Breadcrumb({
  items,
  separator = '/',
  onNavigate,
  className = '',
}: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center gap-2 ${className}`}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        const content = (
          <>
            {item.icon && <span className="shrink-0">{item.icon}</span>}
            {item.label && <span className="truncate">{item.label}</span>}
          </>
        )

        const handleClick = (e: React.MouseEvent) => {
          item.onClick?.()
          if (onNavigate) {
            if (item.href) e.preventDefault()
            onNavigate(i)
          }
        }

        const segment = isLast ? (
          <span
            aria-current="page"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-gray-900 text-sm font-medium max-w-[24ch]"
          >
            {content}
          </span>
        ) : item.href ? (
          <a
            href={item.href}
            onClick={handleClick}
            className="inline-flex items-center gap-1.5 px-2 py-1 text-sm text-gray-400 hover:text-gray-200 transition-colors"
          >
            {content}
          </a>
        ) : (
          <button
            type="button"
            onClick={handleClick}
            className="inline-flex items-center gap-1.5 px-2 py-1 text-sm text-gray-400 hover:text-gray-200 transition-colors"
          >
            {content}
          </button>
        )

        return (
          <React.Fragment key={i}>
            {i > 0 && (
              <span aria-hidden className="text-gray-500 text-sm select-none">
                {separator}
              </span>
            )}
            {segment}
          </React.Fragment>
        )
      })}
    </nav>
  )
}
