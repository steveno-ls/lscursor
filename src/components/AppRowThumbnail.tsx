import { useProductLine } from '../context/ProductLineContext'

export type AppRowThumbnailProps = {
  appId: string
}

export function AppRowThumbnail({ appId }: AppRowThumbnailProps) {
  const productLine = useProductLine()
  const src = productLine.appRowThumbSrcForApp?.(appId) ?? productLine.appRowThumbSrc
  const accentClass = productLine.appRowThumbClassName?.(appId)

  return (
    <div
      className={[
        'flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg',
        accentClass,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <img
        src={src}
        alt=""
        width={56}
        height={56}
        className="size-14 rounded-lg object-cover"
        decoding="async"
        draggable={false}
      />
    </div>
  )
}
