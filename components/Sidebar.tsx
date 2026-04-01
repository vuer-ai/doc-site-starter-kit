import React from 'react'
import { usePageContext } from 'vike-react/usePageContext'

const navigation = [
  {
    section: 'Introduction',
    items: [
      { label: 'Overview', href: '/' },
      { label: 'Getting Started', href: '/getting-started' },
      { label: 'Installation', href: '/installation' },
    ],
  },
  {
    section: 'Guides',
    items: [
      { label: 'Configuration', href: '/configuration' },
      { label: 'Components', href: '/components' },
      { label: 'Theming', href: '/theming' },
    ],
  },
  {
    section: 'Reference',
    items: [
      { label: 'API Reference', href: '/api-reference' },
    ],
  },
]

export function Sidebar() {
  const pageContext = usePageContext()
  const currentPath = pageContext.urlPathname

  return (
    <aside
      className="w-56 shrink-0 border-r min-h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto hidden md:block"
      style={{
        backgroundColor: 'rgb(var(--color-sidebar-bg))',
        borderColor: 'rgb(var(--color-sidebar-border))',
      }}
    >
      <nav className="px-3 py-5 space-y-5">
        {navigation.map((group) => (
          <div key={group.section}>
            <p
              className="px-3 mb-1.5 text-xs font-semibold uppercase tracking-wider"
              style={{ color: 'rgb(var(--color-text-muted))' }}
            >
              {group.section}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = currentPath === item.href
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={`sidebar-link${isActive ? ' active' : ''}`}
                    >
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
