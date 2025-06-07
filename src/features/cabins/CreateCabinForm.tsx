import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { QueryKey, type Cabin } from '@/utils/type'
import { Input } from '@/ui/Input'
import { Form } from '@/ui/Form'
import { Button } from '@/ui/Button'
import { FileInput } from '@/ui/FileInput'
import { Textarea } from '@/ui/Textarea'
import { createCabin } from '@/services/apiCabins'
import { FormRow } from '@/ui/FormRow'

type FormInputs = Omit<Cabin, 'id' | 'created_at' | 'image'> & { image: File[] }

enum FormFields {
  NAME = 'name',
  MAX_CAPACITY = 'maxCapacity',
  REGULAR_PRICE = 'regularPrice',
  DISCOUNT = 'discount',
  DESCRIPTION = 'description',
  IMAGE = 'image',
}

export function CreateCabinForm() {
  const queryClient = useQueryClient()

  const { isPending: isCreating, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('Cabin created successfully')
      queryClient.invalidateQueries({
        queryKey: [QueryKey.Cabins],
      })
      reset()
    },
    onError: (error) => {
      toast.error(error?.message)
    },
  })

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormInputs>()

  const onSubmit = (data: FormInputs) => {
    // * Image has required validation
    const image = data.image[0]
    if (!image) return

    mutate({
      ...data,
      image,
    })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Cabin name"
        error={errors.name?.message}
      >
        <Input
          type="text"
          id={FormFields.NAME}
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          // TODO: there might be some use later
          // type="number"
          defaultValue=""
          id={FormFields.DESCRIPTION}
          disabled={isCreating}
          {...register(FormFields.DESCRIPTION, {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id={FormFields.IMAGE}
          accept="image/*"
          disabled={isCreating}
          {...register(FormFields.IMAGE, {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isCreating}
        >
          Add cabin
        </Button>
      </FormRow>
    </Form>
  )
}
