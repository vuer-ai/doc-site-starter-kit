import React, { useMemo, useRef, useState } from 'react'

export interface LineChartSeries {
  /** Series name (used for legend / accessibility). */
  label: string
  /** Line color. Falls back to a palette color based on index. */
  color?: string
  /** Ordered points. Re-sorted by x internally. */
  data: { x: number; y: number }[]
}

export interface LineChartProps {
  /** Chart title shown above the plot. */
  title?: string
  /** Series to plot. One line per series. */
  series: LineChartSeries[]
  /** X-axis label shown below the plot. */
  xAxisLabel?: string
  /** Y-axis label shown rotated on the left side of the plot. */
  yAxisLabel?: string
  /** If true, render as step (horizontal-then-vertical) lines. Defaults to true. */
  step?: boolean
  /** Approximate tick counts per axis. */
  xTickCount?: number
  yTickCount?: number
  /** Extra classes on the outer container. */
  className?: string
}

const PALETTE = [
  '#5470c6', '#91cc75', '#fac858', '#ee6666',
  '#73c0de', '#3ba272', '#fc8452', '#9a60b4',
  '#ea7ccc',
]

const WIDTH = 600
const HEIGHT = 380
const PAD = { top: 48, right: 24, bottom: 56, left: 64 }
const PLOT_W = WIDTH - PAD.left - PAD.right
const PLOT_H = HEIGHT - PAD.top - PAD.bottom

export function LineChart({
  title,
  series,
  xAxisLabel,
  yAxisLabel,
  step = true,
  xTickCount = 4,
  yTickCount = 5,
  className = '',
}: LineChartProps) {
  const { xMin, xMax, yMin, yMax } = useMemo(() => {
    if (!series.length || series.every(s => s.data.length === 0)) {
      return { xMin: 0, xMax: 1, yMin: 0, yMax: 1 }
    }
    let xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity
    for (const s of series) {
      for (const pt of s.data) {
        if (pt.x < xMin) xMin = pt.x
        if (pt.x > xMax) xMax = pt.x
        if (pt.y < yMin) yMin = pt.y
        if (pt.y > yMax) yMax = pt.y
      }
    }
    if (yMin === yMax) { yMin -= 0.5; yMax += 0.5 }
    if (xMin === xMax) { xMin -= 0.5; xMax += 0.5 }
    return { xMin, xMax, yMin, yMax }
  }, [series])

  const xScale = (x: number) =>
    PAD.left + ((x - xMin) / (xMax - xMin || 1)) * PLOT_W
  const yScale = (y: number) =>
    PAD.top + PLOT_H - ((y - yMin) / (yMax - yMin || 1)) * PLOT_H

  const yTicks = niceTicks(yMin, yMax, yTickCount)
  const xTicks = niceTicks(xMin, xMax, xTickCount)

  const sortedSeries = useMemo(
    () =>
      series.map((s, i) => ({
        label: s.label,
        color: s.color ?? PALETTE[i % PALETTE.length],
        data: [...s.data].sort((a, b) => a.x - b.x),
      })),
    [series],
  )

  const allXs = useMemo(() => {
    const set = new Set<number>()
    for (const s of sortedSeries) for (const p of s.data) set.add(p.x)
    return [...set].sort((a, b) => a - b)
  }, [sortedSeries])

  const paths = sortedSeries.map((s, i) => {
    if (s.data.length === 0) return null
    const pts = s.data
    let d = `M ${xScale(pts[0].x)} ${yScale(pts[0].y)}`
    for (let j = 1; j < pts.length; j++) {
      if (step) {
        d += ` L ${xScale(pts[j].x)} ${yScale(pts[j - 1].y)}`
        d += ` L ${xScale(pts[j].x)} ${yScale(pts[j].y)}`
      } else {
        d += ` L ${xScale(pts[j].x)} ${yScale(pts[j].y)}`
      }
    }
    return (
      <path
        key={i}
        d={d}
        stroke={s.color}
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
    )
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [hoverX, setHoverX] = useState<number | null>(null)

  const canHover = allXs.length > 0

  function handleMove(e: React.MouseEvent<SVGRectElement>) {
    const svg = svgRef.current
    if (!svg || !canHover) return
    const pt = svg.createSVGPoint()
    pt.x = e.clientX
    pt.y = e.clientY
    const ctm = svg.getScreenCTM()
    if (!ctm) return
    const svgPt = pt.matrixTransform(ctm.inverse())
    const dataX =
      xMin + ((svgPt.x - PAD.left) / PLOT_W) * (xMax - xMin)
    let best = allXs[0]
    for (const x of allXs) {
      if (Math.abs(x - dataX) < Math.abs(best - dataX)) best = x
    }
    setHoverX(best)
  }

  const hoverPoints =
    hoverX == null
      ? []
      : sortedSeries.map(s => {
          const exact = s.data.find(p => p.x === hoverX)
          if (exact) return { label: s.label, color: s.color, y: exact.y }
          // fall back to nearest if this series doesn't have that exact x
          if (!s.data.length) return { label: s.label, color: s.color, y: null }
          const nearest = s.data.reduce((best, p) =>
            Math.abs(p.x - hoverX) < Math.abs(best.x - hoverX) ? p : best,
          )
          return { label: s.label, color: s.color, y: nearest.y }
        })

  const hoverSvgX = hoverX == null ? null : xScale(hoverX)

  // Tooltip HTML position (in container pixels). Only computed at render time.
  let tooltipStyle: React.CSSProperties | null = null
  if (hoverSvgX != null && containerRef.current) {
    const w = containerRef.current.clientWidth
    const scale = w / WIDTH
    const pixelX = hoverSvgX * scale
    const flip = pixelX > w * 0.6
    tooltipStyle = {
      left: flip ? undefined : pixelX + 12,
      right: flip ? w - pixelX + 12 : undefined,
      top: PAD.top * scale + 8,
    }
  }

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-auto"
        role="img"
        aria-label={title ?? 'Line chart'}
      >
        {title && (
          <text
            x={WIDTH / 2}
            y={24}
            textAnchor="middle"
            fill="rgb(229 231 235)"
            fontSize={15}
            fontWeight={500}
          >
            {title}
          </text>
        )}

        {yTicks.map((y, i) => (
          <g key={`y-${i}`}>
            <line
              x1={PAD.left}
              x2={WIDTH - PAD.right}
              y1={yScale(y)}
              y2={yScale(y)}
              stroke="rgb(107 114 128)"
              strokeDasharray="4 4"
              strokeWidth={1}
              opacity={0.45}
            />
            <text
              x={PAD.left - 10}
              y={yScale(y) + 4}
              textAnchor="end"
              fill="rgb(156 163 175)"
              fontSize={12}
            >
              {formatTick(y)}
            </text>
          </g>
        ))}

        {xTicks.map((x, i) => (
          <g key={`x-${i}`}>
            <line
              x1={xScale(x)}
              x2={xScale(x)}
              y1={PAD.top}
              y2={HEIGHT - PAD.bottom}
              stroke="rgb(107 114 128)"
              strokeDasharray="4 4"
              strokeWidth={1}
              opacity={0.45}
            />
            <text
              x={xScale(x)}
              y={HEIGHT - PAD.bottom + 20}
              textAnchor="middle"
              fill="rgb(156 163 175)"
              fontSize={12}
            >
              {formatTick(x)}
            </text>
          </g>
        ))}

        <line
          x1={PAD.left}
          y1={HEIGHT - PAD.bottom}
          x2={WIDTH - PAD.right}
          y2={HEIGHT - PAD.bottom}
          stroke="rgb(156 163 175)"
          strokeWidth={1.25}
        />
        <line
          x1={PAD.left}
          y1={PAD.top}
          x2={PAD.left}
          y2={HEIGHT - PAD.bottom}
          stroke="rgb(156 163 175)"
          strokeWidth={1.25}
        />

        {paths}

        {hoverSvgX != null && (
          <g pointerEvents="none">
            <line
              x1={hoverSvgX}
              x2={hoverSvgX}
              y1={PAD.top}
              y2={HEIGHT - PAD.bottom}
              stroke="rgb(209 213 219)"
              strokeWidth={1}
              opacity={0.7}
            />
            {hoverPoints.map((p, i) =>
              p.y == null ? null : (
                <circle
                  key={i}
                  cx={hoverSvgX}
                  cy={yScale(p.y)}
                  r={4}
                  fill={p.color}
                  stroke="rgb(3 7 18)"
                  strokeWidth={1.5}
                />
              ),
            )}
          </g>
        )}

        {xAxisLabel && (
          <text
            x={PAD.left + PLOT_W / 2}
            y={HEIGHT - 14}
            textAnchor="middle"
            fill="rgb(209 213 219)"
            fontSize={13}
          >
            {xAxisLabel}
          </text>
        )}
        {yAxisLabel && (
          <text
            transform={`rotate(-90 18 ${PAD.top + PLOT_H / 2})`}
            x={18}
            y={PAD.top + PLOT_H / 2}
            textAnchor="middle"
            fill="rgb(209 213 219)"
            fontSize={13}
          >
            {yAxisLabel}
          </text>
        )}

        {canHover && (
          <rect
            x={PAD.left}
            y={PAD.top}
            width={PLOT_W}
            height={PLOT_H}
            fill="transparent"
            onMouseMove={handleMove}
            onMouseLeave={() => setHoverX(null)}
          />
        )}
      </svg>

      {hoverX != null && tooltipStyle && (
        <div
          className="absolute z-10 pointer-events-none bg-gray-900/95 border border-gray-700 rounded-lg px-3 py-2 text-xs shadow-lg min-w-[160px]"
          style={tooltipStyle}
        >
          <div className="font-semibold text-gray-100 mb-1.5">
            {formatValue(hoverX)}
          </div>
          <div className="space-y-1">
            {hoverPoints.map((p, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className="inline-block w-3 h-0.5 rounded-full shrink-0"
                  style={{ backgroundColor: p.color }}
                />
                <span className="text-gray-400 truncate">{p.label}:</span>
                <span className="ml-auto font-semibold text-gray-100 tabular-nums">
                  {p.y == null ? '—' : formatValue(p.y)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function niceTicks(min: number, max: number, count: number): number[] {
  const range = max - min
  if (range === 0) return [min]
  const rawStep = range / Math.max(count, 1)
  const mag = Math.pow(10, Math.floor(Math.log10(rawStep)))
  const normStep = rawStep / mag
  let niceStep: number
  if (normStep < 1.5) niceStep = 1
  else if (normStep < 3) niceStep = 2
  else if (normStep < 7) niceStep = 5
  else niceStep = 10
  niceStep *= mag
  const start = Math.ceil(min / niceStep - 1e-9) * niceStep
  const ticks: number[] = []
  for (let t = start; t <= max + 1e-9; t += niceStep) {
    ticks.push(Number(t.toFixed(10)))
  }
  return ticks
}

function formatTick(n: number): string {
  if (Number.isInteger(n)) return String(n)
  const abs = Math.abs(n)
  if (abs >= 100) return n.toFixed(0)
  if (abs >= 10) return n.toFixed(1)
  return n.toFixed(2).replace(/\.?0+$/, '')
}

function formatValue(n: number): string {
  if (n === 0) return '0'
  const abs = Math.abs(n)
  if (abs >= 10000 || abs < 0.001) return n.toExponential(2)
  if (Number.isInteger(n)) return String(n)
  if (abs >= 100) return n.toFixed(1)
  if (abs >= 10) return n.toFixed(2)
  return n.toFixed(3).replace(/\.?0+$/, '')
}
