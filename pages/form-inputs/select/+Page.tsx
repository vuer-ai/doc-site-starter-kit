import React from 'react'
import { CodeBlock } from '../../../components/CodeBlock'

const props = [
  { name: 'value', type: 'string', req: false, desc: 'Controlled value of the select.' },
  { name: 'onChange', type: '(e: ChangeEvent) => void', req: false, desc: 'Change handler for controlled mode.' },
  { name: 'options', type: '{ value: string; label: string }[]', req: true, desc: 'Array of selectable options.' },
  { name: 'placeholder', type: 'string', req: false, desc: 'Placeholder shown when no option is selected.' },
  { name: 'label', type: 'string', req: false, desc: 'Label displayed above the select.' },
  { name: 'disabled', type: 'boolean', req: false, desc: 'Disables the select when true.' },
]

const selectBaseStyle: React.CSSProperties = {
  height: 40,
  border: '1px solid rgb(var(--color-border))',
  borderRadius: 8,
  padding: '0 12px',
  fontSize: 14,
  width: '100%',
  outline: 'none',
  background: 'transparent',
  color: 'inherit',
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M3 4.5l3 3 3-3'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 12px center',
  backgroundSize: 12,
  paddingRight: 32,
}

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Form Inputs</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Select</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Dropdown select component for choosing from a list of options.
          Supports placeholder, disabled state, and custom styling.
        </p>
      </div>

      {/* Live preview */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Preview</h2>
        <p className="text-gray-500 mb-6">Native select element with consistent styling across form inputs.</p>

        <div className="rounded-xl border border-gray-200 overflow-hidden mb-4">
          <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Preview</span>
          </div>
          <div className="p-6 bg-white space-y-6 max-w-sm">
            {/* Default with placeholder */}
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">With Placeholder</p>
              <label className="block text-sm font-medium text-gray-900 mb-1.5">Country</label>
              <select style={selectBaseStyle} defaultValue="" className="focus:ring-2 focus:ring-indigo-500">
                <option value="" disabled>Select a country...</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="ca">Canada</option>
                <option value="au">Australia</option>
              </select>
            </div>

            {/* Pre-selected */}
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Pre-selected</p>
              <label className="block text-sm font-medium text-gray-900 mb-1.5">Role</label>
              <select style={selectBaseStyle} defaultValue="editor" className="focus:ring-2 focus:ring-indigo-500">
                <option value="viewer">Viewer</option>
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Disabled */}
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Disabled</p>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Plan</label>
              <select
                style={{ ...selectBaseStyle, opacity: 0.5, cursor: 'not-allowed' }}
                disabled
                defaultValue="pro"
              >
                <option value="pro">Pro</option>
              </select>
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
        <p className="text-gray-500 mb-6">Pass an array of options and an optional placeholder.</p>
        <CodeBlock
          language="tsx"
          filename="Example.tsx"
          code={`import { Select } from '@/components/Select'

function SettingsForm() {
  const [role, setRole] = useState('editor')

  return (
    <form className="space-y-4">
      <Select
        label="Country"
        placeholder="Select a country..."
        options={[
          { value: 'us', label: 'United States' },
          { value: 'uk', label: 'United Kingdom' },
          { value: 'ca', label: 'Canada' },
          { value: 'au', label: 'Australia' },
        ]}
      />
      <Select
        label="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        options={[
          { value: 'viewer', label: 'Viewer' },
          { value: 'editor', label: 'Editor' },
          { value: 'admin', label: 'Admin' },
        ]}
      />
      <Select
        label="Plan"
        disabled
        options={[{ value: 'pro', label: 'Pro' }]}
      />
    </form>
  )
}`}
        />
      </div>
    </div>
  )
}
