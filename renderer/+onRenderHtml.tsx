import ReactDOMServer from 'react-dom/server'
import { Layout } from './Layout'
import React from 'react'
import { PageContextProvider } from 'vike-react/usePageContext'
import { escapeInject, dangerouslySkipEscape } from 'vike/server'

export async function onRenderHtml(pageContext: any) {
  const { Page, pageProps } = pageContext
  const html = ReactDOMServer.renderToString(
    <PageContextProvider pageContext={pageContext}>
      <Layout>
        <Page {...pageProps} />
      </Layout>
    </PageContextProvider>
  )
  const themeScript = dangerouslySkipEscape(`<script>(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t||t==='system')&&window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})()</script>`)

  return {
    documentHtml: escapeInject`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    ${themeScript}
    <title>Doc Site Starter Kit</title>
  </head>
  <body>
    <div id="root">${dangerouslySkipEscape(html)}</div>
  </body>
</html>`,
    pageContext: {}
  }
}
