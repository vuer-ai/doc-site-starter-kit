import React from 'react'
import { CodeBlock } from '../../../components/CodeBlock'

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

const semanticColors = [
  { token: '--color-bg', description: 'Page background', light: '#FFFFFF', dark: '#0F172A' },
  { token: '--color-text', description: 'Primary text', light: '#111827', dark: '#F8FAFC' },
  { token: '--color-primary', description: 'Brand / accent color', light: '#4F46E5', dark: '#818CF8' },
  { token: '--color-border', description: 'Default borders', light: '#E5E7EB', dark: '#334155' },
  { token: '--color-bg-secondary', description: 'Secondary backgrounds', light: '#F9FAFB', dark: '#1E293B' },
  { token: '--color-text-muted', description: 'Muted / secondary text', light: '#6B7280', dark: '#94A3B8' },
]

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Style Guide</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Colors</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          The color system defines the visual identity. Built on CSS custom properties with Tailwind
          v4's <code className="font-mono text-indigo-600">@theme</code> directive for seamless utility
          class generation.
        </p>
      </div>

      {/* Color palette */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Color palette</h2>
        <p className="text-gray-600 mb-6">
          The default indigo palette provides the foundation for the design system. Each step is
          carefully tuned for contrast and accessibility.
        </p>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mb-4">
          {swatches.map((swatch) => (
            <div key={swatch.name} className="text-center">
              <div
                className="w-full aspect-square rounded-lg mb-1.5 border border-black/5"
                style={{ backgroundColor: swatch.hex }}
              />
              <p className="text-xs text-gray-500 font-mono leading-tight">{swatch.name}</p>
              <p className="text-[10px] text-gray-400 font-mono">{swatch.hex}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400">Default indigo palette included with Tailwind v4.</p>
      </section>

      {/* Custom colors with @theme */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Defining custom colors</h2>
        <p className="text-gray-600 mb-6">
          Use the <code className="font-mono text-indigo-600">@theme</code> directive to define custom
          colors. The modern <code className="font-mono text-indigo-600">oklch()</code> color space is
          recommended for perceptually uniform colors.
        </p>
        <CodeBlock
          filename="styles/global.css"
          language="css"
          code={`@theme {
  --color-brand-500: oklch(60% 0.20 250);
  --color-success: oklch(65% 0.18 145);
  --color-danger: oklch(60% 0.22 25);
}`}
        />
        <p className="text-gray-600 mt-4">
          Once defined, these tokens generate utility classes automatically:{' '}
          <code className="font-mono text-indigo-600">bg-brand-500</code>,{' '}
          <code className="font-mono text-indigo-600">text-success</code>,{' '}
          <code className="font-mono text-indigo-600">border-danger</code>, and so on.
        </p>
      </section>

      {/* Semantic color variables */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Semantic color tokens</h2>
        <p className="text-gray-600 mb-6">
          Semantic tokens abstract raw color values into purpose-driven variables. Components reference
          these tokens so the entire palette can be swapped without touching markup.
        </p>
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Token</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Description</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {semanticColors.map((color) => (
                <tr key={color.token}>
                  <td className="px-5 py-3 font-mono text-indigo-600 text-xs">{color.token}</td>
                  <td className="px-5 py-3 text-gray-600">{color.description}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-5 h-5 rounded border border-black/10"
                        style={{ backgroundColor: color.light }}
                      />
                      <span className="font-mono text-xs text-gray-500">{color.light}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Dark mode color table */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Dark mode colors</h2>
        <p className="text-gray-600 mb-6">
          Each semantic token resolves to a different value in dark mode. The table below shows the
          light and dark values side by side.
        </p>
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Token</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Light</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Dark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {semanticColors.map((color) => (
                <tr key={color.token}>
                  <td className="px-5 py-3 font-mono text-indigo-600 text-xs">{color.token}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-5 h-5 rounded border border-black/10"
                        style={{ backgroundColor: color.light }}
                      />
                      <span className="font-mono text-xs text-gray-500">{color.light}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-5 h-5 rounded border border-white/10"
                        style={{ backgroundColor: color.dark }}
                      />
                      <span className="font-mono text-xs text-gray-500">{color.dark}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
