// Supabase tables
export enum SupabaseTable {
  Cabins = 'cabins',
  Bookings = 'bookings',
  Guests = 'guests',
  Settings = 'settings',
}

// React query keys
export enum QueryKey {
  Cabins = SupabaseTable.Cabins,
  Bookings = SupabaseTable.Bookings,
  Guests = SupabaseTable.Guests,
  Settings = SupabaseTable.Settings,
}

// API response
export interface Cabin {
  id: number
  created_at: string
  name: string
  maxCapacity: number
  regularPrice: number
  discount: number
  description: string
  image: string
}

export type CabinFormData = Omit<Cabin, 'id' | 'created_at' | 'image'> & {
  image: string | File
}
