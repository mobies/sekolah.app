'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import { createAdminClient } from '@/utils/supabase/admin'

export async function addUserAction(formData: FormData) {
  const fullName = formData.get('fullName') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const role = formData.get('role') as string

  if (!fullName || !email || !password || !role) {
    return { error: 'Semua kolom wajib diisi.' }
  }

  const supabase = await createClient()

  // 1. Dapatkan info admin yang sedang login untuk mengambil school_id
  const { data: { user: adminUser } } = await supabase.auth.getUser()
  if (!adminUser) return { error: 'Admin tidak terautentikasi.' }

  const { data: adminProfile } = await supabase
    .from('profiles')
    .select('school_id')
    .eq('id', adminUser.id)
    .single()
  
  if (!adminProfile?.school_id) return { error: 'Admin tidak terkait dengan sekolah manapun.' }

  const supabaseAdmin = createAdminClient()

  // 2. Buat user baru menggunakan Admin Client
  const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // Otomatis konfirmasi, user bisa langsung login
    user_metadata: {
      full_name: fullName,
      role: role
    }
  })

  if (createError) {
    return { error: `Gagal membuat pengguna: ${createError.message}` }
  }

  // 3. Update profil user baru dengan school_id dari admin
  const { error: updateError } = await supabaseAdmin
    .from('profiles')
    .update({ school_id: adminProfile.school_id })
    .eq('id', newUser.user.id)
    
  if (updateError) {
    // Optional: Hapus user yang sudah terlanjur dibuat jika gagal update
    await supabaseAdmin.auth.admin.deleteUser(newUser.user.id)
    return { error: `Gagal mengaitkan pengguna ke sekolah: ${updateError.message}` }
  }

  // 4. Ambil data lengkap user yang baru dibuat untuk dikirim kembali ke client
  const { data: finalUser } = await supabase
    .from('profiles')
    .select('id, full_name, role, created_at, users(email)')
    .eq('id', newUser.user.id)
    .single()

  revalidatePath('/dashboard/pengguna') // Refresh data di halaman tabel
  return { 
    success: true, 
    newUser: { ...finalUser, email: (finalUser?.users as any)?.email } 
  }
}
