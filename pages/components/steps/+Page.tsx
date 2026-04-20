import React from 'react'
import { CodeBlock } from '../../../components/CodeBlock'

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Components</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Steps</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Numbered step lists for sequential instructions, tutorials, and setup guides.
        </p>
      </div>

      {/* Live example */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Example</h2>
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Preview</span>
          </div>
          <div className="p-6 bg-white">
            <ol className="space-y-5">
              {[
                { title: 'Clone the repository', body: 'Run git clone to get a local copy of the starter kit.' },
                { title: 'Install dependencies', body: 'Run pnpm install to set up all required packages.' },
                { title: 'Start the dev server', body: 'Run pnpm dev and open localhost:3000 in your browser.' },
              ].map((step, i) => (
                <li key={i} className="flex gap-4">
                  <div className="shrink-0 w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold mt-0.5">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-0.5">{step.title}</p>
                    <p className="text-sm text-gray-500">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Usage */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Usage</h2>
        <CodeBlock
          language="tsx"
          code={`import { Steps, Step } from '../../components/Steps'

<Steps>
  <Step number={1} title="Clone the repository">
    Run git clone to get a local copy of the starter kit.
  </Step>
  <Step number={2} title="Install dependencies">
    Run pnpm install to set up all required packages.
  </Step>
  <Step number={3} title="Start the dev server">
    Run pnpm dev and open localhost:3000 in your browser.
  </Step>
</Steps>`}
        />
      </div>

      {/* Props table */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Step Props</h2>
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Prop</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Type</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Required</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-5 py-3 font-mono text-xs text-indigo-600">number</td>
                <td className="px-5 py-3 font-mono text-xs text-gray-500">number</td>
                <td className="px-5 py-3 text-xs text-center">&#10003;</td>
                <td className="px-5 py-3 text-sm text-gray-600">The step number displayed in the circle.</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-mono text-xs text-indigo-600">title</td>
                <td className="px-5 py-3 font-mono text-xs text-gray-500">string</td>
                <td className="px-5 py-3 text-xs text-center">&#10003;</td>
                <td className="px-5 py-3 text-sm text-gray-600">Bold heading for the step.</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-mono text-xs text-indigo-600">children</td>
                <td className="px-5 py-3 font-mono text-xs text-gray-500">React.ReactNode</td>
                <td className="px-5 py-3 text-xs text-center">&#10003;</td>
                <td className="px-5 py-3 text-sm text-gray-600">Description content for the step.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
