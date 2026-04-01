import React from 'react'
import hljs from 'highlight.js'

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
}

export function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const highlighted = React.useMemo(() => {
    if (language) {
      try {
        return hljs.highlight(code.trim(), { language }).value
      } catch {
        return hljs.highlightAuto(code.trim()).value
      }
    }
    return hljs.highlightAuto(code.trim()).value
  }, [code, language])

  return (
    <div
      className="rounded-xl overflow-hidden my-4"
      style={{ border: '1px solid rgb(var(--color-border))' }}
    >
      {filename && (
        <div
          className="px-4 py-2 text-xs font-mono"
          style={{
            backgroundColor: 'rgb(var(--color-bg-secondary))',
            borderBottom: '1px solid rgb(var(--color-border))',
            color: 'rgb(var(--color-text-muted))',
          }}
        >
          {filename}
        </div>
      )}
      <pre
        className="code-block overflow-x-auto p-4 text-sm leading-relaxed"
        style={{ margin: 0, border: 'none', backgroundColor: 'rgb(var(--color-bg-secondary))' }}
      >
        <code
          className={`hljs ${language ? `language-${language}` : ''}`}
          dangerouslySetInnerHTML={{ __html: highlighted }}
          style={{ background: 'transparent', padding: 0 }}
        />
      </pre>
    </div>
  )
}
