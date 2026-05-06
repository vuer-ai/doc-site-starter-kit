import React from 'react'

export type ButtonVariant = 'primary' | 'subtle' | 'solid' | 'ghost' | 'outline' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'type'> {
  children?: React.ReactNode
  /** Visual treatment. Default 'primary'. */
  variant?: ButtonVariant
  /** Size. Default 'md'. */
  size?: ButtonSize
  /** Square padding (no label) for an icon-only button. */
  iconOnly?: boolean
  /** Leading icon shown before `children`. */
  leadingIcon?: React.ReactNode
  /** Trailing icon shown after `children`. */
  trailingIcon?: React.ReactNode
  /** Show a spinner + disable the button. Used during async actions. */
  loading?: boolean
  /** Text shown while `loading` is true (e.g. "Deleting..."). Defaults to `children`. */
  loadingLabel?: React.ReactNode
  /** Native button `type`. Default 'button' (prevents accidental form submit). */
  type?: 'button' | 'submit' | 'reset'
}

const SIZE_PADDED: Record<ButtonSize, string> = {
  sm: 'px-3 h-8 text-xs gap-1.5',
  md: 'px-4 h-10 text-sm gap-2',
  lg: 'px-5 h-12 text-base gap-2.5',
}

const SIZE_ICON_ONLY: Record<ButtonSize, string> = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-14 h-12',
}

const VARIANT_COLORS: Record<ButtonVariant, { bg: string; hoverBg: string; color: string; border?: string }> = {
  primary: {
    bg: 'rgb(37 99 235)',       // blue-600
    hoverBg: 'rgb(29 78 216)',  // blue-700
    color: '#fff',
  },
  danger: {
    bg: 'rgb(239 68 68)',       // red-500
    hoverBg: 'rgb(220 38 38)',  // red-600
    color: '#fff',
  },
  solid: {
    bg: 'rgb(var(--color-bg))',
    hoverBg: 'rgb(var(--color-text) / 0.04)',
    color: 'rgb(var(--color-text))',
  },
  subtle: {
    bg: 'rgb(var(--color-text) / 0.08)',
    hoverBg: 'rgb(var(--color-text) / 0.14)',
    color: 'rgb(var(--color-text))',
  },
  outline: {
    bg: 'transparent',
    hoverBg: 'rgb(var(--color-text) / 0.06)',
    color: 'rgb(var(--color-text))',
    border: '1px solid rgb(var(--color-border))',
  },
  ghost: {
    bg: 'transparent',
    hoverBg: 'rgb(var(--color-text) / 0.06)',
    color: 'rgb(var(--color-text))',
  },
}

function variantStyle(variant: ButtonVariant): React.CSSProperties {
  const v = VARIANT_COLORS[variant]
  return {
    backgroundColor: v.bg,
    color: v.color,
    border: v.border,
    boxShadow: variant === 'solid' ? '0 1px 2px rgba(0,0,0,0.08)' : undefined,
  }
}

function Spinner({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="animate-spin"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconOnly = false,
  leadingIcon,
  trailingIcon,
  loading = false,
  loadingLabel,
  type = 'button',
  className = '',
  disabled,
  onMouseEnter,
  onMouseLeave,
  ...rest
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-medium rounded-full select-none transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-primary)/0.4)] disabled:cursor-not-allowed'
  const sizing = iconOnly ? SIZE_ICON_ONLY[size] : SIZE_PADDED[size]
  const style = variantStyle(variant)
  const isDisabled = disabled || loading
  const spinnerSize = size === 'sm' ? 14 : size === 'lg' ? 18 : 16
  const label = loading ? (loadingLabel ?? children) : children

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={`${base} ${sizing} ${className}`}
      style={{
        ...style,
        opacity: loading ? 0.7 : disabled ? 0.5 : 1,
      }}
      onMouseEnter={e => {
        if (!isDisabled) e.currentTarget.style.backgroundColor = VARIANT_COLORS[variant].hoverBg
        onMouseEnter?.(e)
      }}
      onMouseLeave={e => {
        if (!isDisabled) e.currentTarget.style.backgroundColor = VARIANT_COLORS[variant].bg
        onMouseLeave?.(e)
      }}
      {...rest}
    >
      {iconOnly ? (
        loading ? <Spinner size={spinnerSize} /> : children
      ) : (
        <>
          {loading ? (
            <span className="shrink-0"><Spinner size={spinnerSize} /></span>
          ) : (
            leadingIcon && <span className="shrink-0">{leadingIcon}</span>
          )}
          {label}
          {!loading && trailingIcon && <span className="shrink-0">{trailingIcon}</span>}
        </>
      )}
    </button>
  )
}
