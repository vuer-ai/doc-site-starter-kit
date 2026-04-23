import React, { forwardRef, useState } from 'react'

export type SearchInputSize = 'sm' | 'md' | 'lg'

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Size. Default 'md'. */
  size?: SearchInputSize
  /** Called when the user presses Escape or clicks the clear button. */
  onClear?: () => void
  /** Show a clear button when the input is non-empty. Default true. */
  clearable?: boolean
  /** Extra classes on the outer wrapper. */
  className?: string
}

const SIZE: Record<SearchInputSize, { h: number; iconLeft: number; padL: number; padR: number; text: string; icon: number }> = {
  sm: { h: 36, iconLeft: 12, padL: 36, padR: 12, text: 'text-xs',  icon: 14 },
  md: { h: 44, iconLeft: 16, padL: 44, padR: 16, text: 'text-sm',  icon: 16 },
  lg: { h: 56, iconLeft: 20, padL: 52, padR: 20, text: 'text-base', icon: 18 },
}

function SearchIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  )
}

function ClearIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 9 6 6M15 9l-6 6" />
    </svg>
  )
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput(
    {
      size = 'md',
      placeholder = 'Search...',
      clearable = true,
      onClear,
      onKeyDown,
      onFocus,
      onBlur,
      value,
      defaultValue,
      className = '',
      ...rest
    },
    ref,
  ) {
    const [focused, setFocused] = useState(false)
    const [internalValue, setInternalValue] = useState<string>(defaultValue?.toString() ?? '')
    const isControlled = value !== undefined
    const currentValue = (isControlled ? value : internalValue)?.toString() ?? ''
    const hasValue = currentValue.length > 0

    const dims = SIZE[size]

    function handleClear() {
      if (!isControlled) setInternalValue('')
      rest.onChange?.({
        target: { value: '' },
        currentTarget: { value: '' },
      } as unknown as React.ChangeEvent<HTMLInputElement>)
      onClear?.()
    }

    return (
      <div
        className={`relative w-full ${className}`}
        style={{ height: dims.h }}
      >
        <span
          className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            left: dims.iconLeft,
            color: 'rgb(var(--color-text-muted))',
          }}
        >
          <SearchIcon size={dims.icon} />
        </span>
        <input
          {...rest}
          ref={ref}
          type="text"
          placeholder={placeholder}
          value={isControlled ? value : internalValue}
          onChange={e => {
            if (!isControlled) setInternalValue(e.target.value)
            rest.onChange?.(e)
          }}
          onFocus={e => {
            setFocused(true)
            onFocus?.(e)
          }}
          onBlur={e => {
            setFocused(false)
            onBlur?.(e)
          }}
          onKeyDown={e => {
            if (e.key === 'Escape' && hasValue) {
              e.preventDefault()
              handleClear()
            }
            onKeyDown?.(e)
          }}
          className={`w-full h-full focus:outline-none transition-colors ${dims.text}`}
          style={{
            paddingLeft: dims.padL,
            paddingRight: clearable && hasValue ? dims.padR + 24 : dims.padR,
            backgroundColor: 'rgb(var(--color-bg-secondary))',
            color: 'rgb(var(--color-text))',
            border: focused
              ? '1.5px solid rgb(96 165 250)'
              : '1px solid rgb(var(--color-border))',
            borderRadius: 9999,
          }}
        />
        {clearable && hasValue && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-colors"
            style={{
              right: dims.iconLeft - 4,
              width: 22,
              height: 22,
              color: 'rgb(var(--color-text-muted))',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'rgb(var(--color-text))'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgb(var(--color-text-muted))'
            }}
          >
            <ClearIcon />
          </button>
        )}
      </div>
    )
  },
)
