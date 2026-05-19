import { useEffect, useRef, useState } from 'react'
import {
  Button,
  IconArrowBackIosNew20,
} from '@lightspeed/unified-components-helios-theme/react'
import { APP_HEADER_HEIGHT_PX } from './AppHeader'

export type UserProfileStickyHeaderProps = {
  fullName: string
  onBack: () => void
  onSave: () => void
  showSave?: boolean
}

const backButtonClassNames = [
  'absolute',
  'right-full',
  'top-1/2',
  '-translate-y-1/2',
  'mr-2',
  'shrink-0',
  'w-11',
  'min-w-11',
] as const

export function UserProfileStickyHeader({
  fullName,
  onBack,
  onSave,
  showSave = false,
}: UserProfileStickyHeaderProps) {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [isCompact, setIsCompact] = useState(false)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsCompact(!entry.isIntersecting),
      {
        root: null,
        threshold: 0,
        rootMargin: `-${APP_HEADER_HEIGHT_PX}px 0px 0px 0px`,
      },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  const backButton = (
    <Button
      type="button"
      appearance="ghost"
      size="medium"
      onClick={onBack}
      aria-label="Back to users"
      customClasses={{ container: [...backButtonClassNames] }}
    >
      <IconArrowBackIosNew20 aria-hidden />
    </Button>
  )

  return (
    <>
      <div ref={sentinelRef} className="pointer-events-none h-px w-full shrink-0" aria-hidden />
      <div
        className={[
          'sticky z-40 w-full bg-neutral-backdrop',
          'border-b transition-[padding,box-shadow,border-color] duration-300 ease-out',
          isCompact
            ? 'border-neutral-soft py-3 shadow-[0_2px_4px_rgba(0,0,0,0.06)]'
            : 'border-transparent py-8',
        ].join(' ')}
        style={{ top: APP_HEADER_HEIGHT_PX }}
      >
        <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-4 px-4 font-general sm:flex-row sm:items-center sm:justify-between sm:px-0">
          <div
            className={[
              'relative flex max-w-[640px] flex-col transition-[gap] duration-300 ease-out',
              isCompact ? 'gap-0' : 'gap-1',
            ].join(' ')}
          >
            {isCompact ? (
              <>
                {backButton}
                <h1 className="text-neutral-default typography-heading-sm transition-all duration-300 ease-out">
                  {fullName}
                </h1>
                <p className="text-neutral-default typography-body-sm transition-all duration-300 ease-out">
                  Manage users across all your products
                </p>
              </>
            ) : (
              <>
                <div className="relative flex min-h-11 items-center">
                  {backButton}
                  <h1 className="text-neutral-default typography-heading-lg transition-all duration-300 ease-out">
                    {fullName}
                  </h1>
                </div>
                <p className="text-neutral-default typography-body-md transition-all duration-300 ease-out">
                  Manage users across all your products
                </p>
              </>
            )}
          </div>
          {showSave ? (
            <Button
              type="button"
              appearance="primary"
              size="medium"
              onClick={onSave}
              customClasses={{ container: ['shrink-0', 'self-start', 'sm:self-center'] }}
            >
              Save
            </Button>
          ) : null}
        </div>
      </div>
    </>
  )
}
