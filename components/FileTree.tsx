import React, { useState, useMemo } from 'react'

export interface FileTreeItem {
  name: string
  icon?: React.ReactNode
  onClick?: () => void
}

export interface FileTreeProps {
  items: FileTreeItem[]
  searchable?: boolean
  searchPlaceholder?: string
  emptyText?: string
  className?: string
}

function FlaskIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 3h6" />
      <path d="M10 3v6l-4 9a2 2 0 0 0 1.8 2.8h8.4A2 2 0 0 0 18 18l-4-9V3" />
      <path d="M7.5 15h9" />
    </svg>
  )
}

function SearchIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  )
}

export function FileTree({
  items,
  searchable = true,
  searchPlaceholder = 'Search files...',
  emptyText = 'No files found.',
  className = '',
}: FileTreeProps) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return items
    const q = query.toLowerCase()
    return items.filter(i => i.name.toLowerCase().includes(q))
  }, [items, query])

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {searchable && (
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-11 pr-4 py-3 text-sm bg-gray-800/40 border border-gray-800 rounded-full text-gray-100 placeholder:text-gray-500 focus:outline-none focus:border-gray-700 transition-colors"
          />
        </div>
      )}

      <ul className="flex flex-col">
        {filtered.length === 0 ? (
          <li className="px-3 py-4 text-sm text-gray-500 text-center">{emptyText}</li>
        ) : (
          filtered.map((item, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={item.onClick}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-100 hover:bg-white/5 rounded-lg text-left transition-colors"
              >
                <span className="shrink-0 text-purple-300">
                  {item.icon ?? <FlaskIcon className="w-5 h-5" />}
                </span>
                <span className="truncate">{item.name}</span>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
