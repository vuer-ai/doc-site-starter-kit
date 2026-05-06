import React from 'react'
import { CodeBlock } from '../../../components/CodeBlock'
import { Avatar, AvatarGroup, type AvatarSize } from '../../../components/AvatarGlyph'

const PHOTO =
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80&auto=format&fit=crop&sat=-100'

const SIZES: AvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Components</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Avatar</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          A circular (or rounded-square) user / project glyph. Falls back to a
          color-coded initial when no image is provided or when the image fails
          to load. Six sizes, optional status dot, and a <code>AvatarGroup</code>
          helper for stacked collections.
        </p>
      </div>

      {/* Purpose */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Purpose</h2>
        <p className="text-gray-600 leading-relaxed">
          Represent an entity (user, project, org) compactly. The initial color
          is deterministic per name, so the same user always gets the same
          fallback color.
        </p>
      </div>

      {/* Usage */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Usage</h2>
        <CodeBlock
          language="tsx"
          code={`import { Avatar, AvatarGroup } from '../../components/Avatar'

<Avatar src="/user.jpg" name="Qinyu Lin" />

// Fallback initial when no src
<Avatar name="Ge Yang" size="lg" />

// Status dot
<Avatar name="Jane Doe" status="online" />

// Stacked
<AvatarGroup max={3}>
  <Avatar name="Alice" />
  <Avatar name="Bob" />
  <Avatar name="Carol" />
  <Avatar name="Dave" />
  <Avatar name="Eve" />
</AvatarGroup>`}
        />
      </div>

      {/* Example */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Example</h2>
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Preview</span>
          </div>
          <div className="p-6 bg-gray-950 flex items-center gap-4">
            <Avatar src={PHOTO} name="Qinyu Lin" size="lg" />
            <div>
              <div className="text-sm text-gray-100 font-medium">Qinyu Lin</div>
              <div className="text-xs text-gray-400">@qinyu_lin_fc0ee6</div>
            </div>
          </div>
        </div>
      </div>

      {/* Component Interface */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Component Interface</h2>
        <CodeBlock
          language="tsx"
          code={`export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type AvatarShape = 'circle' | 'square'
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away'

export interface AvatarProps {
  src?: string
  alt?: string
  name?: string
  initial?: string
  size?: AvatarSize       // default 'md'
  shape?: AvatarShape     // default 'circle'
  status?: AvatarStatus
  className?: string
}

export interface AvatarGroupProps {
  children: React.ReactNode
  max?: number            // default 4
  size?: AvatarSize       // applied to the +N tile
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
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-1: sizes (xs · sm · md · lg · xl · 2xl)</span>
            </div>
            <div className="p-6 bg-gray-950 flex items-center gap-4 flex-wrap">
              {SIZES.map(s => (
                <Avatar key={s} src={PHOTO} name="Qinyu Lin" size={s} />
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-2: initial fallback (name → deterministic color)</span>
            </div>
            <div className="p-6 bg-gray-950 flex items-center gap-3 flex-wrap">
              <Avatar name="Alice" size="lg" />
              <Avatar name="Bob" size="lg" />
              <Avatar name="Carol" size="lg" />
              <Avatar name="Dave" size="lg" />
              <Avatar name="Eve" size="lg" />
              <Avatar name="Frank Wright" size="lg" />
              <Avatar name="Grace Hopper" size="lg" />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-3: status dots (online · away · busy · offline)</span>
            </div>
            <div className="p-6 bg-gray-950 flex items-center gap-4 flex-wrap">
              <Avatar src={PHOTO} name="Online"  size="lg" status="online" />
              <Avatar src={PHOTO} name="Away"    size="lg" status="away" />
              <Avatar src={PHOTO} name="Busy"    size="lg" status="busy" />
              <Avatar src={PHOTO} name="Offline" size="lg" status="offline" />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-4: square shape</span>
            </div>
            <div className="p-6 bg-gray-950 flex items-center gap-4 flex-wrap">
              <Avatar shape="square" name="Machine Learning" size="lg" />
              <Avatar shape="square" src={PHOTO} name="photo" size="lg" />
              <Avatar shape="square" name="API" size="lg" />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-5: AvatarGroup with overflow (max=3)</span>
            </div>
            <div className="p-6 bg-gray-950 flex items-center gap-8 flex-wrap">
              <AvatarGroup max={3}>
                <Avatar name="Alice" />
                <Avatar name="Bob" />
                <Avatar name="Carol" />
                <Avatar name="Dave" />
                <Avatar name="Eve" />
              </AvatarGroup>
              <AvatarGroup max={4} size="lg">
                <Avatar name="Alice" size="lg" />
                <Avatar name="Bob" size="lg" />
                <Avatar name="Carol" size="lg" />
                <Avatar src={PHOTO} name="Dave" size="lg" />
                <Avatar name="Eve" size="lg" />
                <Avatar name="Frank" size="lg" />
                <Avatar name="Grace" size="lg" />
              </AvatarGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
