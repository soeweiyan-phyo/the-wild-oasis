import { supabase, supabaseUrl } from './supabase'

import { SupabaseTable, type Cabin, type CabinFormData } from '@/utils/type'

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
 * Create a new cabin or edit an existing cabin in the database
 */
export const createOrEditCabin = async (
  newCabin: CabinFormData,
  id?: number
): Promise<Cabin> => {
  // Upload image
  // Check if image is in supabase
  const hasImagePath =
    typeof newCabin.image === 'string' && newCabin.image.startsWith(supabaseUrl)

  // Replace forward slashes so that new directories are not created
  const imageName = `${Math.random()}-${newCabin.name}`.replace(/\//g, '-')
  const imageUrl = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins//${imageName}`

  // Upload image if it is not in supabase
  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from('cabins')
      .upload(imageName, newCabin.image)

    if (storageError) {
      console.error(storageError)
      throw new Error(
        'Cabin image could not be uploaded and cabin was not created'
      )
    }
  }

  // Create or edit cabin
  let query

  const cabinData = {
    name: newCabin.name,
    maxCapacity: newCabin.maxCapacity,
    regularPrice: newCabin.regularPrice,
    discount: newCabin.discount,
    description: newCabin.description,
    image: imageUrl,
  }

  // Create cabin
  if (!id) {
    query = supabase
      .from(SupabaseTable.Cabins)
      .insert([cabinData])
      .select()
      .single()
  }

  // Edit cabin
  if (id) {
    query = supabase
      .from(SupabaseTable.Cabins)
      .update(cabinData)
      .eq('id', id)
      .select()
      .single()
  }

  if (!query) {
    throw new Error('Cabin could not be created or edited')
  }

  const { data, error } = await query

  if (error) {
    console.error(error)
    throw new Error('Cabin could not be created or edited')
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
