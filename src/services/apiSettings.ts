import { supabase } from './supabase'

import type { Setting } from '@/utils/type'

export async function getSettings(): Promise<Setting> {
  const { data, error } = await supabase.from('settings').select('*').single()

  if (error) {
    console.error(error)
    throw new Error('Settings could not be loaded')
  }

  return data
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(
  newSetting: Partial<Omit<Setting, 'id' | 'created_at'>>
): Promise<Setting> {
  const { data, error } = await supabase
    .from('settings')
    .update(newSetting)
    // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .eq('id', 1)
    .single()

  if (error) {
    console.error(error)
    throw new Error('Settings could not be updated')
  }

  return data
}
