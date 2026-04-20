import React from 'react'
import { CodeBlock } from '../../components/CodeBlock'

const subSections = [
  {
    name: 'Core Concepts',
    description: 'Foundational concepts that underpin the system architecture — page context, hooks, routing, and hydration.',
    href: '/system/core-concepts',
  },
  {
    name: 'Data Types',
    description: 'TypeScript interfaces and type definitions used throughout the system layer.',
    href: '/system/data-types',
  },
  {
    name: 'Rendering Pipeline',
    description: 'How pages are rendered on the server and hydrated on the client through Vike hooks.',
    href: '/system/rendering',
  },
  {
    name: 'Interaction Model',
    description: 'How user interactions flow through the system — events, state changes, and re-renders.',
    href: '/system/interaction',
  },
  {
    name: 'API Reference',
    description: 'Complete reference for system-level APIs, configuration options, and utility functions.',
    href: '/system/api-reference',
  },
]

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">System</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">System</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          The System layer is the interaction and control engine that powers the UI kit. It manages
          rendering pipelines, data flow, page context, and configuration — separating system logic
          from visual components.
        </p>
      </div>

      {/* Architecture Diagram */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Architecture</h2>
        <p className="text-gray-600 mb-4">
          The rendering pipeline flows through several layers, from the browser request down to
          individual components:
        </p>
        <CodeBlock
          language="text"
          code={`Browser
  → Vike Router
    → Renderer (onRenderHtml / onRenderClient)
      → Layout
        → Page
          → Components`}
        />
      </div>

      {/* Sub-sections */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {subSections.map((section) => (
            <a
              key={section.name}
              href={section.href}
              className="group rounded-xl border border-gray-200 p-5 hover:border-indigo-300 hover:shadow-sm transition"
            >
              <span className="text-sm font-semibold text-indigo-600 group-hover:text-indigo-700">
                {section.name}
              </span>
              <p className="text-sm text-gray-500 mt-1.5">{section.description}</p>
              <span className="inline-block mt-3 text-xs font-medium text-indigo-600 group-hover:text-indigo-700">
                View docs &rarr;
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
