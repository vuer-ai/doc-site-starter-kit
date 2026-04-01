export interface PageMeta {
  path: string
  title: string
  section: string
}

export const pages: PageMeta[] = [
  { path: '/',               title: 'Overview',        section: 'Introduction' },
  { path: '/getting-started', title: 'Getting Started', section: 'Introduction' },
  { path: '/installation',   title: 'Installation',    section: 'Introduction' },
  { path: '/configuration',  title: 'Configuration',   section: 'Guides'       },
  { path: '/components',     title: 'Components',      section: 'Guides'       },
  { path: '/theming',        title: 'Theming',         section: 'Guides'       },
  { path: '/api-reference',  title: 'API Reference',   section: 'Reference'    },
]

export function getAdjacentPages(path: string) {
  const idx = pages.findIndex(p => p.path === path)
  return {
    current: pages[idx] ?? null,
    prev:    idx > 0              ? pages[idx - 1] : null,
    next:    idx < pages.length - 1 ? pages[idx + 1] : null,
  }
}
