import { useQuery } from '@tanstack/react-query'

import { getSettings } from '@/services/apiSettings'
import { SupabaseTable } from '@/utils/type'

export function useSettings() {
  const { isLoading, data: settings } = useQuery({
    queryKey: [SupabaseTable.Settings],
    queryFn: getSettings,
  })

  return { isLoading, settings }
}
