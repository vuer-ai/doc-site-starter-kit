import React, { useMemo } from 'react'
import hljs from 'highlight.js'

export interface EditorProps {
  /** Source code to render. */
  value: string
  /** highlight.js language id (e.g. 'yaml', 'html', 'tsx'). Falls back to auto-detect. */
  language?: string
  /** Show the line-number gutter. Defaults to true. */
  showLineNumbers?: boolean
  /** Show the right-side minimap. Defaults to true. */
  showMinimap?: boolean
  /** Max height of the editor. Content scrolls when taller. Defaults to '480px'. */
  maxHeight?: string | number
  /** Extra classes on the outer container. */
  className?: string
}

export function Editor({
  value,
  language,
  showLineNumbers = true,
  showMinimap = true,
  maxHeight = '480px',
  className = '',
}: EditorProps) {
  const highlighted = useMemo(() => {
    if (language) {
      try { return hljs.highlight(value, { language }).value } catch {}
    }
    return hljs.highlightAuto(value).value
  }, [value, language])

  const lineCount = value.split('\n').length
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1)

  return (
    <div
      className={`bg-gray-950 border border-gray-800 rounded-xl overflow-hidden text-gray-100 ${className}`}
    >
      <div className="flex" style={{ maxHeight }}>
        {showLineNumbers && (
          <div
            aria-hidden
            className="shrink-0 py-4 pl-4 pr-3 font-mono text-xs leading-relaxed text-right text-gray-600 select-none overflow-hidden"
          >
            {lineNumbers.map(n => (
              <div key={n}>{n}</div>
            ))}
          </div>
        )}

        <pre
          className="flex-1 min-w-0 overflow-auto py-4 pr-4 pl-2 text-sm leading-relaxed font-mono"
          style={{ margin: 0, border: 'none' }}
        >
          <code
            className={`hljs ${language ? `language-${language}` : ''}`}
            dangerouslySetInnerHTML={{ __html: highlighted }}
            style={{ background: 'transparent', padding: 0 }}
          />
        </pre>

        {showMinimap && (
          <div
            aria-hidden
            className="shrink-0 w-[72px] border-l border-gray-800 overflow-hidden bg-gray-950/60"
          >
            <pre
              className="font-mono p-1.5"
              style={{
                margin: 0,
                border: 'none',
                fontSize: '3.5px',
                lineHeight: '5px',
                whiteSpace: 'pre',
              }}
            >
              <code
                className={`hljs ${language ? `language-${language}` : ''}`}
                dangerouslySetInnerHTML={{ __html: highlighted }}
                style={{ background: 'transparent', padding: 0 }}
              />
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
