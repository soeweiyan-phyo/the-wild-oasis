import { useQuery } from '@tanstack/react-query'

import { SupabaseTable } from '@/utils/type'
import { getCabins } from '@/services/apiCabins'

export function useCabins() {
  const { isLoading, data: cabins } = useQuery({
    queryKey: [SupabaseTable.Cabins],
    queryFn: getCabins,
  })

  return {
    isLoading,
    cabins,
  }
}
