import React, { useState } from 'react'
import { CodeBlock } from '../../../components/CodeBlock'
import { ProjectCard } from '../../../components/ProjectCard'

function SelectableDemo() {
  const [selectedId, setSelectedId] = useState<string | null>('new-redies-4')
  const projects = [
    { id: 'new-redies-4',        name: 'new-redies-4',        initial: 'N', updated: '4 days ago', tag: 'Machine Learning', stat: 1,   activeRuns: 0 },
    { id: 'eye-gaze-prediction', name: 'eye-gaze-prediction', initial: 'E', updated: '1 hour ago', tag: 'Machine Learning', stat: 191, activeRuns: 1 },
  ]
  return (
    <div className="grid grid-cols-1 gap-4">
      {projects.map(p => (
        <div key={p.id} onClick={() => setSelectedId(p.id)} className="cursor-pointer">
          <ProjectCard
            {...p}
            selected={selectedId === p.id}
            href="#"
            onEdit={() => alert(`edit ${p.name}`)}
            onDelete={() => alert(`delete ${p.name}`)}
          />
        </div>
      ))}
    </div>
  )
}

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Components</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Project Card</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          A clickable card that summarizes a project: monogram avatar, name as a link, "Updated …"
          subtitle, a category tag and stat in the footer, plus optional edit/delete actions and a
          green badge for active experiment runs. Modeled on the project tiles on dash.ml.
        </p>
      </div>

      {/* Purpose */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Purpose</h2>
        <p className="text-gray-600 leading-relaxed">
          Surface the most load-bearing info about a project at a glance — name, freshness, category,
          size — and let the user drill in, edit metadata, delete, or see that experiments are
          currently running. The same shape is reusable for datasets and pipelines by swapping the
          tag and stat.
        </p>
      </div>

      {/* Example */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Example</h2>
        <p className="text-gray-500 mb-6">Click a card to select it — actions appear, border highlights.</p>
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Preview</span>
          </div>
          <div className="p-6 bg-gray-950">
            <SelectableDemo />
          </div>
        </div>
      </div>

      {/* Data structure */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Data structure</h2>
        <p className="text-gray-500 mb-4">A project record typically looks like:</p>
        <CodeBlock
          language="tsx"
          code={`type Project = {
  name: string                // "eye-gaze-prediction"
  updated: string             // "1 hour ago"
  tag: string                 // "Machine Learning"
  stat: number                // 191 (experiments count)
  activeRuns: number          // 0 for none; > 0 shows green badge
}`}
        />
      </div>

      {/* Component Interface */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Component Interface</h2>
        <CodeBlock
          language="tsx"
          code={`export interface ProjectCardProps {
  name: string
  initial?: string            // defaults to name[0]
  updated?: string
  tag?: string
  stat?: number | string
  activeRuns?: number         // > 0 shows green badge
  href?: string               // makes title a link
  selected?: boolean          // blue outline + underlined title
  onEdit?: () => void         // renders edit icon when provided
  onDelete?: () => void       // renders trash icon when provided
  className?: string
}`}
        />
      </div>

      {/* Actions */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Actions</h2>
        <ul className="text-gray-600 space-y-2 list-disc pl-6">
          <li><strong>Open project:</strong> click the title to navigate to the project page (when <code>href</code> is set).</li>
          <li><strong>Edit metadata:</strong> click the pencil icon — fires <code>onEdit</code>. Only rendered when handler is provided.</li>
          <li><strong>Delete project:</strong> click the trash icon — fires <code>onDelete</code>.</li>
          <li><strong>See activity:</strong> the green badge shows the count of active runs; absent when zero.</li>
          <li><strong>Select / focus:</strong> pass <code>selected</code> to highlight the card (blue border + underlined title + persistent actions).</li>
        </ul>
      </div>

      {/* Wireframes */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Wireframe(s)</h2>
        <p className="text-gray-500 mb-6">Visual states.</p>
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-1: default (idle, no active runs)</span>
            </div>
            <div className="p-6 bg-gray-950">
              <ProjectCard
                name="new-redies-4" initial="N" updated="4 days ago"
                tag="Machine Learning" stat={1} href="#"
              />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-2: selected — blue outline, actions revealed</span>
            </div>
            <div className="p-6 bg-gray-950">
              <ProjectCard
                name="new-redies-4" initial="N" updated="4 days ago"
                tag="Machine Learning" stat={1} href="#" selected
                onEdit={() => {}} onDelete={() => {}}
              />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-3: with 1 active run — green badge</span>
            </div>
            <div className="p-6 bg-gray-950">
              <ProjectCard
                name="eye-gaze-prediction" initial="E" updated="1 hour ago"
                tag="Machine Learning" stat={191} activeRuns={1} href="#"
              />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-4: selected + active runs (combined)</span>
            </div>
            <div className="p-6 bg-gray-950">
              <ProjectCard
                name="eye-gaze-prediction" initial="E" updated="1 hour ago"
                tag="Machine Learning" stat={191} activeRuns={1} href="#" selected
                onEdit={() => {}} onDelete={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
