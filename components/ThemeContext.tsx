import React, { createContext, useContext, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark' | 'system'

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  setTheme: () => {},
})

function readStoredTheme(): Theme {
  const stored = localStorage.getItem('theme') as Theme | null
  if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
  return 'light'
}

function writeThemeCookie(t: Theme) {
  // `theme` is the user's selection (including 'system'); `theme-resolved`
  // is what's currently visually applied (light|dark). The server reads the
  // latter to pick the initial `data-theme` on the HTML, avoiding a
  // light → dark flash on refresh for users on 'system' in dark mode.
  document.cookie = `theme=${t}; path=/; max-age=31536000; SameSite=Lax`
  const resolved =
    t === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : t
  document.cookie = `theme-resolved=${resolved}; path=/; max-age=31536000; SameSite=Lax`
}

function applyTheme(t: Theme) {
  if (t === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light')
  } else {
    document.documentElement.setAttribute('data-theme', t)
  }
}

export function ThemeProvider({
  children,
  initialTheme = 'light',
}: {
  children: React.ReactNode
  initialTheme?: Theme
}) {
  // Server passes in the user's selected theme from the cookie; the first
  // client render must use the same value to avoid a hydration mismatch
  // (and avoid the "Light flashes active, then snaps to Dark" flicker in
  // the Navbar toggle).
  const [theme, setThemeState] = useState<Theme>(initialTheme)

  useEffect(() => {
    const stored = readStoredTheme()
    if (stored !== theme) setThemeState(stored)
    writeThemeCookie(stored)
    applyTheme(stored)

    // Re-apply if the user's system preference flips while 'system' is selected
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      if (readStoredTheme() === 'system') applyTheme('system')
    }
    mq.addEventListener('change', onChange)

    // Re-enable transitions after first paint
    requestAnimationFrame(() => {
      document.documentElement.classList.remove('no-transitions')
    })

    return () => mq.removeEventListener('change', onChange)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function setTheme(newTheme: Theme) {
    setThemeState(newTheme)
    localStorage.setItem('theme', newTheme)
    writeThemeCookie(newTheme)
    applyTheme(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext)
}
