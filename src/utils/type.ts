// Supabase
export const enum SupabaseTable {
  Cabins = 'cabins',
  Bookings = 'bookings',
  Guests = 'guests',
  Settings = 'settings',
}

export const enum SupabaseBucket {
  Cabins = 'cabins',
  Avatars = 'avatars',
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

export interface Setting {
  id: number
  created_at: string
  minBookingLength: number
  maxBookingLength: number
  maxGuestsPerBooking: number
  breakfastPrice: number
}

// Modal
export const enum ModalWindows {
  CabinForm = 'cabin-form',
}
