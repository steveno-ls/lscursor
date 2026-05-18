import { getProductLineConfig, type ProductLineId } from '../config'
import { ProductLineProvider } from '../context/ProductLineContext'
import { UsersPage } from '../UsersPage'

export type ProductLineUsersRouteProps = {
  productLineId: ProductLineId
}

export function ProductLineUsersRoute({ productLineId }: ProductLineUsersRouteProps) {
  const config = getProductLineConfig(productLineId)

  return (
    <ProductLineProvider config={config}>
      <UsersPage />
    </ProductLineProvider>
  )
}
