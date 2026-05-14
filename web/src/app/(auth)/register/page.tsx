'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { Turnstile } from '@marsidev/react-turnstile'
import { registerSchoolAction } from '@/app/actions/auth'

export default function RegisterPage() {
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMessage(null)
    
    if (!turnstileToken) {
      setMessage({ type: 'error', text: 'Mohon selesaikan verifikasi keamanan (CAPTCHA) terlebih dahulu.' })
      return
    }

    setIsSubmitting(true)
    
    try {
      const formData = new FormData(e.currentTarget)
      formData.append('turnstileToken', turnstileToken)
      
      const result = await registerSchoolAction(formData)
      
      if (result.error) {
        setMessage({ type: 'error', text: result.error })
      } else if (result.success) {
        setMessage({ type: 'success', text: result.message! })
        // Opsional: Redirect atau reset form di sini
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Terjadi kesalahan sistem yang tidak terduga.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white mb-4">
            <BookOpen size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Daftarkan Sekolah Anda</h2>
          <p className="text-gray-500 text-sm mt-1">Langkah pertama menuju digitalisasi sekolah yang utuh</p>
        </div>

        {message && (
          <div className={`p-4 mb-6 rounded-lg text-sm font-medium ${message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
            {message.text}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="schoolName">Nama Sekolah</label>
              <input 
                type="text" 
                id="schoolName" 
                name="schoolName"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all shadow-sm"
                placeholder="SMA Negeri 1 ..."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="subdomain">Subdomain URL</label>
              <div className="flex items-center shadow-sm rounded-lg">
                <input 
                  type="text" 
                  id="subdomain" 
                  name="subdomain"
                  className="w-full px-4 py-3 rounded-l-lg border border-gray-300 bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all"
                  placeholder="sman1"
                  required
                />
                <span className="bg-gray-50 px-4 py-3 border border-l-0 border-gray-300 rounded-r-lg text-gray-500 text-sm font-medium">
                  .sekolah.app
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fullName">Nama Pengelola (Admin)</label>
            <input 
              type="text" 
              id="fullName" 
              name="fullName"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all shadow-sm"
              placeholder="Nama Lengkap Anda"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email Admin</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all shadow-sm"
              placeholder="admin@sekolah.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all shadow-sm"
              placeholder="Minimal 8 karakter"
              required
            />
          </div>

          {/* Cloudflare Turnstile Widget */}
          <div className="flex justify-center mt-6">
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'} // Local testing dummy key fallback
              onSuccess={(token) => setTurnstileToken(token)}
              options={{ theme: 'light' }}
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting || !turnstileToken}
            className={`w-full text-white font-semibold py-3.5 rounded-lg transition-all shadow-md mt-4 ${
              isSubmitting || !turnstileToken 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg active:scale-[0.98]'
            }`}
          >
            {isSubmitting ? 'Memproses...' : 'Buat Akun Sekolah'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-8">
          Sudah punya akun?{' '}
          <Link href="/login" className="text-blue-600 font-semibold hover:underline">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  )
}

