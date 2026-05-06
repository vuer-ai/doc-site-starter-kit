import React, { useState } from 'react'
import { CodeBlock } from '../../../components/CodeBlock'
import { ProfileCard } from '../../../components/ProfileCard'

function BuildingIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18" />
      <path d="M5 21V7l7-4 7 4v14" />
      <path d="M9 9h1M14 9h1M9 13h1M14 13h1M9 17h1M14 17h1" />
    </svg>
  )
}
function BoltIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
    </svg>
  )
}
function BarsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="M7 15l4-4 4 4 5-5" />
    </svg>
  )
}

const STATS = [
  { icon: <BuildingIcon />, value: 1, label: 'Projects' },
  { icon: <BoltIcon />,     value: 0, label: 'Active runs' },
  { icon: <BarsIcon />,     value: 0, label: 'Experiments' },
]

const AVATAR_URL =
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80&auto=format&fit=crop&sat=-100'

export function Page() {
  const [name, setName] = useState('@qinyu_lin_fc0ee6')
  const [avatar, setAvatar] = useState(AVATAR_URL)
  const handleAvatarFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = () => setAvatar(reader.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Components</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Profile Card</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          A user / org profile panel with a big circular hero photo that overlaps
          the top of the card, followed by a username, an optional edit action,
          a short bio, and a list of stats.
        </p>
      </div>

      {/* Purpose */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Purpose</h2>
        <p className="text-gray-600 leading-relaxed">
          The identity block on an org / user landing page. Pairs naturally with
          the <code>OrgPageLayout</code> sidebar slot.
        </p>
      </div>

      {/* Usage */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Usage</h2>
        <CodeBlock
          language="tsx"
          code={`import { ProfileCard } from '../../components/ProfileCard'

<ProfileCard
  username={name}
  avatarUrl={avatarUrl}
  bio="Track and visualize machine learning experiments in real-time"
  onUsernameChange={setName}              // pencil → inline edit
  onAvatarChange={(file) => upload(file)} // hover photo → "Change photo"
  stats={[
    { icon: <BuildingIcon />, value: 1, label: 'Projects' },
    { icon: <BoltIcon />,     value: 0, label: 'Active runs' },
    { icon: <BarsIcon />,     value: 0, label: 'Experiments' },
  ]}
/>`}
        />
      </div>

      {/* Example */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Example</h2>
        <p className="text-gray-500 mb-6">
          Sized to a 320 px column — the photo is <code>aspect-square w-full</code>,
          so it scales with the container and overlaps the top of the card by ~35 %.
        </p>
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Preview</span>
          </div>
          <div className="p-8 bg-gray-950">
            <div className="max-w-[320px] mx-auto">
              <ProfileCard
                username={name}
                avatarUrl={avatar}
                bio="Track and visualize machine learning experiments in real-time"
                onUsernameChange={setName}
                onAvatarChange={handleAvatarFile}
                stats={STATS}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Component Interface */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Component Interface</h2>
        <CodeBlock
          language="tsx"
          code={`export interface ProfileStat {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
}

export interface ProfileCardProps {
  username: string
  avatarUrl?: string
  /** Rendered in a rounded placeholder when avatarUrl is missing. */
  avatarFallback?: React.ReactNode
  bio?: React.ReactNode
  /** Legacy: if set (and onUsernameChange is not), pencil calls this. */
  onEdit?: () => void
  /** If set, the pencil makes the username inline-editable. */
  onUsernameChange?: (next: string) => void
  /** If set, hovering the photo reveals "Change photo"; click opens a file picker. */
  onAvatarChange?: (file: File) => void
  stats?: ProfileStat[]
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
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-1: default (populated)</span>
            </div>
            <div className="p-8 bg-gray-950">
              <div className="max-w-[320px] mx-auto">
                <ProfileCard
                  username="@qinyu_lin_fc0ee6"
                  avatarUrl={AVATAR_URL}
                  bio="Track and visualize machine learning experiments in real-time"
                  onEdit={() => {}}
                  stats={STATS}
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-2: no photo (falls back to initial)</span>
            </div>
            <div className="p-8 bg-gray-950">
              <div className="max-w-[320px] mx-auto">
                <ProfileCard
                  username="@newuser"
                  bio="Just joined. No photo yet."
                  stats={[{ icon: <BuildingIcon />, value: 0, label: 'Projects' }]}
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-3: no edit, no stats (minimal)</span>
            </div>
            <div className="p-8 bg-gray-950">
              <div className="max-w-[320px] mx-auto">
                <ProfileCard
                  username="@readonly_viewer"
                  avatarUrl={AVATAR_URL}
                  bio="Read-only viewer account."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
