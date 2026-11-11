# Wedding Website Tio & Gia

Template undangan digital floral-romantic, responsif untuk HP dan desktop.

## Sudah tersedia
- Nama Tio & Gia dan tanggal 17 Januari 2027
- Countdown menuju 17 Januari 2027 pukul 09.00 WIB
- Detail acara pukul 09.00 dan 10.30 WIB
- Tautan pencarian lokasi Google Maps
- Galeri foto
- Tombol musik MP3 (perlu interaksi pengunjung untuk memulai)
- Form RSVP + ucapan (perlu menghubungkan Google Sheets)

## A. Personalisasi foto
Ganti file gambar di folder `images` dengan foto milik sendiri dan gunakan nama file:
- `prewed1.jpg` — foto cover utama
- `prewed2.jpg`, `prewed3.jpg`, `prewed4.jpg` — foto galeri

Disarankan foto JPG/WebP yang sudah dikompres agar website cepat dibuka. Jika foto format PNG, ubah nama/format atau sesuaikan nama file di `index.html`.

## B. Memasang musik MP3
1. Siapkan musik yang boleh digunakan dan ubah namanya menjadi `wedding.mp3`.
2. Letakkan file tersebut ke folder `music`.
3. Upload bersama file website.
4. Pengunjung menekan tombol "Putar musik" untuk memulai. Browser umumnya tidak mengizinkan autoplay bersuara sebelum ada interaksi.

## C. Mengaktifkan RSVP ke Google Sheets
1. Buat Google Sheet baru, beri nama misalnya `RSVP Tio Gia`.
2. Pilih Extensions > Apps Script.
3. Hapus kode contoh, lalu salin isi file `apps-script.gs`.
4. Simpan proyek.
5. Klik Deploy > New deployment > pilih jenis Web app.
6. Execute as: Me. Who has access: Anyone.
7. Klik Deploy dan izinkan akses sesuai instruksi Google.
8. Salin URL Web App yang berakhiran `/exec`.
9. Buka `script.js`, cari `const RSVP_ENDPOINT = "";`, lalu tempel URL di antara tanda kutip.
10. Simpan dan upload ulang `script.js` ke GitHub.

Uji dengan mengirim RSVP percobaan. Pastikan baris baru muncul di Google Sheet. Karena endpoint menggunakan mode `no-cors`, halaman tidak dapat membaca balasan server secara langsung; pesan sukses di halaman berarti permintaan sudah dikirim, bukan bukti mutlak data telah tersimpan. Periksa Google Sheet saat pengujian.

## D. Publikasi gratis dengan GitHub Pages
### Laptop/komputer
1. Buat akun di https://github.com/
2. Buat repository baru, misalnya `wedding-tio-gia`. Untuk GitHub Free, pilih Public.
3. Upload semua isi folder ini (index.html harus berada di root repository, bukan di dalam folder lain).
4. Buka Settings > Pages.
5. Pada Build and deployment, pilih Deploy from a branch.
6. Branch: `main`; folder: `/ (root)`; klik Save.
7. Tunggu beberapa menit. URL akan berbentuk `https://USERNAME.github.io/wedding-tio-gia/`.

### HP Android
1. Buka github.com melalui Chrome dan aktifkan tampilan Situs desktop bila perlu.
2. Login, buat repository Public bernama `wedding-tio-gia`.
3. Masuk repository > Add file > Upload files.
4. Pilih file-file dari penyimpanan HP. Pastikan `index.html`, `style.css`, `script.js`, folder `images`, dan folder `music` ikut terunggah. Jika pemilih file HP tidak mendukung folder, unggah file satu per satu dan buat folder melalui penamaan path seperti `images/prewed1.jpg`.
5. Commit changes.
6. Aktifkan GitHub Pages melalui Settings > Pages seperti langkah laptop.
7. Buka URL yang diberikan GitHub.

## E. Detail yang perlu dilengkapi
- Ganti teks "Nama orang tua Tio" dan "Nama orang tua Gia" dengan nama orang tua.
- Pastikan penamaan "Akad Nikah" untuk jam 09.00 dan "Resepsi" untuk jam 10.30 sudah sesuai.
- Alamat sudah diisi berdasarkan detail yang diberikan: Komplek Sapan Melati RT 002 / RW 011, Desa Sumbersari, Kecamatan Ciparay, Kabupaten Bandung. Tautan Maps saat ini berupa pencarian alamat; sebaiknya ganti dengan tautan pin lokasi yang tepat setelah titik lokasi dipastikan.
- Tambahkan nomor kontak/nomor WhatsApp jika ingin dicantumkan.

## Catatan privasi
Repository GitHub Pages gratis umumnya perlu Public. Semua foto, detail acara, dan halaman website dapat dilihat siapa pun yang memiliki link atau menemukan repository. Jangan unggah data sensitif. RSVP yang dikirim ke Google Sheets akan tersimpan di akun Google pemilik Sheet.
