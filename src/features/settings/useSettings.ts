import { useQuery } from '@tanstack/react-query'

import { getSettings } from '@/services/apiSettings'
import { QueryKey } from '@/utils/type'

export function useSettings() {
  const { isLoading, data: settings } = useQuery({
    queryKey: [QueryKey.Settings],
    queryFn: getSettings,
  })

  return { isLoading, settings }
}
