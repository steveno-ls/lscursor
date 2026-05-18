export type ProductLineId = 'x-series' | 'golf'

export type SelectOption = { value: string; label: string }

export type UserRow = {
  id: string
  name: string
  subtitle: string
  apps: string
  accountAccess: string
  lastActive: string
  enabled: boolean
}

/** Matches list row shape used by UserProfilePage. */
export type UserProfileUser = UserRow

export type ProfileAccessKey = 'staff' | 'site_lead' | 'area_lead' | 'admin' | 'owner'

export type ProductAppRow = {
  id: string
  shop: string
  productLine: string
  assigned: boolean
  role: string
  /** Used when `locationFieldMode` is `single` or `multi` for this app id. */
  locations: string[]
  /** Retail (R-Series) golf: optional unique PIN per employee. */
  useUniquePin?: boolean
  pin?: string
  pinConfirm?: string
}

export type LocationFieldMode = 'none' | 'single' | 'multi'

export type UserProfileDetail = {
  firstName: string
  lastName: string
  email: string
  summarySecondary: string
  accessKey: ProfileAccessKey
  apps: ProductAppRow[]
}

export type AppTemplate = {
  id: string
  /** Label in the users table CSV and app filter (e.g. "Retail"). */
  listLabel: string
  shop: string
  productLine: string
  thumbSrc?: string
  thumbClassName?: string
}

export type ProductLineConfig = {
  id: ProductLineId
  appRowThumbSrc: string
  appRowThumbSrcForApp?: (appId: string) => string
  appRowThumbClassName?: (appId: string) => string | undefined
  appTemplates: AppTemplate[]
  appFilterOptions: SelectOption[]
  users: UserRow[]
  profilesByUserId: Record<string, UserProfileDetail>
  assignProductLabel?: string
  removeProductLabel?: string
  roleOptionsForApp: (
    appId: string,
    options?: { includeEcomMarketing?: boolean },
  ) => readonly SelectOption[]
  locationOptionsSection: { items: SelectOption[] }[]
  locationFieldMode?: (appId: string) => LocationFieldMode
  appSupportsLocations: (appId: string) => boolean
  appSupportsPin?: (appId: string) => boolean
  parseAppsFromList: (appsCsv: string) => string[]
  createDefaultApps: () => ProductAppRow[]
  createProfileDetailForUser: (user: UserProfileUser) => UserProfileDetail
  locationLabels: (values: string[]) => string
  roleLabelFor: (appId: string, role: string, options?: { includeEcomMarketing?: boolean }) => string
  isAssignedAppConfigured: (app: ProductAppRow) => boolean
}
