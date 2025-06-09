import { useForm } from 'react-hook-form'

import { Input } from '@/ui/Input'
import { Form } from '@/ui/Form'
import { Button } from '@/ui/Button'
import { FileInput } from '@/ui/FileInput'
import { Textarea } from '@/ui/Textarea'
import { FormRow } from '@/ui/FormRow'

import { useCreateCabin } from './useCreateCabin'
import { useUpdateCabin } from './useUpdateCabin'

import { type Cabin } from '@/utils/type'

type FormInputs = Omit<Cabin, 'id' | 'created_at' | 'image'> & {
  image: File[] | string
}

enum FormFields {
  NAME = 'name',
  MAX_CAPACITY = 'maxCapacity',
  REGULAR_PRICE = 'regularPrice',
  DISCOUNT = 'discount',
  DESCRIPTION = 'description',
  IMAGE = 'image',
}

export interface CreateCabinFormProps {
  cabinToEdit?: Cabin
  onCloseModal?: () => void
}

/**
 * A component that displays a form for creating or editing a cabin.
 */
export function CreateCabinForm(props: CreateCabinFormProps) {
  const { cabinToEdit, onCloseModal } = props

  const isEditSession = Boolean(cabinToEdit?.id)

  const { isCreating, createCabin } = useCreateCabin()
  const { isUpdating, updateCabin } = useUpdateCabin()

  const isWorking = isCreating || isUpdating

  // Form
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues:
      isEditSession && cabinToEdit
        ? {
            name: cabinToEdit.name,
            maxCapacity: cabinToEdit.maxCapacity,
            regularPrice: cabinToEdit.regularPrice,
            discount: cabinToEdit.discount,
            description: cabinToEdit.description,
            image: cabinToEdit.image,
          }
        : {},
  })

  /**
   * Handles form submission for creating or updating a cabin.
   * - When editing, preserves the existing image if it's a URL
   * - When creating, expects a file for the image
   */
  const onSubmit = (data: FormInputs) => {
    // * Image has required validation
    // If editing, use the existing image
    const image = typeof data.image === 'string' ? data.image : data.image[0]
    if (!image) return

    // Edit cabin - image is url
    if (isEditSession && cabinToEdit && typeof image === 'string') {
      updateCabin(
        {
          cabinData: { ...data, image },
          id: cabinToEdit.id!,
        },
        {
          // Reset form with edited data
          onSuccess: (data) => {
            reset(data)
            onCloseModal?.()
          },
        }
      )
    }
    // Create cabin - image is file
    else {
      createCabin(
        { ...data, image },
        {
          // Reset form
          onSuccess: () => {
            reset()
            onCloseModal?.()
          },
        }
      )
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      $type={onCloseModal ? 'modal' : 'default'}
    >
      <FormRow
        label="Cabin name"
        error={errors.name?.message}
      >
        <Input
          type="text"
          id={FormFields.NAME}
          disabled={isWorking}
          {...register(FormFields.NAME, {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        error={errors.maxCapacity?.message}
      >
        <Input
          type="number"
          id={FormFields.MAX_CAPACITY}
          disabled={isWorking}
          {...register(FormFields.MAX_CAPACITY, {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity must be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        error={errors.regularPrice?.message}
      >
        <Input
          type="number"
          id={FormFields.REGULAR_PRICE}
          disabled={isWorking}
          {...register(FormFields.REGULAR_PRICE, {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Price must be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Discount"
        error={errors.discount?.message}
      >
        <Input
          type="number"
          id={FormFields.DISCOUNT}
          defaultValue={0}
          disabled={isWorking}
          {...register(FormFields.DISCOUNT, {
            required: 'This field is required',
            validate: (value) => {
              return (
                // * Input value is string, so we need to convert it to number
                +value < +getValues(FormFields.REGULAR_PRICE) ||
                'Discount must be less than regular price'
              )
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors.description?.message}
      >
        <Textarea
          defaultValue=""
          id={FormFields.DESCRIPTION}
          disabled={isWorking}
          {...register(FormFields.DESCRIPTION, {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow
        label="Cabin photo"
        error={errors.image?.message}
      >
        <FileInput
          id={FormFields.IMAGE}
          accept="image/*"
          disabled={isWorking}
          {...register(FormFields.IMAGE, {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isWorking}
        >
          {isEditSession ? 'Edit cabin' : 'Add new cabin'}
        </Button>
      </FormRow>
    </Form>
  )
}
