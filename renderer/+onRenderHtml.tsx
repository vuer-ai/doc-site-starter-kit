import ReactDOMServer from 'react-dom/server'
import { Layout } from './Layout'
import React from 'react'
import { PageContextProvider } from 'vike-react/usePageContext'
import { escapeInject, dangerouslySkipEscape } from 'vike/server'

function getCookieHeader(pageContext: any): string {
  return (
    pageContext?.headers?.cookie ||
    pageContext?.request?.headers?.cookie ||
    pageContext?.headersOriginal?.cookie ||
    ''
  )
}

function readResolvedTheme(cookie: string): 'light' | 'dark' {
  const resolved = /(?:^|;\s*)theme-resolved=(light|dark)/.exec(cookie)?.[1]
  if (resolved === 'dark' || resolved === 'light') return resolved
  const raw = /(?:^|;\s*)theme=(light|dark)/.exec(cookie)?.[1]
  return raw === 'dark' ? 'dark' : 'light'
}

function readThemeSelection(cookie: string): 'light' | 'dark' | 'system' {
  const v = /(?:^|;\s*)theme=(light|dark|system)/.exec(cookie)?.[1]
  if (v === 'dark' || v === 'light' || v === 'system') return v
  return 'light'
}

export async function onRenderHtml(pageContext: any) {
  const cookie = getCookieHeader(pageContext)
  pageContext.themeSelection = readThemeSelection(cookie)

  const { Page, pageProps } = pageContext
  const html = ReactDOMServer.renderToString(
    <PageContextProvider pageContext={pageContext}>
      <Layout>
        <Page {...pageProps} />
      </Layout>
    </PageContextProvider>
  )
  const initialTheme = readResolvedTheme(cookie)
  // Server already rendered the correct data-theme from the cookie. The inline
  // script only needs to (a) suppress CSS transitions on the initial paint and
  // (b) correct 'system' if the OS preference has flipped since the last visit.
  const themeScript = dangerouslySkipEscape(`<script>(function(){document.documentElement.classList.add('no-transitions');try{var t=localStorage.getItem('theme');if(t==='system'){var d=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';if(document.documentElement.getAttribute('data-theme')!==d){document.documentElement.setAttribute('data-theme',d)}}}catch(e){}})()</script>`)

  return {
    documentHtml: escapeInject`<!DOCTYPE html>
<html lang="en" data-theme="${initialTheme}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    ${themeScript}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300..700;1,14..32,300..700&family=Fira+Mono:wght@400;500&display=swap" rel="stylesheet" />
    <title>Doc Site Starter Kit</title>
  </head>
  <body>
    <div id="root">${dangerouslySkipEscape(html)}</div>
  </body>
</html>`,
    pageContext: {}
  }
}
