# Backlog

Catatan pekerjaan yang sudah didiagnosis tetapi masih menunggu keputusan. Tidak ada perubahan kode yang boleh dibuat dari dokumen ini sampai keputusan diambil.

## Penyedia email untuk `/contact` dan email transaksional

**Status:** menunggu keputusan bisnis. Belum ada perubahan kode.

### Gejala

Mengirim pesan lewat halaman `/contact` kadang menghasilkan:

- Indonesia: "Terlalu banyak permintaan. Silakan coba lagi nanti."
- Inggris: "Too many requests. Please try again soon."

### Diagnosis (sudah diverifikasi)

Pesan ini **bukan** berasal dari Resend:

- `src/app/api/contact/route.ts:43-52` memasang rate limiter milik aplikasi: **5 permintaan per jam per alamat IP** (kunci `contact-form:<ip>`, atau user-agent bila IP tidak tersedia).
- `applyRateLimit()` di `src/lib/security/route-controls.ts:42-50` yang mengembalikan HTTP 429 beserta header `Retry-After` dan teks di atas. Teksnya ada di `src/lib/i18n/locales/en.ts:21` dan `src/lib/i18n/locales/id.ts:22`, lalu ditampilkan oleh klien.
- Bila yang menolak adalah Resend karena kuota, `sendWithinRateLimit()` di `src/lib/services/email.ts:104-120` akan mencoba ulang 3 kali lalu melempar error; rute `/api/contact` meneruskannya sebagai **500** dengan pesan umum "Terjadi kesalahan. Silakan coba lagi." Jadi pesan 429 tidak mungkin muncul dari Resend.
- Penghitungnya disimpan di Postgres agar dipakai bersama oleh semua instance Vercel (`src/lib/security/rate-limit.ts`), dengan fallback memori bila tabel belum tersedia.

Artinya, mengganti penyedia email saja **tidak** akan menghilangkan pesan yang terlihat itu. Batas 5/jam juga mudah tersentuh saat pengujian berulang, atau bila beberapa orang berada di balik IP/NAT yang sama.

### Opsi yang perlu diputuskan

1. **Sesuaikan batas sendiri.** Naikkan 5/jam atau jadikan nilai yang bisa diatur lewat variabel lingkungan (misalnya `CONTACT_RATE_LIMIT`). Dampak kecil, penyedia email tetap Resend. Ini menyelesaikan gejala 429, bukan soal kuota provider.
2. **Tambahkan Gmail sebagai cadangan.** Resend tetap driver utama; tambahkan driver `nodemailer` SMTP (`smtp.gmail.com:587`, `SMTP_USER`/`SMTP_PASS`) yang dipakai hanya saat Resend gagal. Perubahan menengah, email tetap punya jalur utama yang sudah ada.
3. **Ganti penuh Resend dengan Gmail.** Hapus Resend dan pakai SMTP Gmail untuk semua email. Paling besar dampaknya, dan perlu pertimbangan khusus soal kuota serta deliverability (lihat di bawah).

### Dampak bila provider email diganti

- `EmailDriver` di `src/lib/services/email.ts:25` hanya mengenal `"capture" | "resend"`. `createEmailService()` (`:354-423`) memakai SDK Resend dan `RESEND_API_KEY`, `RESEND_FROM_EMAIL`.
- `sendBatch()` memakai endpoint batch Resend; `nodemailer` tidak memilikinya, jadi harus mengirim satu per satu.
- `src/lib/email-status.ts`, `src/app/api/admin/email/route.ts`, dan `src/app/api/setup/route.ts` memakai Resend Domains API untuk menambah domain, menampilkan catatan DNS, dan memeriksa verifikasi. UI Settings, Organization perlu disesuaikan atau dinonaktifkan.
- Tes yang perlu diperbarui: `src/lib/services/email.test.ts`, `src/lib/email-status.test.ts`, serta test basis data yang menyetel `EMAIL_DRIVER=resend`.
- Variabel lingkungan di `.env.example` (`RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_REGION`) dan alur deploy Resend di `docs/deploy-with-an-agent.md`.
- Dokumen yang menyebut Resend sebagai vendor perlu ditinjau ulang: `docs/development.md`, `docs/soc2/*`, `docs/part11/*`, `docs/indonesian-localization.md`.
- Batas Gmail: sekitar 500 pesan/hari untuk akun konsumen dan 2.000/hari untuk Workspace, serta pengiriman otomatis berisiko ditandai sebagai spam. Aplikasi ini mengirim undangan, pengingat, kode akses, dan notifikasi—jumlahnya perlu dihitung terhadap batas tersebut.
- Referensi implementasi yang disebut pengguna: `/Users/imansulaimaniman/Stack/nexa_edu/pkbm/website2/src/lib/email/mailer.tsx` (`nodemailer`, `smtp.gmail.com:587`, `SMTP_USER`/`SMTP_PASS`) dan `package.json` proyek tersebut (`nodemailer ^10.6.1`).

### Pertanyaan yang masih terbuka (keputusan bisnis)

- Apakah batas 5/jam perlu dinaikkan atau dikonfigurasi, terlepas dari pilihan provider?
- Apakah kuota atau biaya Resend benar-benar menjadi kendala, atau yang mengganggu hanya pesan 429 di formulir kontak?
- Bila pindah ke Gmail: akun apa yang dipakai (konsumen atau Workspace), siapa pemiliknya, dan apakah App Password diizinkan oleh kebijakan organisasi?
- Apakah dokumen SOC 2 dan Part 11 perlu diperbarui bila vendor email berubah? Resend memiliki laporan SOC 2; Google juga, tetapi cakupan dan caranya berbeda.

### Catatan

- Temuan segel PDF sudah dicatat terpisah dan sengaja tidak dimasukkan ke sini.
- Lokalisasi dasbor, navigasi shell, `/settings`, template, dan halaman detail amplop sudah selesai dan terpisah dari isu ini. Teks yang masih berbahasa Inggris dan belum termasuk cakupan: wizard `src/components/envelopes/prepare-live-shell.tsx` (ada perubahan lokal di luar cakupan pada logika `required` di sekitar baris 1910), pembungkus `/two-step-setup` di luar `TwoFactorPanel`, pesan galat Better Auth/server yang diteruskan apa adanya dari API, serta `document-viewport.tsx` dan `step-indicator.tsx`.
