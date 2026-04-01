import React from 'react'
import { usePageContext } from 'vike-react/usePageContext'
import { Sidebar } from '../components/Sidebar'
import { Navbar } from '../components/Navbar'
import { DocFooter } from '../components/DocFooter'
import { ThemeProvider } from '../components/ThemeContext'
import { TOC } from '../components/TOC'
import { Search } from '../components/Search'
import { pages } from '../lib/navigation'
import '../styles/global.css'

function PageHeader() {
  const { urlPathname } = usePageContext()
  const meta = pages.find(p => p.path === urlPathname)
  if (!meta || urlPathname === '/') return null
  return (
    <div className="mb-10">
      <p
        className="text-sm font-medium mb-2 uppercase tracking-wide"
        style={{ color: 'rgb(var(--color-primary))' }}
      >
        {meta.section}
      </p>
      <h1
        className="text-4xl font-bold tracking-tight mb-4"
        style={{ color: 'rgb(var(--color-text))' }}
      >
        {meta.title}
      </h1>
    </div>
  )
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div
        className="min-h-screen"
        style={{
          backgroundColor: 'rgb(var(--color-bg))',
          color: 'rgb(var(--color-text))',
        }}
      >
        <Navbar />
        <Search />
        <div className="flex">
          <Sidebar />
          <div className="flex-1 min-w-0">
            <div className="flex">
              {/* main content — pb clears the fixed footer */}
              <main className="flex-1 min-w-0 px-8 py-10 pb-[180px]">
                <div className="max-w-2xl mx-auto">
                  <PageHeader />
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
