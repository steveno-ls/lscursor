import { useProductLine } from '../context/ProductLineContext'

export type AppRowThumbnailProps = {
  appId: string
  size?: 'default' | 'small'
}

const THUMB_PX = { default: 56, small: 44 } as const

export function AppRowThumbnail({ appId, size = 'default' }: AppRowThumbnailProps) {
  const productLine = useProductLine()
  const src = productLine.appRowThumbSrcForApp?.(appId) ?? productLine.appRowThumbSrc
  const accentClass = productLine.appRowThumbClassName?.(appId)
  const px = THUMB_PX[size]
  const sizeClass = size === 'small' ? 'size-11' : 'size-14'

  return (
    <div
      className={[
        'flex shrink-0 items-center justify-center overflow-hidden rounded-lg',
        sizeClass,
        accentClass,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <img
        src={src}
        alt=""
        width={px}
        height={px}
        className={`${sizeClass} rounded-lg object-cover`}
        decoding="async"
        draggable={false}
      />
    </div>
  )
}
