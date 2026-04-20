import React from 'react'
import { CodeBlock } from '../../../components/CodeBlock'
import { OrgPageLayout } from '../../../components/OrgPageLayout'
import { ProjectCard } from '../../../components/ProjectCard'
import { UnderlineTabs } from '../../../components/TabBar'

/* ----- wireframe primitives (gray skeleton blocks) ----- */

function Bar({ w = '100%', h = 10, className = '' }: { w?: string | number; h?: number; className?: string }) {
  return (
    <div
      className={`rounded-full bg-gray-700/50 ${className}`}
      style={{ width: w, height: h }}
    />
  )
}

function ProfileCardSkeleton() {
  return (
    <div className="rounded-3xl border border-gray-800/60 bg-gray-900/40 px-6 pt-36 pb-6 space-y-4">
      <Bar w={160} h={16} />
      <div className="space-y-2">
        <Bar w="100%" h={8} />
        <Bar w="60%" h={8} />
      </div>
      <div className="h-px bg-gray-800/60" />
      <div className="space-y-3">
        {[80, 100, 90].map((w, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="w-4 h-4 rounded-sm bg-gray-700/60" />
            <Bar w={w} h={8} />
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectCardSkeleton() {
  return (
    <div className="rounded-3xl border border-gray-800/60 bg-gray-900/40 p-5 space-y-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-gray-700/60 shrink-0" />
        <div className="flex-1 space-y-2 pt-1">
          <Bar w="45%" h={10} />
          <Bar w="35%" h={6} />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Bar w={90} h={6} />
        <Bar w={40} h={6} />
      </div>
    </div>
  )
}

/* ----- wireframe example matching the user's screenshot ----- */

function WireframeExample() {
  return (
    <OrgPageLayout
      brand="ML-Dash"
      navRight={
        <>
          <span>Home</span>
          <span>Explore</span>
          <span>Sign Out</span>
        </>
      }
      sidebar={
        <div className="relative">
          {/* Avatar: responsive (fills column width up to ~440px), overlaps card top ~30% */}
          <div className="relative z-10 -mb-32">
            <div className="aspect-square w-full rounded-full bg-gray-500/30" />
          </div>
          <div className="relative z-0">
            <ProfileCardSkeleton />
          </div>
        </div>
      }
      tabs={
        <div className="flex items-end gap-8 border-b border-gray-800/60">
          <div className="pb-3 -mb-px border-b-2 border-blue-500">
            <div className="h-3 w-16 rounded-full bg-blue-500/70" />
          </div>
          <div className="pb-3 -mb-px border-b-2 border-transparent">
            <div className="h-3 w-14 rounded-full bg-gray-700/60" />
          </div>
          <div className="pb-3 -mb-px border-b-2 border-transparent">
            <div className="h-3 w-16 rounded-full bg-gray-700/60" />
          </div>
        </div>
      }
      toolbar={
        <div className="flex items-center gap-3">
          <div className="flex-1 h-12 rounded-full bg-gray-800/40 border border-gray-800/60 flex items-center px-4 gap-3">
            <span className="w-4 h-4 rounded-full bg-gray-700/60" />
            <div className="h-2 flex-1 max-w-[140px] rounded-full bg-gray-700/40" />
          </div>
          <div className="h-12 w-36 rounded-full border border-gray-700/60 flex items-center justify-center">
            <div className="h-2 w-20 rounded-full bg-gray-700/50" />
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
      </div>
    </OrgPageLayout>
  )
}

/* ----- populated example using real uikit components ----- */

const PROJECT_TABS = [
  { id: 'projects', label: 'Projects' },
  { id: 'activity', label: 'Activity' },
  { id: 'settings', label: 'Settings' },
]

const PROJECTS = [
  { name: 'astribot',            initial: 'A', updated: '1 hour ago', tag: 'Machine Learning', stat: 206, activeRuns: 0 },
  { name: 'eye-gaze-prediction', initial: 'E', updated: '9 days ago', tag: 'Machine Learning', stat: 201, activeRuns: 1 },
]

function PopulatedExample() {
  return (
    <OrgPageLayout
      brand="ML-Dash"
      navRight={
        <>
          <a className="hover:text-white" href="#">Home</a>
          <a className="hover:text-white" href="#">Explore</a>
          <a className="hover:text-white" href="#">Sign Out</a>
        </>
      }
      sidebar={
        <div className="relative">
          {/* Full-width circular photo that scales with the column — ~30% overlaps card */}
          <div className="relative z-10 -mb-32">
            <div className="aspect-square w-full rounded-full overflow-hidden ring-1 ring-gray-800/60">
              <img
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80&auto=format&fit=crop&sat=-100"
                alt=""
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </div>
          <div className="relative z-0 rounded-3xl border border-gray-800/60 bg-gray-900/40 px-6 pt-36 pb-6">
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-bold text-gray-50 tracking-tight">@yanbinghan_</h3>
              <button aria-label="Edit profile" className="text-gray-500 hover:text-gray-300">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4Z"/></svg>
              </button>
            </div>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              Track and visualize machine learning experiments in real-time
            </p>
            <div className="my-5 h-px bg-gray-800/60" />
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h1m4 0h1M9 13h1m4 0h1M9 17h1m4 0h1"/></svg>
                <span className="font-semibold text-gray-100">2</span>
                <span className="text-gray-400">Projects</span>
              </li>
              <li className="flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/></svg>
                <span className="font-semibold text-gray-100">0</span>
                <span className="text-gray-400">Active runs</span>
              </li>
              <li className="flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500"><path d="M3 3v18h18M7 15l4-4 4 4 5-5"/></svg>
                <span className="font-semibold text-gray-100">407</span>
                <span className="text-gray-400">Experiments</span>
              </li>
            </ul>
          </div>
        </div>
      }
      tabs={<UnderlineTabs tabs={PROJECT_TABS} defaultValue="projects" />}
      toolbar={
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <svg
              width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
            </svg>
            <input
              type="text"
              placeholder="Find a project..."
              className="w-full h-12 pl-11 pr-4 text-sm bg-gray-800/40 border border-gray-800/60 rounded-full text-gray-100 placeholder:text-gray-500 focus:outline-none focus:border-gray-700"
            />
          </div>
          <button className="shrink-0 h-12 px-5 rounded-full border border-gray-700/70 text-sm font-medium text-gray-100 hover:border-gray-500 hover:bg-gray-800/40 flex items-center gap-2">
            <span className="text-lg leading-none">+</span>
            New Project
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PROJECTS.map(p => (
          <ProjectCard key={p.name} {...p} href="#" />
        ))}
      </div>
    </OrgPageLayout>
  )
}

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Layouts</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Org Page</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          The top-level shell for an organization or project overview: a header navbar,
          a left sidebar (big avatar + profile card), and a main column with tabs, a
          toolbar, and a grid of cards. Modeled on the org page on dash.ml.
        </p>
      </div>

      {/* Purpose */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Purpose</h2>
        <p className="text-gray-600 leading-relaxed">
          Give a landing page for a user or team: surface who they are in the sidebar
          (avatar + bio + quick stats), and list their projects, datasets, or pipelines
          on the right. The layout is a shell — it provides slots and the visual chrome;
          what goes in the slots is up to the caller.
        </p>
      </div>

      {/* Example */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Example</h2>
        <p className="text-gray-500 mb-6">
          Wireframe version — gray skeleton blocks in each slot.
        </p>
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Preview</span>
          </div>
          <div className="bg-gray-950">
            <WireframeExample />
          </div>
        </div>
      </div>

      {/* Data structure */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Data structure</h2>
        <p className="text-gray-500 mb-4">
          Nothing tabular — the layout takes React nodes for each slot.
          Typical shape:
        </p>
        <CodeBlock
          language="tsx"
          code={`// Content is supplied as React nodes, not data objects.
<OrgPageLayout
  brand={<Logo />}
  navRight={<NavLinks items={['Home', 'Explore', 'Sign Out']} />}
  sidebar={<ProfileCard user={user} />}
  tabs={<Tabs tabs={[{ id: 'projects', label: 'Projects' }, ...]} />}
  toolbar={<><SearchInput /><Button>+ New Project</Button></>}
>
  <ProjectGrid projects={projects} />
</OrgPageLayout>`}
        />
      </div>

      {/* Component Interface */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Component Interface</h2>
        <CodeBlock
          language="tsx"
          code={`export interface OrgPageLayoutProps {
  /** Brand shown at the top-left of the navbar (e.g. product name, logo). */
  brand?: React.ReactNode
  /** Right-aligned navbar content — typically links or user menu. */
  navRight?: React.ReactNode
  /** Left sidebar content — typically an avatar + profile card. */
  sidebar?: React.ReactNode
  /** Tabs row at the top of the main column. */
  tabs?: React.ReactNode
  /** Toolbar below the tabs — typically a search input and a primary action. */
  toolbar?: React.ReactNode
  /** Main content — typically a grid of project or item cards. */
  children?: React.ReactNode
  className?: string
}`}
        />
      </div>

      {/* Actions */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Actions</h2>
        <p className="text-gray-500 mb-4">What users can do with the layout.</p>
        <ul className="text-gray-600 space-y-2 list-disc pl-6">
          <li><strong>Navigate:</strong> click <code>navRight</code> links to move between top-level pages.</li>
          <li><strong>Switch views:</strong> click a tab in the <code>tabs</code> slot to change what the content grid renders.</li>
          <li><strong>Search &amp; create:</strong> use the <code>toolbar</code> to filter content or trigger a primary action (e.g. "New Project").</li>
          <li><strong>Resize:</strong> on narrow viewports the sidebar stacks above the main column (single column below <code>lg</code>).</li>
        </ul>
      </div>

      {/* Wireframes */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Wireframe(s)</h2>
        <p className="text-gray-500 mb-6">Visual states.</p>

        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-1: skeleton (loading)</span>
            </div>
            <div className="bg-gray-950">
              <WireframeExample />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-2: populated with real content</span>
            </div>
            <div className="bg-gray-950">
              <PopulatedExample />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-3: minimal (brand only)</span>
            </div>
            <div className="bg-gray-950">
              <OrgPageLayout
                brand={<span className="font-extrabold tracking-tight">ML-Dash</span>}
              >
                <div className="text-gray-500 text-sm italic py-12 text-center">
                  No content yet.
                </div>
              </OrgPageLayout>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
