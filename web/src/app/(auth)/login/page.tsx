'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BookOpen } from 'lucide-react'
import { loginAction } from '@/app/actions/auth'

export default function LoginPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg(null)

    try {
      const formData = new FormData(e.currentTarget)
      const result = await loginAction(formData)

      if (result.error) {
        setErrorMsg(result.error)
        setIsSubmitting(false)
      } else if (result.success) {
        // Redirect to dashboard upon successful login
        router.push('/dashboard')
      }
    } catch (err) {
      setErrorMsg('Terjadi kesalahan sistem. Silakan coba lagi nanti.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white mb-4">
            <BookOpen size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Selamat Datang Kembali</h2>
          <p className="text-gray-500 text-sm mt-1">Masuk ke dashboard sekolah.app</p>
        </div>

        {errorMsg && (
          <div className="p-4 mb-6 rounded-lg text-sm font-medium bg-red-50 text-red-600 border border-red-100">
            {errorMsg}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all shadow-sm"
              placeholder="nama@sekolah.com"
              required
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
              <Link href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors">Lupa password?</Link>
            </div>
            <input 
              type="password" 
              id="password" 
              name="password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all shadow-sm"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full text-white font-semibold py-3.5 rounded-lg transition-all shadow-md mt-4 ${
              isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg active:scale-[0.98]'
            }`}
          >
            {isSubmitting ? 'Memproses...' : 'Masuk'}
          </button>

        </form>

        <p className="text-center text-sm text-gray-600 mt-8">
          Sekolah belum terdaftar?{' '}
          <Link href="/register" className="text-blue-600 font-semibold hover:underline">
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  )
}

