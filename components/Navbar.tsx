import React from 'react'
import { Sun, Moon, SunMoon } from 'lucide-react'
import { useTheme, type Theme } from './ThemeContext'

export function Navbar() {
  const { theme, setTheme } = useTheme()

  const buttons: { value: Theme; icon: React.ReactNode; label: string }[] = [
    { value: 'light', icon: <Sun size={14} />, label: 'Light' },
    { value: 'dark',  icon: <Moon size={14} />, label: 'Dark' },
    { value: 'system', icon: <SunMoon size={14} />, label: 'System' },
  ]

  return (
    <header
      className="h-14 flex items-center px-5 border-b sticky top-0 z-30"
      style={{
        backgroundColor: 'rgb(var(--color-bg))',
        borderColor: 'rgb(var(--color-border))',
      }}
    >
      <a href="/" className="flex items-center gap-2.5 group">
        <div
          className="w-6 h-6 rounded-md flex items-center justify-center text-white font-semibold text-xs"
          style={{ backgroundColor: 'rgb(var(--color-primary))' }}
        >
          D
        </div>
        <span className="font-semibold text-sm tracking-tight" style={{ color: 'rgb(var(--color-text))' }}>
          Doc Site
          <span className="font-normal ml-1" style={{ color: 'rgb(var(--color-text-muted))' }}>
            Starter Kit
          </span>
        </span>
      </a>

      <div className="flex-1" />

      <div
        className="flex items-center gap-0.5 rounded-md p-0.5"
        style={{
          backgroundColor: 'rgb(var(--color-bg-secondary))',
          border: '1px solid rgb(var(--color-border))',
        }}
      >
        {buttons.map(({ value, icon, label }) => {
          const isActive = theme === value
          return (
            <button
              key={value}
              onClick={() => setTheme(value)}
              aria-label={`${label} theme`}
              title={`${label} theme`}
              className="flex items-center justify-center w-7 h-7 rounded transition-colors"
              style={
                isActive
                  ? {
                      backgroundColor: 'rgb(var(--color-bg))',
                      color: 'rgb(var(--color-primary))',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    }
                  : { color: 'rgb(var(--color-text-muted))' }
              }
            >
              {icon}
            </button>
          )
        })}
      </div>
    </header>
  )
}
