# Sekolah.app - Mobile Apps

Direktori ini berisi kode sumber untuk aplikasi mobile SaaS Sekolah.app. Sesuai dengan rancangan arsitektur (`docs/SITE_PLAN.md`), aplikasi mobile akan dibangun secara *native* untuk performa maksimal dan kemudahan akses hardware IoT ke depannya.

## Struktur Direktori
- `/android`: Berisi project Android (Kotlin).
- `/ios`: Berisi project iOS (Swift).

## Cara Inisialisasi (Bagi Developer)

### Android (Kotlin)
Aplikasi Android paling baik diinisialisasi melalui IDE resmi.
1. Buka **Android Studio**.
2. Pilih **New Project**.
3. Pilih **Empty Activity** (Jetpack Compose disarankan).
4. Arahkan *Save location* ke `E:\Projects\sekolah.app\mobile\android`.
5. Gunakan bahasa **Kotlin**.

### iOS (Swift)
Aplikasi iOS harus dibuat di perangkat macOS.
1. Buka **Xcode**.
2. Pilih **Create a new Xcode project**.
3. Pilih **App**.
4. Gunakan Interface **SwiftUI** dan Language **Swift**.
5. Simpan di direktori `mobile/ios`.
