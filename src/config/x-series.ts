import {
  RETAIL_LOCATION_OPTIONS_SECTION,
  xSeriesLocationLabels,
  xSeriesRoleLabelFor,
  xSeriesRoleOptionsForApp,
} from './appRoles'
import type {
  AppTemplate,
  ProductAppRow,
  ProductLineConfig,
  ProfileAccessKey,
  UserProfileDetail,
  UserProfileUser,
  UserRow,
} from './types'

const APP_ROW_THUMB_SRC = `${import.meta.env.BASE_URL}icons/retail-app.png`

export const X_SERIES_APP_TEMPLATES: AppTemplate[] = [
  {
    id: 'retail',
    listLabel: 'Retail',
    shop: 'The Continental Gift Shop',
    productLine: 'Retail (X-Series)',
  },
  {
    id: 'ecom',
    listLabel: 'eCom',
    shop: 'www.thecontinental.com',
    productLine: 'eCom (E-Series)',
  },
  {
    id: 'wholesale',
    listLabel: 'Wholesale',
    shop: 'The Continental Gift Shop',
    productLine: 'Wholesale',
  },
]

export const X_SERIES_APP_FILTER_OPTIONS = X_SERIES_APP_TEMPLATES.map((a) => ({
  value: a.listLabel,
  label: a.listLabel,
}))

export const X_SERIES_USERS: UserRow[] = [
  {
    id: '1',
    name: 'Brandon Rogers',
    subtitle: 'brandon.rodgers@continental.com',
    apps: 'eCom, Retail, Wholesale',
    accountAccess: 'Admin',
    lastActive: 'Today',
    enabled: true,
  },
  {
    id: '2',
    name: 'Dixie Matrix',
    subtitle: 'DMatrix01',
    apps: 'Retail, Wholesale',
    accountAccess: 'Site lead',
    lastActive: '1 week ago',
    enabled: true,
  },
  {
    id: '3',
    name: 'Jenna Kahn',
    subtitle: 'JKahn01',
    apps: 'Retail',
    accountAccess: 'Staff',
    lastActive: '—',
    enabled: true,
  },
  {
    id: '4',
    name: 'John Wickershire',
    subtitle: 'john.wick@continental.com',
    apps: 'eCom, Retail, Wholesale',
    accountAccess: 'Owner',
    lastActive: 'Yesterday',
    enabled: false,
  },
  {
    id: '5',
    name: 'Sarah Turner',
    subtitle: 'sarah.turner@continental.com',
    apps: 'Retail, Wholesale',
    accountAccess: 'Area Lead',
    lastActive: 'Today',
    enabled: true,
  },
]

const X_SERIES_PROFILES_BY_USER_ID: Record<string, UserProfileDetail> = {
  '1': {
    firstName: 'Brandon',
    lastName: 'Rogers',
    email: 'brandon.rodgers@continental.com',
    summarySecondary: 'brandon.rodgers@continental.com',
    accessKey: 'admin',
    apps: [
      {
        id: 'retail',
        shop: 'The Continental',
        productLine: 'Retail (X-Series)',
        assigned: true,
        role: 'admin',
        locations: ['ponsonby', 'new_market'],
      },
      {
        id: 'ecom',
        shop: 'www.thecontinental.com',
        productLine: 'eCom (E-Series)',
        assigned: true,
        role: 'admin',
        locations: [],
      },
      {
        id: 'wholesale',
        shop: 'The Continental',
        productLine: 'Wholesale',
        assigned: true,
        role: 'admin',
        locations: [],
      },
    ],
  },
  '2': {
    firstName: 'Dixie',
    lastName: 'Matrix',
    email: 'dmatrix@continental.com',
    summarySecondary: 'DMatrix01',
    accessKey: 'site_lead',
    apps: [
      {
        id: 'retail',
        shop: 'The Continental',
        productLine: 'Retail (X-Series)',
        assigned: true,
        role: 'manager',
        locations: ['albany'],
      },
      {
        id: 'ecom',
        shop: 'www.thecontinental.com',
        productLine: 'eCom (E-Series)',
        assigned: false,
        role: '',
        locations: [],
      },
      {
        id: 'wholesale',
        shop: 'The Continental',
        productLine: 'Wholesale',
        assigned: true,
        role: 'buyer',
        locations: [],
      },
    ],
  },
  '3': {
    firstName: 'Jenna',
    lastName: 'Kahn',
    email: 'jkahn@continental.com',
    summarySecondary: 'JKahn01',
    accessKey: 'staff',
    apps: [
      {
        id: 'retail',
        shop: 'The Continental',
        productLine: 'Retail (X-Series)',
        assigned: true,
        role: 'cashier',
        locations: ['ponsonby'],
      },
      {
        id: 'ecom',
        shop: 'www.thecontinental.com',
        productLine: 'eCom (E-Series)',
        assigned: false,
        role: '',
        locations: [],
      },
      {
        id: 'wholesale',
        shop: 'The Continental',
        productLine: 'Wholesale',
        assigned: false,
        role: '',
        locations: [],
      },
    ],
  },
  '4': {
    firstName: 'John',
    lastName: 'Wickershire',
    email: 'john.wick@continental.com',
    summarySecondary: 'john.wick@continental.com',
    accessKey: 'owner',
    apps: [
      {
        id: 'retail',
        shop: 'The Continental',
        productLine: 'Retail (X-Series)',
        assigned: true,
        role: 'cashier',
        locations: ['ponsonby'],
      },
      {
        id: 'ecom',
        shop: 'www.thecontinental.com',
        productLine: 'eCom (E-Series)',
        assigned: true,
        role: 'marketing',
        locations: [],
      },
      {
        id: 'wholesale',
        shop: 'The Continental',
        productLine: 'Wholesale',
        assigned: false,
        role: '',
        locations: [],
      },
    ],
  },
  '5': {
    firstName: 'Sarah',
    lastName: 'Turner',
    email: 'sarah.turner@continental.com',
    summarySecondary: 'sarah.turner@continental.com',
    accessKey: 'area_lead',
    apps: [
      {
        id: 'retail',
        shop: 'The Continental',
        productLine: 'Retail (X-Series)',
        assigned: true,
        role: 'manager',
        locations: ['new_market', 'albany'],
      },
      {
        id: 'ecom',
        shop: 'www.thecontinental.com',
        productLine: 'eCom (E-Series)',
        assigned: false,
        role: '',
        locations: [],
      },
      {
        id: 'wholesale',
        shop: 'The Continental',
        productLine: 'Wholesale',
        assigned: true,
        role: 'buyer',
        locations: [],
      },
    ],
  },
}

function mapListAccessToKey(accountAccess: string): ProfileAccessKey {
  const s = accountAccess.trim().toLowerCase()
  if (s === 'staff') return 'staff'
  if (s === 'site lead') return 'site_lead'
  if (s.includes('area')) return 'area_lead'
  if (s === 'admin') return 'admin'
  if (s === 'owner') return 'owner'
  return 'staff'
}

function parseAppsFromList(appsCsv: string): string[] {
  const parts = appsCsv.split(',').map((p) => p.trim().toLowerCase())
  return X_SERIES_APP_TEMPLATES.filter((app) =>
    parts.some(
      (p) =>
        p.includes(app.listLabel.toLowerCase()) ||
        p.includes(app.id.toLowerCase()),
    ),
  ).map((app) => app.id)
}

function createDefaultApps(): ProductAppRow[] {
  return X_SERIES_APP_TEMPLATES.map((template) => ({
    id: template.id,
    shop: template.shop,
    productLine: template.productLine,
    assigned: false,
    role: '',
    locations: [],
  }))
}

function createProfileDetailForUser(user: UserProfileUser): UserProfileDetail {
  const preset = X_SERIES_PROFILES_BY_USER_ID[user.id]
  if (preset) return preset

  const [firstName = user.name, ...rest] = user.name.split(' ')
  const lastName = rest.join(' ') || ''
  const accessKey = mapListAccessToKey(user.accountAccess)
  const enabledIds = parseAppsFromList(user.apps)
  const apps: ProductAppRow[] = X_SERIES_APP_TEMPLATES.map((template) => {
    const assigned = enabledIds.includes(template.id)
    const defaultRole =
      template.id === 'retail' ? 'cashier' : template.id === 'ecom' ? 'designer' : 'buyer'
    return {
      id: template.id,
      shop: template.id === 'ecom' ? 'www.thecontinental.com' : 'The Continental',
      productLine: template.productLine,
      assigned,
      role: assigned ? defaultRole : '',
      locations:
        assigned && template.id === 'retail' ? (['ponsonby'] as string[]) : [],
    }
  })

  return {
    firstName,
    lastName,
    email: user.subtitle.includes('@')
      ? user.subtitle
      : `${user.subtitle.toLowerCase()}@continental.com`,
    summarySecondary: user.subtitle,
    accessKey,
    apps,
  }
}

function isAssignedAppConfigured(app: ProductAppRow): boolean {
  if (!app.role.trim()) return false
  if (app.id === 'retail') return app.locations.length > 0
  return true
}

export const xSeriesConfig: ProductLineConfig = {
  id: 'x-series',
  appRowThumbSrc: APP_ROW_THUMB_SRC,
  locationFieldMode: (appId) => (appId === 'retail' ? 'multi' : 'none'),
  appTemplates: X_SERIES_APP_TEMPLATES,
  appFilterOptions: X_SERIES_APP_FILTER_OPTIONS,
  users: X_SERIES_USERS,
  profilesByUserId: X_SERIES_PROFILES_BY_USER_ID,
  roleOptionsForApp: xSeriesRoleOptionsForApp,
  locationOptionsSection: RETAIL_LOCATION_OPTIONS_SECTION,
  appSupportsLocations: (appId) => appId === 'retail',
  parseAppsFromList,
  createDefaultApps,
  createProfileDetailForUser,
  locationLabels: xSeriesLocationLabels,
  roleLabelFor: xSeriesRoleLabelFor,
  isAssignedAppConfigured,
}
