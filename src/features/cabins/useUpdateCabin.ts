import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { createOrUpdateCabin } from '@/services/apiCabins'
import { SupabaseTable, type CabinFormData } from '@/utils/type'

/**
 * A hook that provides functionality for updating a cabin.
 */
export function useUpdateCabin() {
  const queryClient = useQueryClient()

  const { isPending: isUpdating, mutate: updateCabin } = useMutation({
    mutationFn: ({ cabinData, id }: { cabinData: CabinFormData; id: number }) =>
      createOrUpdateCabin(cabinData, id),
    onSuccess: () => {
      toast.success('Cabin successfully updated')
      queryClient.invalidateQueries({
        queryKey: [SupabaseTable.Cabins],
      })
    },
    onError: (error) => {
      toast.error(error?.message)
    },
  })

  return { isUpdating, updateCabin }
}
