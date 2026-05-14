# Site Plan: SaaS Manajemen Sekolah

## Visi Proyek
Sistem pengelolaan sekolah (SaaS) komprehensif, multi-tenant, mencakup manajemen akademik, keuangan, IoT presensi, dan e-commerce sekolah.

## Arsitektur Infrastruktur & Teknologi

### 1. Edge & Networking (Lapis Terluar)
*   **Provider:** Cloudflare
*   **Peran:** DNS Management, CDN (Caching static assets), WAF (DDoS Protection), Edge Routing untuk Subdomain Tenant (misal: `sekolah-a.sekolah.app`).
*   **Storage Aset:** Cloudflare R2 (untuk efisiensi biaya penyimpanan gambar, dokumen e-learning, bukti bayar).

### 2. Database & BaaS (Backend as a Service)
*   **Supabase (Primary Source of Truth):**
    *   **PostgreSQL:** Relasional data (Siswa, Pegawai, Nilai, Keuangan, Transaksi, Log Presensi).
    *   **Multi-Tenancy:** Diimplementasikan dengan **Row Level Security (RLS)** menggunakan `tenant_id` atau `school_id` di setiap tabel.
    *   **Auth:** Manajemen user dan role (Superadmin, Admin Sekolah, Guru, Siswa, Orang Tua).
*   **Firebase (Micro-BaaS khusus efisiensi):**
    *   **Firebase Cloud Messaging (FCM):** Push notification gratis ke mobile app (Orang Tua, Guru, Siswa).
    *   **Realtime Database:** Untuk *ephemeral data* (Live location bus sekolah, status real-time ujian).

### 3. Application Layer (Backend & API)
*   **Next.js App Router (BFF & Admin Portal):**
    *   Menangani logika bisnis standar, pendaftaran SaaS, dashboard admin, portal akademik web.
*   **Golang Microservices (High-Performance Engine):**
    *   **IoT Ingestion Engine:** Endpoint untuk menerima ribuan *ping* presensi dari mesin RFID/Face Recognition per detik.
    *   **Exam Engine:** Menangani *concurrent submit* dari ribuan siswa saat ujian online tanpa resiko server *down*.
    *   **Payment Webhook Processor:** Validasi callback dari Payment Gateway.

### 4. Client & UI Layer
*   **Web (Next.js/React):** Landing page SaaS, Dashboard Superadmin, Portal Manajemen Sekolah.
*   **Mobile App (Kotlin/Android & Swift/iOS):** Aplikasi Siswa & Orang Tua (Pantau nilai, e-wallet, notifikasi absen).
*   **Desktop/PoS Kiosk (Tauri + React/Next.js):** Aplikasi khusus Kasir Kantin, Koperasi, dan Tata Usaha yang membutuhkan akses *hardware* lokal (printer thermal, barcode scanner, laci kasir). Jauh lebih ringan dari Electron.

---

## Arsitektur Hardware & IoT (Presensi & Transaksi)
*Filosofi: Menggunakan hardware *off-the-shelf* (tersedia di pasaran, murah) dan memindahkan komputasi berat ke cloud (Golang).*

### 1. Sistem Presensi
*   **RFID (Opsi Paling Murah & Handal):**
    *   **Hardware:** Reader RFID USB standar (Plug & Play) yang membaca kartu Mifare/Proximity atau modul ESP32 + MFRC522 untuk *standalone* node (terhubung via WiFi ke Golang API).
    *   **Penggunaan:** Tap kartu di gerbang, pintu kelas, atau perpustakaan.
*   **Sidik Jari (Fingerprint):**
    *   **Hardware:** Mesin absensi standar ZKTeco/Solution (mendukung protokol ADMS / Push SDK).
    *   **Integrasi:** Golang Microservice bertindak sebagai server ADMS yang menangkap log sidik jari secara real-time dari mesin dan meneruskannya ke Supabase.
*   **Face Detection & Recognition:**
    *   **Hardware:** Tablet Android murah/menengah dengan kamera depan yang layak.
    *   **Integrasi:** Aplikasi Kotlin khusus (Kiosk mode) menangkap *frame*, melakukan deteksi wajah lokal (menggunakan ML Kit ringan), dan mengirim *vector/embedding* ke server Golang untuk verifikasi biometrik. Hindari pemrosesan pengenalan wajah berat di alat murah.

### 2. Transaksi Langsung Sekolah (Kantin/Koperasi)
*   **Sistem E-Wallet Internal:** Siswa tidak bawa uang tunai. Transaksi menggunakan Kartu Pelajar (RFID) atau Scan QR dari Aplikasi Mobile Siswa.
*   **Perangkat Kasir (PoS):**
    *   **PC/Laptop Low-End:** Menjalankan aplikasi Desktop (Tauri).
    *   **Hardware Tambahan:** Printer Thermal USB/Bluetooth, Barcode Scanner USB, RFID Reader USB (untuk membaca kartu siswa saat bayar).
