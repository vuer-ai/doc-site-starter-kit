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
      className={`flex items-end gap-10 border-b border-gray-800/60 ${className}`}
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
            className={`pb-3 -mb-px border-b-2 text-lg font-semibold transition-colors focus:outline-none focus-visible:text-white ${
              isActive
                ? 'border-blue-400 text-blue-400'
                : 'border-transparent text-gray-300 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        )
      })}
    </div>
  )
}
