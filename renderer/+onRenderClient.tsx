import ReactDOM from 'react-dom/client'
import { Layout } from './Layout'
import React from 'react'

export async function onRenderClient(pageContext: any) {
  const { Page, pageProps } = pageContext
  const root = document.getElementById('root')!
  ReactDOM.hydrateRoot(
    root,
    <Layout>
      <Page {...pageProps} />
    </Layout>
  )
}
