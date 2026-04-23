import React, { useState } from 'react'

export interface TabDef {
  /** Stable identifier for the tab. */
  id: string
  /** Visible label. */
  label: string
}

export interface TabsProps {
  /** Tabs to render, in order. */
  tabs: TabDef[]
  /** Controlled active tab id. Omit for uncontrolled use. */
  value?: string
  /** Initial active tab id when uncontrolled. Defaults to the first tab. */
  defaultValue?: string
  /** Fires with the id of the newly activated tab. */
  onChange?: (id: string) => void
  /** Extra classes on the outer container. */
  className?: string
}

export function Tabs({
  tabs,
  value,
  defaultValue,
  onChange,
  className = '',
}: TabsProps) {
  const [internal, setInternal] = useState(defaultValue ?? tabs[0]?.id ?? '')
  const active = value ?? internal

  const select = (id: string) => {
    if (value === undefined) setInternal(id)
    onChange?.(id)
  }

  return (
    <div
      role="tablist"
      className={`inline-flex items-center gap-1 p-1 bg-gray-800/40 border border-gray-800 rounded-full ${className}`}
    >
      {tabs.map(t => {
        const isActive = active === t.id
        return (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => select(t.id)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
              isActive
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {t.label}
          </button>
        )
      })}
    </div>
  )
}

export interface IconTabDef {
  /** Stable identifier for the tab. */
  id: string
  /** Icon glyph to render inside the button. */
  icon: React.ReactNode
  /** Accessible name for screen readers / tooltip. */
  label: string
}

export interface IconTabsProps {
  /** Tabs to render, in order. */
  tabs: IconTabDef[]
  /** Controlled active tab id. Omit for uncontrolled use. */
  value?: string
  /** Initial active tab id when uncontrolled. Defaults to the first tab. */
  defaultValue?: string
  /** Fires with the id of the newly activated tab. */
  onChange?: (id: string) => void
  /** Extra classes on the outer container. */
  className?: string
}

/**
 * Icon-only segmented control. Same pill container as `Tabs`, but each button
 * is square-ish and renders an icon. Use for view switchers (list / grid) or
 * other tight toolbars.
 */
export function IconTabs({
  tabs,
  value,
  defaultValue,
  onChange,
  className = '',
}: IconTabsProps) {
  const [internal, setInternal] = useState(defaultValue ?? tabs[0]?.id ?? '')
  const active = value ?? internal

  const select = (id: string) => {
    if (value === undefined) setInternal(id)
    onChange?.(id)
  }

  return (
    <div
      role="tablist"
      className={`inline-flex items-center gap-1 p-1 bg-gray-800/40 border border-gray-800 rounded-full ${className}`}
    >
      {tabs.map(t => {
        const isActive = active === t.id
        return (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={t.label}
            title={t.label}
            onClick={() => select(t.id)}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
              isActive
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {t.icon}
          </button>
        )
      })}
    </div>
  )
}

/**
 * Underline-style tab group — large bold labels with a blue underline under the
 * active tab, sitting on a thin bottom divider. Suited for page-level section
 * switchers (e.g. Projects / Activity / Settings on an org page).
 */
export function UnderlineTabs({
  tabs,
  value,
  defaultValue,
  onChange,
  className = '',
}: TabsProps) {
  const [internal, setInternal] = useState(defaultValue ?? tabs[0]?.id ?? '')
  const active = value ?? internal

  const select = (id: string) => {
    if (value === undefined) setInternal(id)
    onChange?.(id)
  }

  return (
    <div
      role="tablist"
      className={`flex items-end gap-10 border-b ${className}`}
      style={{ borderColor: 'rgb(var(--color-border))' }}
    >
      {tabs.map(t => {
        const isActive = active === t.id
        return (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => select(t.id)}
            className="pb-3 -mb-px text-xl font-semibold transition-colors focus:outline-none"
            style={{
              borderBottom: '3px solid',
              borderBottomColor: isActive
                ? 'rgb(96 165 250)'
                : 'transparent',
              color: isActive
                ? 'rgb(96 165 250)'
                : 'rgb(var(--color-text-muted))',
            }}
            onMouseEnter={e => {
              if (!isActive) e.currentTarget.style.color = 'rgb(var(--color-text))'
            }}
            onMouseLeave={e => {
              if (!isActive) e.currentTarget.style.color = 'rgb(var(--color-text-muted))'
            }}
          >
            {t.label}
          </button>
        )
      })}
    </div>
  )
}
