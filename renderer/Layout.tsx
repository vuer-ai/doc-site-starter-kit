import React from 'react'
import { Sidebar } from '../components/Sidebar'
import { Navbar } from '../components/Navbar'
import { DocFooter } from '../components/DocFooter'
import { ThemeProvider } from '../components/ThemeContext'
import { TOC } from '../components/TOC'
import '../styles/global.css'

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
        <div className="flex">
          <Sidebar />
          <div className="flex-1 min-w-0">
            <div className="flex">
              {/* main content — pb clears the fixed footer */}
              <main className="flex-1 min-w-0 px-8 py-10 pb-[180px]">
                <div className="max-w-2xl mx-auto">
                  {children}
                </div>
              </main>
              <div className="hidden lg:block w-56 shrink-0 px-4 pt-12 pb-10">
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
