# 🎮 GamePedia & Build Calculator
GamePedia Hub adalah platform web *full-stack* (React.js + Node.js Express) yang dirancang untuk membantu para gamer mengatasi masalah **Grind Fatigue** (kelelahan akibat terlalu banyak *farming*) dan **Informasi Terfragmentasi** (informasi game yang tersebar di banyak situs). 
Aplikasi ini menyediakan dasbor terpusat berisi panduan karakter, kalkulator kebutuhan material otomatis, serta lembar kontrol eksplorasi (*checklist*) interaktif.
---
## 🚀 1. Panduan Cara Menjalankan Program
Pastikan Anda sudah menginstal **Node.js** di komputer sebelum mengikuti langkah di bawah ini.
### Tahap A: Menjalankan Server Backend (API)
1. Buka terminal atau Command Prompt baru, lalu masuk ke folder backend:
   ```bash
   cd backend
Install modul pendukung (express & cors):
   ```bash
   cd backend
   ```
Jalankan server backend:
   ```bash
   npm start
   ```
Server akan aktif di http://localhost:5000

Tahap B: Menjalankan Interface Frontend (React)
Buka jendela terminal atau Command Prompt baru lainnya (jangan tutup terminal backend).

Masuk ke folder frontend:
   ```bash
   cd frontend
   ```
Install seluruh dependensi React dan Tailwind CSS:

   ```bash
   npm install
   ```
Jalankan server lokal frontend:

   ```bash
   npm run dev
   ```
Buka browser Anda dan akses alamat yang tertera di terminal, biasanya: http://localhost:5173/

🛠️ 2. Penjelasan Fungsi Struktur Berkas & Kode Utama
Proyek ini dibangun menggunakan arsitektur pemisahan Client-Server (Frontend & Backend). Berikut adalah fungsi dari beberapa file dan potongan kode krusial yang ada di dalam proyek:

📁 Sisi Backend (/backend)
package.json: Menyimpan informasi metadata proyek backend serta mendaftarkan library express (untuk membuat server) dan cors (agar backend mengizinkan akses request dari domain frontend).

server.js: Pusat kendali backend. Di file ini server dikonfigurasi untuk menyediakan data database tiruan (mock data) berupa array objek karakter, formula kalkulator, dan item koleksi melalui protokol REST API (app.get('/api/...')).

📁 Sisi Frontend (/frontend)
index.html: Pintu masuk utama (entry point) aplikasi web bagi browser. Di dalamnya terdapat sebuah tag <div id="root"></div> kosong yang nantinya akan disuntik dan diisi oleh seluruh komponen visual dari React.

src/main.jsx: Berkas jembatan yang bertugas mengambil komponen utama App.jsx dan merendernya (menempelkannya) secara fisik ke dalam elemen HTML div yang memiliki id="root".

src/index.css: Berkas stylesheet tempat memanggil aturan global @import "tailwindcss"; untuk mengaktifkan seluruh utility classes milik Tailwind CSS v4.

src/App.jsx: Otak dari seluruh tampilan antarmuka (UI). Berkas ini mengelola logika interaktif menggunakan beberapa fitur utama React:

🧠 3. Penjelasan Logika Kode Penting di App.jsx
Di dalam App.jsx, terdapat beberapa fungsi dan React Hooks yang memegang peran penting:

useState (State Management)
Digunakan untuk menyimpan data yang sifatnya dinamis atau bisa berubah akibat interaksi user pada layar.

Contoh: const [activeTab, setActiveTab] = useState('wiki') digunakan untuk melacak tab halaman mana yang sedang dibuka oleh pengguna saat ini (Wiki, Kalkulator, atau Map).

useEffect (Side Effects & API Fetching)
Digunakan untuk menjalankan blok kode tertentu secara otomatis sesaat setelah halaman web selesai dimuat di browser.

Fungsi: Di dalam proyek ini, useEffect bertugas melakukan fungsi fetch() ke URL http://localhost:5000/api/... untuk mengambil data mentah dari backend secara asinkronus lalu menyimpannya ke dalam state React.

localStorage (Persistence Data)
Digunakan untuk menyimpan status checklist pencarian hidden chest langsung di dalam memori internal browser pengguna.

Fungsi: Dengan memanfaatkan localStorage.setItem(), data centang milik user tidak akan hilang atau ter-reset kembali ke awal meskipun halaman web di-refresh atau browser ditutup.

Fungsi handleCalculate()
Fungsi matematika kustom yang bertugas melakukan iterasi (looping) menggunakan rumus .forEach() melewati baris data formula material. Fungsi ini mencocokkan rentang level input user dengan target level, lalu menjumlahkan akumulasi biaya Gold serta item drop secara otomatis.
