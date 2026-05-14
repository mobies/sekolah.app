export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-4">Ringkasan (Overview)</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-600 mb-2">Total Siswa Aktif</h2>
          <p className="text-4xl font-extrabold text-blue-600">1,250</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-600 mb-2">Guru & Staf</h2>
          <p className="text-4xl font-extrabold text-indigo-600">85</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-600 mb-2">Kehadiran Hari Ini</h2>
          <p className="text-4xl font-extrabold text-emerald-600">98.5%</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-600 mb-2">Tagihan Belum Lunas</h2>
          <p className="text-4xl font-extrabold text-amber-600">12</p>
        </div>
      </div>
    </div>
  )
}
