import React from 'react'
import { usePageContext } from 'vike-react/usePageContext'

const navigation = [
  {
    section: 'Introduction',
    items: [
      { label: 'Overview', href: '/', icon: '🏠' },
      { label: 'Getting Started', href: '/getting-started', icon: '🚀' },
      { label: 'Installation', href: '/installation', icon: '📦' },
    ],
  },
  {
    section: 'Guides',
    items: [
      { label: 'Configuration', href: '/configuration', icon: '⚙️' },
      { label: 'Components', href: '/components', icon: '🧩' },
      { label: 'Theming', href: '/theming', icon: '🎨' },
    ],
  },
  {
    section: 'Reference',
    items: [
      { label: 'API Reference', href: '/api-reference', icon: '📖' },
    ],
  },
]

export function Sidebar() {
  const pageContext = usePageContext()
  const currentPath = pageContext.urlPathname

  return (
    <aside
      className="w-64 shrink-0 border-r min-h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto hidden md:block"
      style={{
        backgroundColor: 'rgb(var(--color-sidebar-bg))',
        borderColor: 'rgb(var(--color-sidebar-border))',
      }}
    >
      {/* Nav */}
      <nav className="px-3 py-4 space-y-6">
        {navigation.map((group) => (
          <div key={group.section}>
            <p className="px-3 mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
              {group.section}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = currentPath === item.href
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={[
                        'flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors',
                        isActive
                          ? 'bg-indigo-50 text-indigo-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                      ].join(' ')}
                    >
                      <span className="text-base leading-none">{item.icon}</span>
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div
        className="px-6 py-4 border-t mt-auto"
        style={{ borderColor: 'rgb(var(--color-sidebar-border))' }}
      >
        <p className="text-xs text-gray-400">v0.1.0</p>
      </div>
    </aside>
  )
}
