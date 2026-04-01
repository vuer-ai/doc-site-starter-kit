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
          <div className="flex-1 min-w-0 flex flex-col">
            {/* main scrollable area */}
            <div className="flex flex-1">
              {/* fixed-width content column */}
              <main className="flex-1 min-w-0 px-8 py-12 pb-24">
                <div className="max-w-2xl mx-auto">
                  {children}
                </div>
              </main>
              {/* TOC column */}
              <div className="hidden lg:block w-64 shrink-0 px-4 py-12">
                <TOC />
              </div>
            </div>

            {/* Frosted glass footer - fixed to bottom */}
            <footer
              className="fixed bottom-0 left-0 right-0 z-50 border-t"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderColor: 'rgba(229, 231, 235, 0.8)',
              }}
            >
              <div className="max-w-2xl mx-auto px-8 py-3 flex items-center justify-between">
                <span className="text-xs text-gray-400">Doc Site Starter Kit</span>
                <span className="text-xs text-gray-400">v0.1.0</span>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}
