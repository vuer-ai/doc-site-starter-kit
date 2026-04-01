export interface PageMeta {
  path: string
  title: string
  section: string
}

const modules = import.meta.glob<{ title: string; section: string; order: number }>(
  '../pages/**/+Page.mdx',
  { eager: true }
)

export const pages: PageMeta[] = Object.entries(modules)
  .map(([filePath, mod]) => {
    const dir = filePath.replace('../pages/', '').replace('/+Page.mdx', '')
    return {
      path: dir === 'index' ? '/' : `/${dir}`,
      title: mod.title ?? dir,
      section: mod.section ?? '',
      order: mod.order ?? 99,
    }
  })
  .sort((a, b) => (a as any).order - (b as any).order)
  .map(({ path, title, section }) => ({ path, title, section }))

export function getAdjacentPages(path: string) {
  const idx = pages.findIndex(p => p.path === path)
  return {
    current: pages[idx] ?? null,
    prev:    idx > 0              ? pages[idx - 1] : null,
    next:    idx < pages.length - 1 ? pages[idx + 1] : null,
  }
}
