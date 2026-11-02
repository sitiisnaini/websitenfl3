# Nusantara Future Leaders 2026 — Website

Website statis berbasis HTML, CSS, dan JavaScript. Tidak membutuhkan database, framework, Node.js, atau proses build. Cocok untuk GitHub Pages, Hostinger, dan hosting statis lainnya.

## 1. Menjalankan website di komputer

1. Ekstrak folder `nfl-website`.
2. Buka `index.html` dengan browser, atau gunakan ekstensi Live Server di VS Code.
3. Untuk menjalankan server lokal tanpa ekstensi, buka terminal pada folder ini lalu jalankan:

   ```bash
   python -m http.server 5500
   ```

   Buka `http://localhost:5500` di browser.

## 2. Bagian yang paling sering diedit

| Yang ingin diubah | File |
|---|---|
| Link Google Form pendaftaran | `js/data.js` → `links.registration` |
| Website, Instagram, email, nomor narahubung | `js/data.js` → bagian `links` |
| Foto carousel dan caption | `js/data.js` → bagian `gallery` |
| Nama dan kutipan testimoni contoh | `js/data.js` → bagian `testimonials` |
| Pertanyaan dan jawaban FAQ | `js/data.js` → bagian `faqs` |
| Warna, ukuran, font, layout, dan animasi | `css/style.css` → bagian `:root` dan selector terkait |
| Susunan/struktur section dan isi statis | `index.html` |

**Mengganti link pendaftaran:** cukup ubah nilai `registration` di `js/data.js`. Tombol `Daftar` di header, `Daftar Sekarang`, dan `Daftar` di footer menggunakan satu nilai yang sama.

Catatan: alamat website saya isi sebagai `https://www.nflugm.id` berdasarkan penulisan domain pada brief. Periksa kembali domain resminya sebelum dipublikasikan.

## 3. Mengganti placeholder dokumentasi

Saat ini lima gambar carousel (`assets/galeri-01.svg` sampai `assets/galeri-05.svg`) adalah ilustrasi placeholder, bukan dokumentasi asli NFL. Untuk menggantinya:

1. Masukkan foto dokumentasi ke folder `assets`, misalnya `foto-nfl-01.jpg`.
2. Buka `js/data.js` dan ubah `src` pada daftar `gallery`, misalnya menjadi `assets/foto-nfl-01.jpg`.
3. Ubah `alt`, `caption`, dan `label` sesuai foto tersebut.
4. Foto sebaiknya landscape dengan rasio sekitar 16:7 atau 16:9 agar komposisinya pas.

Testimoni di halaman juga merupakan teks contoh. Ganti nama dan kutipan pada array `testimonials` di `js/data.js`. Avatar berisi inisial sehingga tidak menggunakan foto orang sungguhan.

## 4. Mengubah jadwal acara dan isi halaman

Jadwal dan detail acara berada di `index.html`, pada section `<!-- EVENTS -->`. Tanggal Get to Know, Pre Class, Camp, daftar aktivitas, dan keterangan Coming Soon bisa langsung diganti di sana.

Konten pengenalan, isu, benefit, dan CTA juga diberi komentar section agar mudah ditemukan menggunakan pencarian komentar di VS Code.

## 5. Mengunggah ke GitHub Pages

1. Buat repository baru di GitHub.
2. Unggah seluruh isi folder ini (pastikan `index.html` berada di root repository).
3. Masuk ke **Settings → Pages**.
4. Pada bagian Build and deployment, pilih **Deploy from a branch**.
5. Pilih branch `main` dan folder `/ (root)`, lalu simpan.
6. Tunggu proses deployment GitHub Pages selesai dan buka URL yang diberikan GitHub.

## 6. Mengunggah ke Hostinger

1. Buka File Manager pada hosting.
2. Masuk ke folder `public_html`.
3. Unggah seluruh file dan folder proyek (`index.html`, `css`, `js`, dan `assets`).
4. Pastikan `index.html` berada langsung di dalam `public_html`, bukan di dalam subfolder tambahan.

## Catatan teknis

- Website ini adalah **front-end statis**. Formulir pendaftaran diarahkan ke Google Forms; website tidak menyimpan data pendaftar sendiri.
- Font dekoratif `Rye` dan font teks `DM Sans` dimuat dari Google Fonts. Saat internet tidak tersedia, browser menggunakan font fallback.
- Animasi reveal, carousel otomatis, menu mobile, accordion FAQ, detail timeline, serta indikator scroll sudah memakai JavaScript biasa.
- Pengaturan `prefers-reduced-motion` dihormati untuk pengguna yang membatasi animasi.
