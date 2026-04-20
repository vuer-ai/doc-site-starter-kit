import React from 'react'

const hooks = [
  {
    name: 'usePageContext',
    description: 'Access the current Vike page context from any component in the render tree.',
    href: '/hooks/use-page-context',
  },
  {
    name: 'useTheme',
    description: 'Control light, dark, and system color themes with localStorage persistence.',
    href: '/hooks/use-theme',
  },
]

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Hooks</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Hooks</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Reusable logic abstractions for state management, context access, and UI interactions.
          Hooks encapsulate common patterns so components stay clean and focused.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {hooks.map((hook) => (
          <a
            key={hook.name}
            href={hook.href}
            className="group rounded-xl border border-gray-200 p-5 hover:border-indigo-300 hover:shadow-sm transition"
          >
            <code className="text-sm font-semibold font-mono text-indigo-600 group-hover:text-indigo-700">
              {hook.name}
            </code>
            <p className="text-sm text-gray-500 mt-1.5">{hook.description}</p>
            <span className="inline-block mt-3 text-xs font-medium text-indigo-600 group-hover:text-indigo-700">
              View docs &rarr;
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
