import React from 'react'
import { CodeBlock } from '../../../components/CodeBlock'

const spacingScale = [
  { name: '0.5', px: '2px',  rem: '0.125rem' },
  { name: '1',   px: '4px',  rem: '0.25rem' },
  { name: '2',   px: '8px',  rem: '0.5rem' },
  { name: '3',   px: '12px', rem: '0.75rem' },
  { name: '4',   px: '16px', rem: '1rem' },
  { name: '5',   px: '20px', rem: '1.25rem' },
  { name: '6',   px: '24px', rem: '1.5rem' },
  { name: '8',   px: '32px', rem: '2rem' },
  { name: '10',  px: '40px', rem: '2.5rem' },
  { name: '12',  px: '48px', rem: '3rem' },
  { name: '16',  px: '64px', rem: '4rem' },
]

const radiusTokens = [
  { name: 'rounded-sm',   value: '0.25rem / 4px' },
  { name: 'rounded-md',   value: '0.5rem / 8px' },
  { name: 'rounded-lg',   value: '0.75rem / 12px' },
  { name: 'rounded-xl',   value: '1rem / 16px' },
  { name: 'rounded-2xl',  value: '1.5rem / 24px' },
  { name: 'rounded-full', value: '9999px' },
]

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Style Guide</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Spacing & Layout</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Consistent spacing creates visual rhythm and hierarchy. The spacing scale follows Tailwind's
          default 4px base unit.
        </p>
      </div>

      {/* Spacing scale */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Spacing scale</h2>
        <p className="text-gray-600 mb-6">
          The spacing system is based on a 4px grid. Each step multiplies the base unit, creating
          predictable and harmonious spacing throughout the interface.
        </p>
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Token</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Pixels</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Rem</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Preview</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {spacingScale.map((step) => (
                <tr key={step.name}>
                  <td className="px-5 py-3 font-mono text-indigo-600 text-xs">{step.name}</td>
                  <td className="px-5 py-3 font-mono text-xs text-gray-500">{step.px}</td>
                  <td className="px-5 py-3 font-mono text-xs text-gray-500">{step.rem}</td>
                  <td className="px-5 py-3">
                    <div
                      className="h-3 rounded-sm bg-indigo-500"
                      style={{ width: step.px }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Border radius */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Border radius</h2>
        <p className="text-gray-600 mb-6">
          Border radius tokens control the roundness of elements. Use smaller values for subtle
          rounding and larger values for pill-shaped or circular elements.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-6">
          {radiusTokens.map((token) => (
            <div key={token.name} className="text-center">
              <div
                className="w-16 h-16 mx-auto mb-2 bg-indigo-100 border-2 border-indigo-400"
                style={{
                  borderRadius:
                    token.name === 'rounded-sm' ? '0.25rem' :
                    token.name === 'rounded-md' ? '0.5rem' :
                    token.name === 'rounded-lg' ? '0.75rem' :
                    token.name === 'rounded-xl' ? '1rem' :
                    token.name === 'rounded-2xl' ? '1.5rem' :
                    '9999px',
                }}
              />
              <p className="text-xs font-mono text-indigo-600">{token.name}</p>
              <p className="text-[10px] font-mono text-gray-400">{token.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Custom spacing and radius via @theme */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Customising spacing & radius</h2>
        <p className="text-gray-600 mb-6">
          Extend or override the default spacing and border radius tokens using the{' '}
          <code className="font-mono text-indigo-600">@theme</code> directive.
        </p>
        <CodeBlock
          filename="styles/global.css"
          language="css"
          code={`@theme {
  /* Custom spacing additions */
  --spacing-18: 4.5rem;   /* 72px */
  --spacing-22: 5.5rem;   /* 88px */
  --spacing-30: 7.5rem;   /* 120px */

  /* Border radius tokens */
  --radius-sm:   0.25rem;
  --radius-md:   0.5rem;
  --radius-lg:   0.75rem;
  --radius-xl:   1rem;
  --radius-2xl:  1.5rem;
  --radius-full: 9999px;
}`}
        />
        <p className="text-gray-600 mt-4">
          Custom spacing generates utilities like{' '}
          <code className="font-mono text-indigo-600">p-18</code>,{' '}
          <code className="font-mono text-indigo-600">mt-22</code>, and{' '}
          <code className="font-mono text-indigo-600">gap-30</code>. Radius tokens generate{' '}
          <code className="font-mono text-indigo-600">rounded-sm</code> through{' '}
          <code className="font-mono text-indigo-600">rounded-full</code>.
        </p>
      </section>
    </div>
  )
}
