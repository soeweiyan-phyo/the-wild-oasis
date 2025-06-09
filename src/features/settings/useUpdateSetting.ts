import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { updateSetting as updateSettingApi } from '@/services/apiSettings'
import { SupabaseTable } from '@/utils/type'

export function useUpdateSetting() {
  const queryClient = useQueryClient()

  const { isPending: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success('Settings updated successfully')
      queryClient.invalidateQueries({
        queryKey: [SupabaseTable.Settings],
      })
    },
    onError: (error) => {
      toast.error(error?.message)
    },
  })

  return { isUpdating, updateSetting }
}
