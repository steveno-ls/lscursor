import { golfConfig } from './golf'
import type { ProductLineConfig, ProductLineId } from './types'
import { xSeriesConfig } from './x-series'

export * from './types'
export { golfConfig, GOLF_APP_TEMPLATES, GOLF_USERS } from './golf'
export * from './golfApps'
export { xSeriesConfig, X_SERIES_APP_TEMPLATES, X_SERIES_USERS } from './x-series'

const PRODUCT_LINE_CONFIGS: Record<ProductLineId, ProductLineConfig> = {
  'x-series': xSeriesConfig,
  golf: golfConfig,
}

export function getProductLineConfig(id: ProductLineId): ProductLineConfig {
  return PRODUCT_LINE_CONFIGS[id]
}
