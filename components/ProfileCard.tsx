import React, { useEffect, useRef, useState } from 'react'

export interface ProfileStat {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
}

export interface ProfileCardProps {
  /** Username / handle shown as the card title. */
  username: string
  /** URL for the circular hero photo. */
  avatarUrl?: string
  /** If avatarUrl is missing, renders a rounded placeholder with this fallback. */
  avatarFallback?: React.ReactNode
  /** Short bio under the username. */
  bio?: React.ReactNode
  /** Legacy: if provided (and onUsernameChange is not), the pencil calls this. */
  onEdit?: () => void
  /** If provided, the pencil button makes the username inline-editable. */
  onUsernameChange?: (next: string) => void
  /** If provided, hovering the photo reveals a "Change photo" overlay; click opens a file picker. */
  onAvatarChange?: (file: File) => void
  /** Stats listed below the divider (icon + value + label per row). */
  stats?: ProfileStat[]
  /** Extra classes on the outer wrapper. */
  className?: string
}

function PencilIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  )
}

function CameraIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  )
}

export function ProfileCard({
  username,
  avatarUrl,
  avatarFallback,
  bio,
  onEdit,
  onUsernameChange,
  onAvatarChange,
  stats,
  className = '',
}: ProfileCardProps) {
  const [isEditingName, setIsEditingName] = useState(false)
  const [draft, setDraft] = useState(username)
  const [avatarHover, setAvatarHover] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { setDraft(username) }, [username])
  useEffect(() => { if (isEditingName) inputRef.current?.select() }, [isEditingName])

  const commitName = () => {
    const next = draft.trim()
    if (next && next !== username) onUsernameChange?.(next)
    else setDraft(username)
    setIsEditingName(false)
  }
  const cancelName = () => {
    setDraft(username)
    setIsEditingName(false)
  }

  const canEditName = !!onUsernameChange
  const canChangeAvatar = !!onAvatarChange

  const handlePencilClick = () => {
    if (canEditName) setIsEditingName(true)
    else onEdit?.()
  }

  const handleFilePicked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onAvatarChange?.(file)
    e.target.value = '' // allow re-selecting the same file
  }

  return (
    <div className={`relative ${className}`}>
      {/* Hero photo — sized to the column, overlaps ~35% of the card below. */}
      <div className="relative z-10 -mb-[35%]">
        <div
          className="relative aspect-square w-full rounded-full overflow-hidden"
          style={{ border: '1px solid rgb(var(--color-border))' }}
          onMouseEnter={() => setAvatarHover(true)}
          onMouseLeave={() => setAvatarHover(false)}
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-5xl font-bold"
              style={{
                backgroundColor: 'rgb(var(--color-bg-secondary))',
                color: 'rgb(var(--color-text-muted))',
              }}
            >
              {avatarFallback ?? username.slice(1, 2).toUpperCase()}
            </div>
          )}

          {canChangeAvatar && (
            <>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Change photo"
                className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 text-white transition-opacity duration-150"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.55)',
                  opacity: avatarHover ? 1 : 0,
                  pointerEvents: avatarHover ? 'auto' : 'none',
                }}
              >
                <CameraIcon />
                <span className="text-sm font-medium">Change photo</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFilePicked}
              />
            </>
          )}
        </div>
      </div>

      {/* Card body — generous top padding to reserve space for the overlap. */}
      <div
        className="relative z-0 rounded-3xl border px-6 pb-6"
        style={{
          backgroundColor: 'rgb(var(--color-bg))',
          borderColor: 'rgb(var(--color-border))',
          paddingTop: 'calc(35% + 1.5rem)',
        }}
      >
        <div className="flex items-center gap-2">
          {isEditingName ? (
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={commitName}
              onKeyDown={(e) => {
                if (e.key === 'Enter') commitName()
                else if (e.key === 'Escape') cancelName()
              }}
              aria-label="Username"
              className="text-2xl font-bold tracking-tight bg-transparent outline-none flex-1 min-w-0 py-0.5"
              style={{
                color: 'rgb(var(--color-text))',
                borderBottom: '1px solid rgb(var(--color-border))',
              }}
            />
          ) : (
            <h3
              className="text-2xl font-bold tracking-tight truncate"
              style={{ color: 'rgb(var(--color-text))' }}
            >
              {username}
            </h3>
          )}
          {(canEditName || onEdit) && !isEditingName && (
            <button
              type="button"
              onClick={handlePencilClick}
              aria-label={canEditName ? 'Edit username' : 'Edit profile'}
              className="shrink-0 transition-colors"
              style={{ color: 'rgb(var(--color-text-muted))' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'rgb(var(--color-text))' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgb(var(--color-text-muted))' }}
            >
              <PencilIcon />
            </button>
          )}
        </div>

        {bio && (
          <p
            className="mt-3 text-sm leading-relaxed"
            style={{ color: 'rgb(var(--color-text-muted))' }}
          >
            {bio}
          </p>
        )}

        {stats && stats.length > 0 && (
          <>
            <div
              className="my-5 h-px"
              style={{ backgroundColor: 'rgb(var(--color-border))' }}
            />
            <ul className="space-y-3 text-sm">
              {stats.map((s, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span
                    className="shrink-0"
                    style={{ color: 'rgb(var(--color-text-muted))' }}
                  >
                    {s.icon}
                  </span>
                  <span
                    className="font-semibold tabular-nums"
                    style={{ color: 'rgb(var(--color-text))' }}
                  >
                    {s.value}
                  </span>
                  <span style={{ color: 'rgb(var(--color-text-muted))' }}>
                    {s.label}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}
