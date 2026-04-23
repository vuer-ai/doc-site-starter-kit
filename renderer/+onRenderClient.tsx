import ReactDOM from 'react-dom/client'
import { Layout } from './Layout'
import React from 'react'
import { PageContextProvider } from 'vike-react/usePageContext'

// Persist a single React root across SPA navigations. Creating a fresh root on
// every nav would unmount + remount the entire tree (including Sidebar), which
// causes flicker and resets internal scroll. Instead we hydrate once, then
// reuse the root's `render` so React reconciles in-place.
let root: ReactDOM.Root | undefined
let isFirstRender = true

export async function onRenderClient(pageContext: any) {
  const { Page, pageProps } = pageContext
  const container = document.getElementById('root')!
  const tree = (
    <PageContextProvider pageContext={pageContext}>
      <Layout>
        <Page {...pageProps} />
      </Layout>
    </PageContextProvider>
  )

  if (!root) {
    // First render of this session — hydrate the SSR'd HTML.
    root = ReactDOM.hydrateRoot(container, tree)
    isFirstRender = true
    return
  }

  // SPA navigation — reuse the root. Fade the main content fully out before
  // swapping + scrolling so the scroll reset isn't visible.
  const main = document.querySelector<HTMLElement>('main#main-content')
    ?? document.querySelector<HTMLElement>('main')
  const mainScroll = document.getElementById('main-scroll')

  const FADE_MS = 120
  if (main) {
    main.style.transition = `opacity ${FADE_MS}ms ease`
    main.style.opacity = '0'
  }

  // Wait for the fade-out to actually complete. Scrolling or swapping content
  // earlier (when opacity is still ~0.7) makes the jump-to-top visible.
  await new Promise<void>(r => setTimeout(r, FADE_MS))

  // Reset only the main content's scroller. The sidebar has its own scroll
  // container and is never touched — the window doesn't scroll at all in this
  // layout, so nav is completely insulated from the sidebar.
  if (!isFirstRender) {
    mainScroll?.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }
  root.render(tree)

  // After React commits the new DOM, fade back in.
  requestAnimationFrame(() => {
    if (main) main.style.opacity = '1'
  })
  isFirstRender = false
}
