import React from 'react'
import { usePageContext } from 'vike-react/usePageContext'
import { Sidebar } from '../components/Sidebar'
import { Navbar } from '../components/Navbar'
import { DocFooter } from '../components/DocFooter'
import { ThemeProvider, type Theme } from '../components/ThemeContext'
import { TOC } from '../components/TOC'
import { Search } from '../components/Search'
import '../styles/global.css'

export function Layout({ children }: { children: React.ReactNode }) {
  const pageContext = usePageContext() as { themeSelection?: Theme }
  return (
    <ThemeProvider initialTheme={pageContext.themeSelection}>
      <div
        className="h-screen flex flex-col"
        style={{
          backgroundColor: 'rgb(var(--color-bg))',
          color: 'rgb(var(--color-text))',
        }}
      >
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Navbar />
        <Search />
        {/* Sidebar + main live in their own flex row with constrained height so
            each column scrolls independently. This keeps the sidebar rock-stable
            when the main content swaps during SPA navigation. */}
        <div className="flex flex-1 min-h-0">
          <Sidebar />
          <div id="main-scroll" className="flex-1 min-w-0 overflow-y-auto">
            <div className="flex">
              {/* main content — pb clears the fixed footer */}
              <main id="main-content" className="flex-1 min-w-0 px-8 py-10 pb-[180px]">
                <div className="max-w-2xl mx-auto">
                  {children}
                </div>
              </main>
              <div className="hidden lg:block w-72 shrink-0 px-4 pt-12 pb-10">
                <TOC />
              </div>
            </div>
          </div>
        </div>

        <DocFooter />
      </div>
    </ThemeProvider>
  )
}
