import React, { useState } from 'react'
import { CodeBlock } from '../../../components/CodeBlock'
import { Tabs, UnderlineTabs, IconTabs } from '../../../components/TabBar'

function ListViewIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="4" y="5" width="16" height="6" rx="3" />
      <rect x="4" y="13" width="16" height="6" rx="3" />
    </svg>
  )
}

function GridViewIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 12h16M12 4v16" />
    </svg>
  )
}

function IconTabsDemo() {
  const [view, setView] = useState('list')
  return (
    <IconTabs
      tabs={[
        { id: 'list', icon: <ListViewIcon />, label: 'List view' },
        { id: 'grid', icon: <GridViewIcon />, label: 'Grid view' },
      ]}
      value={view}
      onChange={setView}
    />
  )
}

const EXAMPLE_TABS = [
  { id: 'readme',     label: 'README' },
  { id: 'dashboard',  label: 'Dashboard' },
  { id: 'logs',       label: 'Logs' },
  { id: 'parameters', label: 'Parameters' },
]

const SECTION_TABS = [
  { id: 'projects', label: 'Projects' },
  { id: 'activity', label: 'Activity' },
  { id: 'settings', label: 'Settings' },
]

function ControlledDemo() {
  const [active, setActive] = useState('dashboard')
  return (
    <div className="space-y-4">
      <Tabs tabs={EXAMPLE_TABS} value={active} onChange={setActive} />
      <p className="text-gray-400 text-sm">
        Active tab: <span className="text-gray-100 font-medium">{active}</span>
      </p>
    </div>
  )
}

function UnderlineDemo() {
  const [active, setActive] = useState('projects')
  return (
    <div className="space-y-4">
      <UnderlineTabs tabs={SECTION_TABS} value={active} onChange={setActive} />
      <p className="text-gray-400 text-sm">
        Active tab: <span className="text-gray-100 font-medium">{active}</span>
      </p>
    </div>
  )
}

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Components</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Tabs</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          A pill-shaped tab group for switching between views of the same subject
          (e.g. README / Dashboard / Logs). The active tab is a filled white pill;
          inactive tabs are muted text. Modeled on the view switcher on dash.ml.
        </p>
      </div>

      {/* Purpose */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Purpose</h2>
        <p className="text-gray-600 leading-relaxed">
          Let users switch between multiple views of a single object (an experiment,
          a project, a run) without navigating away. One tab is always active; only
          one can be active at a time.
        </p>
      </div>

      {/* Usage */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Usage</h2>
        <CodeBlock
          language="tsx"
          code={`import { Tabs, UnderlineTabs } from '../../components/TabBar'

const [active, setActive] = useState('readme')

<Tabs
  tabs={[
    { id: 'readme',    label: 'README' },
    { id: 'dashboard', label: 'Dashboard' },
  ]}
  value={active}
  onChange={setActive}
/>`}
        />
      </div>

      {/* Example */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Example</h2>
        <p className="text-gray-500 mb-6">
          Click a tab to make it active.
        </p>
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Preview</span>
          </div>
          <div className="p-6 bg-gray-950">
            <ControlledDemo />
          </div>
        </div>

        <p className="text-gray-500 mt-10 mb-6">
          <strong>IconTabs</strong> — icon-only segmented control for view switchers
          (e.g. list / grid). Same pill container as <code>Tabs</code>, but each
          button is square-ish and renders an icon.
        </p>
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Preview — view switcher</span>
          </div>
          <div className="p-6 bg-gray-950">
            <IconTabsDemo />
          </div>
        </div>
      </div>

      {/* Data structure */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Data structure</h2>
        <p className="text-gray-500 mb-4">What goes into the component.</p>
        <CodeBlock
          language="tsx"
          code={`// An ordered list of tabs. The ids are used for controlled state.
const tabs = [
  { id: 'readme',     label: 'README' },
  { id: 'dashboard',  label: 'Dashboard' },
  { id: 'logs',       label: 'Logs' },
  { id: 'parameters', label: 'Parameters' },
]`}
        />
      </div>

      {/* Component Interface (Props) */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Component Interface</h2>
        <CodeBlock
          language="tsx"
          code={`export interface TabDef {
  /** Stable identifier for the tab. */
  id: string
  /** Visible label. */
  label: string
}

export interface TabsProps {
  /** Tabs to render, in order. */
  tabs: TabDef[]
  /** Controlled active tab id. Omit for uncontrolled use. */
  value?: string
  /** Initial active tab id when uncontrolled. Defaults to the first tab. */
  defaultValue?: string
  /** Fires with the id of the newly activated tab. */
  onChange?: (id: string) => void
  className?: string
}`}
        />
      </div>

      {/* Actions */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Actions</h2>
        <p className="text-gray-500 mb-4">What users can do with the component.</p>
        <ul className="text-gray-600 space-y-2 list-disc pl-6">
          <li><strong>Switch tab:</strong> click a tab to activate it; <code>onChange</code> fires with its id.</li>
          <li><strong>Keyboard access:</strong> tabs are buttons and can be focused with <kbd>Tab</kbd> and activated with <kbd>Enter</kbd> / <kbd>Space</kbd>.</li>
          <li><strong>Read current view:</strong> the white pill indicates the active tab at a glance.</li>
        </ul>
      </div>

      {/* Wireframes */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Wireframe(s)</h2>
        <p className="text-gray-500 mb-6">Visual states.</p>

        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-1: default — Dashboard active</span>
            </div>
            <div className="p-6 bg-gray-950">
              <Tabs tabs={EXAMPLE_TABS} defaultValue="dashboard" />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-2: first tab active</span>
            </div>
            <div className="p-6 bg-gray-950">
              <Tabs tabs={EXAMPLE_TABS} defaultValue="readme" />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-3: two-tab minimal</span>
            </div>
            <div className="p-6 bg-gray-950">
              <Tabs
                tabs={[
                  { id: 'list',    label: 'List View' },
                  { id: 'compare', label: 'Live Compare' },
                ]}
                defaultValue="compare"
              />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-4: underline variant — page-level section switcher</span>
            </div>
            <div className="p-6 bg-gray-950">
              <UnderlineDemo />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
