'use client'

import React, { useState, useRef, useEffect } from 'react'
import { X } from 'lucide-react'
import { addUserAction } from '@/app/actions/users'

// Tipe data untuk user baru
type NewUser = {
  id: string;
  full_name: string;
  email: string;
  role: string;
  created_at: string;
}

export function AddUserModal({ isOpen, onClose, onUserAdded }: { isOpen: boolean, onClose: () => void, onUserAdded: (newUser: NewUser) => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null)
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (isOpen) {
      setMessage(null);
      formRef.current?.reset();
    }
  }, [isOpen]);

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)
    
    const formData = new FormData(e.currentTarget)
    const result = await addUserAction(formData)

    if (result.error) {
      setMessage({ type: 'error', text: result.error })
    } else if (result.success && result.newUser) {
      setMessage({ type: 'success', text: 'Pengguna baru berhasil ditambahkan!' })
      onUserAdded(result.newUser as NewUser);
      setTimeout(() => {
        onClose();
      }, 1500);
    }
    setIsSubmitting(false)
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 transition-colors">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Tambah Pengguna Baru</h2>
        <p className="text-slate-500 mb-6">Masukkan detail untuk mendaftarkan siswa atau guru baru.</p>

        {message && (
          <div className={`p-3 mb-4 rounded-lg text-sm font-medium ${message.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
            {message.text}
          </div>
        )}

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fullName">Nama Lengkap</label>
            <input type="text" name="fullName" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
            <input type="email" name="email" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password Sementara</label>
            <input type="password" name="password" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="role">Role</label>
            <select name="role" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-600">
              <option value="STUDENT">Siswa (Student)</option>
              <option value="TEACHER">Guru (Teacher)</option>
              <option value="CASHIER">Kasir (Cashier)</option>
            </select>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-lg font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200">
              Batal
            </button>
            <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400">
              {isSubmitting ? 'Menyimpan...' : 'Simpan Pengguna'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
