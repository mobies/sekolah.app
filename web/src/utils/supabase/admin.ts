import { createClient } from '@supabase/supabase-js'

// Admin client mem-bypass Row Level Security (RLS)
// HANYA boleh dipanggil di Server (API Routes / Server Actions), JANGAN PERNAH di Client/Browser.
export function createAdminClient() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not defined in .env.local')
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}
