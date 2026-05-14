import Link from 'next/link'
import { LayoutDashboard, Users, BookOpen, CreditCard, Settings, LogOut } from 'lucide-react'

export function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3 text-white font-bold text-xl border-b border-slate-800">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <BookOpen size={18} />
        </div>
        sekolah.app
      </div>

      <nav className="flex-1 py-6 px-4 space-y-2">
        <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-slate-800 text-white rounded-xl transition-colors">
          <LayoutDashboard size={20} />
          <span className="font-medium">Overview</span>
        </Link>
        <Link href="/dashboard/akademik" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 hover:text-white rounded-xl transition-colors">
          <BookOpen size={20} />
          <span className="font-medium">Akademik</span>
        </Link>
        <Link href="/dashboard/pengguna" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 hover:text-white rounded-xl transition-colors">
          <Users size={20} />
          <span className="font-medium">Data Pengguna</span>
        </Link>
        <Link href="/dashboard/keuangan" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 hover:text-white rounded-xl transition-colors">
          <CreditCard size={20} />
          <span className="font-medium">Keuangan & SPP</span>
        </Link>
        <Link href="/dashboard/pengaturan" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 hover:text-white rounded-xl transition-colors">
          <Settings size={20} />
          <span className="font-medium">Pengaturan</span>
        </Link>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <form action="/auth/signout" method="post">
          <button type="submit" className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-400 hover:bg-slate-800 hover:text-red-300 rounded-xl transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Keluar</span>
          </button>
        </form>
      </div>
    </aside>
  )
}
