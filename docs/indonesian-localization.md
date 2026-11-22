# Rencana dukungan bahasa Indonesia di SignuDoc

Status: **Fase 1 diterapkan, belum dirilis**. Rencana ini menjadi acuan implementasi; terutama pengalaman signer dan emailnya yang sudah diubah.

Dibuat: 2026-11-21

## 1. Temuan saat ini

- SignuDoc belum memiliki lapisan internasionalisasi. Tidak ada dependensi `next-intl`, `react-i18next`, `lingui`, atau sejenisnya di `package.json`.
- `next.config.ts` tidak mengatur locale; `src/app/layout.tsx:30` menuliskan `<html lang="en">` secara tetap.
- Seluruh teks UI, email, dan pesan galat ditulis langsung dalam bahasa Inggris di komponen dan layanan.
- README sendiri mencantumkan keterbatasan ini: `README.md:164` — _"Languages — signing pages in English"_.
- Satu-satunya kode yang membaca preferensi bahasa adalah `src/app/api/signing/[token]/provider/start/route.ts:64`, yang meneruskan `Accept-Language` ke penyedia tanda tangan eksternal (eID Easy / CSC). Ini tidak menerjemahkan SignuDoc.
- Font CJK yang dibundling (`src/assets/fonts/`) hanya untuk mencetak nama signer di PDF, bukan untuk terjemahan antarmuka.

Skala yang terlibat: sekitar 113 file `.tsx` dan 80 file `.ts` di `src/app` + `src/components`, 18 jenis email (`src/lib/types/domain.ts:105-124`), 13 spesifikasi Playwright di `e2e/`, dan 35 migrasi SQL di `db/migrations/`.

## 2. Keputusan desain yang disarankan

### 2.1 Locale

- `en` tetap menjadi default, `id` ditambahkan sebagai locale baru.
- Gunakan kode `id` (bukan `id-ID`) agar sederhana; `id-ID` bisa ditambahkan kemudian sebagai fallback jika diperlukan.
- Kamus bertipe: satu file sumber `en` sebagai kanon, lalu `id` harus memiliki kunci yang persis sama.

### 2.2 Routing: locale lewat cookie, URL tidak berubah

Dokumen Next.js 16 yang terpasang (`node_modules/next/dist/docs/01-app/02-guides/internationalization.md`) merekomendasikan prefiks jalur (`/id/...`), Proxy, dan memindahkan seluruh halaman ke `app/[lang]`. Itu pola yang bersih untuk situs baru, **tetapi berisiko untuk instalasi yang sudah dipakai**:

- Link tanda tangan yang sudah dikirimkan berbentuk `/sign/<token>` dan tidak boleh berubah.
- Callback auth `/api/auth/callback/sso`, webhook, endpoint API v1, cron internal, dan origin embed sudah punya alamat tetap.
- Memindahkan semuanya ke `app/[lang]` memerlukan aturan rewrite untuk menjaga link lama tetap hidup.

Rekomendasi untuk proyek ini: **simpan locale di cookie `NEXT_LOCALE` dan resolusi lewat `src/proxy.ts` yang sudah ada**, tanpa mengubah struktur URL. Urutan resolusi:

1. Nilai eksplisit yang dipilih pengguna (cookie `NEXT_LOCALE`).
2. `Accept-Language` dari browser.
3. Fallback `en`.

Catatan teknis:

- `src/proxy.ts` sudah berisi `applySecurityHeaders(...)` dan matcher; tambahkan resolusi locale di sana tanpa mengubah perilaku CSP, `frame-ancestors`, atau header `no-store` pada rute `/sign/`, `/embed/sign/`, dan `/download/`.
- Membaca `await cookies()` di root layout membuat rute bersifat dinamis (`node_modules/next/dist/docs/01-app/02-guides/streaming.md`). Untuk halaman publik yang ingin tetap statis, opsi lanjutan adalah memakai `app/[lang]` hanya untuk halaman pemasaran/legal sambil menjaga rute aplikasi tetap tanpa prefiks.
- Jika suatu hari diputuskan pindah ke `app/[lang]`, lakukan itu sebagai fase terpisah dengan rewrite untuk path lama.

### 2.3 Bahasa untuk email dan link tanda tangan

Jangan mengandalkan browser signer saja. Sender yang memakai UI Indonesia mengharapkan penerima mendapat email dan halaman tanda tangan berbahasa Indonesia, meskipun browser penerima berbahasa Inggris.

- Simpan locale pilihan saat envelope dikirim, misalnya kolom `locale` pada baris signer/penerima, melalui migrasi SQL baru di `db/migrations/`.
- Saat email dan link dibuat, baca locale yang tersimpan; fallback ke `en` untuk baris lama.
- Link yang sudah terbit tetap valid: token, hash, dan URL `/sign/<token>` tidak diubah.

### 2.4 Struktur kamus yang diusulkan

```text
src/lib/i18n/
  locales/en.ts          # sumber kanon
  locales/id.ts          # terjemahan, kunci sama persis
  types.ts               # Locale, MessageKey, tipe turunan
  get-dictionary.ts      # resolusi locale -> kamus, hanya di server
  format.ts              # pembungkus Intl untuk tanggal, waktu, angka
  messages-provider.tsx  # pengirim kamus ke Client Component
```

- Client Component tidak bisa memanggil `cookies()` / `next/root-params`; kamus diserialisasi sekali di layout lalu diberikan lewat provider.
- Gunakan `Intl.DateTimeFormat` dan `Intl.NumberFormat` untuk tanggal, waktu, dan angka. Jangan menyusun tanggal dengan konkatenasi string.
- Tambah tes paritas kunci `en` vs `id` supaya terjemahan yang belum ada langsung gagal di CI.

## 3. Cakupan teks yang perlu diterjemahkan

| Area                                          | Lokasi utama                                                                                                                                                                                                                                                       | Catatan                                                                                                      |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| Halaman tanda tangan & persetujuan elektronik | `src/app/sign/[token]`, `src/components/signing/*`, `src/lib/electronic-records-disclosure.ts`, `src/lib/consent-disclosure-notice.ts`                                                                                                                             | Prioritas tertinggi. Teks disclosure adalah teks legal; perlu tinjauan manusia, bukan terjemahan mesin saja. |
| Email transaksional                           | `src/lib/services/signing-invitation-email.ts`, `src/lib/services/reminders.ts`, `src/lib/signing.ts`, `src/lib/envelope-schedule.ts`, `src/lib/envelope-deletion.ts`, `src/lib/retention.ts`, `src/lib/auth/server.ts`, `src/lib/part11.ts`, `src/lib/account.ts` | 18 jenis email. Subjek, isi HTML, isi teks, dan footer legal semuanya perlu diterjemahkan.                   |
| Dashboard & wizard envelope                   | `src/components/dashboard/*`, `src/components/envelopes/*`, `src/components/templates/*`                                                                                                                                                                           | Termasuk label status (`Draft`, `Sent`, `Signed`), tombol, validasi, dan teks bantuan.                       |
| Autentikasi, setup, pengaturan                | `src/components/auth/*`, `src/components/setup/*`, `src/components/settings/*`, `src/lib/password-messages.ts`, `src/lib/legal.ts`                                                                                                                                 | Pesan galat Better Auth perlu dipetakan ke pesan Indonesia.                                                  |
| Halaman publik & legal                        | `src/app/verify`, `src/app/contact`, `src/app/terms`, `src/app/privacy`, `src/app/accessibility`, `src/app/electronic-signatures`, `src/app/signer-privacy`, `src/components/landing/*`                                                                            | Cantumkan bahwa versi Inggris tetap kanonik untuk hal hukum.                                                 |
| PDF, sertifikat, dan jejak audit              | `src/lib/services/pdf-finalize.ts`, `src/lib/services/seal-identity.ts`, `src/lib/audit-export.ts`, `src/lib/signature-meanings.ts`                                                                                                                                | Terjemahkan saat ditampilkan/dicatatkan, jangan menulis ulang baris audit lama.                              |
| Pesan API & galat server                      | `src/lib/api/*`, `src/app/api/**`                                                                                                                                                                                                                                  | Teks untuk pengguna diterjemahkan; kode galat tetap stabil.                                                  |

## 4. Yang sengaja tidak diterjemahkan

- Nama event webhook, `EmailTemplateKind`, `AuditEventType`, `FieldType`, nama field API, dan kode galat — ini kontrak untuk aplikasi pihak ketiga.
- Nilai yang tersimpan di database dan dipakai sebagai kunci, termasuk `disclosureVersion`.
- Token, URL, hash, nama header, kunci JSON log, dan string internal PAdES/ASN.1.
- Identitas produk/organisasi yang memang diisi sendiri oleh administrator.

## 5. Tahapan pengerjaan

**Fase 0 — Keputusan & inventarisasi**

- Setujui daftar cakupan di atas dan pilih cakupan minimum untuk rilis pertama.
- Ekstrak daftar string UI menjadi kunci; tentukan pemilik terjemahan bahasa Indonesia.

**Fase 1 — Fondasi + pengalaman signer (nilai terbesar)**

- Pasang resolver locale di `src/proxy.ts`, helper `getDictionary`, dan `Intl` formatting.
- Ubah `<html lang>` mengikuti locale.
- Migrasi SQL untuk locale per penerima; fallback untuk data lama.
- Terjemahkan halaman tanda tangan, disclosure, Verify, dan email yang dikirim ke signer.
- Uji: alur kirim dari UI Indonesia → email Indonesia → tanda tangan → PDF selesai.

**Fase 2 — Pengguna internal**

- Dashboard, wizard, template, pengaturan, login/signup/setup, dan pesan galat.
- Pemilih bahasa di Settings atau menu akun. Pemilih di footer publik sudah tersedia lebih awal (lihat Fase 1); ini baru perlu jika ingin kontrol terpisah untuk pengguna internal.

**Fase 3 — Bukti & legal**

- Label sertifikat, tampilan jejak audit, arti tanda tangan untuk mode Part 11, dan halaman legal.
- Perbarui `README.md:164` setelah dukungan bahasa Indonesia benar-benar tersedia.

**Fase 4 — Mutu & rilis**

- Tes paritas kamus, tes format tanggal, snapshot email, dan skenario Playwright berbahasa Indonesia.
- Verifikasi link lama, callback SSO, embed, dan cron tetap bekerja.
- Rilis bertahap; siapkan rollback melalui fallback `en`.

## 6. Risiko dan mitigasi

| Risiko                                                                | Mitigasi                                                                                   |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Link tanda tangan yang sudah dikirim rusak karena perubahan URL       | URL tidak diubah; locale disimpan di sisi server/cookie.                                   |
| Teks legal kurang tepat                                               | Terjemahan oleh penutur asli + tinjauan hukum; versi Inggris tetap kanonik.                |
| Jejak audit hash-chain berubah                                        | Gunakan kode audit sebagai nilai tersimpan; terjemahkan hanya di lapisan tampilan.         |
| Kata bahasa Indonesia lebih panjang dan memengaruhi tata letak PDF/UI | Uji rendering dengan font yang sudah ada; sesuaikan wrapping di sertifikat dan tombol.     |
| Rute menjadi dinamis karena `cookies()`                               | Terima untuk area aplikasi; pertahankan static generation untuk halaman publik jika perlu. |
| Test yang mengekspektasi teks Inggris gagal                           | Ubah assertion menjadi kunci kamus atau jalankan test dengan locale `en` sebagai default.  |
| Signer menerima bahasa yang tidak sesuai browser                      | Simpan locale saat pengiriman; gunakan `Accept-Language` hanya sebagai fallback.           |

## 7. Kriteria selesai

- [ ] Kunci `en` dan `id` sama persis; tidak ada string UI yang tertinggal hardcoded di area yang disepakati.
- [ ] Email dan halaman `/sign/<token>` konsisten dalam satu bahasa untuk envelope yang dikirim dari UI Indonesia.
- [ ] `<html lang>` mengikuti locale aktif.
- [ ] Link lama, API v1, webhook, cron, SSO callback, dan embed tetap berfungsi.
- [ ] `npm test`, `npm run test:db`, `npm run test:e2e`, `npm run typecheck`, dan `npm run lint` lulus.
- [ ] README tidak lagi menyatakan bahwa halaman tanda tangan hanya berbahasa Inggris.

## 8. Perkiraan

Cakupan penuh (Fase 1–4) sekitar 2–4 minggu kerja satu orang, dengan asumsi terjemahan dan tinjauan legal sudah tersedia. Fase 1 saja biasanya menjadi rilis pertama yang paling terasa manfaatnya.

## 9. Status implementasi Fase 1

Sudah terpasang:

- Fondasi di `src/lib/i18n/`: tipe locale, resolver `Accept-Language` dan cookie, kamus `en`/`id`, `formatMessage`, `getRequestLocale`, dan provider Client Component.
- `src/proxy.ts` meneruskan `x-signudoc-locale` ke Server Component dan menetapkan `NEXT_LOCALE` untuk halaman tanpa mengubah URL.
- `src/app/layout.tsx` memakai `<html lang={locale}>` dan membungkus aplikasi dengan provider pesan.
- Pemilih bahasa di footer publik (`src/components/layout/locale-switcher.tsx`) menulis cookie `NEXT_LOCALE` lewat Server Action dan menyegarkan halaman tanpa menyentuh URL. Bendera `src/components/flags/` dipakai sebagai penanda locale. Pemilih ini sengaja disembunyikan di `/sign/<token>` dan `/embed/sign/<token>` karena bahasa envelope yang menang di sana.
- Permukaan signer: halaman status, verifikasi, shell proses, layar selesai, dan footer publik.
- Teks persetujuan elektronik memiliki versi terpisah untuk bahasa Indonesia, sehingga jejak audit mencatat kata-kata yang benar-benar dibaca.
- Email undangan (termasuk setelah koreksi signer), pengingat, kode akses, pemberitahuan penyelesaian, penolakan, pembatalan, dan tautan unduhan baru mengikuti locale yang dipilih saat envelope dikirim (`db/migrations/20261121000000_signer_locales.sql`).
- Halaman Verify, halaman landing publik (`src/components/landing/landing-shell.tsx` beserta tombol sesinya dan metadata halaman), dan email signer diterjemahkan; string internal (event webhook, tipe email, kode galat, token, hash, URL, `disclosureVersion`, dan teks PDF/PAdES) sengaja tidak diubah.
- Halaman harga publik (`/pricing`) memakai kamus yang sama; teksnya ada di `pricingPage`, sedangkan angka dan batas paket ada di `src/lib/pricing.ts`. Harga dan batas paket tersebut masih usulan bisnis, bukan batas teknis aplikasi, dan belum ada alur pembayaran.
- Logo hosted memakai `public/img/logo.svg` di header web dan `public/img/logo.png` di email. Keduanya aset statis yang dipercaya; jalur upload logo organisasi tetap hanya menerima PNG/JPEG/WebP karena SVG berisiko sebagai konten pengguna dan sering tidak tampil di klien email. `HOSTED_BRANDING.logoUrl` dipakai `<Brand />`, sementara `emailLogoUrl` dipakai `buildLogoHeader()`.
- Halaman `/terms` tetap satu URL; seluruh teksnya berasal dari `legal.terms` di kedua kamus. Isinya ditulis ulang untuk konteks Indonesia (UU ITE, PP 71/2019, UU PDP 27/2022, UU Perlindungan Konsumen), bukan sekadar diterjemahkan. Tanggal efektif tunggal ada di `src/lib/legal-date.ts` dan diformat memakai `Intl.DateTimeFormat` sesuai locale; label "Terakhir diperbarui" ada di `common.lastUpdated`. Terjemahan dan kontennya sudah ditinjau ahli hukum dan dinyatakan aman pada 2026-11-22.
- Halaman `/privacy` juga tetap satu URL dan memakai `legal.privacy` di kedua kamus. Isinya ditulis ulang untuk UU PDP 27/2022 (dasar pemrosesan Pasal 20, hak Pasal 5–13, notifikasi insiden 3 × 24 jam Pasal 46, transfer Pasal 56), UU ITE, dan PP 71/2019; PP 33/2026 mulai berlaku 16 Januari 2027. Penyedia dipakai dengan nama (Vercel, Vercel Blob, Neon, Resend, HIBP, eID Easy/CSC, webhook, dan lain-lain), retensi memakai angka dari kode, dan SLA permohonan hak adalah 30 hari. Tanggal efektif privacy terpisah (`PRIVACY_EFFECTIVE_DATE`) memakai formatter yang sama. Helper `LegalContactParagraph` dipakai bersama oleh `/terms` dan `/privacy`. Terjemahan dan kontennya sudah ditinjau ahli hukum dan dinyatakan aman pada 2026-11-22; yang masih perlu dipastikan secara operasional sebelum rilis hanyalah identitas badan hukum pengendali dan narahubung PDP.
- Halaman `/accessibility` juga tetap satu URL dan memakai `legal.accessibility` di kedua kamus. Isinya ditinjau agar jujur tentang kondisi produk: pratinjau PDF berbasis `canvas`, penempatan kolom dengan pointer, dan keterbatasan PDF hasil pindai disebut terus terang; tidak ada klaim kepatuhan WCAG penuh. Bagian standar menambahkan UU Nomor 8 Tahun 2016 tentang Penyandang Disabilitas sebagai konteks Indonesia, dengan WCAG 2.2 Tingkat AA sebagai acuan teknis. Helper `LegalContactParagraph` kini dipakai bersama oleh `/terms`, `/privacy`, dan `/accessibility`, dengan tanggal efektif `ACCESSIBILITY_EFFECTIVE_DATE`.
- Halaman `/contact` tetap satu URL dan memakai `contact` di kedua kamus, termasuk metadata, judul, deskripsi, label/placeholder formulir, pesan sukses, validasi sisi klien, dan pesan galat dari API. `ContactForm` adalah Client Component yang membaca kamus lewat `useMessages()`; rute `/api/contact` membaca header locale yang diteruskan proxy langsung dari objek `Request`, lalu meneruskannya ke `submitPublicContactMessage()` supaya pesan galat tidak kembali ke bahasa Inggris. Halaman ini adalah formulir, bukan dokumen kebijakan, sehingga `lastUpdated` sengaja tidak ditampilkan. Balasan 429/403 dari proteksi laju dan bot diterjemahkan di klien; isi surel internal ke tim dukungan tetap bahasa Inggris.
- Halaman `/electronic-signatures` tetap satu URL dan seluruh teksnya kini berasal dari `permittedUse` di kedua kamus. `src/lib/permitted-uses.ts` hanya menyimpan `PERMITTED_USE_PATH` dan `PERMITTED_USE_VERSION`; versi dinaikkan ke `2026-11-22` karena daftar dan terjemahannya berubah, lalu ditampilkan memakai `formatLegalDate()` seperti halaman legal lain. Judul lama "What Signudoc is/is not" dan deskripsi "`{productName}` uses Signudoc" sudah diganti menjadi Sakta lewat placeholder `{platformName}`. Ditambahkan bagian "Di Indonesia" yang memakai UU ITE dan PP 71/2019 serta menyatakan bahwa Sakta tidak menerbitkan sertifikat elektronik dari Penyelenggara Sertifikat Elektronik. Klaim US ESIGN/UETA/ESRA, eIDAS SES/AdES/QES, FDA 21 CFR Part 11, dan HIPAA diterjemahkan apa adanya; seluruh kontennya sudah ditinjau ahli hukum dan dinyatakan aman pada 2026-11-22.
- Permukaan dasbor (`src/components/dashboard/dashboard-documents-surface.tsx` dan `dashboard-shell.tsx`) memakai `dashboard` di kedua kamus. Komponen permukaan menerima teks lewat prop `copy` agar bisa dipakai baik sebagai Client Component di dasbor maupun Server Component di pratinjau landing; `DashboardShell` membaca kamus lewat `useMessages()`. `filterOptions`, `dashboardStatusFilterMap`, dan `DashboardFilter` tetap memakai identifier Inggris karena merupakan kunci internal yang dipakai untuk memfilter data, bukan teks tampilan. Teks turunan pada kartu (`contextLine`, `statusLabel`, `createdAtLabel`) kini dibuat di `src/lib/dashboard-labels.ts` memakai locale yang diteruskan dari `/dashboard`, sehingga tanggal dan status mengikuti bahasa pembaca. Pratinjau dasbor di landing bersifat dekoratif (`aria-hidden`) tetapi kini memakai data contoh yang diterjemahkan. Label menu navigasi di `src/components/layout/nav-items.tsx` kini berasal dari `shell.nav` lewat `getPrimaryNavItems(copy)`; `href` tidak berubah. Menu akun publik dibahas pada commit shell terpisah.
- Halaman daftar template (`src/components/templates/templates-shell.tsx`) memakai `templates` di kedua kamus lewat `useMessages()`, termasuk judul, deskripsi, keadaan kosong/galat, label tombol, dan dialog hapus. Teks turunan template (`createdAtLabel`, `fieldCountLabel`, `pageCountLabel`) dibuat di `src/lib/template-labels.ts` dengan locale dari `/templates`, `/templates/[id]/use`, dan `/templates/[id]/send-many`; identifier internal dan jalur API tidak berubah. Balasan galat dari rute hapus tetap memakai pesan aslinya apabila API mengirimkannya.
- Folder `src/components/envelopes/` sudah dilokalisasi bertahap: `pdf-page-canvas.tsx`, `interactive-placed-field.tsx`, `upload-shell.tsx`, `review-shell.tsx`, `signers-shell.tsx`, dan `envelope-detail-shell.tsx` memakai `envelope.*` dari kedua kamus lewat `useMessages()`/`formatMessage()`. `signer-palette.ts` hanya berisi data warna, sehingga tidak ada teks yang perlu diubah. Opsi pengingat di UI memakai `formatReminderIntervalMessage()` dari `src/lib/i18n/reminder-labels.ts`; helper `formatReminderInterval()` di `src/lib/services/reminders.ts` sengaja tetap untuk surel/audit. Status internal, nilai `SIGNER_CHECK_VALUES`, endpoint, payload, kode galat, event name, `name`, `id`, `data-testid`, dan URL tidak diubah. `prepare-live-shell.tsx` kini juga memakai `envelope.prepare` dari kedua kamus lewat `useMessages()`/`formatMessage()`, termasuk label alat, inspektur, panel penandatangan, status simpan, dan pesan validasi pilihan. Blok `required` yang diubah secara lokal di luar cakupan lokalisasi sengaja dibiarkan apa adanya; hanya teks di sekitarnya yang diterjemahkan. Dua komponen bersama (`document-viewport.tsx` dan `step-indicator.tsx`) masih tertunda.
- Pengaturan akun (`/settings`) memakai kamus `settings.*` di kedua kamus. `SettingsShell`, organisasi, keamanan, sesi, mode Part 11, data penandatangan, branding, embed, kunci API, webhook, masuk dua langkah, orang, dan pembaruan membaca teks lewat `useMessages()`/`formatMessage()`. Status kunci API, label event webhook, alasan galat audit, dan durasi kini memakai kunci kamus; tanggal serta waktu memakai `intlLocales` (`id-ID`). Endpoint, payload, kode galat, nama event, `name`, `id`, `data-testid`, dan URL tidak diubah. `CUSTOM_DISCLOSURE_NOTICE`/`CUSTOM_DISCLOSURE_LEGAL_NOTE` sengaja tidak diterjemahkan karena menyangkut teks hukum dan versi audit. Pembungkus halaman `/two-step-setup` di luar `TwoFactorPanel` sudah memakai `shell.twoStepSetup`. Layar `/login` dan `/signup` (`src/components/auth/*`) kini juga memakai `auth.*` di kedua kamus: label, placeholder, validasi, dialog lupa kata sandi, atur ulang kata sandi, kode dua langkah, dan tombol SSO. Pesan kanonik Better Auth serta aturan pendaftaran dari server tetap tidak diubah pada lapisan internal; `src/lib/i18n/auth-messages.ts` hanya memetakan teks yang ditampilkan ke bahasa pembaca. Endpoint, payload, kode galat, dan URL tidak berubah.
- README tidak lagi menyatakan halaman tanda tangan hanya berbahasa Inggris.

### Alur kerja verifikasi

Agar proses terjemahan tidak terhambat oleh pemeriksaan yang mahal, verifikasi dibagi dua tahap:

- **Setiap batch terjemahan:** jalankan hanya `bun run lint` dan `bun run typecheck`. `typecheck` tetap disertakan karena perubahan kamus rawan salah ketik kunci; `lint` saja tidak menangkapnya. Keduanya selesai dalam hitungan detik.
- **Setelah seluruh permukaan selesai:** jalankan sekali `bun run typecheck`, `bun run build`, tes i18n terarah, `bun run test`, `bun run test:db`, `bun run format:check`, `git diff --check`, dan E2E (minimal `e2e/localization.spec.ts`). E2E sengaja ditunda karena setiap run membangun ulang aplikasi production, menyiapkan database segar, dan menyalakan browser.

Aturan ini disepakati 2026-11-22. Percobaan E2E yang sudah tercatat di bawah tetap berlaku untuk bukti historis, tetapi tidak perlu diulang tiap kali ada perubahan teks.

Hasil verifikasi pada mesin pengembangan:

- `bun run typecheck`: lulus.
- `bun run build`: lulus.
- `bun run test`: 530 test; 529 lulus. Satu test palet gagal hanya karena nilai `--accent` lokal yang diubah di luar cakupan lokalisasi dan belum di-commit; test terkait lokalisasi dan hukum lolos semua.
- Tes i18n terarah (`src/lib/i18n/i18n.test.ts`): 19 dari 19 lulus, termasuk assertion copy `/settings`, opsi pengingat, detail amplop, wizard penempatan kolom, layar autentikasi, dan paritas kuncinya.
- `bun run test:db`: 392 dari 393 lulus. Satu kasus di `src/lib/signer-correction.dbtest.ts` gagal karena perubahan lokal di `src/lib/signing.ts` yang mengganti pesan "This link has expired." menjadi "This envelope has been expired."; perubahan itu di luar cakupan lokalisasi dan sengaja tidak disentuh.
- `git diff --check`: bersih. `bun run format:check` dan `bun run lint` hanya melaporkan satu temuan format di `src/lib/brand-color.ts` dari perubahan palet lokal di luar cakupan ini (plus satu info Biome bawaan di `src/lib/envelopes.ts`); file dalam cakupan lokalisasi bersih.
- `bun run test:e2e -- e2e/localization.spec.ts`: 5 dari 5 lulus; `Accept-Language: id-ID` menghasilkan `<html lang="id">`, teks Indonesia, dan cookie `NEXT_LOCALE=id` yang bertahan setelah reload. Pemilih di footer mengganti bahasa tanpa mengubah URL. Regresi `/settings` memastikan rute itu tidak berubah menjadi `/id/settings`. Teks panel settings sendiri diverifikasi lewat tes kamus karena E2E mandiri tidak memiliki sesi administrator.
- Verifikasi akhir diulang pada 2026-11-22 setelah batch detail amplop dan batch wizard penempatan kolom: `bun run build`, tes i18n terarah, E2E lokalisasi, dan `git diff --check` lulus. Dua kegagalan yang tercatat di atas masih berasal dari perubahan lokal di luar cakupan lokalisasi.
- Setelah set favicon Sakta dipasang, `playwright.config.ts` juga diperbarui: pemeriksaan kesiapan web server memakai `/icon0.svg`, bukan `/icon.svg` yang sudah dihapus. E2E lokalisasi dijalankan ulang dan tetap 5 dari 5 lulus.

Kegagalan e2e penuh yang semula terlihat berasal dari lingkungan, bukan lokalisasi: `SUPPORT_EMAIL` di `.env` lokal membuat langkah validasi setup dilewati, dan aset worker PDF.js 5.5.207 tidak cocok dengan `pdfjs-dist` 6.5.438 yang dipakai aplikasi, sehingga unggahan PDF gagal dirender di editor. Keduanya dibersihkan lewat environment test dan perbaikan aset di luar cakupan lokalisasi. Tidak ada kegagalan yang menyentuk teks atau rute lokalisasi.

Tinjauan hukum/penutur asli atas seluruh konten yang tercantum di atas sudah selesai dan dinyatakan aman pada 2026-11-22. Masih perlu sebelum rilis: konfirmasi akhir e2e penuh setelah perbaikan aset worker dan keputusan bisnis yang tercatat di `docs/backlog.md`. `bun run lint` kini memakai Biome dan dapat berjalan dengan TypeScript 7.

## 10. Referensi

- Panduan i18n Next.js 16: `node_modules/next/dist/docs/01-app/02-guides/internationalization.md`
- Proxy yang sudah ada: `src/proxy.ts`
- Root layout: `src/app/layout.tsx`
- Jenis email: `src/lib/types/domain.ts:105-124`
- Konfigurasi deploy dan cron: `vercel.json`
