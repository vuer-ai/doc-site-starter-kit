import React, { useState, useEffect, useRef } from 'react'
import { Search as SearchIcon } from 'lucide-react'
import { pages } from '../lib/navigation'

let _setOpen: ((v: boolean) => void) | null = null

export function openSearch() {
  _setOpen?.(true)
}

export function Search() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  _setOpen = setOpen

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === '/' && !isInputFocused()) {
        e.preventDefault()
        setOpen(true)
      }
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(true)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIndex(0)
      setTimeout(() => inputRef.current?.focus(), 10)
    }
  }, [open])

  const results = query.trim()
    ? pages.filter(
        p =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.section.toLowerCase().includes(query.toLowerCase())
      )
    : pages

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(i => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      const page = results[activeIndex]
      if (page) {
        window.location.href = page.path
        setOpen(false)
      }
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Search documentation"
      style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-lg rounded-xl shadow-2xl overflow-hidden"
        style={{
          backgroundColor: 'rgb(var(--color-bg))',
          border: '1px solid rgb(var(--color-border))',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div
          className="flex items-center gap-3 px-4 border-b"
          style={{ borderColor: 'rgb(var(--color-border))' }}
        >
          <SearchIcon size={16} style={{ color: 'rgb(var(--color-text-muted))' }} />
          <input
            ref={inputRef}
            value={query}
            onChange={e => {
              setQuery(e.target.value)
              setActiveIndex(0)
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search pages..."
            aria-label="Search pages"
            className="flex-1 py-4 bg-transparent outline-none text-sm"
            style={{ color: 'rgb(var(--color-text))' }}
          />
          <kbd
            className="text-xs px-1.5 py-0.5 rounded"
            style={{
              backgroundColor: 'rgb(var(--color-bg-secondary))',
              border: '1px solid rgb(var(--color-border))',
              color: 'rgb(var(--color-text-muted))',
            }}
          >
            Esc
          </kbd>
        </div>

        <ul className="py-2 max-h-80 overflow-y-auto" role="listbox" aria-label="Search results">
          {results.map((page, idx) => (
            <li key={page.path} role="option" aria-selected={idx === activeIndex}>
              <a
                href={page.path}
                onClick={() => setOpen(false)}
                onMouseEnter={() => setActiveIndex(idx)}
                className="flex items-center justify-between px-4 py-2.5 text-sm transition-colors"
                style={{
                  backgroundColor:
                    idx === activeIndex ? 'rgb(var(--color-hover))' : 'transparent',
                  color: 'rgb(var(--color-text))',
                  textDecoration: 'none',
                }}
              >
                <span>{page.title}</span>
                <span
                  className="text-xs ml-3 shrink-0"
                  style={{ color: 'rgb(var(--color-text-muted))' }}
                >
                  {page.section}
                </span>
              </a>
            </li>
          ))}
          {results.length === 0 && (
            <li
              className="px-4 py-8 text-center text-sm"
              style={{ color: 'rgb(var(--color-text-muted))' }}
            >
              No results for &ldquo;{query}&rdquo;
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

function isInputFocused() {
  const tag = document.activeElement?.tagName.toLowerCase()
  return (
    tag === 'input' ||
    tag === 'textarea' ||
    (document.activeElement as HTMLElement)?.isContentEditable
  )
}
