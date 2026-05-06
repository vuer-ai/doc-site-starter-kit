import React, { useState } from 'react'
import { CodeBlock } from '../../../components/CodeBlock'
import { FormCard, FormField } from '../../../components/FormCard'

/** Themed input that mirrors the focus-ring + pill border from the reference screenshots. */
function FieldInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false)
  return (
    <input
      {...props}
      onFocus={e => {
        setFocused(true)
        props.onFocus?.(e)
      }}
      onBlur={e => {
        setFocused(false)
        props.onBlur?.(e)
      }}
      className={`w-full px-4 py-2.5 text-sm focus:outline-none transition-colors ${props.className ?? ''}`}
      style={{
        backgroundColor: 'rgb(var(--color-bg-secondary))',
        color: 'rgb(var(--color-text))',
        border: focused
          ? '1.5px solid rgb(96 165 250)'
          : '1px solid rgb(var(--color-border))',
        borderRadius: '10px',
      }}
    />
  )
}

function FieldTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [focused, setFocused] = useState(false)
  return (
    <textarea
      {...props}
      onFocus={e => {
        setFocused(true)
        props.onFocus?.(e)
      }}
      onBlur={e => {
        setFocused(false)
        props.onBlur?.(e)
      }}
      className={`w-full px-4 py-2.5 text-sm focus:outline-none transition-colors ${props.className ?? ''}`}
      style={{
        backgroundColor: 'rgb(var(--color-bg-secondary))',
        color: 'rgb(var(--color-text))',
        border: focused
          ? '1.5px solid rgb(96 165 250)'
          : '1px solid rgb(var(--color-border))',
        borderRadius: '10px',
        minHeight: 120,
        resize: 'vertical',
        fontFamily: 'inherit',
      }}
    />
  )
}

/* --- Create New Project --- */

function CreateProjectDemo() {
  const [slug, setSlug] = useState('')
  const [name, setName] = useState('')
  const [tags, setTags] = useState('')
  const [metadata, setMetadata] = useState('')

  return (
    <FormCard
      title="Create New Project"
      onClose={() => console.log('close')}
      secondaryLabel="Cancel"
      onSecondaryAction={() => console.log('cancel')}
      primaryLabel="Create Project"
      onPrimaryAction={() =>
        console.log('create', { slug, name, tags, metadata })
      }
      primaryDisabled={!slug.trim()}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
        <FormField label="Project Slug" required helper="URL-friendly identifier" htmlFor="cp-slug">
          <FieldInput
            id="cp-slug"
            placeholder="my-awesome-project"
            value={slug}
            onChange={e => setSlug(e.target.value)}
          />
        </FormField>
        <FormField label="Project Name" helper="Display name (optional)" htmlFor="cp-name">
          <FieldInput
            id="cp-name"
            placeholder="My Awesome Project"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </FormField>
        <FormField label="Tags" helper="Comma-separated tags" htmlFor="cp-tags">
          <FieldInput
            id="cp-tags"
            placeholder="ml, pytorch, experiment"
            value={tags}
            onChange={e => setTags(e.target.value)}
          />
        </FormField>
        <FormField label="Metadata (JSON)" helper="Optional JSON metadata" htmlFor="cp-meta">
          <FieldTextarea
            id="cp-meta"
            placeholder={'{"description": "..."}'}
            value={metadata}
            onChange={e => setMetadata(e.target.value)}
          />
        </FormField>
      </div>
    </FormCard>
  )
}

/* --- Edit Project --- */

function EditProjectDemo() {
  const [slug] = useState('eye-gaze-prediction')
  const [name, setName] = useState('eye-gaze-prediction')
  const [tags, setTags] = useState('')

  return (
    <FormCard
      title="Edit Project"
      onClose={() => console.log('close')}
      secondaryLabel="Cancel"
      onSecondaryAction={() => console.log('cancel')}
      primaryLabel="Save Changes"
      onPrimaryAction={() => console.log('save', { slug, name, tags })}
      primaryDisabled={!name.trim()}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
        <FormField label="Project Slug" helper="Slug cannot be changed" htmlFor="ep-slug">
          <FieldInput id="ep-slug" value={slug} readOnly />
        </FormField>
        <FormField label="Project Name" required htmlFor="ep-name">
          <FieldInput
            id="ep-name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </FormField>
        <FormField label="Tags" helper="Comma-separated tags" htmlFor="ep-tags" className="md:col-span-2">
          <FieldInput
            id="ep-tags"
            placeholder="ml, pytorch, experiment"
            value={tags}
            onChange={e => setTags(e.target.value)}
          />
        </FormField>
      </div>
    </FormCard>
  )
}

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Components</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Form Card</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          A rounded surface for create / edit forms: title + optional close in the
          header, a 1- or 2-column body of labelled fields, and a right-aligned
          footer with Cancel / Primary actions.
        </p>
      </div>

      {/* Purpose */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Purpose</h2>
        <p className="text-gray-600 leading-relaxed">
          Covers both "create" and "edit" flows with the same shell — change the
          title, pre-fill values, and swap the primary action label. Use it inside
          a dialog, a settings page, or any place a focused form needs to feel
          self-contained.
        </p>
      </div>

      {/* Usage */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Usage</h2>
        <CodeBlock
          language="tsx"
          code={`import { FormCard, FormField } from '../../components/FormCard'

<FormCard
  title="Create New Project"
  onClose={onClose}
  secondaryLabel="Cancel"
  onSecondaryAction={onClose}
  primaryLabel="Create Project"
  onPrimaryAction={onCreate}
  primaryDisabled={!slug.trim()}
>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
    <FormField label="Project Slug" required helper="URL-friendly identifier">
      <input value={slug} onChange={e => setSlug(e.target.value)} />
    </FormField>
    <FormField label="Project Name" helper="Display name (optional)">
      <input value={name} onChange={e => setName(e.target.value)} />
    </FormField>
  </div>
</FormCard>`}
        />
      </div>

      {/* Example */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Example — Create</h2>
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Preview</span>
          </div>
          <div className="p-6 bg-gray-950">
            <CreateProjectDemo />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-10">Example — Edit</h2>
        <div className="rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Preview</span>
          </div>
          <div className="p-6 bg-gray-950">
            <EditProjectDemo />
          </div>
        </div>
      </div>

      {/* Component Interface */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Component Interface</h2>
        <CodeBlock
          language="tsx"
          code={`export interface FormCardProps {
  title: React.ReactNode
  description?: React.ReactNode
  /** If set, renders a close (X) button top-right. */
  onClose?: () => void
  children: React.ReactNode
  /** Primary action (e.g. "Create Project", "Save Changes"). */
  primaryLabel?: string
  onPrimaryAction?: () => void
  primaryDisabled?: boolean
  /** Secondary action (e.g. "Cancel"). */
  secondaryLabel?: string
  onSecondaryAction?: () => void
  className?: string
}

export interface FormFieldProps {
  label: React.ReactNode
  required?: boolean
  helper?: React.ReactNode
  error?: React.ReactNode
  htmlFor?: string
  children: React.ReactNode
  className?: string
}`}
        />
      </div>
    </div>
  )
}
