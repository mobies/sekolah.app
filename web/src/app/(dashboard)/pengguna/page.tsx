import { createClient } from '@/utils/supabase/server'
import { PlusCircle, MoreHorizontal } from 'lucide-react'

// Tipe data untuk user, bisa diekspansi nanti
type User = {
  id: string;
  full_name: string;
  email: string;
  role: string;
  created_at: string;
}

export default async function PenggunaPage() {
  const supabase = await createClient()
  
  // Ambil data user yang satu sekolah dengan admin yang sedang login
  // RLS (Row Level Security) di Supabase otomatis memfilter ini
  const { data: users, error } = await supabase
    .from('profiles')
    .select(`
      id,
      full_name,
      role,
      user:users(email)
    `)

  if (error) {
    return <div className="p-4 bg-red-100 text-red-700 rounded-lg">Error: {error.message}</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Manajemen Pengguna</h1>
          <p className="text-slate-500 mt-1">Kelola data siswa, guru, dan staf sekolah Anda.</p>
        </div>
        <button className="bg-blue-600 text-white font-semibold px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm">
          <PlusCircle size={20} />
          <span>Tambah Pengguna</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-sm text-slate-600">
            <tr>
              <th className="p-4 font-medium">Nama Lengkap</th>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Role</th>
              <th className="p-4 font-medium">Tgl Dibuat</th>
              <th className="p-4 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr key={user.id} className="border-b border-slate-100 last:border-b-0">
                <td className="p-4 font-medium text-slate-800">{user.full_name}</td>
                <td className="p-4 text-slate-500">{user.user.email}</td>
                <td className="p-4 text-slate-500">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                    user.role === 'SCHOOL_ADMIN' ? 'bg-indigo-100 text-indigo-700' : 
                    user.role === 'TEACHER' ? 'bg-emerald-100 text-emerald-700' : 
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4 text-slate-500">{new Date(user.created_at).toLocaleDateString('id-ID')}</td>
                <td className="p-4">
                  <button className="text-slate-500 hover:text-slate-800 p-2 rounded-full hover:bg-slate-100">
                    <MoreHorizontal size={20} />
                  </button>
                </td>
              </tr>
            ))}
             {users.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-8 text-slate-500">
                  Belum ada data pengguna di sekolah ini.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
