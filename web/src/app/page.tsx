import Link from 'next/link'
import { ArrowRight, BookOpen, Fingerprint, ShieldCheck } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header / Navbar */}
      <header className="px-6 py-4 border-b flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <BookOpen size={20} />
          </div>
          sekolah.app
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
          <Link href="#features" className="hover:text-blue-600 transition-colors">Fitur</Link>
          <Link href="#pricing" className="hover:text-blue-600 transition-colors">Harga</Link>
          <Link href="#contact" className="hover:text-blue-600 transition-colors">Kontak</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Login
          </Link>
          <Link href="/register" className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors">
            Coba Gratis
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="py-24 px-6 text-center bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
              Sistem Manajemen Sekolah <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Terpadu & Modern</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Satu aplikasi untuk semuanya: Akademik, Presensi IoT (RFID/Biometrik), Keuangan, Ujian Online, hingga Kantin Cashless.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-transform hover:scale-105">
                Daftarkan Sekolah Anda <ArrowRight size={20} />
              </Link>
              <Link href="#demo" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-semibold border hover:bg-gray-50 transition-colors">
                Lihat Demo
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section id="features" className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16">Dirancang untuk Skala Besar & Keamanan</h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <Fingerprint size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">Presensi Pintar (IoT)</h3>
                <p className="text-gray-600">Integrasi langsung dengan mesin RFID, Sidik Jari, dan deteksi wajah. Notifikasi *real-time* ke HP Orang Tua.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                  <BookOpen size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">Akademik & Ujian Online</h3>
                <p className="text-gray-600">Engine ujian berbasis Golang yang kuat menangani ribuan siswa secara serentak tanpa server *down*.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                  <ShieldCheck size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">E-Wallet & Kantin</h3>
                <p className="text-gray-600">Sistem cashless internal sekolah. Bayar jajan di kantin hanya dengan *scan* kartu pelajar atau HP.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t bg-gray-50 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} sekolah.app. Semua hak cipta dilindungi.</p>
      </footer>
    </div>
  )
}
