import React from 'react'

const features = [
  {
    icon: '⚡',
    title: 'Vike SSG/SSR',
    description:
      'Built on Vike (the successor to vite-plugin-ssr), delivering lightning-fast static generation and server-side rendering with zero configuration.',
  },
  {
    icon: '⚛️',
    title: 'React 19',
    description:
      'Leverages the latest React 19 features including the new compiler, concurrent rendering, and improved hydration for a snappy user experience.',
  },
  {
    icon: '🎨',
    title: 'Tailwind CSS v4',
    description:
      'CSS-first configuration with Tailwind v4. No tailwind.config.js required — write your design tokens directly in CSS using @layer and @theme.',
  },
  {
    icon: '🔒',
    title: 'TypeScript First',
    description:
      'Full TypeScript support throughout the renderer, components, and pages. Strict mode enabled for maximum type safety across your entire docs site.',
  },
  {
    icon: '📦',
    title: 'pnpm Ready',
    description:
      'Optimised for pnpm workspaces with lock-file based installs. Fast, disk-efficient, and compatible with monorepo setups out of the box.',
  },
  {
    icon: '🚀',
    title: 'Netlify Deploy',
    description:
      'One-command deploy to Netlify with production and versioned snapshot aliases. Includes security headers and SPA redirect rules pre-configured.',
  },
]

export function Page() {
  return (
    <div>
      {/* Hero */}
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block"></span>
          v0.1.0 — Now available
        </div>
        <h1 className="text-5xl font-bold text-gray-900 tracking-tight mb-6 leading-tight">
          Documentation<br />
          <span className="text-indigo-600">Starter Kit</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl leading-relaxed mb-8">
          A production-ready documentation site built with Vike, React 19, and Tailwind CSS v4.
          Ship beautiful docs fast — without wrestling with build tools.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="/getting-started"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Get started →
          </a>
          <a
            href="/installation"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Installation guide
          </a>
        </div>
      </div>

      {/* Quick install */}
      <div className="mb-16 p-5 rounded-xl bg-gray-900 border border-gray-800">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Quick start</p>
        <pre className="text-sm text-gray-100 font-mono overflow-x-auto">
          <code>{`pnpm create vike@latest my-docs
cd my-docs
pnpm install
pnpm dev`}</code>
        </pre>
      </div>

      {/* Features grid */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Everything you need</h2>
        <p className="text-gray-500 mb-8">
          A curated set of modern tools that work together seamlessly, so you can focus on writing
          great documentation instead of configuring build pipelines.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-5 rounded-xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm transition-all"
            >
              <div className="text-2xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-1.5">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stack details */}
      <div className="mb-16 rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Stack at a glance</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {[
            { package: 'vike', version: '^0.4.210', role: 'SSG / SSR framework' },
            { package: 'react', version: '^19.0.0', role: 'UI rendering' },
            { package: 'tailwindcss', version: '^4.0.0', role: 'Utility-first styling' },
            { package: '@tailwindcss/vite', version: '^4.0.0', role: 'Vite integration for Tailwind v4' },
            { package: '@vitejs/plugin-react', version: '^4.3.4', role: 'React fast-refresh via Vite' },
            { package: 'typescript', version: '^5.7.0', role: 'Static type checking' },
          ].map((row) => (
            <div key={row.package} className="flex items-center px-6 py-3 gap-4">
              <code className="text-sm font-mono text-indigo-600 w-48 shrink-0">{row.package}</code>
              <span className="text-xs text-gray-400 font-mono w-28 shrink-0">{row.version}</span>
              <span className="text-sm text-gray-600">{row.role}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-xl bg-indigo-50 border border-indigo-100 p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Ready to build your docs?</h2>
        <p className="text-gray-500 mb-6 text-sm">
          Clone the repo, run <code className="font-mono text-indigo-600">pnpm install</code>, and
          start writing your first page in minutes.
        </p>
        <a
          href="/getting-started"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Read the guide →
        </a>
      </div>
    </div>
  )
}
