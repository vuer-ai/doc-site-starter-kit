import React from 'react'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type AvatarShape = 'circle' | 'square'
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away'

export interface AvatarProps {
  /** Image URL. If missing / fails to load, falls back to `initial` / `name`. */
  src?: string
  /** Accessible alt text. Defaults to `name`. */
  alt?: string
  /** Full name — used for alt text and to derive the default initial. */
  name?: string
  /** Override the letter shown in the initial fallback. Defaults to `name[0]`. */
  initial?: string
  /** Default 'md'. */
  size?: AvatarSize
  /** 'circle' (default) or 'square' (rounded corners). */
  shape?: AvatarShape
  /** Status dot shown at the bottom-right. */
  status?: AvatarStatus
  className?: string
}

const SIZE: Record<AvatarSize, { box: number; text: string; dot: number; ring: number }> = {
  xs:  { box: 20, text: 'text-[10px]', dot: 6,  ring: 1.5 },
  sm:  { box: 28, text: 'text-xs',     dot: 8,  ring: 1.5 },
  md:  { box: 36, text: 'text-sm',     dot: 10, ring: 2   },
  lg:  { box: 48, text: 'text-base',   dot: 12, ring: 2   },
  xl:  { box: 64, text: 'text-lg',     dot: 14, ring: 2.5 },
  '2xl': { box: 96, text: 'text-2xl',  dot: 18, ring: 3   },
}

const STATUS_COLOR: Record<AvatarStatus, string> = {
  online:  '#22c55e',
  offline: '#9ca3af',
  busy:    '#ef4444',
  away:    '#f59e0b',
}

function deriveInitial(name: string | undefined, override: string | undefined): string {
  if (override) return override.slice(0, 2).toUpperCase()
  if (!name) return '?'
  // Take the first letter of the first two words.
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return name.trim().slice(0, 1).toUpperCase()
}

function hashHue(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return Math.abs(h) % 360
}

export function Avatar({
  src,
  alt,
  name,
  initial,
  size = 'md',
  shape = 'circle',
  status,
  className = '',
}: AvatarProps) {
  const [imgFailed, setImgFailed] = React.useState(false)
  const dims = SIZE[size]
  const showImg = src && !imgFailed
  const letter = deriveInitial(name, initial)
  const hue = hashHue(name ?? initial ?? 'x')
  const rounded = shape === 'circle' ? '9999px' : `${Math.max(6, dims.box * 0.2)}px`

  return (
    <span
      className={`relative inline-flex items-center justify-center overflow-hidden select-none ${dims.text} ${className}`}
      style={{
        width: dims.box,
        height: dims.box,
        borderRadius: rounded,
        backgroundColor: showImg ? 'transparent' : `hsl(${hue} 55% 45%)`,
        color: '#fff',
        fontWeight: 600,
      }}
      role={alt || name ? 'img' : undefined}
      aria-label={alt ?? name}
    >
      {showImg ? (
        <img
          src={src}
          alt={alt ?? name ?? ''}
          className="w-full h-full object-cover"
          onError={() => setImgFailed(true)}
          draggable={false}
        />
      ) : (
        letter
      )}
      {status && (
        <span
          aria-label={status}
          className="absolute block"
          style={{
            right: 0,
            bottom: 0,
            width: dims.dot,
            height: dims.dot,
            borderRadius: 9999,
            backgroundColor: STATUS_COLOR[status],
            boxShadow: `0 0 0 ${dims.ring}px rgb(var(--color-bg))`,
          }}
        />
      )}
    </span>
  )
}

/* --- Group ------------------------------------------------------------ */

export interface AvatarGroupProps {
  children: React.ReactNode
  /** Maximum visible avatars before collapsing into a "+N" tile. Default 4. */
  max?: number
  /** Size — applied to the "+N" tile. Individual avatars keep their own. */
  size?: AvatarSize
  className?: string
}

export function AvatarGroup({
  children,
  max = 4,
  size = 'md',
  className = '',
}: AvatarGroupProps) {
  const items = React.Children.toArray(children)
  const visible = items.slice(0, max)
  const overflow = items.length - visible.length
  const dims = SIZE[size]

  return (
    <div className={`flex items-center ${className}`}>
      {visible.map((child, i) => (
        <span
          key={i}
          className="relative"
          style={{
            marginLeft: i === 0 ? 0 : -dims.box * 0.28,
            boxShadow: `0 0 0 2px rgb(var(--color-bg))`,
            borderRadius: 9999,
          }}
        >
          {child}
        </span>
      ))}
      {overflow > 0 && (
        <span
          className={`relative inline-flex items-center justify-center select-none font-semibold ${dims.text}`}
          style={{
            width: dims.box,
            height: dims.box,
            borderRadius: 9999,
            marginLeft: -dims.box * 0.28,
            boxShadow: `0 0 0 2px rgb(var(--color-bg))`,
            backgroundColor: 'rgb(var(--color-bg-secondary))',
            color: 'rgb(var(--color-text-muted))',
          }}
        >
          +{overflow}
        </span>
      )}
    </div>
  )
}
