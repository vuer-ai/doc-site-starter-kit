import React from 'react'
import { usePageContext } from 'vike-react/usePageContext'
import { pages } from '../lib/navigation'

// Group pages by section for sidebar rendering
const sections = pages.reduce<Record<string, typeof pages>>((acc, page) => {
  ;(acc[page.section] ??= []).push(page)
  return acc
}, {})

export function Sidebar() {
  const { urlPathname } = usePageContext()

  return (
    <aside
      className="w-56 shrink-0 border-r h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto hidden md:block pt-12 pb-8"
      style={{
        backgroundColor: 'rgb(var(--color-sidebar-bg))',
        borderColor: 'rgb(var(--color-sidebar-border))',
      }}
    >
      <nav aria-label="Documentation" className="px-3 space-y-5">
        {Object.entries(sections).map(([section, items]) => (
          <div key={section}>
            <p
              className="px-3 mb-1.5 text-xs font-semibold uppercase tracking-wider"
              style={{ color: '#4F7BFF' }}
            >
              {section}
            </p>
            <ul className="space-y-0.5">
              {items.map(item => (
                <li key={item.path}>
                  <a
                    href={item.path}
                    className={`sidebar-link${urlPathname === item.path ? ' active' : ''}`}
                    aria-current={urlPathname === item.path ? 'page' : undefined}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
