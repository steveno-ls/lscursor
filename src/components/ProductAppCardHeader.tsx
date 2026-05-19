import type { ReactNode } from 'react'
import { MediaLeftBlockLayout } from '@lightspeed/unified-components-helios-theme/react'
import { AppRowThumbnail } from './AppRowThumbnail'

export type ProductAppCardHeaderProps = {
  appId: string
  shop: string
  productLine: string
  actionSlot?: ReactNode
}

export function ProductAppCardHeader({
  appId,
  shop,
  productLine,
  actionSlot,
}: ProductAppCardHeaderProps) {
  return (
    <div className="flex w-full flex-wrap items-center gap-4">
      <MediaLeftBlockLayout
        size="small"
        appearance="default"
        mediaSlot={<AppRowThumbnail appId={appId} size="small" />}
        titleSlot={shop}
        customClasses={{
          container: ['min-w-0', 'flex-1', '!max-w-none'],
          title: ['font-bold'],
        }}
      >
        {productLine}
      </MediaLeftBlockLayout>
      {actionSlot}
    </div>
  )
}
