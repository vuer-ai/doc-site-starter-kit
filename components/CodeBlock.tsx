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
    <div className="rounded-lg overflow-hidden border border-gray-200 my-4">
      {filename && (
        <div className="px-4 py-2 bg-gray-100 border-b border-gray-200 text-xs text-gray-500 font-mono">
          {filename}
        </div>
      )}
      <pre className="overflow-x-auto p-4 bg-gray-950 text-sm leading-relaxed" style={{ margin: 0, border: 'none' }}>
        <code
          className={`hljs ${language ? `language-${language}` : ''}`}
          dangerouslySetInnerHTML={{ __html: highlighted }}
          style={{ background: 'transparent', padding: 0 }}
        />
      </pre>
    </div>
  )
}
