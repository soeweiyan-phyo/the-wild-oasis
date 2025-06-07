import { supabase, supabaseUrl } from './supabase'

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
  newCabin: Omit<Cabin, 'id' | 'created_at' | 'image'> & { image: File }
): Promise<Cabin[]> => {
  // Upload image
  // Replace forward slashes so that new directories are not created
  const imageName = `${Math.random()}-${newCabin.name}`.replace(/\//g, '-')
  const imageUrl = `${supabaseUrl}/storage/v1/object/public/cabins//${imageName}`

  const { error: storageError } = await supabase.storage
    .from('cabins')
    .upload(imageName, newCabin.image)

  if (storageError) {
    console.error(storageError)
    throw new Error(
      'Cabin image could not be uploaded and cabin was not created'
    )
  }

  // Create cabin
  const { data, error } = await supabase
    .from('cabins')
    .insert([
      {
        name: newCabin.name,
        maxCapacity: newCabin.maxCapacity,
        regularPrice: newCabin.regularPrice,
        discount: newCabin.discount,
        description: newCabin.description,
        image: imageUrl,
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
