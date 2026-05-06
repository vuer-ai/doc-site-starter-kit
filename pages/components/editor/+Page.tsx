import React from 'react'
import { CodeBlock } from '../../../components/CodeBlock'
import { Editor } from '../../../components/CodeEditor'

const YAML_EXAMPLE = `charts:
  - ctype: line
    xKey: default
    yKey: eval.avg_euclidean_distance
    title: eval.avg_euclidean_distance
    bins: 200
    series:
      - prefix: eye-tracking-device/2026-03-13/original
        label: original
        color: "#5470c6"
      - prefix: eye-tracking-device/2026-03-13/socialeye
        label: socialeye
        color: "#91cc75"
      - prefix: eye-tracking-device/2026-03-13/socialeye_fixnorm
        label: socialeye_fixnorm
        color: "#fac858"
      - prefix: eye-tracking-device/2026-03-13/socialeye_noflip
        label: socialeye_noflip
        color: "#ee6666"
      - prefix: eye-tracking-device/2026-03-13/original_minmax
        label: original_minmax
        color: "#73c0de"
      - prefix: eye-tracking-device/2026-03-13/socialeye_pretrained
        label: socialeye_pretrained
        color: "#3ba272"
      - prefix: eye-tracking-device/2026-03-13/socialeye_resnet50
        label: socialeye_resnet50
        color: "#fc8452"`

const HTML_EXAMPLE = `<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Similar Image Search</title>

    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
</html>`

const SHORT_TSX = `export function Button({ label, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className="px-3 py-1.5 rounded-full bg-black text-white">
      {label}
    </button>
  )
}`

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Components</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Editor</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          A read-only code viewer with line numbers and a minimap. Renders YAML, HTML,
          TypeScript, and more via highlight.js. Modeled on the file viewer on dash.ml.
        </p>
      </div>

      {/* Purpose */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Purpose</h2>
        <p className="text-gray-600 leading-relaxed">
          Display longer config or source files inline in the dashboard — for example,
          an experiment's chart config YAML or a generated HTML snippet. Line numbers
          help users reference specific rows; the minimap gives a sense of file length
          and structure at a glance.
        </p>
      </div>

      {/* Usage */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Usage</h2>
        <CodeBlock
          language="tsx"
          code={`import { Editor } from '../../components/CodeEditor'

<Editor value={yamlSource} language="yaml" />`}
        />
      </div>

      {/* Example */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Example</h2>
        <p className="text-gray-500 mb-6">
          A YAML chart config with line numbers on the left and a minimap on the right.
        </p>
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Preview</span>
          </div>
          <div className="p-6 bg-gray-950">
            <Editor value={YAML_EXAMPLE} language="yaml" />
          </div>
        </div>
      </div>

      {/* Data structure */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Data structure</h2>
        <p className="text-gray-500 mb-4">What goes into the component.</p>
        <CodeBlock
          language="tsx"
          code={`// The component takes raw source as a string plus a language hint.
const source = \`charts:
  - ctype: line
    xKey: default
    yKey: eval.avg_euclidean_distance\`

<Editor value={source} language="yaml" />`}
        />
      </div>

      {/* Component Interface */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Component Interface</h2>
        <CodeBlock
          language="tsx"
          code={`export interface EditorProps {
  /** Source code to render. */
  value: string
  /** highlight.js language id (e.g. 'yaml', 'html', 'tsx'). Falls back to auto-detect. */
  language?: string
  /** Show the line-number gutter. Defaults to true. */
  showLineNumbers?: boolean
  /** Show the right-side minimap. Defaults to true. */
  showMinimap?: boolean
  /** Max height; content scrolls when taller. Defaults to '480px'. */
  maxHeight?: string | number
  className?: string
}`}
        />
      </div>

      {/* Actions */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Actions</h2>
        <p className="text-gray-500 mb-4">What users can do with the component.</p>
        <ul className="text-gray-600 space-y-2 list-disc pl-6">
          <li><strong>Scroll:</strong> wheel or touch-scroll the code area when content exceeds <code>maxHeight</code>.</li>
          <li><strong>Horizontal scroll:</strong> long lines reveal a horizontal scrollbar (no line wrapping — keeps line numbers aligned).</li>
          <li><strong>Reference by line:</strong> line numbers make it easy to cite a specific row in review or conversation.</li>
          <li><strong>Select &amp; copy:</strong> select text with the mouse and copy with <kbd>⌘</kbd>/<kbd>Ctrl</kbd>+<kbd>C</kbd>.</li>
        </ul>
      </div>

      {/* Wireframes */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Wireframe(s)</h2>
        <p className="text-gray-500 mb-6">Visual states.</p>

        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-1: YAML with minimap (default)</span>
            </div>
            <div className="p-6 bg-gray-950">
              <Editor value={YAML_EXAMPLE} language="yaml" />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-2: HTML</span>
            </div>
            <div className="p-6 bg-gray-950">
              <Editor value={HTML_EXAMPLE} language="html" />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-3: short snippet, no minimap</span>
            </div>
            <div className="p-6 bg-gray-950">
              <Editor value={SHORT_TSX} language="tsx" showMinimap={false} />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-4: no gutter, no minimap</span>
            </div>
            <div className="p-6 bg-gray-950">
              <Editor
                value={SHORT_TSX}
                language="tsx"
                showLineNumbers={false}
                showMinimap={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
