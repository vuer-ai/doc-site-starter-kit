import React, { useState, useMemo } from 'react'

export type ListItemStatus = 'active' | 'idle' | 'error'

export interface ListItemData {
  id: string
  name: string
  parent?: string
  status?: ListItemStatus
  /** Trailing right-aligned cell (date, size, etc.). */
  meta?: string
}

export interface ListProps {
  items: ListItemData[]
  /** Total number of items across all pages. Falls back to `items.length`. */
  total?: number
  /** 1-indexed page number for the "X-Y of Total" readout. Default 1. */
  page?: number
  searchable?: boolean
  selectable?: boolean
  defaultSelectedIds?: string[]
  onSelectionChange?: (ids: string[]) => void
  onDelete?: (ids: string[]) => void
  searchPlaceholder?: string
  className?: string
}

function SearchIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  )
}

function TrashIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M6 6v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6" />
    </svg>
  )
}

function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m5 12 5 5L20 7" />
    </svg>
  )
}

function Checkbox({
  checked,
  indeterminate,
  onChange,
}: {
  checked: boolean
  indeterminate?: boolean
  onChange: () => void
}) {
  const filled = checked || indeterminate
  return (
    <button
      type="button"
      onClick={onChange}
      aria-checked={indeterminate ? 'mixed' : checked}
      role="checkbox"
      className="w-[18px] h-[18px] shrink-0 rounded-[5px] flex items-center justify-center transition-colors"
      style={{
        backgroundColor: filled ? 'rgb(var(--color-primary))' : 'transparent',
        border: filled ? 'none' : '1.5px solid rgb(var(--color-border))',
        color: '#fff',
      }}
    >
      {indeterminate ? (
        <div className="w-2.5 h-0.5 rounded-full" style={{ backgroundColor: '#fff' }} />
      ) : checked ? (
        <CheckIcon className="w-3 h-3" />
      ) : null}
    </button>
  )
}

const STATUS_DOT: Record<ListItemStatus, string> = {
  active: '#22c55e',
  idle: '#9ca3af',
  error: '#ef4444',
}

export function List({
  items,
  total,
  page = 1,
  searchable = true,
  selectable = true,
  defaultSelectedIds,
  onSelectionChange,
  onDelete,
  searchPlaceholder = 'Search experiments...',
  className = '',
}: ListProps) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(defaultSelectedIds ?? []),
  )

  const filtered = useMemo(() => {
    if (!query.trim()) return items
    const q = query.toLowerCase()
    return items.filter(
      i =>
        i.name.toLowerCase().includes(q) ||
        (i.parent?.toLowerCase().includes(q) ?? false),
    )
  }, [items, query])

  const allSelected = filtered.length > 0 && filtered.every(i => selected.has(i.id))
  const someSelected = filtered.some(i => selected.has(i.id))
  const effectiveTotal = total ?? items.length
  const pageStart = filtered.length === 0 ? 0 : (page - 1) * items.length + 1
  const pageEnd = filtered.length === 0 ? 0 : pageStart + filtered.length - 1

  const commit = (next: Set<string>) => {
    setSelected(next)
    onSelectionChange?.(Array.from(next))
  }

  const toggleAll = () => {
    const next = new Set(selected)
    if (allSelected) filtered.forEach(i => next.delete(i.id))
    else filtered.forEach(i => next.add(i.id))
    commit(next)
  }

  const toggleOne = (id: string) => {
    const next = new Set(selected)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    commit(next)
  }

  return (
    <div
      className={`rounded-3xl border p-4 flex flex-col gap-3 ${className}`}
      style={{
        backgroundColor: 'rgb(var(--color-bg))',
        borderColor: 'rgb(var(--color-border))',
      }}
    >
      {searchable && (
        <div className="relative">
          <span
            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: 'rgb(var(--color-text-muted))' }}
          >
            <SearchIcon className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-11 pr-4 py-3 text-sm border focus:outline-none transition-colors"
            style={{
              backgroundColor: 'rgb(var(--color-bg-secondary))',
              borderColor: 'rgb(var(--color-border))',
              color: 'rgb(var(--color-text))',
              borderRadius: '9999px',
            }}
          />
        </div>
      )}

      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-3">
          {selectable && (
            <Checkbox
              checked={allSelected}
              indeterminate={!allSelected && someSelected}
              onChange={toggleAll}
            />
          )}
          {selectable && (
            <button
              type="button"
              onClick={toggleAll}
              className="text-sm font-medium hover:underline"
              style={{ color: 'rgb(var(--color-primary))' }}
            >
              {allSelected
                ? `Deselect all ${filtered.length} on this page`
                : `Select all ${filtered.length} on this page`}
            </button>
          )}
          {onDelete && selected.size > 0 && (
            <button
              type="button"
              onClick={() => onDelete(Array.from(selected))}
              aria-label="Delete selected"
              className="ml-2 shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-colors"
              style={{ color: 'rgb(var(--color-text-muted))' }}
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          )}
        </div>
        <span
          className="text-sm tabular-nums shrink-0"
          style={{ color: 'rgb(var(--color-text-muted))' }}
        >
          {pageStart}-{pageEnd} of {effectiveTotal}
        </span>
      </div>

      <ul className="flex flex-col">
        {filtered.length === 0 ? (
          <li
            className="px-3 py-6 text-sm text-center"
            style={{ color: 'rgb(var(--color-text-muted))' }}
          >
            No items.
          </li>
        ) : (
          filtered.map((item, i) => {
            const isSelected = selected.has(item.id)
            const isLast = i === filtered.length - 1
            return (
              <li key={item.id}>
                <label
                  className="flex items-center gap-3 px-2 py-3 cursor-pointer transition-colors"
                  style={{
                    borderBottom: isLast
                      ? 'none'
                      : '1px solid rgb(var(--color-border) / 0.6)',
                  }}
                >
                  {selectable && (
                    <Checkbox checked={isSelected} onChange={() => toggleOne(item.id)} />
                  )}
                  {item.status && (
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: STATUS_DOT[item.status] }}
                      aria-label={item.status}
                    />
                  )}
                  <span className="flex-1 min-w-0 text-sm truncate">
                    {item.parent && (
                      <span style={{ color: 'rgb(var(--color-text-muted))' }}>
                        {item.parent} / <span aria-hidden>…</span> /{' '}
                      </span>
                    )}
                    <span
                      className="font-medium"
                      style={{ color: 'rgb(var(--color-text))' }}
                    >
                      {item.name}
                    </span>
                  </span>
                  {item.meta && (
                    <span
                      className="shrink-0 text-sm tabular-nums"
                      style={{ color: 'rgb(var(--color-text-muted))' }}
                    >
                      {item.meta}
                    </span>
                  )}
                </label>
              </li>
            )
          })
        )}
      </ul>
    </div>
  )
}
