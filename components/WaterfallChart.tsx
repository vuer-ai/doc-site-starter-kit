import React, { useEffect, useMemo, useRef, useState } from 'react'

export type WaterfallStatus = 'success' | 'warning' | 'error' | 'info' | 'queued' | 'running'

export interface WaterfallTask {
  id: string
  name: string
  status?: WaterfallStatus
  icon?: React.ReactNode
  /** Start time in seconds (can be negative for past events). */
  start: number
  /** End time in seconds. If omitted, the task renders as a single point. */
  end?: number
  children?: WaterfallTask[]
}

export interface WaterfallProps {
  tasks: WaterfallTask[]
  /** Visible window [startSec, endSec]. Defaults to auto-fit with padding. */
  window?: [number, number]
  onWindowChange?: (w: [number, number]) => void
  /** Playhead value in seconds. Falls back to middle of window. */
  playhead?: number
  onPlayheadChange?: (t: number) => void
  /** Step size for the < / > buttons, in seconds. Default 1. */
  playheadStep?: number
  /** Enable drag-to-pan and wheel-to-zoom on the timeline. Default true. */
  interactive?: boolean
  searchable?: boolean
  /** Width of left (task) column in px. Default 360. */
  leftWidth?: number
  /** Number of axis ticks. Default 8. */
  ticks?: number
  /** Row height in px. Default 36. */
  rowHeight?: number
  className?: string
}

const STATUS_COLOR: Record<WaterfallStatus, string> = {
  success: '#22c55e',
  warning: '#f97316',
  error:   '#ef4444',
  info:    '#3b82f6',
  queued:  '#a855f7',
  running: '#3b82f6',
}

function statusColor(s: WaterfallStatus | undefined): string {
  return s ? STATUS_COLOR[s] : '#64748b'
}

function formatTick(sec: number): string {
  if (sec === 0) return '0s'
  const sign = sec < 0 ? '-' : ''
  const abs = Math.abs(sec)
  return `${sign}${Math.round(abs)}s`
}

function formatPlayhead(sec: number): string {
  return `${sec.toFixed(3)}s`
}

/* --- icons ----------------------------------------------------------- */

function Svg({ children, className = 'w-4 h-4' }: { children: React.ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  )
}

function CheckCircleIcon()  { return <Svg><circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-6" /></Svg> }
function PauseCircleIcon()  { return <Svg><circle cx="12" cy="12" r="9" /><path d="M10 9v6M14 9v6" /></Svg> }
function ClockIcon()        { return <Svg><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Svg> }
function FileCodeIcon()     { return <Svg><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /><path d="M10 13l-2 2 2 2M14 13l2 2-2 2" /></Svg> }
function FileIcon()         { return <Svg><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /></Svg> }
function BotIcon()          { return <Svg><rect x="4" y="8" width="16" height="12" rx="2" /><path d="M12 4v4M8 13h.01M16 13h.01M9 17h6" /></Svg> }
function XCircleIcon()      { return <Svg><circle cx="12" cy="12" r="9" /><path d="m9 9 6 6M15 9l-6 6" /></Svg> }
function ChevronDownIcon()  { return <Svg><path d="m6 9 6 6 6-6" /></Svg> }
function ChevronRightIcon() { return <Svg><path d="m9 6 6 6-6 6" /></Svg> }
function ChevronLeftIcon()  { return <Svg><path d="m15 6-6 6 6 6" /></Svg> }
function EyeIcon()          { return <Svg><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></Svg> }
function EyeOffIcon()       { return <Svg><path d="M3 3l18 18" /><path d="M10.6 6.1A10 10 0 0 1 12 6c7 0 10 6 10 6a14 14 0 0 1-3.1 3.8M6.3 6.3A13 13 0 0 0 2 12s3 6 10 6a10 10 0 0 0 4.3-1" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" /></Svg> }
function TrashIcon()        { return <Svg><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6M14 11v6" /></Svg> }
function SearchIcon()       { return <Svg><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></Svg> }

function defaultIconFor(status: WaterfallStatus | undefined): React.ReactNode {
  switch (status) {
    case 'success': return <CheckCircleIcon />
    case 'warning': return <PauseCircleIcon />
    case 'error':   return <XCircleIcon />
    case 'queued':  return <ClockIcon />
    case 'running': return <FileCodeIcon />
    case 'info':    return <FileIcon />
    default:        return <FileIcon />
  }
}

/* --- flatten --------------------------------------------------------- */

interface Row {
  task: WaterfallTask
  depth: number
  hasChildren: boolean
  isCollapsed: boolean
  visible: boolean
}

function flatten(
  tasks: WaterfallTask[],
  collapsed: Set<string>,
  deleted: Set<string>,
  query: string,
): Row[] {
  const q = query.trim().toLowerCase()
  const rows: Row[] = []
  const walk = (list: WaterfallTask[], depth: number, parentVisible: boolean) => {
    for (const t of list) {
      if (deleted.has(t.id)) continue
      const liveChildren = t.children?.filter(c => !deleted.has(c.id)) ?? []
      const hasChildren = liveChildren.length > 0
      const isCollapsed = collapsed.has(t.id)
      const selfMatches = !q || t.name.toLowerCase().includes(q)
      rows.push({ task: t, depth, hasChildren, isCollapsed, visible: parentVisible && selfMatches })
      if (hasChildren && !isCollapsed) {
        walk(liveChildren, depth + 1, parentVisible && selfMatches)
      }
    }
  }
  walk(tasks, 0, true)
  return rows.filter(r => r.visible)
}

/* --- component ------------------------------------------------------- */

export function Waterfall({
  tasks,
  window: windowProp,
  onWindowChange,
  playhead: playheadProp,
  onPlayheadChange,
  playheadStep = 1,
  interactive = true,
  searchable = true,
  leftWidth: leftWidthProp = 360,
  ticks = 8,
  rowHeight = 36,
  className = '',
}: WaterfallProps) {
  const [query, setQuery] = useState('')
  const [leftWidth, setLeftWidth] = useState<number>(leftWidthProp)
  const [hidden, setHidden] = useState<Set<string>>(new Set())
  const [deleted, setDeleted] = useState<Set<string>>(new Set())
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())
  const [internalPlayhead, setInternalPlayhead] = useState<number | null>(null)
  const [internalWindow, setInternalWindow] = useState<[number, number] | null>(null)

  const autoWindow = useMemo<[number, number]>(() => {
    let min = Infinity
    let max = -Infinity
    const walk = (ts: WaterfallTask[]) => {
      for (const t of ts) {
        min = Math.min(min, t.start)
        max = Math.max(max, t.end ?? t.start)
        if (t.children) walk(t.children)
      }
    }
    walk(tasks)
    if (!isFinite(min)) { min = -60; max = 0 }
    const pad = (max - min) * 0.08 || 5
    return [min - pad, max + pad]
  }, [tasks])

  const effectiveWindow = windowProp ?? internalWindow ?? autoWindow
  const [winStart, winEnd] = effectiveWindow
  const winSize = winEnd - winStart

  function commitWindow(w: [number, number]) {
    if (onWindowChange) onWindowChange(w)
    if (windowProp === undefined) setInternalWindow(w)
  }

  const timelineRef = useRef<HTMLDivElement | null>(null)

  // Keep latest window + commit fn accessible to stable event handlers
  const winRef = useRef<[number, number]>(effectiveWindow)
  winRef.current = effectiveWindow
  const commitRef = useRef(commitWindow)
  commitRef.current = commitWindow
  const playheadRef = useRef<number>(0)
  const setPlayheadStableRef = useRef<(t: number) => void>(() => {})
  const pillDragRef = useRef<{ x: number; startWindow: [number, number] } | null>(null)
  const dividerDragRef = useRef<{ x: number; startWidth: number } | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  // Drag-to-pan + wheel-to-zoom (registered once per `interactive`)
  useEffect(() => {
    if (!interactive) return
    const el = timelineRef.current
    if (!el) return

    const dragRef: { current: { x: number; window: [number, number] } | null } = { current: null }

    const onDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (target?.closest('button, input')) return
      dragRef.current = { x: e.clientX, window: [...winRef.current] as [number, number] }
      el.style.cursor = 'grabbing'
      e.preventDefault()
    }
    const onMove = (e: MouseEvent) => {
      const d = dragRef.current
      if (!d) return
      const rect = el.getBoundingClientRect()
      if (rect.width === 0) return
      const dx = e.clientX - d.x
      const [s, eWin] = d.window
      const dt = -(dx / rect.width) * (eWin - s)
      commitRef.current([s + dt, eWin + dt])
    }
    const onUp = () => {
      if (!dragRef.current) return
      dragRef.current = null
      el.style.cursor = 'grab'
    }

    const onWheel = (e: WheelEvent) => {
      const rect = el.getBoundingClientRect()
      if (rect.width === 0) return
      e.preventDefault()
      const x = e.clientX - rect.left
      const frac = Math.max(0, Math.min(1, x / rect.width))
      const [s, eWin] = winRef.current
      const cursorT = s + frac * (eWin - s)
      const factor = Math.max(0.1, Math.min(10, Math.pow(1.0015, e.deltaY)))
      const newSize = Math.max(0.01, (eWin - s) * factor)
      const newStart = cursorT - frac * newSize
      commitRef.current([newStart, newStart + newSize])
    }

    el.addEventListener('mousedown', onDown)
    el.addEventListener('wheel', onWheel, { passive: false })
    globalThis.addEventListener('mousemove', onMove)
    globalThis.addEventListener('mouseup', onUp)
    el.style.cursor = 'grab'
    return () => {
      el.removeEventListener('mousedown', onDown)
      el.removeEventListener('wheel', onWheel)
      globalThis.removeEventListener('mousemove', onMove)
      globalThis.removeEventListener('mouseup', onUp)
    }
  }, [interactive])

  const rows = useMemo(() => flatten(tasks, collapsed, deleted, query), [tasks, collapsed, deleted, query])

  const playhead =
    playheadProp ?? internalPlayhead ?? (winStart + winEnd) / 2

  function setPlayhead(t: number) {
    const clamped = Math.max(winStart, Math.min(winEnd, t))
    if (onPlayheadChange) onPlayheadChange(clamped)
    else setInternalPlayhead(clamped)
  }

  playheadRef.current = playhead
  setPlayheadStableRef.current = setPlayhead

  // Drag-the-pill to scrub playhead, and drag the column divider to resize
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      // Zoom window (anchored on the pill's center)
      const p = pillDragRef.current
      if (p) {
        const el = timelineRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        if (rect.width === 0) return
        const dx = e.clientX - p.x
        const [s0, e0] = p.startWindow
        const center = (s0 + e0) / 2
        // Drag right → shrink window (zoom in, tracks get longer);
        // Drag left  → grow window (zoom out, tracks get shorter).
        const factor = Math.exp(-(dx / rect.width) * 2)
        const newSize = Math.max(0.01, (e0 - s0) * factor)
        commitRef.current([center - newSize / 2, center + newSize / 2])
        return
      }
      // Resize column
      const d = dividerDragRef.current
      if (d) {
        const cont = containerRef.current
        const contW = cont ? cont.getBoundingClientRect().width : Infinity
        const dx = e.clientX - d.x
        const min = 160
        const max = Math.max(min + 120, contW - 160)
        const next = Math.max(min, Math.min(max, d.startWidth + dx))
        setLeftWidth(next)
      }
    }
    const onUp = () => {
      if (pillDragRef.current || dividerDragRef.current) {
        pillDragRef.current = null
        dividerDragRef.current = null
        document.body.style.cursor = ''
      }
    }
    globalThis.addEventListener('mousemove', onMove)
    globalThis.addEventListener('mouseup', onUp)
    return () => {
      globalThis.removeEventListener('mousemove', onMove)
      globalThis.removeEventListener('mouseup', onUp)
    }
  }, [])

  function toggleCollapse(id: string) {
    setCollapsed(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleHidden(id: string) {
    setHidden(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function deleteTask(id: string) {
    setDeleted(prev => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }

  const tickValues = useMemo(() => {
    const vals: number[] = []
    const step = winSize / ticks
    for (let i = 0; i <= ticks; i++) vals.push(winStart + i * step)
    return vals
  }, [winStart, winSize, ticks])

  const pctOf = (t: number) => ((t - winStart) / winSize) * 100

  return (
    <div
      className={`rounded-xl border overflow-hidden ${className}`}
      style={{
        borderColor: 'rgb(var(--color-border))',
        backgroundColor: 'rgb(var(--color-bg))',
        color: 'rgb(var(--color-text))',
      }}
    >
      {/* Header: search + axis */}
      <div
        className="flex items-center border-b"
        style={{ borderColor: 'rgb(var(--color-border))' }}
      >
        <div className="flex-shrink-0 p-2" style={{ width: leftWidth }}>
          {searchable ? (
            <div className="relative">
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: 'rgb(var(--color-text-muted))' }}
              >
                <SearchIcon />
              </span>
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-9 pr-3 py-2 text-sm border focus:outline-none transition-colors"
                style={{
                  backgroundColor: 'rgb(var(--color-bg-secondary))',
                  borderColor: 'rgb(var(--color-border))',
                  color: 'rgb(var(--color-text))',
                  borderRadius: '28px',
                }}
              />
            </div>
          ) : (
            <div />
          )}
        </div>

        <div
          className="relative flex-1 h-11 border-l overflow-hidden"
          style={{ borderColor: 'rgb(var(--color-border))' }}
        >
          {tickValues.map((t, i) => (
            <span
              key={i}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 inline-block px-2 py-0.5 rounded-full text-xs whitespace-nowrap"
              style={{
                left: `${pctOf(t)}%`,
                backgroundColor: 'rgb(var(--color-bg-secondary))',
                color: 'rgb(var(--color-text-muted))',
              }}
            >
              {formatTick(t)}
            </span>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="relative" ref={containerRef}>
        <div className="flex">
          {/* Left: tree */}
          <div className="flex-shrink-0" style={{ width: leftWidth }}>
            {rows.length === 0 ? (
              <div
                className="px-4 py-6 text-sm text-center"
                style={{ color: 'rgb(var(--color-text-muted))' }}
              >
                No tasks.
              </div>
            ) : (
              rows.map(({ task, depth, hasChildren, isCollapsed }) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  depth={depth}
                  hasChildren={hasChildren}
                  isCollapsed={isCollapsed}
                  isHidden={hidden.has(task.id)}
                  rowHeight={rowHeight}
                  onToggle={() => toggleCollapse(task.id)}
                  onToggleHidden={() => toggleHidden(task.id)}
                  onDelete={() => deleteTask(task.id)}
                />
              ))
            )}
          </div>

          {/* Right: timeline */}
          <div
            ref={timelineRef}
            className="relative flex-1 border-l select-none overflow-hidden"
            style={{
              borderColor: 'rgb(var(--color-border))',
              cursor: interactive ? 'grab' : 'default',
              touchAction: interactive ? 'none' : 'auto',
            }}
          >
            {/* vertical gridlines span the full body */}
            {tickValues.map((t, i) => (
              <div
                key={i}
                className="absolute top-0 bottom-0 w-px pointer-events-none"
                style={{
                  left: `${pctOf(t)}%`,
                  backgroundColor: 'rgb(var(--color-border) / 0.4)',
                }}
              />
            ))}

            {/* lanes */}
            {rows.map(({ task }) => {
              const isHidden = hidden.has(task.id)
              const color = statusColor(task.status)
              const hasDuration = task.end !== undefined && task.end > task.start
              const left = pctOf(task.start)
              const width = hasDuration ? pctOf(task.end as number) - left : 0
              return (
                <div
                  key={task.id}
                  className="relative"
                  style={{ height: rowHeight, borderBottom: '1px solid rgb(var(--color-border) / 0.5)' }}
                >
                  {isHidden ? null : (
                    <>
                      {hasDuration ? (
                        <div
                          className="absolute top-1/2 -translate-y-1/2 rounded-sm"
                          style={{
                            left: `${left}%`,
                            width: `${width}%`,
                            height: 8,
                            backgroundColor: `${color}40`,
                            borderLeft: `2px solid ${color}`,
                          }}
                        />
                      ) : null}
                      {/* end marker triangle */}
                      <span
                        className="absolute top-1/2 -translate-y-1/2"
                        style={{
                          left: `${pctOf(task.end ?? task.start)}%`,
                          color,
                          transform: 'translate(-4px, -50%)',
                        }}
                        aria-hidden
                      >
                        <svg width="8" height="10" viewBox="0 0 8 10" fill="currentColor">
                          <path d="M0 0l8 5-8 5z" />
                        </svg>
                      </span>
                    </>
                  )}
                </div>
              )
            })}

            {/* playhead line */}
            <div
              className="absolute top-0 bottom-0 w-px pointer-events-none"
              style={{
                left: `${pctOf(playhead)}%`,
                backgroundColor: 'rgb(var(--color-primary))',
              }}
            />
          </div>
        </div>

        {/* Column divider (resize handle) */}
        <div
          role="separator"
          aria-orientation="vertical"
          className="absolute top-0 bottom-0"
          style={{
            left: leftWidth - 3,
            width: 6,
            cursor: 'col-resize',
            zIndex: 2,
          }}
          onMouseDown={e => {
            dividerDragRef.current = { x: e.clientX, startWidth: leftWidth }
            document.body.style.cursor = 'col-resize'
            e.preventDefault()
            e.stopPropagation()
          }}
        />

        {/* Playhead stepper overlay (fixed at timeline center; scrub by dragging) */}
        <div
          className="absolute"
          style={{
            left: `calc(${leftWidth}px + (100% - ${leftWidth}px) * 0.5)`,
            transform: 'translate(-50%, 0)',
            bottom: 12,
          }}
        >
          <div
            className="flex items-center gap-2 rounded-full border px-2 py-1 shadow-sm"
            style={{
              backgroundColor: 'rgb(var(--color-bg-secondary))',
              borderColor: 'rgb(var(--color-border))',
            }}
          >
            <button
              type="button"
              onClick={() => setPlayhead(playhead - playheadStep)}
              className="p-0.5 rounded hover:opacity-80"
              style={{ color: 'rgb(var(--color-text-muted))' }}
              aria-label="Step backward"
            >
              <ChevronLeftIcon />
            </button>
            <span
              className="text-sm tabular-nums min-w-[4.5rem] text-center select-none"
              style={{
                color: 'rgb(var(--color-text))',
                cursor: 'ew-resize',
                touchAction: 'none',
              }}
              onMouseDown={e => {
                pillDragRef.current = { x: e.clientX, startWindow: [...winRef.current] as [number, number] }
                document.body.style.cursor = 'ew-resize'
                e.preventDefault()
                e.stopPropagation()
              }}
              title="Drag to zoom"
            >
              {formatPlayhead(playhead)}
            </span>
            <button
              type="button"
              onClick={() => setPlayhead(playhead + playheadStep)}
              className="p-0.5 rounded hover:opacity-80"
              style={{ color: 'rgb(var(--color-text-muted))' }}
              aria-label="Step forward"
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function TaskRow({
  task,
  depth,
  hasChildren,
  isCollapsed,
  isHidden,
  rowHeight,
  onToggle,
  onToggleHidden,
  onDelete,
}: {
  task: WaterfallTask
  depth: number
  hasChildren: boolean
  isCollapsed: boolean
  isHidden: boolean
  rowHeight: number
  onToggle: () => void
  onToggleHidden: () => void
  onDelete: () => void
}) {
  const color = statusColor(task.status)
  return (
    <div
      className="group flex items-center gap-2 px-2 text-sm"
      style={{
        height: rowHeight,
        paddingLeft: 8 + depth * 20,
        borderBottom: '1px solid rgb(var(--color-border) / 0.5)',
        color: 'rgb(var(--color-text))',
        opacity: isHidden ? 0.5 : 1,
      }}
    >
      {hasChildren ? (
        <button
          type="button"
          onClick={onToggle}
          className="w-4 h-4 flex items-center justify-center shrink-0"
          style={{ color: 'rgb(var(--color-text-muted))' }}
          aria-label={isCollapsed ? 'Expand' : 'Collapse'}
        >
          {isCollapsed ? <ChevronRightIcon /> : <ChevronDownIcon />}
        </button>
      ) : (
        <span className="w-4 h-4 shrink-0" />
      )}
      <span className="shrink-0" style={{ color }}>
        {task.icon ?? defaultIconFor(task.status)}
      </span>
      <span
        className="truncate flex-1"
        style={{ textDecoration: isHidden ? 'line-through' : 'none' }}
      >
        {task.name}
      </span>
      <button
        type="button"
        onClick={e => { e.stopPropagation(); onDelete() }}
        className="shrink-0 p-0.5 rounded opacity-60 hover:opacity-100"
        style={{ color: 'rgb(var(--color-text-muted))' }}
        aria-label="Delete track"
        title="Delete track"
      >
        <TrashIcon />
      </button>
      <button
        type="button"
        onClick={onToggleHidden}
        className="shrink-0 p-0.5 rounded opacity-60 hover:opacity-100"
        style={{ color: 'rgb(var(--color-text-muted))' }}
        aria-label={isHidden ? 'Show track' : 'Hide track'}
        title={isHidden ? 'Show track' : 'Hide track'}
      >
        {isHidden ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </div>
  )
}
