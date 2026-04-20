import React from 'react'
import { CodeBlock } from '../../../components/CodeBlock'

const sizeGuidelines = [
  { size: '14px', use: 'Inline with text', example: 'Paragraph icons, badges' },
  { size: '16px', use: 'Buttons & inputs', example: 'Button icons, form field icons' },
  { size: '20px', use: 'Standalone / navigation', example: 'Toolbar actions, nav items' },
  { size: '24px', use: 'Large emphasis', example: 'Empty states, feature highlights' },
]

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Style Guide</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Icons</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          The design system uses Lucide React for consistent, tree-shakeable SVG icons. Icons are sized
          to match text and support theme colors.
        </p>
      </div>

      {/* Usage */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Basic usage</h2>
        <p className="text-gray-600 mb-6">
          Import individual icons from <code className="font-mono text-indigo-600">lucide-react</code>.
          Each icon is a standalone React component that renders an SVG element. Only the icons you
          import are included in the bundle.
        </p>
        <CodeBlock
          filename="components/Example.tsx"
          language="tsx"
          code={`import { Sun, Moon, Search } from 'lucide-react'

export function Example() {
  return (
    <div className="flex items-center gap-3">
      <Sun size={16} />
      <Moon size={16} />
      <Search size={16} />
    </div>
  )
}`}
        />
      </section>

      {/* Sizing guidelines */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Sizing guidelines</h2>
        <p className="text-gray-600 mb-6">
          Use consistent icon sizes across similar contexts. The table below shows recommended sizes
          for common use cases.
        </p>
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Size</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Use case</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Examples</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Preview</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sizeGuidelines.map((row) => (
                <tr key={row.size}>
                  <td className="px-5 py-3 font-mono text-indigo-600 text-xs">{row.size}</td>
                  <td className="px-5 py-3 text-gray-600">{row.use}</td>
                  <td className="px-5 py-3 text-gray-500 text-xs">{row.example}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={parseInt(row.size)}
                        height={parseInt(row.size)}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-indigo-600"
                      >
                        <circle cx="12" cy="12" r="5" />
                        <line x1="12" y1="1" x2="12" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="23" />
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                        <line x1="1" y1="12" x2="3" y2="12" />
                        <line x1="21" y1="12" x2="23" y2="12" />
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                      </svg>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CodeBlock
          filename="sizing-example.tsx"
          language="tsx"
          code={`{/* 14px — inline with text */}
<p className="flex items-center gap-1">
  <Info size={14} />
  <span>Helpful tip</span>
</p>

{/* 16px — inside buttons */}
<button className="flex items-center gap-2">
  <Search size={16} />
  <span>Search</span>
</button>

{/* 20px — standalone actions */}
<button aria-label="Settings">
  <Settings size={20} />
</button>`}
        />
      </section>

      {/* Color / currentColor */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Theme color support</h2>
        <p className="text-gray-600 mb-6">
          Lucide icons use <code className="font-mono text-indigo-600">currentColor</code> for their
          stroke color by default. This means icons automatically inherit the text color of their
          parent element, making them fully compatible with the theme system and dark mode.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-5 rounded-xl border border-gray-200 text-center">
            <div className="flex justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-gray-900">
                <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            </div>
            <p className="text-xs font-mono text-gray-500">text-gray-900</p>
          </div>
          <div className="p-5 rounded-xl border border-gray-200 text-center">
            <div className="flex justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
                <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            </div>
            <p className="text-xs font-mono text-gray-500">text-indigo-600</p>
          </div>
          <div className="p-5 rounded-xl border border-gray-200 text-center">
            <div className="flex justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            </div>
            <p className="text-xs font-mono text-gray-500">text-green-600</p>
          </div>
        </div>
        <CodeBlock
          filename="theme-icons.tsx"
          language="tsx"
          code={`{/* Icons inherit currentColor from the parent */}
<span className="text-gray-900">
  <Sun size={16} />  {/* renders in gray-900 */}
</span>

<span className="text-indigo-600">
  <Sun size={16} />  {/* renders in indigo-600 */}
</span>

{/* Dark mode works automatically */}
<span className="text-gray-900 dark:text-gray-100">
  <Sun size={16} />  {/* adapts to light/dark */}
</span>

{/* Override with the className prop */}
<Sun size={16} className="text-red-500" />`}
        />
        <div className="p-4 rounded-lg bg-blue-50 border border-blue-100 text-sm text-blue-800 mt-4">
          Because Lucide icons rely on <code className="font-mono">currentColor</code>, you never need
          to pass a color prop. Just set the text color on the icon or its container, and the icon
          follows the theme automatically.
        </div>
      </section>
    </div>
  )
}
