import React, { useState } from 'react'
import { Sun, Moon, SunMoon, Search as SearchIcon } from 'lucide-react'
import { useTheme, type Theme } from './ThemeContext'
import { openSearch } from './Search'

const themes: { value: Theme; icon: React.ReactNode; label: string }[] = [
  { value: 'light',  icon: <Sun size={14} />,     label: 'Light' },
  { value: 'dark',   icon: <Moon size={14} />,    label: 'Dark' },
  { value: 'system', icon: <SunMoon size={14} />, label: 'System' },
]

const ICON_SIZE = 28
const GAP = 2

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [hovered, setHovered] = useState(false)
  const currentIndex = themes.findIndex(t => t.value === theme)
  const expandedWidth = ICON_SIZE * 3 + GAP * 2

  return (
    <header
      className="h-14 flex items-center px-5 border-b sticky top-0 z-30"
      style={{
        backgroundColor: 'rgb(var(--color-bg))',
        borderColor: 'rgb(var(--color-border))',
      }}
    >
      {/* Left: logo */}
      <div className="flex-1">
        <a href="/" className="flex items-center gap-2.5 group w-fit">
          <div
            className="w-6 h-6 rounded-[7px] flex items-center justify-center text-white font-semibold text-xs"
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
      </div>

      {/* Center: search */}
      <button
        onClick={openSearch}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm w-64 cursor-pointer"
        style={{
          backgroundColor: 'rgb(var(--color-bg-secondary))',
          color: 'rgb(var(--color-text-muted))',
        }}
      >
        <SearchIcon size={14} />
        <span className="flex-1 text-left">Search...</span>
        <kbd className="text-xs">⌘K</kbd>
      </button>

      {/* Right: theme toggle with sliding highlight */}
      <div className="flex-1 flex justify-end items-center">
        <div
          className="relative overflow-hidden rounded-full"
          style={{
            width: hovered ? expandedWidth : ICON_SIZE,
            height: ICON_SIZE,
            backgroundColor: 'rgb(var(--color-bg-secondary))',
            transition: 'width 350ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Sliding strip (moves so current icon is visible when collapsed) */}
          <div
            className="absolute top-0 left-0 flex items-center"
            style={{
              height: ICON_SIZE,
              gap: GAP,
              transition: 'transform 350ms cubic-bezier(0.4, 0, 0.2, 1)',
              transform: hovered
                ? 'translateX(0)'
                : `translateX(-${currentIndex * (ICON_SIZE + GAP)}px)`,
            }}
          >
            {/* Highlight pill */}
            <div
              className="absolute rounded-full"
              style={{
                left: currentIndex * (ICON_SIZE + GAP),
                width: ICON_SIZE,
                height: ICON_SIZE,
                backgroundColor: 'rgb(var(--color-primary-muted))',
                transition: 'left 350ms cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />

            {/* Icon buttons */}
            {themes.map((t) => (
              <button
                key={t.value}
                onClick={() => setTheme(t.value)}
                aria-label={`${t.label} theme`}
                className="relative z-10 flex items-center justify-center cursor-pointer"
                style={{
                  width: ICON_SIZE,
                  height: ICON_SIZE,
                  color:
                    t.value === theme
                      ? 'rgb(var(--color-primary))'
                      : 'rgb(var(--color-text-muted))',
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                }}
              >
                {t.icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
