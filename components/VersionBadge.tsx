import React from 'react'
import { GitBranch } from 'lucide-react'

declare const __PACKAGE_VERSION__: string
declare const __PACKAGE_NAME__: string
declare const __GIT_HASH__: string

const fallbackVersion = '0.1.0'
const fallbackName = 'doc-site-starter-kit'

const PACKAGE_VERSION =
  typeof __PACKAGE_VERSION__ !== 'undefined' ? __PACKAGE_VERSION__ : fallbackVersion
const PACKAGE_NAME =
  typeof __PACKAGE_NAME__ !== 'undefined' ? __PACKAGE_NAME__ : fallbackName
const GIT_HASH =
  typeof __GIT_HASH__ !== 'undefined' ? __GIT_HASH__ : 'unknown'

interface PackageBadgeProps {
  className?: string
  packageName?: string
  packageFullName?: string
  versionText?: string
  linkable?: boolean
  gitHash?: string
}

function PackageBadge({
  className,
  packageName,
  packageFullName,
  versionText,
  linkable = true,
  gitHash,
}: PackageBadgeProps) {
  const npmUrl =
    packageFullName && versionText
      ? `https://www.npmjs.com/package/${packageFullName}/v/${versionText.replace('v', '')}`
      : undefined

  return (
    <div
      className={`inline-flex items-center rounded-lg text-xs ${className || ''}`}
      style={linkable ? { cursor: 'pointer' } : undefined}
    >
      {(packageName || versionText) && (
        <div className="inline-flex items-center overflow-hidden rounded-lg">
          {packageName && (
            <span
              className="px-2 py-0.5 text-xs font-medium text-white"
              style={{
                backgroundColor: 'rgb(var(--color-primary))',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
              }}
            >
              {packageName}
            </span>
          )}
          {versionText && (
            <a
              href={linkable && npmUrl ? npmUrl : undefined}
              className="px-2 py-0.5 text-xs no-underline transition-colors"
              style={{
                backgroundColor: 'rgb(var(--color-bg-secondary))',
                color: 'rgb(var(--color-text-muted))',
                textShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
              }}
              onClick={!linkable ? (e: React.MouseEvent) => e.preventDefault() : undefined}
            >
              {versionText}
            </a>
          )}
        </div>
      )}
      {gitHash && gitHash !== 'unknown' && (
        <a
          href={linkable ? `https://github.com/your-org/your-repo/commit/${gitHash}` : undefined}
          className="ml-1 px-1.5 py-0.5 text-xs font-mono no-underline"
          style={{ color: 'rgb(var(--color-text-muted))' }}
          onClick={!linkable ? (e: React.MouseEvent) => e.preventDefault() : undefined}
        >
          <GitBranch className="mr-0.5 inline-block" size={10} />
          {gitHash.slice(0, 7)}
        </a>
      )}
    </div>
  )
}

interface VersionBadgeProps {
  className?: string
  package?: boolean
  prefix?: boolean
  linkable?: boolean
  version?: boolean
  hash?: boolean
}

function VersionBadge({
  className,
  package: showPackage = false,
  prefix = false,
  linkable = false,
  version = false,
  hash = false,
}: VersionBadgeProps) {
  const packageShortName = PACKAGE_NAME.split('/').pop() || PACKAGE_NAME
  const versionText = version ? (prefix ? `v${PACKAGE_VERSION}` : PACKAGE_VERSION) : undefined

  return (
    <PackageBadge
      className={className}
      packageName={showPackage ? packageShortName : undefined}
      packageFullName={PACKAGE_NAME}
      versionText={versionText}
      linkable={linkable}
      gitHash={hash ? GIT_HASH : undefined}
    />
  )
}

export { PACKAGE_VERSION, GIT_HASH, PackageBadge, VersionBadge }
export type { PackageBadgeProps, VersionBadgeProps }
