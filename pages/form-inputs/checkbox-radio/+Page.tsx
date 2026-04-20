import React from 'react'
import { CodeBlock } from '../../../components/CodeBlock'

const props = [
  { name: 'checked', type: 'boolean', req: false, desc: 'Controlled checked state.' },
  { name: 'onChange', type: '(e: ChangeEvent) => void', req: false, desc: 'Change handler for controlled mode.' },
  { name: 'label', type: 'string', req: true, desc: 'Label displayed next to the control.' },
  { name: 'disabled', type: 'boolean', req: false, desc: 'Disables the control when true.' },
  { name: 'name', type: 'string', req: false, desc: 'Input name attribute for form grouping.' },
]

const controlLabelStyle = "flex items-center gap-2.5 text-sm text-gray-900 cursor-pointer"
const disabledLabelStyle = "flex items-center gap-2.5 text-sm text-gray-400 cursor-not-allowed"

const checkboxStyle: React.CSSProperties = {
  width: 18,
  height: 18,
  accentColor: '#4f46e5',
  cursor: 'pointer',
}

const radioStyle: React.CSSProperties = {
  width: 18,
  height: 18,
  accentColor: '#4f46e5',
  cursor: 'pointer',
}

export function Page() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 mb-2 uppercase tracking-wide">Form Inputs</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Checkbox & Radio</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Selection controls for single or multiple choices. Built with native elements
          and custom styling for consistency.
        </p>
      </div>

      {/* Live preview */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Preview</h2>
        <p className="text-gray-500 mb-6">Native checkbox and radio inputs with consistent accent colors and spacing.</p>

        <div className="rounded-xl border border-gray-200 overflow-hidden mb-4">
          <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Preview</span>
          </div>
          <div className="p-6 bg-white">
            <div className="grid gap-8 sm:grid-cols-2">
              {/* Checkboxes */}
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">Checkboxes</p>
                <div className="space-y-3">
                  <label className={controlLabelStyle}>
                    <input type="checkbox" defaultChecked style={checkboxStyle} />
                    Enable notifications
                  </label>
                  <label className={controlLabelStyle}>
                    <input type="checkbox" style={checkboxStyle} />
                    Send weekly digest
                  </label>
                  <label className={controlLabelStyle}>
                    <input type="checkbox" defaultChecked style={checkboxStyle} />
                    Auto-save drafts
                  </label>
                  <label className={disabledLabelStyle}>
                    <input type="checkbox" disabled style={{ ...checkboxStyle, opacity: 0.5, cursor: 'not-allowed' }} />
                    Admin only (disabled)
                  </label>
                </div>
              </div>

              {/* Radio buttons */}
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">Radio Buttons</p>
                <div className="space-y-3">
                  <label className={controlLabelStyle}>
                    <input type="radio" name="plan" defaultChecked style={radioStyle} />
                    Free
                  </label>
                  <label className={controlLabelStyle}>
                    <input type="radio" name="plan" style={radioStyle} />
                    Pro
                  </label>
                  <label className={controlLabelStyle}>
                    <input type="radio" name="plan" style={radioStyle} />
                    Enterprise
                  </label>
                  <label className={disabledLabelStyle}>
                    <input type="radio" name="plan" disabled style={{ ...radioStyle, opacity: 0.5, cursor: 'not-allowed' }} />
                    Legacy (disabled)
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Props table */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Props</h2>
        <p className="text-gray-500 mb-4">
          Both <code className="text-xs font-mono text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">Checkbox</code> and{' '}
          <code className="text-xs font-mono text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">Radio</code> share the same prop interface.
        </p>
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
        <p className="text-gray-500 mb-6">Use Checkbox for multi-select and Radio for single-select within a group.</p>
        <CodeBlock
          language="tsx"
          filename="Example.tsx"
          code={`import { Checkbox } from '@/components/Checkbox'
import { Radio } from '@/components/Radio'

function PreferencesForm() {
  const [notifications, setNotifications] = useState(true)
  const [plan, setPlan] = useState('pro')

  return (
    <form className="space-y-6">
      {/* Multiple choice with checkboxes */}
      <fieldset>
        <legend className="text-sm font-medium text-gray-900 mb-2">
          Notifications
        </legend>
        <Checkbox
          label="Enable notifications"
          checked={notifications}
          onChange={(e) => setNotifications(e.target.checked)}
        />
        <Checkbox label="Send weekly digest" />
        <Checkbox label="Auto-save drafts" disabled />
      </fieldset>

      {/* Single choice with radio buttons */}
      <fieldset>
        <legend className="text-sm font-medium text-gray-900 mb-2">
          Plan
        </legend>
        <Radio
          name="plan"
          label="Free"
          checked={plan === 'free'}
          onChange={() => setPlan('free')}
        />
        <Radio
          name="plan"
          label="Pro"
          checked={plan === 'pro'}
          onChange={() => setPlan('pro')}
        />
        <Radio
          name="plan"
          label="Enterprise"
          checked={plan === 'enterprise'}
          onChange={() => setPlan('enterprise')}
        />
      </fieldset>
    </form>
  )
}`}
        />
      </div>
    </div>
  )
}
