import React, { useState, useEffect } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function TOC() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const elements = Array.from(
      document.querySelectorAll<HTMLHeadingElement>('main h2, main h3')
    )

    const built: Heading[] = elements.map((el) => {
      if (!el.id) {
        el.id = slugify(el.textContent ?? '')
      }
      return {
        id: el.id,
        text: el.textContent ?? '',
        level: el.tagName === 'H2' ? 2 : 3,
      }
    })

    setHeadings(built)

    if (built.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            break
          }
        }
      },
      {
        rootMargin: '0px 0px -60% 0px',
        threshold: 0,
      }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  if (!mounted || headings.length === 0) return null

  return (
    <nav className="sticky top-24 hidden lg:block w-56 shrink-0 max-h-[calc(100vh-6rem)] overflow-y-auto">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
        On this page
      </p>
      <ul className="space-y-1">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: h.level === 3 ? '0.75rem' : undefined }}>
            <a
              href={`#${h.id}`}
              className={
                activeId === h.id
                  ? 'block text-sm text-indigo-600 font-medium'
                  : 'block text-sm text-gray-500 hover:text-gray-800 transition-colors'
              }
              style={{ scrollBehavior: 'smooth' }}
              onClick={(e) => {
                e.preventDefault()
                const target = document.getElementById(h.id)
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' })
                  setActiveId(h.id)
                }
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
