declare module '*.mdx' {
  import type { ComponentType } from 'react'
  const Component: ComponentType
  export default Component
  export const title: string
  export const section: string
  export const order: number
}
