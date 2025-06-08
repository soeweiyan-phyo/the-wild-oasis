import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { deleteCabin as deleteCabinApi } from '@/services/apiCabins'
import { QueryKey } from '@/utils/type'

export function useDeleteCabin() {
  const queryClient = useQueryClient()

  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success('Cabin deleted successfully')
      queryClient.invalidateQueries({
        queryKey: [QueryKey.Cabins],
      })
    },
    onError: (error) => {
      toast.error(error?.message)
    },
  })

  return { isDeleting, deleteCabin }
}
