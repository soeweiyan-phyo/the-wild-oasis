import { supabase } from './supabase'

import { SupabaseTable, type Cabin } from '@/utils/type'

// TODO: validate api responses

/**
 * Get all cabins from the database
 */
export const getCabins = async (): Promise<Cabin[]> => {
  const { data, error } = await supabase.from(SupabaseTable.Cabins).select('*')

  if (error) {
    console.error(error)
    throw new Error('Cabins could not be loaded')
  }

  return data
}

/**
 * Create a new cabin in the database
 */
export const createCabin = async (
  newCabin: Omit<Cabin, 'id' | 'created_at' | 'image'>
): Promise<Cabin[]> => {
  const { data, error } = await supabase
    .from('cabins')
    .insert([
      {
        name: newCabin.name,
        maxCapacity: newCabin.maxCapacity,
        regularPrice: newCabin.regularPrice,
        discount: newCabin.discount,
        description: newCabin.description,
        image: null,
      },
    ])
    .select()

  if (error) {
    console.error(error)
    throw new Error('Cabin could not be created')
  }

  return data
}

/**
 * Delete a cabin from the database
 */
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
