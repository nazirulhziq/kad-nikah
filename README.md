# Undangan Pernikahan Digital (Static HTML) 💍

Ini adalah template undangan pernikahan digital berbasis web yang dibuat dalam **satu file HTML statis**. Desainnya modern, bersih, dan sepenuhnya responsif sehingga tampil baik di desktop maupun perangkat mobile.

Proyek ini sangat ringan dan mudah untuk dikustomisasi bahkan oleh pemula sekalipun.


*(Ganti gambar ini dengan screenshot undanganmu setelah berhasil di-deploy)*

---

## ✨ Fitur Utama

-   **📁 Single File:** Semua kode (HTML, CSS, JavaScript) ada dalam satu file untuk kemudahan berbagi.
-   **📱 Desain Responsif:** Tampilan otomatis menyesuaikan dengan ukuran layar (PC, tablet, HP).
-   **🎵 Musik Latar:** Dilengkapi musik yang akan diputar otomatis dengan tombol kontrol (play/pause).
-   **💌 Halaman Sampul:** Halaman pembuka yang elegan sebelum menampilkan detail undangan.
-   **⏳ Hitung Mundur:** Countdown timer menuju hari H pernikahan.
-   **🗺️ Integrasi Google Maps:** Tombol yang langsung membuka lokasi acara di Google Maps.
-   **🎁 Hadiah Digital:** Bagian khusus untuk menampilkan informasi rekening atau dompet digital.
-   **💬 Tombol Ucapan WhatsApp:** Memudahkan tamu untuk mengirim doa dan ucapan langsung ke nomor WhatsApp Anda.
-   **🚀 Siap Deploy:** Sangat mudah untuk di-hosting secara gratis di platform seperti Vercel, Netlify, atau GitHub Pages.

---

## 🛠️ Cara Kustomisasi

Buka file `undangan.html` dengan teks editor (seperti VS Code) dan cari bagian yang ditandai dengan komentar ``.

### Teks & Informasi

1.  **Judul Halaman:** Ubah teks di dalam tag `<title>` di bagian `<head>`.
2.  **Nama Mempelai:** Ganti nama di bagian *Cover* dan di bagian *Section Mempelai*.
3.  **Detail Orang Tua:** Sesuaikan nama orang tua untuk kedua mempelai.
4.  **Detail Acara:** Ubah tanggal, waktu, dan alamat untuk **Akad Nikah** dan **Resepsi**.
5.  **Link Google Maps:** Ganti link `href` pada tombol "Lihat Peta" dengan link Google Maps lokasi acaramu.
6.  **Tanggal Hitung Mundur:** Di dalam tag `<script>` paling bawah, ubah tanggal di baris `const weddingDate = new Date("2025-12-21T09:00:00").getTime();`. Formatnya adalah `YYYY-MM-DDTHH:MM:SS`.
7.  **Informasi Hadiah:** Sesuaikan nama bank, nomor rekening, dan nama pemilik.
8.  **Nomor WhatsApp:** Ganti nomor `628123456789` pada link tombol "Kirim Ucapan via WhatsApp".

### Gambar & Musik

1.  **Foto & Gambar Latar:**
    -   Untuk mengubah foto, upload dulu fotomu ke situs hosting gambar gratis seperti [Postimages](https://postimages.org/) atau [ImgBB](https://imgbb.com/).
    -   Salin URL gambar yang kamu dapatkan.
    -   Tempel URL tersebut untuk menggantikan URL gambar yang ada di dalam kode (misalnya pada `background-image: url('...')` untuk cover, dan `src="..."` untuk foto mempelai).
2.  **Musik Latar:**
    -   Cari file musik `.mp3` yang kamu inginkan.
    -   Upload file tersebut ke layanan hosting file atau cari URL `.mp3` yang tersedia online.
    -   Ganti link `src` di dalam tag `<audio>` dengan link `.mp3` baru.

---

## 🚀 Cara Deploy ke Vercel (Gratis!)

Dalam 5 menit, undanganmu akan online dan memiliki link demo yang bisa dibagikan.

1.  **Siapkan Akun:**
    -   Buat akun di [**GitHub**](https://github.com).
    -   Buat akun di [**Vercel**](https://vercel.com) (pilih "Continue with GitHub").

2.  **Buat Repositori di GitHub:**
    -   Di halaman utama GitHub, klik **"New"** untuk membuat repositori baru.
    -   Beri nama repositori (misal: `undangan-nikah-digital`).
    -   Pilih **"Public"** dan klik **"Create repository"**.

3.  **Upload File:**
    -   Di halaman repositorimu, klik **"Add file" > "Upload files"**.
    -   Upload file `undangan.html` dan `README.md` (opsional) ke sana.
    -   Klik **"Commit changes"**.

4.  **Deploy di Vercel:**
    -   Login ke dashboard Vercel Anda.
    -   Klik **"Add New..." > "Project"**.
    -   Pilih repositori GitHub yang baru saja kamu buat, lalu klik **"Import"**.
    -   Vercel akan otomatis mendeteksi bahwa ini adalah proyek statis. Kamu tidak perlu mengubah pengaturan apa pun.
    -   Klik tombol **"Deploy"**.

5.  **Selesai! 🎉**
    -   Tunggu sekitar 30 detik hingga proses build selesai.
    -   Vercel akan memberikan **link demo publik** (seperti `undangan-nikah-digital.vercel.app`). Link inilah yang bisa kamu bagikan ke semua tamu!
