import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { createOrEditCabin } from '@/services/apiCabins'
import { QueryKey, type CabinFormData } from '@/utils/type'

export function useEditCabin() {
  const queryClient = useQueryClient()

  const { isPending: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ cabinData, id }: { cabinData: CabinFormData; id: number }) =>
      createOrEditCabin(cabinData, id),
    onSuccess: () => {
      toast.success('Cabin edited successfully')
      queryClient.invalidateQueries({
        queryKey: [QueryKey.Cabins],
      })
    },
    onError: (error) => {
      toast.error(error?.message)
    },
  })

  return { isEditing, editCabin }
}
