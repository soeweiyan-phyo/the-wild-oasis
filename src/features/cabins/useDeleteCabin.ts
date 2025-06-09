import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { deleteCabin as deleteCabinApi } from '@/services/apiCabins'
import { SupabaseTable } from '@/utils/type'

/**
 * A hook that provides functionality for deleting a cabin.
 */
export function useDeleteCabin() {
  const queryClient = useQueryClient()

  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success('Cabin deleted successfully')
      queryClient.invalidateQueries({
        queryKey: [SupabaseTable.Cabins],
      })
    },
    onError: (error) => {
      toast.error(error?.message)
    },
  })

  return { isDeleting, deleteCabin }
}
