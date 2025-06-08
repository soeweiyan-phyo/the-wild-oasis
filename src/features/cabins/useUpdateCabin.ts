import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { createOrUpdateCabin } from '@/services/apiCabins'
import { QueryKey, type CabinFormData } from '@/utils/type'

export function useUpdateCabin() {
  const queryClient = useQueryClient()

  const { isPending: isUpdating, mutate: updateCabin } = useMutation({
    mutationFn: ({ cabinData, id }: { cabinData: CabinFormData; id: number }) =>
      createOrUpdateCabin(cabinData, id),
    onSuccess: () => {
      toast.success('Cabin successfully updated')
      queryClient.invalidateQueries({
        queryKey: [QueryKey.Cabins],
      })
    },
    onError: (error) => {
      toast.error(error?.message)
    },
  })

  return { isUpdating, updateCabin }
}
