import type {
  AppTemplate,
  ProductAppRow,
  ProfileAccessKey,
  UserProfileDetail,
  UserRow,
} from '../config/types'

export type WizardAccessKey = 'staff' | 'site_lead' | 'area_lead' | 'admin'

export type CreateUserFromWizardInput = {
  existingUsers: UserRow[]
  appTemplates: AppTemplate[]
  firstName: string
  lastName: string
  email: string
  accountMode: 'invite' | 'credentials'
  username: string
  accessKey: WizardAccessKey
  apps: ProductAppRow[]
}

export type CreatedUserResult = {
  row: UserRow
  profile: UserProfileDetail
}

function nextUserId(existingUsers: UserRow[]): string {
  const numericIds = existingUsers
    .map((u) => Number(u.id))
    .filter((n) => !Number.isNaN(n))
  const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0
  return String(maxId + 1)
}

export function formatAssignedAppsForList(
  apps: ProductAppRow[],
  appTemplates: AppTemplate[],
): string {
  const assignedIds = new Set(apps.filter((a) => a.assigned).map((a) => a.id))
  const labels = appTemplates
    .filter((t) => assignedIds.has(t.id))
    .map((t) => t.listLabel)
  return labels.length > 0 ? labels.join(', ') : '—'
}

const ACCESS_LIST_LABEL: Record<WizardAccessKey, string> = {
  staff: 'Staff',
  site_lead: 'Site lead',
  area_lead: 'Area Lead',
  admin: 'Admin',
}

export function createUserFromWizard(input: CreateUserFromWizardInput): CreatedUserResult {
  const firstName = input.firstName.trim()
  const lastName = input.lastName.trim()
  const name = `${firstName} ${lastName}`.trim() || 'New user'
  const subtitle =
    input.accountMode === 'invite'
      ? input.email.trim()
      : input.username.trim()
  const email =
    input.accountMode === 'invite'
      ? input.email.trim()
      : input.email.trim() || `${input.username.trim()}@example.com`

  const apps = input.apps.map((a) => ({
    ...a,
    locations: [...a.locations],
  }))

  const row: UserRow = {
    id: nextUserId(input.existingUsers),
    name,
    subtitle,
    apps: formatAssignedAppsForList(apps, input.appTemplates),
    accountAccess: ACCESS_LIST_LABEL[input.accessKey],
    lastActive: '—',
    enabled: true,
  }

  const profile: UserProfileDetail = {
    firstName,
    lastName,
    email,
    summarySecondary: subtitle,
    accessKey: input.accessKey as ProfileAccessKey,
    apps,
  }

  return { row, profile }
}
