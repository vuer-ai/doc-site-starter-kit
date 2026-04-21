import React, { useState, useMemo } from 'react'

export type FileTreeStatus = 'running' | 'idle'

export interface FileTreeItem {
  name: string
  icon?: React.ReactNode
  onClick?: () => void
  children?: FileTreeItem[]
  status?: FileTreeStatus
}

function hasRunningDescendant(item: FileTreeItem): boolean {
  if (item.status === 'running') return true
  return !!item.children?.some(hasRunningDescendant)
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

function FolderIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
    </svg>
  )
}

function ChevronRightIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m9 6 6 6-6 6" />
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
  const [path, setPath] = useState<number[]>([])

  const rootItems = useMemo(() => {
    if (!query.trim()) return items
    const q = query.toLowerCase()
    return items.filter(i => i.name.toLowerCase().includes(q))
  }, [items, query])

  const columns: FileTreeItem[][] = [rootItems]
  let cursor: FileTreeItem[] = rootItems
  for (let depth = 0; depth < path.length; depth++) {
    const selected = cursor[path[depth]]
    if (!selected?.children?.length) break
    columns.push(selected.children)
    cursor = selected.children
  }

  function handleQueryChange(v: string) {
    setQuery(v)
    setPath([])
  }

  function handleClick(depth: number, index: number, item: FileTreeItem) {
    const nextPath = [...path.slice(0, depth), index]
    setPath(nextPath)
    if (!item.children?.length) item.onClick?.()
  }

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
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
            onChange={e => handleQueryChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-11 pr-4 py-3 text-sm border focus:outline-none transition-colors"
            style={{
              backgroundColor: 'rgb(var(--color-bg-secondary))',
              borderColor: 'rgb(var(--color-border))',
              color: 'rgb(var(--color-text))',
              borderRadius: '9999px',
            }}
            onFocus={e => {
              e.currentTarget.style.borderColor = 'rgb(var(--color-primary))'
              e.currentTarget.style.boxShadow = '0 0 0 3px rgb(var(--color-primary) / 0.2)'
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = 'rgb(var(--color-border))'
              e.currentTarget.style.boxShadow = 'none'
            }}
          />
        </div>
      )}

      <div className="flex items-stretch overflow-x-auto">
        {columns.map((col, depth) => (
          <div
            key={depth}
            className={`min-w-[200px] flex-shrink-0 ${depth > 0 ? 'pl-3 ml-3 border-l' : ''}`}
            style={depth > 0 ? { borderColor: 'rgb(var(--color-border))' } : undefined}
          >
            {col.length === 0 ? (
              <div
                className="px-3 py-4 text-sm text-center"
                style={{ color: 'rgb(var(--color-text-muted))' }}
              >
                {emptyText}
              </div>
            ) : (
              <ul className="flex flex-col">
                {col.map((item, i) => {
                  const hasChildren = !!item.children?.length
                  const isSelected = path[depth] === i
                  const isRunning = hasRunningDescendant(item)
                  const defaultIcon = hasChildren ? <FolderIcon className="w-5 h-5" /> : <FlaskIcon className="w-5 h-5" />
                  return (
                    <li key={i}>
                      <button
                        type="button"
                        onClick={() => handleClick(depth, i, item)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg text-left transition-colors"
                        style={{
                          color: 'rgb(var(--color-text))',
                          backgroundColor: isSelected ? 'rgb(var(--color-primary-muted))' : 'transparent',
                        }}
                        onMouseEnter={e => {
                          if (!isSelected) e.currentTarget.style.backgroundColor = 'var(--color-hover)'
                        }}
                        onMouseLeave={e => {
                          if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent'
                        }}
                      >
                        <span className={`relative shrink-0 ${hasChildren ? 'text-blue-500' : 'text-purple-500'}`}>
                          {item.icon ?? defaultIcon}
                          {isRunning && (
                            <span
                              className="file-tree-running-dot absolute top-0.5 -right-px"
                              aria-label="running"
                              title="Running experiment"
                            />
                          )}
                        </span>
                        <span className="truncate flex-1">{item.name}</span>
                        {hasChildren && (
                          <span
                            className="shrink-0"
                            style={{ color: 'rgb(var(--color-text-muted))' }}
                          >
                            <ChevronRightIcon className="w-4 h-4" />
                          </span>
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
