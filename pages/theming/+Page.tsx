import React from 'react'

function CodeBlock({ code, lang = 'css', filename }: { code: string; lang?: string; filename?: string }) {
  return (
    <div className="rounded-xl bg-gray-900 border border-gray-800 overflow-hidden mb-6">
      <div className="px-4 py-2 border-b border-gray-800 flex items-center">
        <span className="text-xs text-gray-300 font-mono">{filename ?? lang}</span>
      </div>
      <pre className="p-4 overflow-x-auto text-sm text-gray-100 font-mono">
        <code>{code}</code>
      </pre>
    </div>
  )
}

const swatches = [
  { name: 'indigo-50',  hex: '#EEF2FF' },
  { name: 'indigo-100', hex: '#E0E7FF' },
  { name: 'indigo-200', hex: '#C7D2FE' },
  { name: 'indigo-400', hex: '#818CF8' },
  { name: 'indigo-500', hex: '#6366F1' },
  { name: 'indigo-600', hex: '#4F46E5' },
  { name: 'indigo-700', hex: '#4338CA' },
  { name: 'indigo-900', hex: '#312E81' },
]

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Guides</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Theming</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Tailwind CSS v4 introduces a CSS-first theming model. Design tokens live in your CSS file,
          not a JavaScript config. This makes customisation faster, more explicit, and aligned with
          the CSS custom properties ecosystem.
        </p>
      </div>

      {/* How it works */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How Tailwind v4 theming works</h2>
        <p className="text-gray-600 mb-6">
          In Tailwind v4, the <code className="font-mono text-indigo-600">@theme</code> directive defines your design
          tokens as CSS custom properties. Tailwind reads these properties and automatically generates
          the corresponding utility classes. No JavaScript configuration is needed.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="p-5 rounded-xl border border-red-100 bg-red-50">
            <p className="text-xs font-semibold uppercase text-red-400 tracking-wide mb-3">Tailwind v3 (old way)</p>
            <pre className="text-xs font-mono text-red-800 overflow-x-auto">
              <code>{`// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: '#6366F1',
      },
    },
  },
}`}</code>
            </pre>
          </div>
          <div className="p-5 rounded-xl border border-green-100 bg-green-50">
            <p className="text-xs font-semibold uppercase text-green-500 tracking-wide mb-3">Tailwind v4 (new way)</p>
            <pre className="text-xs font-mono text-green-900 overflow-x-auto">
              <code>{`/* global.css */
@import "tailwindcss";

@theme {
  --color-brand: #6366F1;
}

/* bg-brand, text-brand, etc.
   are now available! */`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Color palette */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Customising your colour palette</h2>
        <p className="text-gray-600 mb-6">
          Replace or extend the default Tailwind palette by defining colour tokens in the{' '}
          <code className="font-mono text-indigo-600">@theme</code> block. Use any valid CSS colour format —
          hex, RGB, HSL, or the modern <code className="font-mono text-indigo-600">oklch()</code> space for
          perceptually uniform colours.
        </p>
        <CodeBlock
          filename="styles/global.css"
          lang="css"
          code={`@import "tailwindcss";

@theme {
  /* Override a default colour */
  --color-indigo-500: #6366F1;

  /* Add entirely new colours */
  --color-brand-50:  oklch(97% 0.02 250);
  --color-brand-500: oklch(60% 0.20 250);
  --color-brand-900: oklch(30% 0.15 250);

  /* Semantic colours */
  --color-success: oklch(65% 0.18 145);
  --color-danger:  oklch(60% 0.22  25);
}`}
        />

        {/* Swatch grid */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mb-4">
          {swatches.map((swatch) => (
            <div key={swatch.name} className="text-center">
              <div
                className="w-full aspect-square rounded-lg mb-1.5 border border-black/5"
                style={{ backgroundColor: swatch.hex }}
              />
              <p className="text-xs text-gray-500 font-mono leading-tight">{swatch.name}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400">Default indigo palette included with Tailwind v4.</p>
      </section>

      {/* Typography */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Typography tokens</h2>
        <p className="text-gray-600 mb-6">
          Override font families, sizes, weights, and line-heights using the same{' '}
          <code className="font-mono text-indigo-600">@theme</code> approach.
        </p>
        <CodeBlock
          filename="styles/global.css"
          lang="css"
          code={`@import "tailwindcss";

@theme {
  /* Font families */
  --font-sans: 'Inter', 'system-ui', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  --font-display: 'Cal Sans', 'Inter', sans-serif;

  /* Custom font sizes */
  --text-2xs: 0.625rem;  /* 10px */
  --text-3xl: 1.875rem;  /* 30px */

  /* Line heights */
  --leading-tighter: 1.15;
}`}
        />
        <p className="text-gray-600">
          After defining <code className="font-mono text-indigo-600">--font-sans</code>, use it as{' '}
          <code className="font-mono text-indigo-600">font-sans</code> in your Tailwind class names. The
          same applies to all other token categories.
        </p>
      </section>

      {/* Spacing and radius */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Spacing and border-radius</h2>
        <CodeBlock
          filename="styles/global.css"
          lang="css"
          code={`@theme {
  /* Custom spacing scale additions */
  --spacing-18: 4.5rem;
  --spacing-22: 5.5rem;

  /* Border radii */
  --radius-sm:  0.25rem;
  --radius-md:  0.5rem;
  --radius-lg:  0.75rem;
  --radius-xl:  1rem;
  --radius-2xl: 1.5rem;
  --radius-full: 9999px;
}`}
        />
      </section>

      {/* Dark mode */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Dark mode</h2>
        <p className="text-gray-600 mb-6">
          Tailwind v4 supports dark mode via the <code className="font-mono text-indigo-600">dark:</code>{' '}
          variant. Configure the strategy in your CSS:
        </p>
        <CodeBlock
          filename="styles/global.css"
          lang="css"
          code={`@import "tailwindcss";

/* Use class-based dark mode (add 'dark' class to <html>) */
@variant dark (&:where(.dark, .dark *));

@layer base {
  :root {
    --bg-page: 255 255 255;
    --text-primary: 17 24 39;
  }

  .dark {
    --bg-page: 15 23 42;
    --text-primary: 248 250 252;
  }
}

/* Usage in components: */
/* <div class="bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100"> */`}
        />
        <div className="p-4 rounded-lg bg-blue-50 border border-blue-100 text-sm text-blue-800">
          To toggle dark mode, add or remove the <code className="font-mono">dark</code> class on the{' '}
          <code className="font-mono">&lt;html&gt;</code> element. You can do this with a small React hook
          that reads from <code className="font-mono">localStorage</code> or the OS preference via{' '}
          <code className="font-mono">window.matchMedia('(prefers-color-scheme: dark)')</code>.
        </div>
      </section>

      {/* CSS layers */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">CSS layers</h2>
        <p className="text-gray-600 mb-6">
          Tailwind v4 uses native CSS <code className="font-mono text-indigo-600">@layer</code> for cascade
          control. The three built-in layers are:
        </p>
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Layer</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Purpose</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-5 py-3 font-mono text-indigo-600">base</td>
                <td className="px-5 py-3 text-gray-600">Element-level defaults and resets</td>
                <td className="px-5 py-3 font-mono text-xs text-gray-500">h1 &#123; @apply text-3xl &#125;</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-mono text-indigo-600">components</td>
                <td className="px-5 py-3 text-gray-600">Reusable class abstractions</td>
                <td className="px-5 py-3 font-mono text-xs text-gray-500">.btn &#123; @apply px-4 py-2 &#125;</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-mono text-indigo-600">utilities</td>
                <td className="px-5 py-3 text-gray-600">Single-purpose helper classes</td>
                <td className="px-5 py-3 font-mono text-xs text-gray-500">.text-balance &#123; text-wrap: balance &#125;</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div className="flex items-center justify-between pt-8 border-t border-gray-200">
        <a href="/components" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
          ← Components
        </a>
        <a href="/api-reference" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
          API Reference →
        </a>
      </div>
    </div>
  )
}
