import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { usePageContext } from 'vike-react/usePageContext'
import { getAdjacentPages } from '../lib/navigation'

export function DocFooter() {
  const { urlPathname } = usePageContext()
  const { prev, next } = getAdjacentPages(urlPathname)

  const btnStyle: React.CSSProperties = {
    height: '75px',
    color: 'rgb(var(--color-text-muted))',
    backgroundColor: 'rgb(var(--color-bg-secondary))',
  }

  return (
    <footer
      className="fixed bottom-0 left-0 md:left-56 right-0 z-40"
      style={{
        height: '150px',
        backgroundColor: 'var(--color-bg-fog)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgb(var(--color-border) / 0.5)',
      }}
    >
      <div className="h-full flex">
        <div className="flex-1 flex items-center px-8">
          <div className="max-w-2xl w-full mx-auto flex items-center justify-between">

            {prev ? (
              <a
                href={prev.path}
                className="flex items-center gap-3 px-5 rounded-lg text-sm font-medium transition-colors no-underline"
                style={btnStyle}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgb(var(--color-text))' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgb(var(--color-text-muted))' }}
              >
                <ChevronLeft size={15} className="shrink-0" />
                <span className="flex flex-col">
                  <span className="text-xs opacity-60 font-normal mb-0.5">Previous</span>
                  {prev.title}
                </span>
              </a>
            ) : <div />}

            {next ? (
              <a
                href={next.path}
                className="flex items-center gap-3 px-5 rounded-lg text-sm font-medium transition-colors no-underline text-right"
                style={btnStyle}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgb(var(--color-text))' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgb(var(--color-text-muted))' }}
              >
                <span className="flex flex-col items-end">
                  <span className="text-xs opacity-60 font-normal mb-0.5">Next</span>
                  {next.title}
                </span>
                <ChevronRight size={15} className="shrink-0" />
              </a>
            ) : <div />}

          </div>
        </div>
        <div className="hidden lg:block w-56 shrink-0" />
      </div>
    </footer>
  )
}
