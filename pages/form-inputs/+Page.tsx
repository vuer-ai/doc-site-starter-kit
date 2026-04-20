import React from 'react'
import { CodeBlock } from '../../components/CodeBlock'

const inputs = [
  {
    name: 'Text Input',
    description: 'Single-line text input with label, placeholder, helper text, and error states.',
    href: '/form-inputs/text-input',
  },
  {
    name: 'Select',
    description: 'Dropdown select component for choosing from a list of options.',
    href: '/form-inputs/select',
  },
  {
    name: 'Checkbox & Radio',
    description: 'Selection controls for single or multiple choices with custom styling.',
    href: '/form-inputs/checkbox-radio',
  },
]

const principles = [
  { label: 'Consistent height', detail: '40px default across all inputs' },
  { label: 'Border style', detail: '1px solid using --color-border' },
  { label: 'Focus ring', detail: '2px ring using --color-primary' },
  { label: 'Error states', detail: 'Border and text colored with red-500' },
]

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Form Inputs</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Form Inputs</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          A composable set of form input components built with accessibility-first principles.
          All inputs support controlled and uncontrolled modes, validation states, and dark mode.
        </p>
      </div>

      {/* Available inputs */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Inputs</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {inputs.map((input) => (
            <a
              key={input.name}
              href={input.href}
              className="group rounded-xl border border-gray-200 p-5 hover:border-indigo-300 hover:shadow-sm transition"
            >
              <p className="text-sm font-semibold text-indigo-600 group-hover:text-indigo-700">
                {input.name}
              </p>
              <p className="text-sm text-gray-500 mt-1.5">{input.description}</p>
              <span className="inline-block mt-3 text-xs font-medium text-indigo-600 group-hover:text-indigo-700">
                View docs &rarr;
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Design principles */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Design Principles</h2>
        <p className="text-gray-500 mb-6">
          Every form input follows these shared conventions to ensure visual and behavioral consistency.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {principles.map((p) => (
            <div
              key={p.label}
              className="rounded-xl border border-gray-200 p-5"
            >
              <p className="text-sm font-semibold text-gray-900">{p.label}</p>
              <p className="text-sm text-gray-500 mt-1">
                <code className="text-xs font-mono text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">{p.detail}</code>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Usage example */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Quick Example</h2>
        <p className="text-gray-500 mb-6">
          Import any input and compose forms with standard React patterns.
        </p>
        <CodeBlock
          language="tsx"
          filename="ContactForm.tsx"
          code={`import { TextInput } from '@/components/TextInput'
import { Select } from '@/components/Select'
import { Checkbox } from '@/components/Checkbox'

export function ContactForm() {
  return (
    <form className="space-y-4">
      <TextInput label="Full name" placeholder="Jane Doe" />
      <TextInput label="Email" placeholder="jane@example.com" error="Email is required" />
      <Select
        label="Topic"
        placeholder="Choose a topic..."
        options={[
          { value: 'support', label: 'Support' },
          { value: 'sales', label: 'Sales' },
          { value: 'other', label: 'Other' },
        ]}
      />
      <Checkbox label="I agree to the terms and conditions" />
    </form>
  )
}`}
        />
      </div>
    </div>
  )
}
