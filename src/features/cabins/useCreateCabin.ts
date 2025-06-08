import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { createOrUpdateCabin } from '@/services/apiCabins'
import { QueryKey } from '@/utils/type'

export function useCreateCabin() {
  const queryClient = useQueryClient()

  // Create cabin
  const { isPending: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createOrUpdateCabin,
    onSuccess: () => {
      toast.success('Cabin created successfully')
      queryClient.invalidateQueries({
        queryKey: [QueryKey.Cabins],
      })
    },
    onError: (error) => {
      toast.error(error?.message)
    },
  })

  return { isCreating, createCabin }
}
