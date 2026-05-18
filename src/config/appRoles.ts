import type { SelectOption } from './types'

export const RETAIL_ROLE_OPTIONS: readonly SelectOption[] = [
  { value: 'cashier', label: 'Cashier' },
  { value: 'manager', label: 'Manager' },
  { value: 'admin', label: 'Admin' },
]

export const ECOM_ROLE_OPTIONS: readonly SelectOption[] = [
  { value: 'designer', label: 'Designer' },
  { value: 'manager', label: 'Manager' },
  { value: 'admin', label: 'Admin' },
]

export const ECOM_ROLE_OPTIONS_WITH_MARKETING: readonly SelectOption[] = [
  ...ECOM_ROLE_OPTIONS,
  { value: 'marketing', label: 'Marketing' },
]

export const WHOLESALE_ROLE_OPTIONS: readonly SelectOption[] = [
  { value: 'pos_only', label: 'POS Only' },
  { value: 'buyer', label: 'Buyer' },
  { value: 'admin', label: 'Admin' },
]

export const RETAIL_LOCATION_OPTIONS: readonly SelectOption[] = [
  { value: 'ponsonby', label: 'Ponsonby' },
  { value: 'new_market', label: 'New Market' },
  { value: 'albany', label: 'Albany' },
]

export const RETAIL_LOCATION_OPTIONS_SECTION: { items: SelectOption[] }[] = [
  { items: [...RETAIL_LOCATION_OPTIONS] },
]

export function xSeriesRoleOptionsForApp(
  appId: string,
  options?: { includeEcomMarketing?: boolean },
): readonly SelectOption[] {
  if (appId === 'retail') return RETAIL_ROLE_OPTIONS
  if (appId === 'ecom') {
    return options?.includeEcomMarketing ? ECOM_ROLE_OPTIONS_WITH_MARKETING : ECOM_ROLE_OPTIONS
  }
  if (appId === 'wholesale') return WHOLESALE_ROLE_OPTIONS
  return []
}

export function xSeriesRoleLabelFor(
  appId: string,
  role: string,
  options?: { includeEcomMarketing?: boolean },
): string {
  const opts = xSeriesRoleOptionsForApp(appId, options)
  return opts.find((o) => o.value === role)?.label ?? role
}

export function xSeriesLocationLabels(values: string[]): string {
  return values
    .map((v) => RETAIL_LOCATION_OPTIONS.find((o) => o.value === v)?.label ?? v)
    .join(', ')
}
