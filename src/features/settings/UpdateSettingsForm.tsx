import { Form } from '@/ui/Form'
import { FormRow } from '@/ui/FormRow'
import { Input } from '@/ui/Input'
import { Spinner } from '@/ui/Spinner'

import { useSettings } from './useSettings'
import { useUpdateSetting } from './useUpdateSetting'

enum FormFields {
  MIN_NIGHTS = 'minBookingLength',
  MAX_NIGHTS = 'maxBookingLength',
  MAX_GUESTS = 'maxGuestsPerBooking',
  BREAKFAST_PRICE = 'breakfastPrice',
}

export function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
    // * We expect the settings to be there, but if not, we use empty objects This is a workaround for a typescript limitation. Without this, TS would complain that the destructured properties do not exist on the type of the settings object.
  } = useSettings()

  const { isUpdating, updateSetting } = useUpdateSetting()

  if (isLoading) return <Spinner />

  const handleUpdate = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (!value) return
    updateSetting({ [e.target.id]: Number(value) })
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id={FormFields.MIN_NIGHTS}
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={handleUpdate}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id={FormFields.MAX_NIGHTS}
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={handleUpdate}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id={FormFields.MAX_GUESTS}
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdating}
          onBlur={handleUpdate}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id={FormFields.BREAKFAST_PRICE}
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={handleUpdate}
        />
      </FormRow>
    </Form>
  )
}
