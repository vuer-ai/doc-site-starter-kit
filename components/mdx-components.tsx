import React from 'react'
import { CodeBlock } from './CodeBlock'

// --- Markdown element overrides ---

function Pre(props: React.HTMLAttributes<HTMLPreElement>) {
  const child = React.Children.only(props.children) as React.ReactElement
  if (child?.type === 'code') {
    const { className = '', children: code } = child.props
    const language = className.replace('language-', '')
    return <CodeBlock code={String(code).trimEnd()} language={language || undefined} />
  }
  return <pre {...props} />
}

function InlineCode(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      {...props}
      className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 rounded px-1.5 py-0.5 text-sm font-mono"
    />
  )
}

// --- Reusable doc components ---

export function Step({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
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

export function Badge({ label, color }: { label: string; color?: string }) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    purple: 'bg-purple-100 text-purple-700',
    amber: 'bg-amber-100 text-amber-700',
    gray: 'bg-gray-100 text-gray-600',
  }
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold font-mono ${colors[color ?? 'gray'] ?? colors.gray}`}
    >
      {label}
    </span>
  )
}

export function Section({ title, id, children }: { title: string; id?: string; children: React.ReactNode }) {
  return (
    <section className="mb-14" id={id}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">{title}</h2>
      {children}
    </section>
  )
}

export function FunctionCard({
  name,
  signature,
  description,
  params,
  returns,
  example,
}: {
  name: string
  signature: string
  description: string
  params: { name: string; type: string; description: string }[]
  returns: string
  example: string
}) {
  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden mb-6">
      <div className="px-5 py-4 bg-gray-50 border-b border-gray-200 flex items-start justify-between gap-4">
        <div>
          <code className="text-sm font-semibold text-gray-900 font-mono">{name}</code>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
      </div>
      <div className="px-5 py-4">
        <CodeBlock code={signature} language="ts" />
        {params.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Parameters</p>
            <div className="space-y-2">
              {params.map((p) => (
                <div key={p.name} className="flex gap-3 text-sm">
                  <code className="font-mono text-indigo-600 shrink-0">{p.name}</code>
                  <code className="font-mono text-gray-400 text-xs shrink-0 mt-0.5">{p.type}</code>
                  <span className="text-gray-600">{p.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Returns</p>
          <code className="text-xs font-mono text-gray-600">{returns}</code>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Example</p>
          <CodeBlock code={example} language="tsx" />
        </div>
      </div>
    </div>
  )
}

export function ComponentSection({
  title,
  description,
  children,
  code,
}: {
  title: string
  description: string
  children: React.ReactNode
  code: string
}) {
  return (
    <div className="mb-14">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-500 mb-6">{description}</p>
      <div className="rounded-xl border border-gray-200 overflow-hidden mb-4">
        <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Preview</span>
        </div>
        <div className="p-6 bg-white">{children}</div>
      </div>
      <CodeBlock language="tsx" code={code} />
    </div>
  )
}

export function OptionRow({
  name,
  type,
  defaultVal,
  description,
}: {
  name: string
  type: string
  defaultVal: string
  description: string
}) {
  return (
    <tr>
      <td className="px-5 py-3 font-mono text-sm text-indigo-600 whitespace-nowrap">{name}</td>
      <td className="px-5 py-3 font-mono text-xs text-gray-500 whitespace-nowrap">{type}</td>
      <td className="px-5 py-3 font-mono text-xs text-gray-400 whitespace-nowrap">{defaultVal}</td>
      <td className="px-5 py-3 text-sm text-gray-600">{description}</td>
    </tr>
  )
}

export function Callout({
  type = 'info',
  children,
}: {
  type?: 'info' | 'warning' | 'danger'
  children: React.ReactNode
}) {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-900',
    warning: 'bg-amber-50 border-amber-200 text-amber-900',
    danger: 'bg-red-50 border-red-200 text-red-900',
  }
  return <div className={`p-4 rounded-xl border text-sm ${styles[type]}`}>{children}</div>
}

// --- MDX component map ---

export const mdxComponents = {
  // Markdown element overrides
  pre: Pre,
  code: InlineCode,
  // Custom doc components (available as <Step>, <Badge>, etc. in MDX)
  CodeBlock,
  Step,
  Badge,
  Section,
  FunctionCard,
  ComponentSection,
  OptionRow,
  Callout,
}
