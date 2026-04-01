import ReactDOM from 'react-dom/client'
import { Layout } from './Layout'
import React from 'react'
import { PageContextProvider } from 'vike-react/usePageContext'

export async function onRenderClient(pageContext: any) {
  const { Page, pageProps } = pageContext
  const root = document.getElementById('root')!
  ReactDOM.hydrateRoot(
    root,
    <PageContextProvider pageContext={pageContext}>
      <Layout>
        <Page {...pageProps} />
      </Layout>
    </PageContextProvider>
  )
}
