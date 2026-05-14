import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function POST(req: Request) {
  const supabase = await createClient()

  // Check if a user's session exists
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    await supabase.auth.signOut()
  }

  return redirect('/login')
}
