import React from 'react'
import { CodeBlock } from '../../../components/CodeBlock'

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">System</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Interaction Model</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          How user interactions flow through the system — from browser events to state changes to
          re-renders.
        </p>
      </div>

      {/* Theme Switching */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Theme Switching</h2>
        <p className="text-gray-600 mb-4">
          Theme is controlled via a <code className="font-mono text-indigo-600">data-theme</code>{' '}
          attribute on the root <code className="font-mono text-indigo-600">&lt;html&gt;</code>{' '}
          element. The current selection is persisted to{' '}
          <code className="font-mono text-indigo-600">localStorage</code> so it survives page
          reloads. On load, a blocking script reads the stored value before first paint to avoid a
          flash of the wrong theme.
        </p>
        <CodeBlock
          language="tsx"
          code={`import { useState, useEffect } from 'react'

type Theme = 'light' | 'dark' | 'system'

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'system'
    return (localStorage.getItem('theme') as Theme) || 'system'
  })

  useEffect(() => {
    const resolved = theme === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme

    document.documentElement.setAttribute('data-theme', resolved)
    localStorage.setItem('theme', theme)
  }, [theme])

  return { theme, setTheme: setThemeState }
}`}
        />
      </div>

      {/* Navigation */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Navigation</h2>
        <p className="text-gray-600 mb-4">
          Vike provides client-side routing out of the box. When the user clicks an internal link,
          Vike intercepts the navigation, fetches only the new page's data, and re-renders the page
          component without a full page reload. The layout and shell remain mounted.
        </p>
        <CodeBlock
          language="tsx"
          code={`import { usePageContext } from 'vike-react/usePageContext'

export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const { urlPathname } = usePageContext()
  const isActive = urlPathname === href || urlPathname.startsWith(href + '/')

  return (
    <a
      href={href}
      className={[
        'block px-3 py-1.5 rounded-md text-sm transition',
        isActive
          ? 'bg-indigo-50 text-indigo-600 font-medium'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
      ].join(' ')}
    >
      {children}
    </a>
  )
}`}
        />
      </div>

      {/* Search */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Search</h2>
        <p className="text-gray-600 mb-4">
          The search dialog is triggered by the{' '}
          <kbd className="px-1.5 py-0.5 rounded bg-gray-100 border border-gray-200 text-xs font-mono text-gray-700">
            &#8984;K
          </kbd>{' '}
          keyboard shortcut (or <kbd className="px-1.5 py-0.5 rounded bg-gray-100 border border-gray-200 text-xs font-mono text-gray-700">Ctrl+K</kbd> on
          non-Mac systems). A global keydown listener opens the modal, and focus is trapped inside it
          while open.
        </p>
        <CodeBlock
          language="tsx"
          code={`import { useState, useEffect } from 'react'

export function useSearchShortcut() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return { isOpen, setIsOpen }
}`}
        />
      </div>

      {/* Scroll Tracking */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Scroll Tracking</h2>
        <p className="text-gray-600 mb-4">
          The table of contents highlights the current section using{' '}
          <code className="font-mono text-indigo-600">IntersectionObserver</code>. Each heading
          element is observed, and when it enters the viewport the corresponding TOC link is marked
          active.
        </p>
        <CodeBlock
          language="tsx"
          code={`import { useState, useEffect } from 'react'

export function useActiveHeading(headingIds: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )

    for (const id of headingIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [headingIds])

  return activeId
}`}
        />
      </div>
    </div>
  )
}
