import type { ProductAppRow, ProductLineConfig } from '../config/types'
import {
  Checkbox,
  Field,
  Input,
  MultiSelect,
  Select,
} from '@lightspeed/unified-components-helios-theme/react'

function locationMode(productLine: ProductLineConfig, appId: string): 'multi' | 'none' {
  if (productLine.locationFieldMode) {
    const mode = productLine.locationFieldMode(appId)
    return mode === 'multi' ? 'multi' : 'none'
  }
  return productLine.appSupportsLocations(appId) ? 'multi' : 'none'
}

export type ProductAppAssignmentFieldsProps = {
  app: ProductAppRow
  productLine: ProductLineConfig
  fieldIdPrefix: string
  onChange: (next: ProductAppRow) => void
  includeEcomMarketing?: boolean
}

export function ProductAppAssignmentFields({
  app,
  productLine,
  fieldIdPrefix,
  onChange,
  includeEcomMarketing,
}: ProductAppAssignmentFieldsProps) {
  const locMode = locationMode(productLine, app.id)
  const supportsPin = productLine.appSupportsPin?.(app.id) ?? false

  return (
  <>
      <div className="flex flex-wrap gap-4">
        <div className={locMode === 'none' ? 'min-w-[200px] w-full flex-1' : 'min-w-[200px] flex-1'}>
          <Field labelSlot="Role" required size="medium">
            <Select
              size="medium"
              labelLayout="outside"
              placeholder="Select role"
              options={[...productLine.roleOptionsForApp(app.id, { includeEcomMarketing })]}
              value={app.role === '' ? undefined : app.role}
              onChange={(opt) => onChange({ ...app, role: opt?.value ?? '' })}
            />
          </Field>
        </div>
        {locMode === 'multi' ? (
          <div className="min-w-[200px] flex-1">
            <Field labelSlot="Locations" required size="medium">
              <MultiSelect
                id={`${fieldIdPrefix}-${app.id}-locations`}
                size="medium"
                options={productLine.locationOptionsSection}
                value={app.locations}
                placeholder="Select locations"
                onChange={(vals) => onChange({ ...app, locations: vals })}
              />
            </Field>
          </div>
        ) : null}
      </div>

      {supportsPin ? (
        <div className="flex w-full flex-col gap-4">
          <Checkbox
            size="medium"
            checked={Boolean(app.useUniquePin)}
            labelSlot="Set a unique PIN for each employee."
            onChange={(checked) =>
              onChange({
                ...app,
                useUniquePin: checked,
                pin: checked ? app.pin : '',
                pinConfirm: checked ? app.pinConfirm : '',
              })
            }
            customClasses={{
              container: ['items-center'],
              control: ['items-center', 'gap-2'],
            }}
          />
          {app.useUniquePin ? (
            <div className="flex flex-wrap gap-4">
              <div className="min-w-[200px] flex-1">
                <Field labelSlot="Enter PIN" required size="medium">
                  <Input
                    size="medium"
                    type="password"
                    value={app.pin ?? ''}
                    placeholder="Enter PIN"
                    onChange={(value) => onChange({ ...app, pin: value })}
                    autocomplete="new-password"
                  />
                </Field>
              </div>
              <div className="min-w-[200px] flex-1">
                <Field labelSlot="Confirm PIN" required size="medium">
                  <Input
                    size="medium"
                    type="password"
                    value={app.pinConfirm ?? ''}
                    placeholder="Confirm PIN"
                    onChange={(value) => onChange({ ...app, pinConfirm: value })}
                    autocomplete="new-password"
                  />
                </Field>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  )
}

export function clearedAppAssignment(): Pick<
  ProductAppRow,
  'assigned' | 'role' | 'locations' | 'useUniquePin' | 'pin' | 'pinConfirm'
> {
  return {
    assigned: false,
    role: '',
    locations: [],
    useUniquePin: false,
    pin: '',
    pinConfirm: '',
  }
}
