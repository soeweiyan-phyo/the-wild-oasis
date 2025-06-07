import styled from 'styled-components'
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

const FormRow2 = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`

const Label = styled.label`
  font-weight: 500;
`

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`

type FormInputs = Omit<Cabin, 'id' | 'created_at' | 'image'>

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

  function onSubmit(data: FormInputs) {
    mutate(data)
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
