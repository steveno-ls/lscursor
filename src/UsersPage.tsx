import { useMemo, useState } from 'react'
import { AddUserWizard, type CreatedUserResult } from './AddUserWizard'
import { useProductLine } from './context/ProductLineContext'
import type { UserProfileDetail, UserRow } from './config/types'
import { UserProfilePage } from './UserProfilePage'
import {
  Button,
  Card,
  CheckMark,
  DropdownListItem,
  FilterButton,
  FilterList,
  IconMagnifyingGlass20,
  Input,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  UserItem,
} from '@lightspeed/unified-components-helios-theme/react'

export type { UserRow }

const ACCESS_FILTER_OPTIONS = [
  { value: 'Admin', label: 'Admin' },
  { value: 'Site lead', label: 'Site lead' },
  { value: 'Staff', label: 'Staff' },
  { value: 'Owner', label: 'Owner' },
  { value: 'Area Lead', label: 'Area Lead' },
]

function isOwnerAccess(accountAccess: string): boolean {
  return accountAccess.trim().toLowerCase() === 'owner'
}

function initialEnabledById(users: UserRow[]): Record<string, boolean> {
  return Object.fromEntries(
    users.map((u) => [u.id, isOwnerAccess(u.accountAccess) ? true : u.enabled]),
  )
}

function formatMultiFilterLabel(
  base: string,
  selected: string[],
  options: { value: string; label: string }[],
): string {
  if (selected.length === 0) return base
  if (selected.length === 1) {
    const opt = options.find((o) => o.value === selected[0])
    return `${base}: ${opt?.label ?? selected[0]}`
  }
  return `${base}: multiple`
}

export function UsersPage() {
  const productLine = useProductLine()
  const { appFilterOptions } = productLine
  const [users, setUsers] = useState<UserRow[]>(() => [...productLine.users])
  const [createdProfilesByUserId, setCreatedProfilesByUserId] = useState<
    Record<string, UserProfileDetail>
  >({})
  const [profileUserId, setProfileUserId] = useState<string | null>(null)
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [appsFilter, setAppsFilter] = useState<string[]>([])
  const [accessFilter, setAccessFilter] = useState<string[]>([])
  const [enabledById, setEnabledById] = useState<Record<string, boolean>>(() =>
    initialEnabledById(productLine.users),
  )

  const handleUserCreated = (result: CreatedUserResult) => {
    setUsers((prev) => [...prev, result.row])
    setCreatedProfilesByUserId((prev) => ({ ...prev, [result.row.id]: result.profile }))
    setEnabledById((prev) => ({ ...prev, [result.row.id]: result.row.enabled }))
  }

  const handleProfileSave = (result: CreatedUserResult) => {
    setUsers((prev) => prev.map((u) => (u.id === result.row.id ? result.row : u)))
    setCreatedProfilesByUserId((prev) => ({ ...prev, [result.row.id]: result.profile }))
  }

  const appsLabel = formatMultiFilterLabel('Applications', appsFilter, appFilterOptions)
  const accessLabel = formatMultiFilterLabel('Access level', accessFilter, ACCESS_FILTER_OPTIONS)

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return users.filter((u) => {
      if (q && !u.name.toLowerCase().includes(q) && !u.subtitle.toLowerCase().includes(q)) {
        return false
      }
      if (appsFilter.length > 0 && !appsFilter.some((app) => u.apps.includes(app))) {
        return false
      }
      if (accessFilter.length > 0 && !accessFilter.includes(u.accountAccess)) {
        return false
      }
      return true
    })
  }, [users, query, appsFilter, accessFilter])

  const tableHeadSlot = (
    <Card
      appearance="neutral"
      size="medium"
      customClasses={{
        container: ['h-full', 'w-full', 'border-0', 'bg-transparent', 'p-0', 'shadow-none'],
        content: ['flex', 'flex-col', 'gap-4', 'p-0'],
      }}
    >
      <Input
        size="medium"
        placeholder="Filter users by name"
        value={query}
        onChange={setQuery}
        prefixSlot={<IconMagnifyingGlass20 aria-hidden />}
        customClasses={{ controlContainer: ['w-full'] }}
      />
      <Card
        appearance="neutral"
        size="medium"
        customClasses={{
          container: ['h-full', 'w-full', 'border-0', 'bg-transparent', 'p-0', 'shadow-none'],
          content: ['flex', 'flex-wrap', 'gap-2', 'p-0'],
        }}
      >
        <FilterButton
          size="small"
          labelSlot={appsLabel}
          displayMode="value"
          clearable
          multiple
          value={appsFilter}
          counterSlot={appsFilter.length > 1 ? `(${appsFilter.length})` : undefined}
          onClear={() => setAppsFilter([])}
          onChange={(value) => {
            if (value == null || (Array.isArray(value) && value.length === 0)) {
              setAppsFilter([])
              return
            }
            setAppsFilter(Array.isArray(value) ? value : [value])
          }}
        >
          <FilterList
            multiple
            showSelectAll
            selectAllLabel="Select all"
            options={appFilterOptions.map((o) => ({
              value: o.value,
              label: o.label,
            }))}
            renderItem={({ item, state, props }) => (
              <DropdownListItem
                {...props}
                key={item.value}
                value={item.value}
                highlighted={state.highlighted}
                disabled={state.disabled}
                prefixSlot={
                  <CheckMark checked={state.selected} indeterminate={state.indeterminate} />
                }
              >
                <span className="text-neutral-default">{item.label}</span>
              </DropdownListItem>
            )}
          />
        </FilterButton>
        <FilterButton
          size="small"
          labelSlot={accessLabel}
          displayMode="value"
          clearable
          multiple
          value={accessFilter}
          counterSlot={accessFilter.length > 1 ? `(${accessFilter.length})` : undefined}
          onClear={() => setAccessFilter([])}
          onChange={(value) => {
            if (value == null || (Array.isArray(value) && value.length === 0)) {
              setAccessFilter([])
              return
            }
            setAccessFilter(Array.isArray(value) ? value : [value])
          }}
        >
          <FilterList
            multiple
            showSelectAll
            selectAllLabel="Select all"
            options={ACCESS_FILTER_OPTIONS.map((o) => ({
              value: o.value,
              label: o.label,
            }))}
            renderItem={({ item, state, props }) => (
              <DropdownListItem
                {...props}
                key={item.value}
                value={item.value}
                highlighted={state.highlighted}
                disabled={state.disabled}
                prefixSlot={
                  <CheckMark checked={state.selected} indeterminate={state.indeterminate} />
                }
              >
                <span className="text-neutral-default">{item.label}</span>
              </DropdownListItem>
            )}
          />
        </FilterButton>
      </Card>
    </Card>
  )

  if (addUserOpen) {
    return (
      <div className="flex w-full justify-center">
        <AddUserWizard
          existingUsers={users}
          onUserCreated={handleUserCreated}
          onClose={() => setAddUserOpen(false)}
        />
      </div>
    )
  }

  const profileUser = profileUserId ? users.find((u) => u.id === profileUserId) : undefined
  if (profileUser) {
    return (
      <div className="flex w-full justify-center">
        <UserProfilePage
          user={profileUser}
          initialProfile={createdProfilesByUserId[profileUser.id]}
          onSave={handleProfileSave}
          onBack={() => setProfileUserId(null)}
        />
      </div>
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-8">
      <div className="flex w-full flex-row items-center justify-between gap-4">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h1 className='typography-heading-lg'>Users</h1>
          <p className='typography-body-md'>Manage all users across your account and Lightspeed applications.</p>
        </div>
        <Button
          appearance="primary"
          size="medium"
          onClick={() => setAddUserOpen(true)}
          customClasses={{ container: ['shrink-0', 'whitespace-nowrap'] }}
        >
          Add user
        </Button>
      </div>

        <Table
          ariaLabel="Users"
          size="default"
          striped
          interactive
          headSlot={tableHeadSlot}
          customClasses={{
            headSlot: ['flex', 'flex-col', 'gap-2', 'p-4'],
          }}
        >
          <TableHead>
            <TableRow>
              <TableHeadCell align="start">Name</TableHeadCell>
              <TableHeadCell align="start">Applications</TableHeadCell>
              <TableHeadCell align="start">Access level</TableHeadCell>
              <TableHeadCell align="start">Last active</TableHeadCell>
              <TableHeadCell align="end">Enabled</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const isOwner = isOwnerAccess(row.accountAccess)
              return (
              <TableRow key={row.id} rowKey={row.id}>
                <TableCell>
                  <button
                    type="button"
                    className="w-full cursor-pointer rounded-md text-left outline-none ring-border-go-default focus-visible:ring-2"
                    onClick={() => setProfileUserId(row.id)}
                  >
                    <UserItem
                      userName={row.name}
                      size="small"
                      customClasses={{
                        title: ['font-semibold'],
                        content: ['typography-body-xs', 'text-neutral-default'],
                      }}
                    >
                      {row.subtitle}
                    </UserItem>
                  </button>
                </TableCell>
                <TableCell customClasses={{ cell: ['typography-body-sm', 'text-neutral-default'] }}>
                  {row.apps}
                </TableCell>
                <TableCell customClasses={{ cell: ['typography-body-sm', 'text-neutral-default'] }}>
                  {row.accountAccess}
                </TableCell>
                <TableCell customClasses={{ cell: ['typography-body-sm', 'text-neutral-default'] }}>
                  {row.lastActive}
                </TableCell>
                <TableCell align="end">
                  <Switch
                    size="medium"
                    checked={isOwner ? true : enabledById[row.id]}
                    disabled={isOwner}
                    onChange={(checked) => {
                      if (isOwner) return
                      setEnabledById((prev) => ({ ...prev, [row.id]: checked }))
                    }}
                    customClasses={{ label: ['sr-only'] }}
                  >
                    {`Enabled for ${row.name}`}
                  </Switch>
                </TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>
    </div>
  )
}
