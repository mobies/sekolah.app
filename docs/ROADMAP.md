# Project Roadmap: SaaS Manajemen Sekolah

## Fase 1: Fondasi & MVP (Bulan 1-3)
**Tujuan:** Membangun inti sistem SaaS, manajemen sekolah dasar, dan arsitektur database.
*   [ ] Setup Supabase (Database Schema, Auth, RLS Multi-tenant).
*   [ ] Landing Page SaaS & Sistem Registrasi Sekolah (Next.js).
*   [ ] Dashboard Superadmin (Manajemen Tenant/Sekolah).
*   [ ] Portal Sekolah (Manajemen Data Master: Siswa, Guru, Kelas, Jadwal).
*   [ ] Sistem Autentikasi dan Role-Based Access Control (RBAC).

## Fase 2: Akademik & Presensi Dasar (Bulan 4-6)
**Tujuan:** Fitur akademik utama dan integrasi hardware presensi tahap pertama.
*   [ ] Modul Akademik (Nilai, Raport, Tugas).
*   [ ] API IoT Presensi (Golang Microservice).
*   [ ] Integrasi Presensi RFID (Membangun pembaca via ESP32/USB Reader).
*   [ ] Integrasi Mesin Fingerprint (Protokol ADMS).
*   [ ] Portal Guru (Input absen, nilai).
*   [ ] Aplikasi Mobile Orang Tua MVP (Lihat absen anak, terima notifikasi Firebase).

## Fase 3: Keuangan & E-Wallet (Bulan 7-9)
**Tujuan:** Manajemen SPP, Payment Gateway, dan sistem transaksi cashless internal.
*   [ ] Modul Tagihan SPP & Pembayaran (Integrasi Payment Gateway: Midtrans/Xendit).
*   [ ] Golang Webhook Processor untuk Payment Gateway.
*   [ ] Sistem E-Wallet Internal Siswa (Saldo virtual di Supabase).
*   [ ] Aplikasi PoS (Point of Sales) Desktop dengan Tauri untuk Kantin/Koperasi.
*   [ ] Fitur Scan RFID/Barcode pada PoS untuk memotong saldo e-wallet.
*   [ ] Fitur Top-Up E-Wallet pada Aplikasi Mobile Orang Tua.

## Fase 4: Ujian Online & Lanjutan (Bulan 10-12)
**Tujuan:** Engine ujian online high-concurrency dan integrasi AI biometrik.
*   [ ] Exam Engine (Golang + Next.js UI untuk pengerjaan soal).
*   [ ] Pembuatan Bank Soal dan Manajemen Ujian di Portal Sekolah.
*   [ ] Presensi Face Recognition (Aplikasi Android Kiosk + Server verifikasi vektor wajah).
*   [ ] Pelacakan Transportasi Sekolah (Firebase Realtime Database + Aplikasi Driver).
*   [ ] Pengumuman & Sistem Informasi Lanjutan.

## Fase 5: Skalabilitas & Fitur Ekstra (Tahun ke-2)
**Tujuan:** Ekosistem tambahan dan optimasi infrastruktur.
*   [ ] Modul PPDB (Penerimaan Peserta Didik Baru).
*   [ ] Marketplace Sekolah (Untuk vendor seragam, buku, dll).
*   [ ] Migrasi log besar ke data warehouse jika diperlukan.
*   [ ] Cloudflare Workers optimization untuk routing tenant skala besar.
