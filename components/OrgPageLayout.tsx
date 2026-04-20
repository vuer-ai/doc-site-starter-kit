import React from 'react'

export interface OrgPageLayoutProps {
  /** Brand shown at the top-left of the navbar (e.g. product name, logo). */
  brand?: React.ReactNode
  /** Right-aligned navbar content — typically links or user menu. */
  navRight?: React.ReactNode
  /** Left sidebar content — typically an avatar + profile card. */
  sidebar?: React.ReactNode
  /** Tabs row at the top of the main column. */
  tabs?: React.ReactNode
  /** Toolbar below the tabs — typically a search input and a primary action. */
  toolbar?: React.ReactNode
  /** Main content — typically a grid of project or item cards. */
  children?: React.ReactNode
  /** Extra classes on the outer shell. */
  className?: string
}

/**
 * Page shell for an organization / project overview:
 *
 *   ┌────────────────────────────────────────────┐
 *   │  brand                          navRight   │   navbar
 *   ├──────────────┬─────────────────────────────┤
 *   │              │  tabs                       │
 *   │   sidebar    │  toolbar                    │
 *   │              │  children (grid of cards)   │
 *   └──────────────┴─────────────────────────────┘
 */
export function OrgPageLayout({
  brand,
  navRight,
  sidebar,
  tabs,
  toolbar,
  children,
  className = '',
}: OrgPageLayoutProps) {
  return (
    <div
      className={`relative min-h-[600px] text-gray-100 overflow-hidden ${className}`}
      style={{
        background:
          'linear-gradient(135deg, #0c1220 0%, #0a0e1a 50%, #070a14 100%)',
      }}
    >
      <header className="flex items-center justify-between px-6 sm:px-10 lg:px-12 py-5 sm:py-6">
        <div className="font-extrabold text-lg sm:text-xl tracking-tight text-gray-50">
          {brand}
        </div>
        <nav className="flex items-center gap-5 sm:gap-8 text-sm text-gray-300">
          {navRight}
        </nav>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(280px,440px)_minmax(0,1fr)] gap-8 lg:gap-12 px-6 sm:px-10 lg:px-12 pb-12 lg:pb-16">
        <aside className="min-w-0">{sidebar}</aside>
        <main className="min-w-0 space-y-6 lg:pt-2">
          {tabs && <div>{tabs}</div>}
          {toolbar && <div>{toolbar}</div>}
          <div>{children}</div>
        </main>
      </div>
    </div>
  )
}
