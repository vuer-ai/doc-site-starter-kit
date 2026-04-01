import React from 'react'
import { CodeBlock } from '../../components/CodeBlock'

function Step({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-5 mb-10">
      <div className="shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold mt-0.5">
        {number}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
        {children}
      </div>
    </div>
  )
}

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Introduction</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Getting Started</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Get your documentation site up and running in under five minutes. This guide walks you
          through cloning the starter kit, installing dependencies, and launching the development
          server.
        </p>
      </div>

      <div className="mb-10 p-4 rounded-lg bg-amber-50 border border-amber-200">
        <p className="text-sm text-amber-800">
          <strong>Prerequisites:</strong> You need Node.js 20+ and pnpm 9+ installed on your machine.
          If you don't have pnpm, run <code className="font-mono bg-amber-100 px-1 rounded">npm install -g pnpm</code> first.
        </p>
      </div>

      <div className="mb-12">
        <Step number={1} title="Clone or use the starter kit">
          <p className="text-gray-600 mb-4">
            The fastest way to get started is to clone the repository directly. This gives you a
            fully working project with all configuration pre-set.
          </p>
          <CodeBlock
            language="bash"
            code={`git clone https://github.com/your-org/doc-site-starter-kit.git my-docs
cd my-docs`}
          />
          <p className="text-sm text-gray-500">
            Replace <code className="font-mono text-indigo-600">my-docs</code> with your project name.
          </p>
        </Step>

        <Step number={2} title="Install dependencies">
          <p className="text-gray-600 mb-4">
            Install all required packages using pnpm. The lockfile ensures you get exactly the same
            dependency versions as tested.
          </p>
          <CodeBlock language="bash" code="pnpm install" />
          <p className="text-sm text-gray-500">
            This installs Vike, React 19, Tailwind CSS v4, and all dev dependencies.
          </p>
        </Step>

        <Step number={3} title="Start the development server">
          <p className="text-gray-600 mb-4">
            Launch the Vite dev server with hot module replacement. Changes to pages, components,
            and styles are reflected instantly in the browser.
          </p>
          <CodeBlock language="bash" code="pnpm dev" />
          <p className="text-sm text-gray-500 mb-4">
            Open <a href="http://localhost:3000" className="text-indigo-600 hover:underline">http://localhost:3000</a> in your browser.
          </p>
        </Step>

        <Step number={4} title="Add your first page">
          <p className="text-gray-600 mb-4">
            Create a new directory under <code className="font-mono text-indigo-600">pages/</code> with
            a <code className="font-mono text-indigo-600">+Page.tsx</code> file. Vike automatically
            picks it up and maps it to a URL.
          </p>
          <CodeBlock
            language="tsx"
            code={`// pages/my-page/+Page.tsx
export function Page() {
  return (
    <div>
      <h1>My New Page</h1>
      <p>This page is now available at /my-page</p>
    </div>
  )
}`}
          />
          <p className="text-gray-600 mb-4">
            The page is automatically wrapped in the <code className="font-mono text-indigo-600">Layout</code> component
            defined in <code className="font-mono text-indigo-600">renderer/Layout.tsx</code>, so the sidebar
            and base styles are applied for you.
          </p>
        </Step>

        <Step number={5} title="Add your page to the sidebar">
          <p className="text-gray-600 mb-4">
            Open <code className="font-mono text-indigo-600">components/Sidebar.tsx</code> and add your
            new page to the navigation array under the appropriate section.
          </p>
          <CodeBlock
            language="tsx"
            code={`const navigation = [
  {
    section: 'Guides',
    items: [
      // ... existing items
      { label: 'My Page', href: '/my-page', icon: '✨' },
    ],
  },
]`}
          />
        </Step>
      </div>

      <div className="rounded-xl border border-gray-200 overflow-hidden mb-10">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Project structure overview</h2>
        </div>
        <div className="p-6">
          <CodeBlock
            code={`doc-site-starter-kit/
├── pages/              # Your documentation pages
│   ├── index/
│   │   └── +Page.tsx   # → /
│   └── my-page/
│       └── +Page.tsx   # → /my-page
├── renderer/           # Vike SSR/hydration hooks
│   ├── +config.ts
│   ├── +onRenderHtml.tsx
│   ├── +onRenderClient.tsx
│   └── Layout.tsx
├── components/         # Shared UI components
│   └── Sidebar.tsx
├── styles/
│   └── global.css      # Tailwind v4 CSS entry
├── scripts/
│   └── deploy.mjs      # Netlify deploy script
├── vite.config.ts
└── tsconfig.json`}
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-8 border-t border-gray-200">
        <span className="text-sm text-gray-400">Next up</span>
        <a
          href="/installation"
          className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          Installation →
        </a>
      </div>
    </div>
  )
}
