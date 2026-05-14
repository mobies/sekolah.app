# AI Development Rules: sekolah.app

File ini berisi instruksi dan aturan wajib bagi AI Agent (Gemini) selama membantu pengembangan proyek `sekolah.app`. 
**Agent WAJIB membaca dan mematuhi aturan ini sebelum melakukan modifikasi kode atau arsitektur.**

## 1. Arsitektur Inti (Jangan Diubah Tanpa Persetujuan)
1.  **Primary Database:** Selalu gunakan **Supabase (PostgreSQL)** untuk data relasional dan persisten. Jangan sarankan MongoDB atau database NoSQL untuk data inti.
2.  **Multi-Tenancy:** Gunakan pendekatan **Row Level Security (RLS)** di Supabase dengan kolom `tenant_id` atau `school_id`. Hindari membuat tabel atau schema terpisah per sekolah.
3.  **Frontend/Admin Web:** Gunakan **Next.js (App Router)**.
4.  **High-Performance/IoT/Exam Backend:** Gunakan **Golang**. Jangan letakkan logika proses berat ini di Next.js API Routes.
5.  **Notifikasi & Ephemeral Data:** Gunakan **Firebase** (FCM & Realtime DB).
6.  **Edge:** Gunakan **Cloudflare** untuk DNS, Caching, dan WAF.

## 2. Aturan Koding (Coding Standards)
1.  **TypeScript First:** Semua kode Next.js (Frontend/BFF) harus menggunakan TypeScript secara ketat (`any` dilarang keras, buat interface/tipe yang jelas).
2.  **Golang Idiomatic:** Ikuti standar koding Golang (format dengan `go fmt`, tangani error secara eksplisit `if err != null`).
3.  **UI/UX:** Gunakan komponen UI yang bersih, modern, dan konsisten (misal: TailwindCSS + Radix UI / Shadcn UI).
4.  **Hardware Interface:** Untuk aplikasi Desktop (PoS Kasir/TU) yang butuh akses *hardware*, gunakan **Tauri** dengan frontend React/Next.js. Jangan gunakan Electron.

## 3. Aturan Keamanan (Security)
1.  **Secret Keys:** JANGAN PERNAH meletakkan API Key, Secret Token, atau kredensial database secara *hardcode* di dalam kode sumber. Selalu gunakan `.env` dan pastikan file tersebut masuk ke `.gitignore`.
2.  **RLS Aktif:** Setiap kali membuat tabel baru di Supabase, AI WAJIB menyertakan script SQL untuk mengaktifkan dan mengonfigurasi RLS agar data tenant terisolasi.

## 4. Alur Kerja (Workflow)
1.  **Cek Roadmap:** Sebelum mengusulkan fitur baru, selalu periksa `ROADMAP.md` untuk mengetahui fase saat ini. Fokus selesaikan task di fase berjalan.
2.  **Update Progress:** Setelah tugas signifikan selesai, perbarui file `PROGRESS.md`.
3.  **Konfirmasi:** Jika pengguna meminta fitur yang bertentangan dengan arsitektur (misal: "simpan data SPP di Firebase"), ingatkan pengguna tentang aturan ini dan jelaskan dampaknya terhadap biaya/performa sebelum melanjutkan.
