import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { Search, Bell, User } from 'lucide-react'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Ambil profil user dan data sekolahnya
  const { data: profile } = await supabase
    .from('profiles')
    .select(`
      full_name,
      role,
      school:schools(name)
    `)
    .eq('id', user.id)
    .single()

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="p-6 bg-white border-b border-slate-200 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              {profile?.school?.name || 'Dashboard'}
            </h1>
            <p className="text-slate-500">Selamat datang kembali, {profile?.full_name || 'Pengguna'}!</p>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-slate-500 hover:text-slate-900">
              <Search size={22} />
            </button>
            <button className="text-slate-500 hover:text-slate-900">
              <Bell size={22} />
            </button>
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center border border-slate-300">
              <User size={20} className="text-slate-600" />
            </div>
          </div>
        </header>
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
