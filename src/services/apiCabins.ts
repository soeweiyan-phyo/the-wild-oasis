import { supabase } from './supabase'

import { SupabaseTable, type Cabin } from '@/utils/type'

export const getCabins = async (): Promise<Cabin[]> => {
  const { data, error } = await supabase.from(SupabaseTable.Cabins).select('*')

  if (error) {
    console.error(error)
    throw new Error('Cabins could not be loaded')
  }

  return data
}

export const deleteCabin = async (id: number) => {
  const { error } = await supabase
    .from(SupabaseTable.Cabins)
    .delete()
    .eq('id', id)

  if (error) {
    console.error(error)
    throw new Error('Cabin could not be deleted')
  }
}
