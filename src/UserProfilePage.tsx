import { useMemo, useState } from 'react'
import { AppRowThumbnail } from './components/AppRowThumbnail'
import {
  clearedAppAssignment,
  ProductAppAssignmentFields,
} from './components/ProductAppAssignmentFields'
import type { ProductAppRow, ProfileAccessKey, UserProfileUser } from './config/types'
import { useProductLine } from './context/ProductLineContext'
import {
  Badge,
  Button,
  Card,
  CardStack,
  Field,
  IconArrowBackIosNew20,
  IconDelete20,
  IconUpload20,
  Input,
  Link,
  MediaLeftBlockLayout,
  UserThumbnail,
} from '@lightspeed/unified-components-helios-theme/react'

export type { UserProfileUser }

const PROFILE_ACCESS_OPTIONS: {
  value: ProfileAccessKey
  title: string
  description: string
  defaultBadge?: boolean
}[] = [
  {
    value: 'staff',
    title: 'Staff',
    description: 'Can update their own profile and password only.',
    defaultBadge: true,
  },
  {
    value: 'site_lead',
    title: 'Site lead',
    description:
      'Can manage Staff with the same applications, within their assigned locations.',
  },
  {
    value: 'area_lead',
    title: 'Area lead',
    description:
      'Can manage Site lead and Staff with the same applications, across all locations.',
  },
  {
    value: 'admin',
    title: 'Admin',
    description:
      'Can manage all users, applications, and locations (except Owners).',
  },
]

const PROFILE_ACCESS_TITLE = Object.fromEntries(
  PROFILE_ACCESS_OPTIONS.map(({ value, title }) => [value, title]),
) as Record<ProfileAccessKey, string>

const APP_CARD_CONTENT_CLASSES = ['flex', 'flex-col', 'gap-4'] as const

export type UserProfilePageProps = {
  user: UserProfileUser
  onBack: () => void
}

export function UserProfilePage({ user, onBack }: UserProfilePageProps) {
  const productLine = useProductLine()
  const seed = useMemo(
    () => productLine.createProfileDetailForUser(user),
    [productLine, user],
  )

  const [firstName, setFirstName] = useState(seed.firstName)
  const [lastName, setLastName] = useState(seed.lastName)
  const [email, setEmail] = useState(seed.email)
  const [accessKey, setAccessKey] = useState<ProfileAccessKey>(seed.accessKey)
  const [apps, setApps] = useState<ProductAppRow[]>(() =>
    seed.apps.map((a) => ({ ...a, locations: [...a.locations] })),
  )

  const fullName = `${firstName} ${lastName}`.trim() || user.name
  const includeEcomMarketing = user.id === '4'

  const accessHeadingId = 'user-profile-access-heading'

  return (
    <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-10 px-4 pb-12 font-general sm:px-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="relative flex min-h-11 max-w-[640px] flex-col gap-1">
          <div className="relative flex min-h-11 items-center">
            <Button
              type="button"
              appearance="ghost"
              size="medium"
              onClick={onBack}
              aria-label="Back to users"
              customClasses={{
                container: [
                  'absolute',
                  'right-full',
                  'top-1/2',
                  '-translate-y-1/2',
                  'mr-2',
                  'shrink-0',
                  'w-11',
                  'min-w-11',
                ],
              }}
            >
              <IconArrowBackIosNew20 aria-hidden />
            </Button>
            <h2 className="typography-heading-lg">{fullName}</h2>
          </div>
          <p className="typography-body-md text-neutral-default">
            Manage users across all your products
          </p>
        </div>
        <Button
          type="button"
          appearance="primary"
          size="medium"
          onClick={onBack}
          customClasses={{ container: ['shrink-0', 'self-start'] }}
        >
          Save
        </Button>
      </div>

      <section className="flex flex-col gap-6 sm:flex-row sm:gap-10">
        <div className="flex w-full shrink-0 flex-col gap-1.5 sm:max-w-[320px]">
          <h2 className="typography-heading-sm">Details</h2>
          <p className="typography-body-sm text-neutral-default">Personal and contact information.</p>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <Card
            appearance="neutral"
            size="medium"
            customClasses={{
              content: [
                'flex',
                'min-w-0',
                'flex-row',
                'items-center',
                'justify-between',
                'gap-4',
              ],
            }}
          >
            <MediaLeftBlockLayout
              size="large"
              appearance="default"
              mediaSlot={<UserThumbnail size="large" userName={fullName} />}
              titleSlot={fullName}
              customClasses={{ title: ['font-bold'] }}
            >
              {PROFILE_ACCESS_TITLE[accessKey]}
            </MediaLeftBlockLayout>
            <Button
              type="button"
              appearance="ghost-primary"
              size="medium"
              prefixSlot={<IconUpload20 aria-hidden />}
              onClick={() => undefined}
              customClasses={{ container: ['shrink-0'] }}
            >
              Upload profile photo
            </Button>
          </Card>
          <div className="flex flex-wrap gap-4">
            <div className="min-w-[200px] flex-1">
              <Field labelSlot="First name" required size="medium">
                <Input
                  size="medium"
                  value={firstName}
                  onChange={setFirstName}
                  autocomplete="given-name"
                />
              </Field>
            </div>
            <div className="min-w-[200px] flex-1">
              <Field labelSlot="Last name" size="medium">
                <Input
                  size="medium"
                  value={lastName}
                  onChange={setLastName}
                  autocomplete="family-name"
                />
              </Field>
            </div>
          </div>
          <Field labelSlot="Email address" required size="medium">
            <Input
              size="medium"
              value={email}
              onChange={setEmail}
              autocomplete="email"
            />
          </Field>
        </div>
      </section>

      <hr className="border-0 border-t border-neutral-soft" />

      <section className="flex flex-col gap-6 sm:flex-row sm:gap-10">
        <div className="flex w-full shrink-0 flex-col gap-1.5 sm:max-w-[320px]">
          <h2 className="typography-heading-sm">Access level</h2>
          <p className="typography-body-sm text-neutral-default">
          Controls what this user can access.
            <Link
              href="https://design.lightspeedhq.com"
              target="_blank"
              rel="noreferrer"
              appearance="primary"
              size="medium"
            >
              Learn more about account access levels.
            </Link>
          </p>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div role="radiogroup" aria-labelledby={accessHeadingId} className="w-full">
            <span id={accessHeadingId} className="sr-only">
              Account access
            </span>
            <CardStack customClasses={{ container: ['w-full'] }}>
              {PROFILE_ACCESS_OPTIONS.map((opt) => (
                <Card
                  key={opt.value}
                  appearance="neutral"
                  size="medium"
                  customClasses={{
                    container: [
                      'w-full',
                      'min-h-0',
                      'cursor-pointer',
                      'p-0',
                      'gap-0',
                      'shadow-none',
                      'focus-within:outline',
                      'focus-within:outline-2',
                      'focus-within:outline-offset-[-2px]',
                      'focus-within:outline-border-go-default',
                      accessKey === opt.value ? '!border-go-default bg-go-highlight-default' : '',
                    ].filter(Boolean),
                    content: [
                      'mr-0',
                      'flex',
                      'w-full',
                      'flex-col',
                      'gap-1',
                      'p-6',
                      'text-left',
                      'typography-body-sm',
                    ],
                  }}
                >
                  <label htmlFor={`user-profile-access-${opt.value}`} className="flex cursor-pointer flex-col gap-1">
                    <input
                      id={`user-profile-access-${opt.value}`}
                      type="radio"
                      name="user-profile-account-access"
                      value={opt.value}
                      checked={accessKey === opt.value}
                      onChange={() => setAccessKey(opt.value)}
                      className="sr-only"
                    />
                    <span className="inline-flex flex-wrap items-center gap-2 typography-body-md-emphasized text-neutral-default">
                      {opt.title}
                      {opt.defaultBadge ? (
                        <Badge appearance="default" size="medium">
                          Default
                        </Badge>
                      ) : null}
                    </span>
                    <span className="typography-body-sm text-neutral-default">{opt.description}</span>
                  </label>
                </Card>
              ))}
            </CardStack>
          </div>
        </div>
      </section>

      <hr className="border-0 border-t border-neutral-soft" />

      <section className="flex flex-col gap-6 sm:flex-row sm:gap-10">
        <div className="flex w-full shrink-0 flex-col gap-1.5 sm:max-w-[320px]">
          <h2 className="typography-heading-sm">Applications</h2>
          <p className="typography-body-sm text-neutral-default">
            Manage user access to available Lightspeed products.
          </p>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          {apps.map((app) => (
            <Card
                key={app.id}
                appearance="neutral"
                size="medium"
                customClasses={{
                  content: [...APP_CARD_CONTENT_CLASSES],
                }}
              >
                <div className="flex flex-wrap items-center gap-4">
                  <AppRowThumbnail appId={app.id} />
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <p className="typography-body-md-emphasized text-neutral-default">{app.shop}</p>
                    <p className="typography-body-sm text-neutral-default">{app.productLine}</p>
                  </div>
                  {app.assigned ? (
                    <Button
                      type="button"
                      appearance="danger-ghost"
                      size="medium"
                      onClick={() =>
                        setApps((prev) =>
                          prev.map((a) =>
                            a.id === app.id
                              ? { ...a, ...clearedAppAssignment() }
                              : a,
                          ),
                        )
                      }
                      customClasses={{ container: ['shrink-0'] }}
                    >
                      {productLine.removeProductLabel ?? 'Remove product'}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      appearance="ghost-primary"
                      size="medium"
                      onClick={() =>
                        setApps((prev) =>
                          prev.map((a) =>
                            a.id === app.id ? {
                            ...a,
                            assigned: true,
                            role: '',
                            locations: [],
                            useUniquePin: false,
                            pin: '',
                            pinConfirm: '',
                          } : a,
                          ),
                        )
                      }
                      customClasses={{ container: ['shrink-0'] }}
                    >
                      {productLine.assignProductLabel ?? 'Assign product'}
                    </Button>
                  )}
                </div>
                {app.assigned ? (
                  <ProductAppAssignmentFields
                    app={app}
                    productLine={productLine}
                    fieldIdPrefix="user-profile-app"
                    includeEcomMarketing={includeEcomMarketing}
                    onChange={(next) =>
                      setApps((prev) => prev.map((a) => (a.id === app.id ? next : a)))
                    }
                  />
                ) : null}
              </Card>
            ))}
        </div>
      </section>

      <hr className="border-0 border-t border-neutral-soft" />

      <section className="flex flex-col gap-6 sm:flex-row sm:gap-10">
        <div className="flex w-full shrink-0 flex-col gap-1.5 sm:max-w-[320px]">
          <h2 className="typography-heading-sm">Security</h2>
          <p className="typography-body-sm text-neutral-default">
            Use a secure password to make sure your account stays safe.
          </p>
        </div>
        <div className="flex min-w-0 flex-1 flex-col items-start justify-end">
          <Button type="button" appearance="secondary" size="medium" onClick={() => undefined}>
            Change password
          </Button>
        </div>
      </section>

      <hr className="border-0 border-t border-neutral-soft" />

      <div>
        <Button
          type="button"
          appearance="danger"
          size="medium"
          prefixSlot={<IconDelete20 aria-hidden />}
          onClick={() => undefined}
        >
          Delete user
        </Button>
      </div>
    </div>
  )
}
