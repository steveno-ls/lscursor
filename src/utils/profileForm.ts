import type {
  AppTemplate,
  ProductAppRow,
  ProfileAccessKey,
  UserProfileDetail,
  UserProfileUser,
  UserRow,
} from '../config/types'
import { formatAssignedAppsForList } from './createUserFromWizard'

export const PROFILE_ACCESS_LIST_LABEL: Record<ProfileAccessKey, string> = {
  staff: 'Staff',
  site_lead: 'Site lead',
  area_lead: 'Area Lead',
  admin: 'Admin',
  owner: 'Owner',
}

export function cloneProfileDetail(profile: UserProfileDetail): UserProfileDetail {
  return {
    ...profile,
    apps: profile.apps.map((app) => ({
      ...app,
      locations: [...app.locations],
    })),
  }
}

function normalizeAppForCompare(app: ProductAppRow) {
  return {
    id: app.id,
    assigned: app.assigned,
    role: app.role,
    locations: [...app.locations].sort(),
    useUniquePin: Boolean(app.useUniquePin),
    pin: app.pin ?? '',
    pinConfirm: app.pinConfirm ?? '',
  }
}

export function profileDetailsEqual(a: UserProfileDetail, b: UserProfileDetail): boolean {
  if (
    a.firstName !== b.firstName ||
    a.lastName !== b.lastName ||
    a.email !== b.email ||
    a.summarySecondary !== b.summarySecondary ||
    a.accessKey !== b.accessKey
  ) {
    return false
  }
  if (a.apps.length !== b.apps.length) return false
  const appsA = a.apps.map(normalizeAppForCompare)
  const appsB = b.apps.map(normalizeAppForCompare)
  return appsA.every((app, index) => {
    const other = appsB[index]
    if (!other || app.id !== other.id) return false
    return (
      app.assigned === other.assigned &&
      app.role === other.role &&
      app.useUniquePin === other.useUniquePin &&
      app.pin === other.pin &&
      app.pinConfirm === other.pinConfirm &&
      app.locations.join(',') === other.locations.join(',')
    )
  })
}

export type ProfileFormState = {
  firstName: string
  lastName: string
  email: string
  accessKey: ProfileAccessKey
  apps: ProductAppRow[]
}

export function buildProfileDetailFromForm(
  form: ProfileFormState,
  summarySecondary: string,
): UserProfileDetail {
  return {
    firstName: form.firstName.trim(),
    lastName: form.lastName.trim(),
    email: form.email.trim(),
    summarySecondary,
    accessKey: form.accessKey,
    apps: form.apps.map((app) => ({
      ...app,
      locations: [...app.locations],
    })),
  }
}

export function buildUserRowFromProfile(
  user: UserProfileUser,
  profile: UserProfileDetail,
  appTemplates: AppTemplate[],
): UserRow {
  const name = `${profile.firstName} ${profile.lastName}`.trim() || user.name
  const subtitle = profile.email.includes('@') ? profile.email : profile.summarySecondary

  return {
    id: user.id,
    name,
    subtitle,
    apps: formatAssignedAppsForList(profile.apps, appTemplates),
    accountAccess: PROFILE_ACCESS_LIST_LABEL[profile.accessKey],
    lastActive: user.lastActive,
    enabled: user.enabled,
  }
}
