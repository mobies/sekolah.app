# Panduan Setup Infrastruktur Cloud & Server

Dokumen ini berisi panduan langkah-demi-langkah (step-by-step) untuk menyiapkan infrastruktur cloud bagi proyek **sekolah.app**. Lakukan langkah-langkah ini secara berurutan.

---

## Tahap 1: Domain & Edge (Cloudflare)
Cloudflare akan menjadi pintu gerbang utama untuk semua trafik masuk.

1. **Beli Domain:** Beli domain utama Anda (misal: `sekolah.app` atau `sekolah.id`) melalui registrar seperti Niagahoster, Rumahweb, atau Namecheap.
2. **Buat Akun Cloudflare:** Daftar di [Cloudflare](https://dash.cloudflare.com/sign-up).
3. **Tambahkan Site:** Klik "Add a Site" dan masukkan nama domain Anda. Pilih plan **Free**.
4. **Update Nameserver:** Cloudflare akan memberikan 2 buah Nameserver (misal: `ns1.cloudflare.com`). Login ke panel tempat Anda membeli domain, lalu ubah Nameserver bawaan menjadi Nameserver dari Cloudflare.
5. **Konfigurasi SSL/TLS:** Di dashboard Cloudflare, buka menu **SSL/TLS**, atur mode ke **Full (Strict)**.
6. **(Opsional) Setup Cloudflare R2:** Di menu R2, buat *bucket* baru (misal: `sekolah-assets`) untuk persiapan penyimpanan gambar murah nanti.

---

## Tahap 2: Database & Backend Utama (Supabase)
Supabase akan menyimpan semua data relasional dan menangani autentikasi.

1. **Buat Akun/Login:** Kunjungi [Supabase](https://supabase.com/) dan login menggunakan akun GitHub Anda.
2. **Buat Organisasi & Proyek:**
   - Buat *Organization* (misal: `Mobies`).
   - Klik **New Project**. Pilih region terdekat dengan pengguna Anda (sangat disarankan **Singapore** untuk latency terbaik ke Indonesia).
   - Masukkan *Database Password* (Buat yang sangat kuat dan **simpan di tempat aman**).
3. **Ambil Kredensial API:**
   - Buka **Project Settings > API**.
   - Copy `Project URL` dan `anon` / `public` key. Anda akan sangat membutuhkan ini untuk file `.env` di Next.js nanti.
   - JANGAN PERNAH membagikan `service_role` key ke sisi frontend.
4. **Persiapan Auth:** Buka menu **Authentication > Providers**, pastikan Email diaktifkan. Anda bisa menambahkan Google Login nanti jika perlu.

---

## Tahap 3: Hosting Frontend & Dashboard (Vercel)
Vercel adalah tempat terbaik untuk melakukan hosting Next.js karena integrasinya yang *seamless*.

1. **Buat Akun:** Login ke [Vercel](https://vercel.com/) menggunakan GitHub.
2. **Import Repository:**
   - Klik **Add New > Project**.
   - Pilih repository GitHub `mobies/sekolah.app`.
   - Di bagian **Framework Preset**, pastikan terdeteksi sebagai `Next.js` (ini akan kita atur setelah kode Next.js dibuat).
3. **Setup Environment Variables:** Di pengaturan *Environment Variables* Vercel, masukkan URL dan Key dari Supabase tadi:
   - `NEXT_PUBLIC_SUPABASE_URL` = `[Project URL Supabase]`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `[Anon Key Supabase]`
4. **Deploy:** Klik Deploy (kita akan melakukan ini setelah inisialisasi kode Next.js lokal selesai).
5. **Custom Domain:** Buka menu Settings > Domains di proyek Vercel Anda, tambahkan `sekolah.app`. Vercel akan memberikan *CNAME record*. Masukkan CNAME record ini ke dalam DNS Management di **Cloudflare**.

---

## Tahap 4: Notifikasi & Ephemeral Data (Firebase)
Hanya digunakan untuk Push Notification gratis dan Realtime Database.

1. **Buat Proyek:** Buka [Firebase Console](https://console.firebase.google.com/), klik **Add Project**. Beri nama `sekolah-app-notif`.
2. **Nonaktifkan Google Analytics:** Kecuali Anda benar-benar membutuhkannya, matikan saja untuk penyederhanaan setup awal.
3. **Aktifkan Fitur:**
   - Buka **Build > Realtime Database**, buat database (pilih region Singapore/Asia). Atur rules sementara ke `false` agar aman.
   - Buka **Engage > Cloud Messaging** untuk memastikan fitur notifikasi aktif.
4. **Ambil Service Account (Untuk Golang/Next.js Backend):**
   - Buka **Project Settings > Service accounts**.
   - Klik **Generate new private key**. Simpan file JSON ini (INI SANGAT RAHASIA, jangan di-commit ke Git).

---

## Tahap 5: High-Performance Engine (VPS untuk Golang)
Ini adalah server fisik/virtual khusus untuk memproses hardware IoT (RFID/Fingerprint) dan Exam Engine.

1. **Pilih Provider:** Daftar ke DigitalOcean, Linode, atau AWS (Lightsail).
2. **Buat Droplet / Instance:**
   - OS: **Ubuntu 22.04 LTS** atau **24.04 LTS**.
   - Spesifikasi Awal: 1 GB atau 2 GB RAM (Golang sangat hemat RAM, ini sudah cukup untuk awal).
   - Region: **Singapore**.
3. **Setup Keamanan Dasar (Via SSH):**
   - Login via SSH: `ssh root@IP_VPS_ANDA`.
   - Buat user non-root dan beri hak sudo.
   - Setup Firewall (UFW): Izinkan port SSH (22), HTTP (80), HTTPS (443), dan port khusus API Golang Anda nanti (misal 8080).
4. **Instalasi:**
   - Install **Docker** & Docker Compose (Cara paling mudah untuk deploy Golang).
   - Install **Nginx** (Sebagai Reverse Proxy untuk mengarahkan subdomain `api.sekolah.app` ke port Golang Anda).

---

## Urutan Eksekusi Saat Ini (Roadmap Kesesuaian)
Saat ini Anda **tidak perlu** menyewa VPS (Tahap 5) atau Firebase (Tahap 4) terlebih dahulu. 

Untuk **Fase 1** (Fondasi & MVP), Anda hanya perlu menyelesaikan:
1. Tahap 1 (Domain Cloudflare - jika sudah punya domain).
2. **Tahap 2 (Buat Project Supabase)** -> *Gratis di awal*.
3. **Tahap 3 (Siapkan Vercel & Inisialisasi Next.js)** -> *Gratis*.
