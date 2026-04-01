import React from 'react'
import { Sidebar } from '../components/Sidebar'
import { Navbar } from '../components/Navbar'
import { ThemeProvider } from '../components/ThemeContext'
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
          <main className="flex-1 min-w-0">
            <div className="max-w-4xl mx-auto px-8 py-12">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}
