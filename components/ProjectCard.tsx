import React from 'react'

export interface ProjectCardProps {
  /** Project name — shown as the card title and derives the default avatar initial. */
  name: string
  /** Single-letter (or short) avatar initial. Defaults to the first character of `name`. */
  initial?: string
  /** Relative updated time, e.g. "1 hour ago". */
  updated?: string
  /** Category label shown in the footer, e.g. "Machine Learning". */
  tag?: string
  /** Stat count shown in the footer next to the bar-chart icon (e.g. number of experiments). */
  stat?: number | string
  /** Number of active runs. When greater than 0, a green badge is shown in the top-right. */
  activeRuns?: number
  /** If provided, the title becomes an anchor to this URL. */
  href?: string
  /** Selected/active state — outlines the card blue and underlines the title. */
  selected?: boolean
  /** If provided, an edit icon is rendered that calls this handler. Visible on hover or when selected. */
  onEdit?: () => void
  /** If provided, a trash icon is rendered that calls this handler. Visible on hover or when selected. */
  onDelete?: () => void
  /** Extra classes on the outer card. */
  className?: string
}

function PencilIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  )
}

function TrashIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6 18 20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
    </svg>
  )
}

function ChartIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 21V9" />
      <path d="M10 21V3" />
      <path d="M17 21v-7" />
    </svg>
  )
}

export function ProjectCard({
  name,
  initial,
  updated,
  tag,
  stat,
  activeRuns = 0,
  href,
  selected = false,
  onEdit,
  onDelete,
  className = '',
}: ProjectCardProps) {
  const titleClass = selected
    ? 'text-blue-400 underline decoration-blue-400/60 underline-offset-4'
    : 'text-blue-400 hover:underline decoration-blue-400/60 underline-offset-4'

  const borderClass = selected
    ? 'border-blue-400/70 ring-1 ring-blue-400/30'
    : 'border-gray-800/60 hover:border-gray-700'

  const hasActions = onEdit || onDelete
  const actionVisibility = selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 focus-within:opacity-100'

  return (
    <div
      className={`group rounded-3xl border bg-gray-900/40 p-5 transition-colors ${borderClass} ${className}`}
    >
      <div className="flex items-start gap-3">
        {/* Monogram avatar */}
        <div
          aria-hidden
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white shrink-0"
        >
          {(initial ?? name[0] ?? '?').toUpperCase()}
        </div>

        {/* Title + subtitle */}
        <div className="flex-1 min-w-0">
          {href ? (
            <a href={href} className={`block text-base font-semibold truncate ${titleClass}`}>
              {name}
            </a>
          ) : (
            <span className={`block text-base font-semibold truncate ${titleClass}`}>
              {name}
            </span>
          )}
          {updated && (
            <p className="text-xs text-gray-500 mt-0.5 truncate">Updated {updated}</p>
          )}
        </div>

        {/* Actions + active-runs badge */}
        <div className="flex items-center gap-2 shrink-0">
          {hasActions && (
            <div className={`flex items-center gap-1 transition-opacity ${actionVisibility}`}>
              {onEdit && (
                <button
                  type="button"
                  onClick={onEdit}
                  aria-label={`Edit ${name}`}
                  className="p-1.5 rounded-md text-gray-400 hover:text-gray-100 hover:bg-gray-800/60"
                >
                  <PencilIcon />
                </button>
              )}
              {onDelete && (
                <button
                  type="button"
                  onClick={onDelete}
                  aria-label={`Delete ${name}`}
                  className="p-1.5 rounded-md text-gray-400 hover:text-red-400 hover:bg-gray-800/60"
                >
                  <TrashIcon />
                </button>
              )}
            </div>
          )}
          {activeRuns > 0 && (
            <span
              aria-label={`${activeRuns} active run${activeRuns === 1 ? '' : 's'}`}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-500/50 text-emerald-400 text-xs font-medium"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {activeRuns}
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      {(tag || stat !== undefined) && (
        <div className="mt-5 flex items-center gap-4 text-xs text-gray-400">
          {tag && (
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-gray-500" />
              {tag}
            </span>
          )}
          {stat !== undefined && (
            <span className="flex items-center gap-1.5">
              <ChartIcon />
              {stat}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
