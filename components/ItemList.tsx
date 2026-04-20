import React, { useState, useMemo } from 'react'

export type ListItemStatus = 'active' | 'idle' | 'error'

export interface ListItemData {
  id: string
  name: string
  parent?: string
  status?: ListItemStatus
  meta?: string
}

export interface ListProps {
  items: ListItemData[]
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

function Checkbox({ checked, indeterminate, onChange }: { checked: boolean; indeterminate?: boolean; onChange: () => void }) {
  const filled = checked || indeterminate
  return (
    <button
      type="button"
      onClick={onChange}
      aria-checked={indeterminate ? 'mixed' : checked}
      role="checkbox"
      className={`w-[18px] h-[18px] shrink-0 rounded-[5px] flex items-center justify-center transition-colors ${
        filled
          ? 'bg-blue-500 text-white'
          : 'bg-transparent border border-gray-600 hover:border-gray-500'
      }`}
    >
      {indeterminate ? (
        <div className="w-2.5 h-0.5 bg-white rounded-full" />
      ) : checked ? (
        <CheckIcon className="w-3 h-3" />
      ) : null}
    </button>
  )
}

const STATUS_DOT: Record<ListItemStatus, string> = {
  active: 'bg-emerald-500',
  idle: 'bg-gray-500',
  error: 'bg-red-500',
}

export function List({
  items,
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
    () => new Set(defaultSelectedIds ?? items.map(i => i.id))
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
      className={`bg-gray-900/60 border border-gray-800 rounded-3xl p-3 flex flex-col gap-3 ${className}`}
    >
      <div className="flex items-center gap-3">
        {selectable && (
          <Checkbox
            checked={allSelected}
            indeterminate={!allSelected && someSelected}
            onChange={toggleAll}
          />
        )}
        {searchable && (
          <div className="relative flex-1">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-11 pr-4 py-2.5 text-sm bg-gray-800/40 border border-gray-800 rounded-full text-gray-100 placeholder:text-gray-500 focus:outline-none focus:border-gray-700 transition-colors"
            />
          </div>
        )}
        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete(Array.from(selected))}
            aria-label="Delete selected"
            className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-colors"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        )}
      </div>

      {selectable && (
        <div className="px-2 text-xs text-emerald-400 flex items-center gap-1.5">
          <CheckIcon className="w-3 h-3" />
          <span>
            {allSelected
              ? `All ${filtered.length} ${filtered.length === 1 ? 'item' : 'items'} selected`
              : `${selected.size} of ${filtered.length} selected`}
          </span>
        </div>
      )}

      <ul className="flex flex-col">
        {filtered.length === 0 ? (
          <li className="px-3 py-6 text-sm text-gray-500 text-center">No items.</li>
        ) : (
          filtered.map(item => {
            const isSelected = selected.has(item.id)
            return (
              <li key={item.id}>
                <label className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
                  {selectable && (
                    <Checkbox checked={isSelected} onChange={() => toggleOne(item.id)} />
                  )}
                  {item.status && (
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${STATUS_DOT[item.status]}`}
                      aria-label={item.status}
                    />
                  )}
                  <span className="flex-1 min-w-0 text-sm truncate">
                    {item.parent && (
                      <span className="text-gray-500">{item.parent} / </span>
                    )}
                    <span className="text-gray-100">{item.name}</span>
                  </span>
                  {item.meta && (
                    <span className="shrink-0 text-xs text-gray-500">{item.meta}</span>
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
