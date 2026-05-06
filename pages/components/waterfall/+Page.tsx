import React from 'react'
import { CodeBlock } from '../../../components/CodeBlock'
import { Waterfall, type WaterfallTask } from '../../../components/WaterfallChart'

const EXAMPLE: WaterfallTask[] = [
  {
    id: 'queue',
    name: 'Job registered in queue',
    status: 'queued',
    start: -70,
    end: -65,
  },
  {
    id: 'generate-report',
    name: 'generate-report',
    status: 'info',
    start: -65,
    end: -30,
    children: [
      {
        id: 'attempt-1',
        name: 'Attempt 1',
        status: 'running',
        start: -65,
        end: -30,
        children: [
          { id: 'fetch',    name: 'Fetch database records',     status: 'success', start: -65, end: -58 },
          { id: 'halt',     name: 'Job halted, waiting for resources...', status: 'warning', start: -58, end: -52 },
          { id: 'wait',     name: 'Waiting for image renderer...',        status: 'info',    start: -52, end: -47 },
          { id: 'render',   name: 'Render charts',               status: 'info',    start: -47, end: -39 },
          { id: 'pdf',      name: 'Assemble PDF',                status: 'info',    start: -39, end: -32 },
          { id: 'finalize', name: 'Finalize upload',             status: 'success', start: -32, end: -30 },
        ],
      },
    ],
  },
]

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Components</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Waterfall</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          A gantt-style timeline for nested tasks. Left column shows the task tree;
          right column shows each task's bar against a time axis with a draggable playhead.
        </p>
      </div>

      {/* Purpose */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Purpose</h2>
        <p className="text-gray-600 leading-relaxed">
          Visualize the execution trace of a job, pipeline, or request across its
          nested sub-tasks. Users can collapse branches, filter by name, drag/zoom
          the timeline, and scrub a playhead to inspect the state at any moment in time.
        </p>
      </div>

      {/* Usage */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Usage</h2>
        <CodeBlock
          language="tsx"
          code={`import { Waterfall, type WaterfallTask } from '../../components/WaterfallChart'

const tasks: WaterfallTask[] = [
  { id: 'queue', name: 'Job queued', status: 'queued', start: -10, end: -8 },
  { id: 'run',   name: 'Run job',    status: 'running', start: -8, end: -2 },
]

<Waterfall tasks={tasks} />`}
        />
      </div>

      {/* Example */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Basic Usage</h2>
        <p className="text-gray-500 mb-6">
          A report-generation job with nested attempts and sub-tasks, each
          coloured by status.
        </p>
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Preview</span>
          </div>
          <div className="p-6" style={{ backgroundColor: 'rgb(var(--color-bg))' }}>
            <Waterfall tasks={EXAMPLE} />
          </div>
        </div>
      </div>

      {/* Data structure */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Data structure</h2>
        <p className="text-gray-500 mb-4">What goes into the component.</p>
        <CodeBlock
          language="tsx"
          code={`// A tree of tasks. Each task has a start time and (optionally) an end time.
const tasks: WaterfallTask[] = [
  { id: 'queue', name: 'Job registered in queue', status: 'queued', start: -70, end: -65 },
  {
    id: 'generate-report',
    name: 'generate-report',
    status: 'info',
    start: -65, end: -30,
    children: [
      { id: 'fetch', name: 'Fetch database records', status: 'success', start: -65, end: -58 },
      { id: 'halt',  name: 'Halted, waiting...',     status: 'warning', start: -58, end: -52 },
      { id: 'pdf',   name: 'Assemble PDF',           status: 'info',    start: -39, end: -32 },
    ],
  },
]`}
        />
      </div>

      {/* Component Interface */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Component Interface</h2>
        <CodeBlock
          language="tsx"
          code={`export type WaterfallStatus =
  | 'success' | 'warning' | 'error' | 'info' | 'queued' | 'running'

export interface WaterfallTask {
  id: string
  name: string
  status?: WaterfallStatus
  /** Custom leading icon. Defaults to one matched to \`status\`. */
  icon?: React.ReactNode
  /** Start time in seconds. Negative values are allowed (past events). */
  start: number
  /** End time in seconds. Omit for a point-in-time event. */
  end?: number
  children?: WaterfallTask[]
}

export interface WaterfallProps {
  tasks: WaterfallTask[]
  /** Visible window [startSec, endSec]. Defaults to auto-fit. */
  window?: [number, number]
  /** Controlled playhead value (in seconds). */
  playhead?: number
  onPlayheadChange?: (t: number) => void
  /** Step size for the < / > buttons, in seconds. Default 1. */
  playheadStep?: number
  searchable?: boolean
  leftWidth?: number
  ticks?: number
  rowHeight?: number
  className?: string
}`}
        />
      </div>

      {/* Actions */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Actions</h2>
        <p className="text-gray-500 mb-4">What users can do with the component.</p>
        <ul className="text-gray-600 space-y-2 list-disc pl-6">
          <li><strong>Search:</strong> filter rows by name (case-insensitive substring match).</li>
          <li><strong>Collapse/expand:</strong> click the chevron on a parent row to hide or show its children.</li>
          <li><strong>Step playhead:</strong> click the <kbd>&lt;</kbd> / <kbd>&gt;</kbd> buttons in the centered pill to move the cursor by <code>playheadStep</code> seconds.</li>
          <li><strong>Controlled mode:</strong> pass <code>playhead</code> + <code>onPlayheadChange</code> to drive the cursor from outside.</li>
        </ul>
      </div>

      {/* Wireframes */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Wireframe(s)</h2>
        <p className="text-gray-500 mb-6">Visual states.</p>

        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-1: nested job trace (populated)</span>
            </div>
            <div className="p-6" style={{ backgroundColor: 'rgb(var(--color-bg))' }}>
              <Waterfall tasks={EXAMPLE} />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-2: empty (no tasks)</span>
            </div>
            <div className="p-6" style={{ backgroundColor: 'rgb(var(--color-bg))' }}>
              <Waterfall tasks={[]} window={[-60, 0]} />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-3: status color palette</span>
            </div>
            <div className="p-6" style={{ backgroundColor: 'rgb(var(--color-bg))' }}>
              <Waterfall
                searchable={false}
                tasks={[
                  { id: 'q', name: 'queued',  status: 'queued',  start: -60, end: -52 },
                  { id: 'r', name: 'running', status: 'running', start: -52, end: -40 },
                  { id: 'w', name: 'warning', status: 'warning', start: -40, end: -30 },
                  { id: 's', name: 'success', status: 'success', start: -30, end: -18 },
                  { id: 'i', name: 'info',    status: 'info',    start: -18, end: -8 },
                  { id: 'e', name: 'error',   status: 'error',   start: -8,  end: -2 },
                ]}
              />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-4: point-in-time events (no duration)</span>
            </div>
            <div className="p-6" style={{ backgroundColor: 'rgb(var(--color-bg))' }}>
              <Waterfall
                searchable={false}
                tasks={[
                  { id: 'a', name: 'build started',  status: 'info',    start: -50 },
                  { id: 'b', name: 'tests queued',   status: 'queued',  start: -40 },
                  { id: 'c', name: 'deploy began',   status: 'running', start: -20 },
                  { id: 'd', name: 'rollback fired', status: 'error',   start: -5 },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
