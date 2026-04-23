import React, { useState } from 'react'
import { CodeBlock } from '../../../components/CodeBlock'
import { Tag, TagList, type TagColor } from '../../../components/Tag'

const COLORS: TagColor[] = ['gray', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'purple', 'pink']

function RemovableDemo() {
  const [tags, setTags] = useState(['ml', 'pytorch', 'experiment', 'baseline'])
  return (
    <TagList>
      {tags.map((t, i) => (
        <Tag
          key={t}
          color={(['blue', 'purple', 'green', 'orange'][i % 4]) as TagColor}
          onRemove={() => setTags(tags.filter(x => x !== t))}
        >
          {t}
        </Tag>
      ))}
      {tags.length === 0 && (
        <button
          type="button"
          onClick={() => setTags(['ml', 'pytorch', 'experiment', 'baseline'])}
          className="text-sm text-gray-400 hover:text-gray-200 underline"
        >
          reset
        </button>
      )}
    </TagList>
  )
}

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Components</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Tag</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Small, color-coded keyword labels — use them for free-form metadata like
          category, language, status, or any user-defined taxonomy. Supports nine
          colors, two sizes, optional leading icon, and an optional × to remove.
        </p>
      </div>

      {/* Purpose */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Purpose</h2>
        <p className="text-gray-600 leading-relaxed">
          Similar to <code>Badge</code>, but tuned for <em>content</em> metadata
          rather than fixed semantic status — rectangular corners (slightly rounded),
          mono font, and an optional remove button for input fields.
        </p>
      </div>

      {/* Usage */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Usage</h2>
        <CodeBlock
          language="tsx"
          code={`import { Tag, TagList } from '../../components/Tag'

<Tag color="red">tags</Tag>

<TagList>
  <Tag color="blue">ml</Tag>
  <Tag color="purple">pytorch</Tag>
  <Tag color="green" onRemove={() => remove('experiment')}>experiment</Tag>
</TagList>`}
        />
      </div>

      {/* Example */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Example</h2>
        <p className="text-gray-500 mb-6">Single tag matching the reference design.</p>
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Preview</span>
          </div>
          <div className="p-8 bg-gray-950">
            <Tag color="red">tags</Tag>
          </div>
        </div>
      </div>

      {/* Component Interface */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Component Interface</h2>
        <CodeBlock
          language="tsx"
          code={`export type TagColor =
  | 'gray' | 'red' | 'orange' | 'yellow' | 'green'
  | 'teal' | 'blue' | 'purple' | 'pink'
export type TagSize = 'sm' | 'md'

export interface TagProps {
  children: React.ReactNode
  color?: TagColor
  size?: TagSize
  icon?: React.ReactNode
  /** If provided, renders a × button and calls this. */
  onRemove?: () => void
  /** If provided, the tag itself becomes clickable. */
  onClick?: () => void
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
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-1: all 9 colors</span>
            </div>
            <div className="p-6 bg-gray-950">
              <TagList>
                {COLORS.map(c => (
                  <Tag key={c} color={c}>{c}</Tag>
                ))}
              </TagList>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-2: sizes (sm · md)</span>
            </div>
            <div className="p-6 bg-gray-950 flex items-center gap-3 flex-wrap">
              <Tag color="blue" size="sm">small</Tag>
              <Tag color="blue" size="md">medium</Tag>
              <Tag color="red"  size="sm">small</Tag>
              <Tag color="red"  size="md">medium</Tag>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-3: removable (click ×)</span>
            </div>
            <div className="p-6 bg-gray-950">
              <RemovableDemo />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">use-case-4: with leading icon</span>
            </div>
            <div className="p-6 bg-gray-950">
              <TagList>
                <Tag color="green" icon={<span className="w-1.5 h-1.5 rounded-full bg-current" />}>active</Tag>
                <Tag color="yellow" icon={<span className="w-1.5 h-1.5 rounded-full bg-current" />}>pending</Tag>
                <Tag color="red" icon={<span className="w-1.5 h-1.5 rounded-full bg-current" />}>failed</Tag>
              </TagList>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
