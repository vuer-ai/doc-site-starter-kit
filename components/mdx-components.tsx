import React from 'react'
import { CodeBlock } from './CodeBlock'

// MDX component overrides - use these when setting up MDX pages
export const mdxComponents = {
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => {
    const child = React.Children.only(props.children) as React.ReactElement
    if (child?.type === 'code') {
      const { className = '', children: code } = child.props
      const language = className.replace('language-', '')
      return <CodeBlock code={String(code).trimEnd()} language={language || undefined} />
    }
    return <pre {...props} />
  },
  code: (props: React.HTMLAttributes<HTMLElement> & { className?: string }) => {
    // Inline code (not in a pre block)
    return (
      <code
        {...props}
        className="rounded px-1.5 py-0.5 text-sm font-mono"
        style={{
          backgroundColor: 'rgb(var(--color-bg-secondary))',
          color: 'rgb(var(--color-text))',
          border: '1px solid rgb(var(--color-border))',
        }}
      />
    )
  },
}
