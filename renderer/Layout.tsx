import React from 'react'
import { Sidebar } from '../components/Sidebar'
import { Navbar } from '../components/Navbar'
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
          <div className="flex-1 min-w-0 flex flex-col min-h-[calc(100vh-3.5rem)]">
            <div className="flex flex-1">
              <main className="flex-1 min-w-0 px-8 py-10">
                <div className="max-w-2xl mx-auto">
                  {children}
                </div>
              </main>
              <div className="hidden lg:block w-56 shrink-0 px-4 py-10">
                <TOC />
              </div>
            </div>

            <footer
              className="border-t"
              style={{
                backgroundColor: 'rgb(var(--color-bg-secondary))',
                borderColor: 'rgb(var(--color-border))',
              }}
            >
              <div className="max-w-2xl mx-auto px-8 py-4 flex items-center justify-between">
                <span className="text-xs" style={{ color: 'rgb(var(--color-text-muted))' }}>
                  Doc Site Starter Kit
                </span>
                <span className="text-xs" style={{ color: 'rgb(var(--color-text-muted))' }}>
                  v0.1.0
                </span>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}
