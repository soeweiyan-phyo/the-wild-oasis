import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cpnqnentvbgocyjbljgd.supabase.co'

const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwbnFuZW50dmJnb2N5amJsamdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2NTA2NzcsImV4cCI6MjA2NDIyNjY3N30.mrY5g6CjtsJpNQmCd3vRdKLtrROl8OoRcECFxryZ_qk'

export const supabase = createClient(supabaseUrl, supabaseKey)
