import React from 'react'
import { Sun, Moon, SunMoon, Search as SearchIcon } from 'lucide-react'
import { useTheme, type Theme } from './ThemeContext'
import { openSearch } from './Search'

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

      <button
        onClick={openSearch}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm flex-1 max-w-xs mx-4"
        style={{
          backgroundColor: 'rgb(var(--color-bg-secondary))',
          border: '1px solid rgb(var(--color-border))',
          color: 'rgb(var(--color-text-muted))',
        }}
      >
        <SearchIcon size={14} />
        <span className="flex-1 text-left">Search...</span>
        <kbd
          className="text-xs px-1.5 py-0.5 rounded"
          style={{
            backgroundColor: 'rgb(var(--color-bg))',
            border: '1px solid rgb(var(--color-border))',
          }}
        >
          ⌘K
        </kbd>
      </button>

      <div className="flex-1 max-w-[1px]" />

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
