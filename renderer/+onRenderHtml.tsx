import ReactDOMServer from 'react-dom/server'
import { Layout } from './Layout'
import React from 'react'

export async function onRenderHtml(pageContext: any) {
  const { Page, pageProps } = pageContext
  const html = ReactDOMServer.renderToString(
    <Layout>
      <Page {...pageProps} />
    </Layout>
  )
  return {
    documentHtml: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Doc Site Starter Kit</title>
  </head>
  <body>
    <div id="root">${html}</div>
  </body>
</html>`,
    pageContext: {}
  }
}
