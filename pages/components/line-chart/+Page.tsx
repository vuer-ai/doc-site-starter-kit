import React from 'react'
import { CodeBlock } from '../../../components/CodeBlock'
import { LineChart } from '../../../components/LineChart'

function decay(start: number, floor: number, seed: number) {
  const pts: { x: number; y: number }[] = []
  let y = start
  for (let x = 0; x <= 18; x++) {
    const noise = Math.sin(seed + x * 0.7) * 0.02 + Math.cos(seed * 2 + x) * 0.004
    y = Math.max(floor + noise * 0.3, y * 0.72 + floor * 0.28 + noise)
    pts.push({ x, y: Number(y.toFixed(4)) })
  }
  return pts
}

const EXAMPLE_SERIES = [
  { label: 'original',            color: '#5470c6', data: decay(0.09, 0.045, 0.1) },
  { label: 'socialeye',           color: '#91cc75', data: decay(0.22, 0.045, 1.2) },
  { label: 'socialeye_fixnorm',   color: '#fac858', data: decay(0.18, 0.050, 2.3) },
  { label: 'socialeye_noflip',    color: '#ee6666', data: decay(0.49, 0.060, 3.4) },
  { label: 'original_minmax',     color: '#73c0de', data: decay(0.08, 0.040, 4.5) },
  { label: 'socialeye_pretrained',color: '#3ba272', data: decay(0.30, 0.050, 5.6) },
  { label: 'socialeye_resnet50',  color: '#fc8452', data: decay(0.20, 0.055, 6.7) },
]

const SIMPLE_SERIES = [
  { label: 'loss', color: '#5470c6', data: [
    { x: 0, y: 1.2 }, { x: 1, y: 0.8 }, { x: 2, y: 0.55 }, { x: 3, y: 0.42 },
    { x: 4, y: 0.35 }, { x: 5, y: 0.30 }, { x: 6, y: 0.27 }, { x: 7, y: 0.25 },
  ]},
]

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Components</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Line Chart</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          A dark-themed multi-series line chart for training and evaluation metrics.
          Step-style lines by default, with dashed gridlines and a rotated Y-axis label.
          Modeled on the metric panels on dash.ml.
        </p>
      </div>

      {/* Purpose */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Purpose</h2>
        <p className="text-gray-600 leading-relaxed">
          Compare how a metric evolves across steps for one or many experiment runs.
          Each series is a run; color distinguishes them so users can see at a glance
          which run converges faster, plateaus earlier, or diverges.
        </p>
      </div>

      {/* Usage */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Usage</h2>
        <CodeBlock
          language="tsx"
          code={`import { LineChart } from '../../components/LineChart'

<LineChart
  title="eval.avg_euclidean_distance"
  xAxisLabel="Step"
  yAxisLabel="Distance"
  series={[
    { label: 'loss', color: '#5470c6', data: [{ x: 0, y: 1.2 }, { x: 1, y: 0.8 }] },
  ]}
/>`}
        />
      </div>

      {/* Example */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Example</h2>
        <p className="text-gray-500 mb-6">
          Seven runs' evaluation distance over 18 steps, showing the typical rapid-drop-then-plateau shape.
        </p>
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Preview</span>
          </div>
          <div className="p-6 bg-gray-950">
            <div className="max-w-2xl">
              <LineChart
                title="eval.avg_euclidean_distance"
                xAxisLabel="Step"
                yAxisLabel="eval.avg_euclidean_distance"
                series={EXAMPLE_SERIES}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Data structure */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Data structure</h2>
        <p className="text-gray-500 mb-4">What goes into the component.</p>
        <CodeBlock
          language="tsx"
          code={`// One series per run. Each data point is an {x, y} pair.
const series = [
  {
    label: 'original',
    color: '#5470c6',
    data: [{ x: 0, y: 0.09 }, { x: 1, y: 0.06 }, { x: 2, y: 0.05 }, /* ... */],
  },
  {
    label: 'socialeye',
    color: '#91cc75',
    data: [{ x: 0, y: 0.22 }, { x: 1, y: 0.08 }, /* ... */],
  },
]`}
        />
      </div>

      {/* Component Interface */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Component Interface</h2>
        <CodeBlock
          language="tsx"
          code={`export interface LineChartSeries {
  /** Series name (legend / accessibility). */
  label: string
  /** Line color. Falls back to a palette color based on index. */
  color?: string
  /** Ordered points. Re-sorted by x internally. */
  data: { x: number; y: number }[]
}

export interface LineChartProps {
  /** Title shown above the plot. */
  title?: string
  /** Series to plot — one line each. */
  series: LineChartSeries[]
  /** Label below the x-axis. */
  xAxisLabel?: string
  /** Label rotated on the left of the y-axis. */
  yAxisLabel?: string
  /** Render as step (horizontal-then-vertical) lines. Defaults to true. */
  step?: boolean
  /** Approximate tick counts per axis. */
  xTickCount?: number
  yTickCount?: number
  className?: string
}`}
        />
      </div>

      {/* Actions */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Actions</h2>
        <p className="text-gray-500 mb-4">What users can do with the component.</p>
        <ul className="text-gray-600 space-y-2 list-disc pl-6">
          <li><strong>Compare series:</strong> scan colored lines against each other; the plot renders every series in the same axes.</li>
          <li><strong>Read values:</strong> Y-axis ticks are generated with a &quot;nice&quot; step (1/2/5 × 10ⁿ), so users can estimate a point's value from the nearest gridline.</li>
          <li><strong>Resize:</strong> the chart is responsive; the SVG scales to its container width via <code>viewBox</code>.</li>
        </ul>
      </div>

      {/* Wireframes */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Wireframe(s)</h2>
        <p className="text-gray-500 mb-6">Visual states.</p>

        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-1: multi-series (default, step lines)</span>
            </div>
            <div className="p-6 bg-gray-950">
              <div className="max-w-2xl">
                <LineChart
                  title="eval.avg_euclidean_distance"
                  xAxisLabel="Step"
                  yAxisLabel="eval.avg_euclidean_distance"
                  series={EXAMPLE_SERIES}
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-2: single series, smooth lines</span>
            </div>
            <div className="p-6 bg-gray-950">
              <div className="max-w-2xl">
                <LineChart
                  title="train/loss"
                  xAxisLabel="Epoch"
                  yAxisLabel="loss"
                  step={false}
                  series={SIMPLE_SERIES}
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-3: no title or labels (minimal)</span>
            </div>
            <div className="p-6 bg-gray-950">
              <div className="max-w-2xl">
                <LineChart series={SIMPLE_SERIES} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-4: empty (no series)</span>
            </div>
            <div className="p-6 bg-gray-950">
              <div className="max-w-2xl">
                <LineChart series={[]} title="No data yet" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
