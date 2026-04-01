import React from 'react'
import { Sun, Moon, SunMoon } from 'lucide-react'
import { useTheme, type Theme } from './ThemeContext'

export function Navbar() {
  const { theme, setTheme } = useTheme()

  const buttons: { value: Theme; icon: React.ReactNode; label: string }[] = [
    { value: 'light', icon: <Sun size={15} />, label: 'Light' },
    { value: 'dark', icon: <Moon size={15} />, label: 'Dark' },
    { value: 'system', icon: <SunMoon size={15} />, label: 'System' },
  ]

  return (
    <header
      className="h-14 flex items-center px-4 border-b sticky top-0 z-30"
      style={{
        backgroundColor: 'rgb(var(--color-bg))',
        borderColor: 'rgb(var(--color-border))',
      }}
    >
      {/* Brand */}
      <a href="/" className="flex items-center gap-2.5 group">
        <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-bold text-sm group-hover:bg-indigo-600 transition-colors">
          D
        </div>
        <span
          className="font-semibold text-sm leading-tight"
          style={{ color: 'rgb(var(--color-text))' }}
        >
          Doc Site{' '}
          <span style={{ color: 'rgb(var(--color-text) / 0.5)', fontWeight: 400 }}>
            Starter Kit
          </span>
        </span>
      </a>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Theme switcher */}
      <div
        className="flex items-center gap-0.5 rounded-lg p-1"
        style={{ backgroundColor: 'rgb(var(--color-sidebar-bg))' }}
      >
        {buttons.map(({ value, icon, label }) => {
          const isActive = theme === value
          return (
            <button
              key={value}
              onClick={() => setTheme(value)}
              aria-label={`${label} theme`}
              title={`${label} theme`}
              className={[
                'flex items-center justify-center w-7 h-7 rounded-md transition-colors',
                isActive
                  ? 'bg-white shadow-sm text-indigo-600'
                  : 'text-gray-400 hover:text-gray-600',
              ].join(' ')}
              style={
                isActive
                  ? { backgroundColor: 'rgb(var(--color-bg))', color: 'rgb(99 102 241)' }
                  : {}
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
