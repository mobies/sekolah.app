'use server'

import { createClient } from '@/utils/supabase/server'
import { createAdminClient } from '@/utils/supabase/admin'

export async function registerSchoolAction(formData: FormData) {
  // 1. Ekstrak Data
  const turnstileToken = formData.get('turnstileToken') as string
  const schoolName = formData.get('schoolName') as string
  const subdomain = formData.get('subdomain') as string
  const fullName = formData.get('fullName') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!turnstileToken || !schoolName || !subdomain || !fullName || !email || !password) {
    return { error: 'Semua kolom wajib diisi.' }
  }

  // 2. Verifikasi Turnstile ke Cloudflare
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA' // Dummy secret
  const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${turnstileSecret}&response=${turnstileToken}`,
  })
  
  const verifyData = await verifyRes.json()
  if (!verifyData.success) {
    return { error: 'Verifikasi keamanan gagal. Silakan coba lagi.' }
  }

  // 3. Inisialisasi Supabase Clients
  const supabase = await createClient() // Untuk Auth (Standard)
  let supabaseAdmin;
  
  try {
    supabaseAdmin = createAdminClient() // Untuk Bypass RLS (Bikin Sekolah & Update Profil)
  } catch (err: any) {
    return { error: 'Konfigurasi Server belum lengkap (Service Role Key belum diatur).' }
  }

  // 4. Cek ketersediaan subdomain
  const { data: existingSchool } = await supabaseAdmin
    .from('schools')
    .select('id')
    .eq('subdomain', subdomain.toLowerCase())
    .single()

  if (existingSchool) {
    return { error: 'Subdomain ini sudah digunakan oleh sekolah lain.' }
  }

  // 5. Daftarkan User via Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role: 'SCHOOL_ADMIN' // Akan ditangkap oleh Trigger di Database
      }
    }
  })

  if (authError) return { error: authError.message }
  if (!authData.user) return { error: 'Gagal membuat pengguna baru.' }

  // 6. Buat Tenant / Sekolah Baru
  const { data: school, error: schoolError } = await supabaseAdmin
    .from('schools')
    .insert({
      name: schoolName,
      subdomain: subdomain.toLowerCase()
    })
    .select()
    .single()

  if (schoolError) return { error: 'Berhasil buat user, tetapi gagal mendaftarkan data sekolah: ' + schoolError.message }

  // 7. Update Profil (Kaitkan user dengan sekolah yang baru dibuat)
  const { error: updateProfileError } = await supabaseAdmin
    .from('profiles')
    .update({ school_id: school.id })
    .eq('id', authData.user.id)

  if (updateProfileError) return { error: 'Gagal mengaitkan profil dengan sekolah.' }

  return { success: true, message: 'Sekolah berhasil didaftarkan! Silakan cek email Anda untuk konfirmasi.' }
}
