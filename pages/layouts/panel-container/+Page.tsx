import React from 'react'
import { CodeBlock } from '../../../components/CodeBlock'
import { PanelContainer } from '../../../components/PanelContainer'

function Skeleton({ h = 80, w = '100%', rounded = 'rounded-2xl' }: { h?: number; w?: number | string; rounded?: string }) {
  return (
    <div
      className={`${rounded}`}
      style={{
        height: h,
        width: w,
        backgroundColor: 'rgb(var(--color-border) / 0.6)',
      }}
    />
  )
}

function Sparkline() {
  return (
    <svg viewBox="0 0 120 36" className="w-full h-9" preserveAspectRatio="none">
      <polyline
        fill="none"
        stroke="#60a5fa"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points="0,20 18,18 36,22 54,12 72,26 90,6 108,16 120,10"
      />
    </svg>
  )
}

function WidgetContent() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton h={120} />
      <div className="flex flex-col gap-2">
        <Skeleton h={10} w="80%" rounded="rounded-full" />
        <Skeleton h={10} w="55%" rounded="rounded-full" />
      </div>
      <Skeleton h={140} />
      <Sparkline />
    </div>
  )
}

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Layouts</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Panel Container</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          The default rounded surface for grouping related content. Use it for
          dashboard widgets, side panels, preview frames — anywhere you want
          content to feel like one unit.
        </p>
      </div>

      {/* Purpose */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Purpose</h2>
        <p className="text-gray-600 leading-relaxed">
          A neutral, theme-aware wrapper with a 28 px corner radius, 1 px border,
          and generous padding. It adapts to light and dark themes automatically
          and accepts any children, so most layout building blocks can sit inside one.
        </p>
      </div>

      {/* Usage */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Usage</h2>
        <CodeBlock
          language="tsx"
          code={`import { PanelContainer } from '../../components/PanelContainer'

<PanelContainer>
  <h3>Loss</h3>
  <LineChart ... />
</PanelContainer>

// Compact padding, fills parent height, no border:
<PanelContainer size="compact" fullHeight noBorder>
  ...
</PanelContainer>`}
        />
      </div>

      {/* Example */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Example</h2>
        <p className="text-gray-500 mb-6">
          A single panel holding a widget: header block, two text lines, a body
          block, and a sparkline.
        </p>
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Preview</span>
          </div>
          <div className="p-6 bg-gray-950">
            <div className="max-w-[320px] mx-auto">
              <PanelContainer>
                <WidgetContent />
              </PanelContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Component Interface */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Component Interface</h2>
        <CodeBlock
          language="tsx"
          code={`export interface PanelContainerProps {
  children: React.ReactNode
  /** Default 'comfortable'. 'compact' reduces padding; 'snug' removes it. */
  size?: 'snug' | 'compact' | 'comfortable'
  /** Fill the parent's height (useful in dock/flex layouts). */
  fullHeight?: boolean
  /** Hide the outer border. */
  noBorder?: boolean
  /** Raise with a subtle shadow. */
  elevated?: boolean
  className?: string
}`}
        />
      </div>

      {/* Wireframes */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Wireframe(s)</h2>
        <p className="text-gray-500 mb-6">Visual states.</p>

        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-1: default (comfortable)</span>
            </div>
            <div className="p-6 bg-gray-950">
              <div className="max-w-[320px] mx-auto">
                <PanelContainer>
                  <WidgetContent />
                </PanelContainer>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-2: compact, no border, elevated</span>
            </div>
            <div className="p-6 bg-gray-950">
              <div className="max-w-[320px] mx-auto">
                <PanelContainer size="compact" noBorder elevated>
                  <WidgetContent />
                </PanelContainer>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-3: nested panels</span>
            </div>
            <div className="p-6 bg-gray-950">
              <div className="max-w-[360px] mx-auto">
                <PanelContainer>
                  <div className="flex flex-col gap-4">
                    <PanelContainer size="compact" noBorder>
                      <Skeleton h={60} />
                    </PanelContainer>
                    <PanelContainer size="compact" noBorder>
                      <Sparkline />
                    </PanelContainer>
                  </div>
                </PanelContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
