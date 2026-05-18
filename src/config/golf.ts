import {
  GOLF_LOCATION_OPTIONS_SECTION,
  GOLF_PIN_APP_IDS,
  GOLF_LOCATION_APP_IDS,
  golfLocationLabels,
  golfRoleLabelFor,
  golfRoleOptionsForApp,
} from './golfApps'
import type {
  AppTemplate,
  LocationFieldMode,
  ProductAppRow,
  ProductLineConfig,
  ProfileAccessKey,
  UserProfileDetail,
  UserProfileUser,
  UserRow,
} from './types'

const ICON_RETAIL_ECOM = `${import.meta.env.BASE_URL}icons/golf-retail-ecom.png`
const ICON_HOSPITALITY = `${import.meta.env.BASE_URL}icons/golf-hospitality.png`
const ICON_GOLF = `${import.meta.env.BASE_URL}icons/golf-golf.png`

export const GOLF_APP_TEMPLATES: AppTemplate[] = [
  {
    id: 'retail-r',
    listLabel: 'Retail',
    shop: 'Tee-Off Titans',
    productLine: 'Retail (R-Series)',
    thumbSrc: ICON_RETAIL_ECOM,
  },
  {
    id: 'ecom-c',
    listLabel: 'eCom',
    shop: 'Tee-Off Titans',
    productLine: 'eCom (C-Series)',
    thumbSrc: ICON_RETAIL_ECOM,
  },
  {
    id: 'hospitality-k',
    listLabel: 'Hospitality',
    shop: 'Tee-Off Titans',
    productLine: 'Hospitality (K-Series)',
    thumbSrc: ICON_HOSPITALITY,
  },
  {
    id: 'hospitality-backoffice',
    listLabel: 'Hospitality back office',
    shop: 'Tee-Off Titans',
    productLine: 'Hospitality back office (K-Series)',
    thumbSrc: ICON_HOSPITALITY,
  },
  {
    id: 'golf',
    listLabel: 'Golf',
    shop: 'Tee-Off Titans',
    productLine: 'Golf',
    thumbSrc: ICON_GOLF,
  },
]

export const GOLF_APP_FILTER_OPTIONS = GOLF_APP_TEMPLATES.map((a) => ({
  value: a.listLabel,
  label: a.listLabel,
}))

export const GOLF_USERS: UserRow[] = [
  {
    id: '1',
    name: 'Brandon Rogers',
    subtitle: 'brandon.rodgers@teeofftitans.com',
    apps: 'Retail, eCom, Golf',
    accountAccess: 'Admin',
    lastActive: 'Today',
    enabled: true,
  },
  {
    id: '2',
    name: 'Dixie Matrix',
    subtitle: 'DMatrix01',
    apps: 'Retail, Hospitality',
    accountAccess: 'Site lead',
    lastActive: '1 week ago',
    enabled: true,
  },
  {
    id: '3',
    name: 'Jenna Kahn',
    subtitle: 'JKahn01',
    apps: 'Golf',
    accountAccess: 'Staff',
    lastActive: '—',
    enabled: true,
  },
  {
    id: '4',
    name: 'John Wickershire',
    subtitle: 'john.wick@teeofftitans.com',
    apps: 'Retail, eCom, Hospitality, Hospitality back office, Golf',
    accountAccess: 'Owner',
    lastActive: 'Yesterday',
    enabled: false,
  },
  {
    id: '5',
    name: 'Sarah Turner',
    subtitle: 'sarah.turner@teeofftitans.com',
    apps: 'Hospitality, Golf',
    accountAccess: 'Area Lead',
    lastActive: 'Today',
    enabled: true,
  },
]

const GOLF_PROFILES_BY_USER_ID: Record<string, UserProfileDetail> = {
  '1': {
    firstName: 'Brandon',
    lastName: 'Rogers',
    email: 'brandon.rodgers@teeofftitans.com',
    summarySecondary: 'brandon.rodgers@teeofftitans.com',
    accessKey: 'admin',
    apps: [
      {
        id: 'retail-r',
        shop: 'Tee-Off Titans',
        productLine: 'Retail (R-Series)',
        assigned: true,
        role: 'admin',
        locations: ['naples', 'orlando'],
        useUniquePin: true,
        pin: '1234',
        pinConfirm: '1234',
      },
      {
        id: 'ecom-c',
        shop: 'Tee-Off Titans',
        productLine: 'eCom (C-Series)',
        assigned: true,
        role: 'editor',
        locations: [],
      },
      {
        id: 'hospitality-k',
        shop: 'Tee-Off Titans',
        productLine: 'Hospitality (K-Series)',
        assigned: false,
        role: '',
        locations: [],
      },
      {
        id: 'hospitality-backoffice',
        shop: 'Tee-Off Titans',
        productLine: 'Hospitality back office (K-Series)',
        assigned: false,
        role: '',
        locations: [],
      },
      {
        id: 'golf',
        shop: 'Tee-Off Titans',
        productLine: 'Golf',
        assigned: true,
        role: 'manager',
        locations: ['orlando', 'ponte vedra beach'],
      },
    ],
  },
  '2': {
    firstName: 'Dixie',
    lastName: 'Matrix',
    email: 'dmatrix@teeofftitans.com',
    summarySecondary: 'DMatrix01',
    accessKey: 'site_lead',
    apps: [
      {
        id: 'retail-r',
        shop: 'Tee-Off Titans',
        productLine: 'Retail (R-Series)',
        assigned: true,
        role: 'manager',
        locations: ['naples', 'orlando'],
        useUniquePin: false,
        pin: '',
        pinConfirm: '',
      },
      {
        id: 'ecom-c',
        shop: 'Tee-Off Titans',
        productLine: 'eCom (C-Series)',
        assigned: false,
        role: '',
        locations: [],
      },
      {
        id: 'hospitality-k',
        shop: 'Tee-Off Titans',
        productLine: 'Hospitality (K-Series)',
        assigned: true,
        role: 'waiter',
        locations: ['ponte vedra beach', 'naples'],
      },
      {
        id: 'hospitality-backoffice',
        shop: 'Tee-Off Titans',
        productLine: 'Hospitality back office (K-Series)',
        assigned: false,
        role: '',
        locations: [],
      },
      {
        id: 'golf',
        shop: 'Tee-Off Titans',
        productLine: 'Golf',
        assigned: false,
        role: '',
        locations: [],
      },
    ],
  },
  '3': {
    firstName: 'Jenna',
    lastName: 'Kahn',
    email: 'jkahn@teeofftitans.com',
    summarySecondary: 'JKahn01',
    accessKey: 'staff',
    apps: [
      {
        id: 'retail-r',
        shop: 'Tee-Off Titans',
        productLine: 'Retail (R-Series)',
        assigned: false,
        role: '',
        locations: [],
        useUniquePin: false,
        pin: '',
        pinConfirm: '',
      },
      {
        id: 'ecom-c',
        shop: 'Tee-Off Titans',
        productLine: 'eCom (C-Series)',
        assigned: false,
        role: '',
        locations: [],
      },
      {
        id: 'hospitality-k',
        shop: 'Tee-Off Titans',
        productLine: 'Hospitality (K-Series)',
        assigned: false,
        role: '',
        locations: [],
      },
      {
        id: 'hospitality-backoffice',
        shop: 'Tee-Off Titans',
        productLine: 'Hospitality back office (K-Series)',
        assigned: false,
        role: '',
        locations: [],
      },
      {
        id: 'golf',
        shop: 'Tee-Off Titans',
        productLine: 'Golf',
        assigned: true,
        role: 'assistant',
        locations: ['naples'],
      },
    ],
  },
  '4': {
    firstName: 'John',
    lastName: 'Wickershire',
    email: 'john.wick@teeofftitans.com',
    summarySecondary: 'john.wick@teeofftitans.com',
    accessKey: 'owner',
    apps: [
      {
        id: 'retail-r',
        shop: 'Tee-Off Titans',
        productLine: 'Retail (R-Series)',
        assigned: true,
        role: 'owner',
        locations: ['naples', 'orlando', 'ponte vedra beach'],
        useUniquePin: true,
        pin: '5678',
        pinConfirm: '5678',
      },
      {
        id: 'ecom-c',
        shop: 'Tee-Off Titans',
        productLine: 'eCom (C-Series)',
        assigned: true,
        role: 'admin',
        locations: [],
      },
      {
        id: 'hospitality-k',
        shop: 'Tee-Off Titans',
        productLine: 'Hospitality (K-Series)',
        assigned: true,
        role: 'manager',
        locations: ['orlando', 'naples'],
      },
      {
        id: 'hospitality-backoffice',
        shop: 'Tee-Off Titans',
        productLine: 'Hospitality back office (K-Series)',
        assigned: true,
        role: 'admin',
        locations: [],
      },
      {
        id: 'golf',
        shop: 'Tee-Off Titans',
        productLine: 'Golf',
        assigned: true,
        role: 'admin',
        locations: ['naples', 'orlando', 'ponte vedra beach'],
      },
    ],
  },
  '5': {
    firstName: 'Sarah',
    lastName: 'Turner',
    email: 'sarah.turner@teeofftitans.com',
    summarySecondary: 'sarah.turner@teeofftitans.com',
    accessKey: 'area_lead',
    apps: [
      {
        id: 'retail-r',
        shop: 'Tee-Off Titans',
        productLine: 'Retail (R-Series)',
        assigned: false,
        role: '',
        locations: [],
        useUniquePin: false,
        pin: '',
        pinConfirm: '',
      },
      {
        id: 'ecom-c',
        shop: 'Tee-Off Titans',
        productLine: 'eCom (C-Series)',
        assigned: false,
        role: '',
        locations: [],
      },
      {
        id: 'hospitality-k',
        shop: 'Tee-Off Titans',
        productLine: 'Hospitality (K-Series)',
        assigned: true,
        role: 'waiter',
        locations: ['naples', 'orlando'],
      },
      {
        id: 'hospitality-backoffice',
        shop: 'Tee-Off Titans',
        productLine: 'Hospitality back office (K-Series)',
        assigned: false,
        role: '',
        locations: [],
      },
      {
        id: 'golf',
        shop: 'Tee-Off Titans',
        productLine: 'Golf',
        assigned: true,
        role: 'assistant',
        locations: ['orlando', 'ponte vedra beach'],
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
  return GOLF_APP_TEMPLATES.filter((app) =>
    parts.some(
      (p) =>
        p.includes(app.listLabel.toLowerCase()) ||
        p.includes(app.id.toLowerCase()),
    ),
  ).map((app) => app.id)
}

function createDefaultApps(): ProductAppRow[] {
  return GOLF_APP_TEMPLATES.map((template) => ({
    id: template.id,
    shop: template.shop,
    productLine: template.productLine,
    assigned: false,
    role: '',
    locations: [],
    useUniquePin: false,
    pin: '',
    pinConfirm: '',
  }))
}

function defaultRoleForApp(appId: string): string {
  if (appId === 'retail-r') return 'associate'
  if (appId === 'ecom-c') return 'viewer'
  if (appId === 'hospitality-k' || appId === 'hospitality-backoffice') return 'waiter'
  if (appId === 'golf') return 'assistant'
  return ''
}

function defaultLocationForApp(appId: string): string {
  if (appId === 'retail-r') return 'naples'
  if (appId === 'hospitality-k') return 'orlando'
  if (appId === 'golf') return 'naples'
  return 'naples'
}

function createProfileDetailForUser(user: UserProfileUser): UserProfileDetail {
  const preset = GOLF_PROFILES_BY_USER_ID[user.id]
  if (preset) return preset

  const [firstName = user.name, ...rest] = user.name.split(' ')
  const lastName = rest.join(' ') || ''
  const accessKey = mapListAccessToKey(user.accountAccess)
  const enabledIds = parseAppsFromList(user.apps)

  const apps: ProductAppRow[] = GOLF_APP_TEMPLATES.map((template) => {
    const assigned = enabledIds.includes(template.id)
    return {
      id: template.id,
      shop: template.shop,
      productLine: template.productLine,
      assigned,
      role: assigned ? defaultRoleForApp(template.id) : '',
      locations:
        assigned && GOLF_LOCATION_APP_IDS.has(template.id)
          ? [defaultLocationForApp(template.id)]
          : [],
      useUniquePin: false,
      pin: '',
      pinConfirm: '',
    }
  })

  return {
    firstName,
    lastName,
    email: user.subtitle.includes('@')
      ? user.subtitle
      : `${user.subtitle.toLowerCase()}@teeofftitans.com`,
    summarySecondary: user.subtitle,
    accessKey,
    apps,
  }
}

function locationFieldMode(appId: string): LocationFieldMode {
  if (GOLF_LOCATION_APP_IDS.has(appId)) return 'multi'
  return 'none'
}

function isAssignedAppConfigured(app: ProductAppRow): boolean {
  if (!app.assigned || !app.role.trim()) return false
  if (GOLF_LOCATION_APP_IDS.has(app.id) && app.locations.length === 0) return false
  if (GOLF_PIN_APP_IDS.has(app.id) && app.useUniquePin) {
    if (!app.pin?.trim() || !app.pinConfirm?.trim()) return false
    if (app.pin !== app.pinConfirm) return false
  }
  return true
}

function appRowThumbSrcForApp(appId: string): string {
  return GOLF_APP_TEMPLATES.find((a) => a.id === appId)?.thumbSrc ?? ICON_RETAIL_ECOM
}

export const golfConfig: ProductLineConfig = {
  id: 'golf',
  appRowThumbSrc: ICON_RETAIL_ECOM,
  appRowThumbSrcForApp,
  appTemplates: GOLF_APP_TEMPLATES,
  appFilterOptions: GOLF_APP_FILTER_OPTIONS,
  users: GOLF_USERS,
  profilesByUserId: GOLF_PROFILES_BY_USER_ID,
  assignProductLabel: 'Assign app',
  removeProductLabel: 'Remove app',
  roleOptionsForApp: golfRoleOptionsForApp,
  locationOptionsSection: GOLF_LOCATION_OPTIONS_SECTION,
  locationFieldMode,
  appSupportsLocations: (appId) => GOLF_LOCATION_APP_IDS.has(appId),
  appSupportsPin: (appId) => GOLF_PIN_APP_IDS.has(appId),
  parseAppsFromList,
  createDefaultApps,
  createProfileDetailForUser,
  locationLabels: golfLocationLabels,
  roleLabelFor: golfRoleLabelFor,
  isAssignedAppConfigured,
}
