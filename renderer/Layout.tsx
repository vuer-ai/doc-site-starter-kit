import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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

        {/* Frosted glass footer — fixed, starts after sidebar on md+ */}
        <footer
          className="fixed bottom-0 left-0 md:left-56 right-0 z-40"
          style={{
            height: '150px',
            backgroundColor: 'var(--color-bg-fog)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderTop: '1px solid rgb(var(--color-border) / 0.5)',
          }}
        >
          <div className="h-full max-w-2xl mx-auto px-8 flex items-center justify-between">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                color: 'rgb(var(--color-text-muted))',
                border: '1px solid rgb(var(--color-border))',
                backgroundColor: 'rgb(var(--color-bg-secondary))',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = 'rgb(var(--color-text))'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = 'rgb(var(--color-text-muted))'
              }}
            >
              <ChevronLeft size={15} />
              Previous
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                color: 'rgb(var(--color-text-muted))',
                border: '1px solid rgb(var(--color-border))',
                backgroundColor: 'rgb(var(--color-bg-secondary))',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = 'rgb(var(--color-text))'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = 'rgb(var(--color-text-muted))'
              }}
            >
              Next
              <ChevronRight size={15} />
            </button>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}
