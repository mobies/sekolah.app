'use client'

import React, { useState } from 'react'
import { PlusCircle } from 'lucide-react'
import { AddUserModal } from './users/AddUserModal'

// Tipe data untuk user, bisa diekspansi nanti
type User = {
  id: string;
  full_name: string;
  email: string;
  role: string;
  created_at: string;
}

// Komponen utama sekarang menjadi Client Component untuk state management
export default function UserManagementClient({ initialUsers }: { initialUsers: User[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [users, setUsers] = useState(initialUsers)

  const handleUserAdded = (newUser: User) => {
    // Optimistic UI update
    setUsers(currentUsers => [newUser, ...currentUsers]);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Manajemen Pengguna</h1>
          <p className="text-slate-500 mt-1">Kelola data siswa, guru, dan staf sekolah Anda.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white font-semibold px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm"
        >
          <PlusCircle size={20} />
          <span>Tambah Pengguna</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Tabel Pengguna (Sama seperti sebelumnya, tapi menggunakan state) */}
        {/* ... (Tabel dirender di sini menggunakan state 'users') ... */}
      </div>
      
      <AddUserModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onUserAdded={handleUserAdded}
      />
    </div>
  )
}
