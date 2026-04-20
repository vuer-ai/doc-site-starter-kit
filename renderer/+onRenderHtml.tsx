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
  const themeScript = dangerouslySkipEscape(`<script>(function(){document.documentElement.classList.add('no-transitions');try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.setAttribute('data-theme','dark')}else if(t==='system'){var d=window.matchMedia('(prefers-color-scheme:dark)').matches;document.documentElement.setAttribute('data-theme',d?'dark':'light')}else{document.documentElement.setAttribute('data-theme','light')}}catch(e){document.documentElement.setAttribute('data-theme','light')}})()</script>`)

  return {
    documentHtml: escapeInject`<!DOCTYPE html>
<html lang="en" data-theme="light">
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
