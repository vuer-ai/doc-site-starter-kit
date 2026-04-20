import React from 'react'
import { CodeBlock } from '../../../components/CodeBlock'

const props = [
  { name: 'value', type: 'string', req: false, desc: 'Controlled value of the input.' },
  { name: 'onChange', type: '(e: ChangeEvent) => void', req: false, desc: 'Change handler for controlled mode.' },
  { name: 'placeholder', type: 'string', req: false, desc: 'Placeholder text shown when empty.' },
  { name: 'label', type: 'string', req: false, desc: 'Label displayed above the input.' },
  { name: 'error', type: 'string', req: false, desc: 'Error message shown below the input.' },
  { name: 'disabled', type: 'boolean', req: false, desc: 'Disables the input when true.' },
  { name: 'className', type: 'string', req: false, desc: 'Additional CSS classes to merge.' },
]

const inputBaseStyle: React.CSSProperties = {
  height: 40,
  border: '1px solid rgb(var(--color-border))',
  borderRadius: 8,
  padding: '0 12px',
  fontSize: 14,
  width: '100%',
  outline: 'none',
  background: 'transparent',
  color: 'inherit',
}

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Form Inputs</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Text Input</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Single-line text input with label, placeholder, helper text, and error states.
        </p>
      </div>

      {/* Live preview */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Variants</h2>
        <p className="text-gray-500 mb-6">All text input variants share the same base styling and height.</p>

        <div className="rounded-xl border border-gray-200 overflow-hidden mb-4">
          <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Preview</span>
          </div>
          <div className="p-6 bg-white space-y-6">
            {/* Default */}
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Default</p>
              <input
                type="text"
                placeholder="Enter your name..."
                style={inputBaseStyle}
                className="focus:ring-2 focus:ring-indigo-500"
                readOnly
              />
            </div>

            {/* With Label */}
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">With Label</p>
              <label className="block text-sm font-medium text-gray-900 mb-1.5">Email address</label>
              <input
                type="email"
                placeholder="you@example.com"
                style={inputBaseStyle}
                className="focus:ring-2 focus:ring-indigo-500"
                readOnly
              />
            </div>

            {/* With Error */}
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">With Error</p>
              <label className="block text-sm font-medium text-gray-900 mb-1.5">Username</label>
              <input
                type="text"
                defaultValue="ab"
                style={{ ...inputBaseStyle, borderColor: '#ef4444' }}
                className="focus:ring-2 focus:ring-red-500"
                readOnly
              />
              <p className="text-sm text-red-500 mt-1.5">Username must be at least 3 characters.</p>
            </div>

            {/* Disabled */}
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Disabled</p>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Read only</label>
              <input
                type="text"
                placeholder="Disabled input"
                disabled
                style={{ ...inputBaseStyle, opacity: 0.5, cursor: 'not-allowed' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Props table */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Props</h2>
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Prop</th>
                <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Type</th>
                <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Required</th>
                <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {props.map((r) => (
                <tr key={r.name}>
                  <td className="px-4 py-2.5 font-mono text-indigo-600 text-xs">{r.name}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-gray-500">{r.type}</td>
                  <td className="px-4 py-2.5 text-xs text-center">{r.req ? '✓' : '—'}</td>
                  <td className="px-4 py-2.5 text-gray-600 text-sm">{r.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Usage */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Usage</h2>
        <p className="text-gray-500 mb-6">Import the component and use it in controlled or uncontrolled mode.</p>
        <CodeBlock
          language="tsx"
          filename="Example.tsx"
          code={`import { TextInput } from '@/components/TextInput'

function SignupForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const validate = (value: string) => {
    setEmail(value)
    setError(value.includes('@') ? '' : 'Please enter a valid email')
  }

  return (
    <form className="space-y-4">
      <TextInput
        label="Full name"
        placeholder="Jane Doe"
      />
      <TextInput
        label="Email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => validate(e.target.value)}
        error={error}
      />
      <TextInput
        label="Company"
        placeholder="Acme Inc."
        disabled
      />
    </form>
  )
}`}
        />
      </div>
    </div>
  )
}
