import type { SelectOption } from './types'

export const GOLF_LOCATION_OPTIONS: SelectOption[] = [
  { value: 'florida', label: 'Florida' },
]

export const GOLF_LOCATION_OPTIONS_SECTION = [{ items: [...GOLF_LOCATION_OPTIONS] }]

const RETAIL_R_ROLES: SelectOption[] = [
  { value: 'cashier', label: 'Cashier' },
  { value: 'manager', label: 'Manager' },
  { value: 'admin', label: 'Admin' },
]

const ECOM_C_ROLES: SelectOption[] = [
  { value: 'designer', label: 'Designer' },
  { value: 'manager', label: 'Manager' },
  { value: 'admin', label: 'Admin' },
]

const HOSPITALITY_K_ROLES: SelectOption[] = [
  { value: 'waiter', label: 'Waiter' },
  { value: 'manager', label: 'Manager' },
  { value: 'admin', label: 'Admin' },
]

const GOLF_APP_ROLES: SelectOption[] = [
  { value: 'assistant', label: 'Assistant' },
  { value: 'manager', label: 'Manager' },
  { value: 'admin', label: 'Admin' },
]

const ROLE_OPTIONS_BY_APP_ID: Record<string, readonly SelectOption[]> = {
  'retail-r': RETAIL_R_ROLES,
  'ecom-c': ECOM_C_ROLES,
  'hospitality-k': HOSPITALITY_K_ROLES,
  'hospitality-backoffice': HOSPITALITY_K_ROLES,
  golf: GOLF_APP_ROLES,
}

/** Apps that show a single location dropdown (not multi-select). */
export const GOLF_SINGLE_LOCATION_APP_IDS = new Set([
  'retail-r',
  'hospitality-k',
  'golf',
])

export const GOLF_PIN_APP_IDS = new Set(['retail-r'])

export function golfRoleOptionsForApp(appId: string): readonly SelectOption[] {
  return ROLE_OPTIONS_BY_APP_ID[appId] ?? []
}

export function golfRoleLabelFor(appId: string, role: string): string {
  return golfRoleOptionsForApp(appId).find((o) => o.value === role)?.label ?? role
}

export function golfLocationLabels(values: string[]): string {
  return values
    .map((v) => GOLF_LOCATION_OPTIONS.find((o) => o.value === v)?.label ?? v)
    .join(', ')
}
