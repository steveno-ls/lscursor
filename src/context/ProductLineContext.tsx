import { createContext, useContext, type ReactNode } from 'react'
import type { ProductLineConfig } from '../config/types'

const ProductLineContext = createContext<ProductLineConfig | null>(null)

export type ProductLineProviderProps = {
  config: ProductLineConfig
  children: ReactNode
}

export function ProductLineProvider({ config, children }: ProductLineProviderProps) {
  return (
    <ProductLineContext.Provider value={config}>{children}</ProductLineContext.Provider>
  )
}

export function useProductLine(): ProductLineConfig {
  const config = useContext(ProductLineContext)
  if (!config) {
    throw new Error('useProductLine must be used within a ProductLineProvider')
  }
  return config
}
