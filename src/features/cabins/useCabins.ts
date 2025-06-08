import { useQuery } from '@tanstack/react-query'

import { QueryKey } from '@/utils/type'
import { getCabins } from '@/services/apiCabins'

export function useCabins() {
  const { isLoading, data: cabins } = useQuery({
    queryKey: [QueryKey.Cabins],
    queryFn: getCabins,
  })

  return {
    isLoading,
    cabins,
  }
}
