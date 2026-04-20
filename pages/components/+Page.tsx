import React from 'react'
import { CodeBlock } from '../../components/CodeBlock'

export function Page() {
  const components = [
    {
      name: 'Callout',
      href: '/components/callout',
      description: 'Highlight important information, warnings, or tips.',
    },
    {
      name: 'CodeBlock',
      href: '/components/code-block',
      description: 'Syntax-highlighted code blocks with optional filename labels.',
    },
    {
      name: 'Badge',
      href: '/components/badge',
      description: 'Small inline labels for status, versions, or categories.',
    },
    {
      name: 'Steps',
      href: '/components/steps',
      description: 'Numbered step lists for sequential instructions.',
    },
    {
      name: 'ClientOnly',
      href: '/components/client-only',
      description: 'Client-side only rendering to avoid SSR mismatches.',
    },
  ]

  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Components</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Components</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          UI components for building documentation pages. All components are plain React with
          Tailwind CSS — no external component library required. Each component supports dark mode
          via CSS custom properties.
        </p>
      </div>

      {/* Component cards */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">All Components</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {components.map((c) => (
            <a
              key={c.name}
              href={c.href}
              className="block rounded-xl border border-gray-200 p-6 hover:border-indigo-300 hover:shadow-sm transition"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{c.name}</h3>
              <p className="text-sm text-gray-500">{c.description}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Quick example */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Example</h2>
        <p className="text-gray-500 mb-6">
          Import any component and use it directly in your page files.
        </p>
        <CodeBlock
          language="tsx"
          filename="+Page.tsx"
          code={`import { Callout } from '../../components/Callout'
import { CodeBlock } from '../../components/CodeBlock'

export function Page() {
  return (
    <div>
      <Callout type="info">
        All components work with server-side rendering out of the box.
      </Callout>
      <CodeBlock language="ts" code="console.log('Hello')" />
    </div>
  )
}`}
        />
      </div>
    </div>
  )
}
