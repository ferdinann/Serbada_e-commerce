# Serbada E-Commerce MVP

**Serbada** adalah aplikasi E-Commerce MVP (Minimum Viable Product) berbasis web yang dirancang untuk toko online sederhana namun fungsional. Aplikasi ini memungkinkan pelanggan melihat katalog, mencari produk, mengelola keranjang belanja, dan melakukan checkout otomatis yang terhubung langsung ke WhatsApp penjual.

Selain itu, tersedia fitur **Admin Dashboard** bagi penjual untuk mengelola (CRUD) data produk.

## 🚀 Fitur Utama

### Untuk Pelanggan (Customer)
- **Katalog Produk:** Tampilan grid produk responsif dengan gambar, nama, kategori, dan harga.
- **Detail Produk:** Modal popup interaktif untuk melihat deskripsi lengkap produk.
- **Pencarian Cerdas:** Cari produk dengan mengetik kata kunci dan menekan `Enter`.
- **Filter Kategori:** Filter produk berdasarkan kategori (Fashion, Elektronik, Aksesoris, dll).
- **Keranjang Belanja:**
  - Tambah produk dengan jumlah kustom (Qty popup).
  - Ubah jumlah atau hapus item di halaman keranjang.
  - Ringkasan total harga otomatis.
- **Checkout WhatsApp:** Mengirim detail pesanan (Barang, Qty, Total, Data Pembeli) langsung ke chat WhatsApp Admin.

### Untuk Penjual (Admin)
- **Login Sederhana:** Akses khusus untuk penjual.
- **Dashboard Produk:**
  - **Create:** Tambah produk baru (Nama, Harga, Kategori, Deskripsi).
  - **Read:** Lihat daftar semua produk dalam tabel.
  - **Update:** Edit informasi produk yang sudah ada.
  - **Delete:** Hapus produk dari katalog.
- **Upload Gambar:** Mendukung input URL gambar eksternal ATAU upload file gambar dari komputer lokal (konversi Base64).

## 🛠️ Teknologi yang Digunakan

Aplikasi ini dibangun menggunakan teknologi web modern:

- **Library Utama:** [React.js](https://react.dev/) (v19.x)
- **Bahasa:** [TypeScript](https://www.typescriptlang.org/) (untuk keamanan tipe data yang ketat)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v3.x via CDN untuk styling cepat dan responsif)
- **Routing:** [React Router DOM](https://reactrouter.com/) (v7.x untuk navigasi Single Page Application)
- **Ikon:** [Lucide React](https://lucide.dev/) (Koleksi ikon open-source yang ringan)
- **State Management:** React Context API (Built-in, tanpa library tambahan seperti Redux).

## 📦 Persiapan & Cara Menjalankan (Local Development)

Karena proyek ini menggunakan format `.tsx` (TypeScript JSX), Anda memerlukan *bundler* atau lingkungan *runtime* JavaScript untuk menjalankannya. Cara termudah adalah menggunakan **Vite**.

### Prasyarat
- Node.js (v18 atau lebih baru) terinstal di komputer Anda.

### Langkah-langkah

1. **Buat Project Vite Baru**
   Buka terminal dan jalankan:
   ```bash
   npm create vite@latest serbada -- --template react-ts
   cd serbada
   ```

2. **Instal Dependencies**
   Instal library tambahan yang digunakan dalam kode (React Router & Lucide):
   ```bash
   npm install react-router-dom lucide-react
   ```
   *(Catatan: Tailwind CSS dalam proyek ini dimuat via CDN di `index.html`, jadi tidak perlu instalasi npm untuk Tailwind, meskipun disarankan untuk produksi).*

3. **Salin Kode**
   - Pindahkan file `index.html` ke folder root project (timpa file lama).
   - Pindahkan folder/file source code (`App.tsx`, `index.tsx`, folder `components`, `pages`, `context`, dll) ke dalam folder `src/`.
   - Pastikan path import di `index.tsx` sesuai.

4. **Jalankan Aplikasi**
   ```bash
   npm run dev
   ```
   Buka link localhost yang muncul di browser (biasanya `http://localhost:5173`).

## 🔑 Akun Demo (Admin)

Untuk mengakses halaman Dashboard Penjual, gunakan kredensial berikut:

- **Halaman Login:** `/login` atau klik ikon User di pojok kanan atas navbar.
- **Username:** `admin`
- **Password:** `admin123`

## 📂 Struktur Folder

```
/
├── index.html              # Entry point HTML & Tailwind CDN
├── src/
│   ├── index.tsx           # Entry point React
│   ├── App.tsx             # Routing utama
│   ├── types.ts            # Definisi tipe data (TypeScript interfaces)
│   ├── constants.ts        # Data dummy awal & Konstanta global
│   ├── context/
│   │   └── StoreContext.tsx # State Management global (Cart, User, Products)
│   ├── components/
│   │   ├── Navbar.tsx      # Navigasi responsif
│   │   └── ProductCard.tsx # Komponen kartu produk
│   └── pages/
│       ├── Home.tsx        # Halaman utama (Katalog & Search)
│       ├── Cart.tsx        # Halaman keranjang & Checkout
│       ├── Login.tsx       # Halaman login admin
│       └── AdminDashboard.tsx # Halaman kelola produk
└── metadata.json           # Metadata project
```

## 📝 Catatan Penting

1. **Penyimpanan Data:**
   Aplikasi ini menggunakan `localStorage` browser untuk menyimpan data produk, keranjang, dan sesi login. Jika Anda membersihkan cache browser atau membuka di browser lain, data akan kembali ke *default* (ter-reset). Ini wajar untuk aplikasi MVP tanpa Backend Database.

2. **Gambar Lokal:**
   Fitur upload gambar dari komputer menggunakan konversi Base64. Harap gunakan gambar dengan ukuran kecil (< 2MB) agar performa browser tetap terjaga karena data disimpan di string local storage.

3. **Nomor WhatsApp:**
   Nomor tujuan checkout diatur di file `constants.ts`. Ubah variabel `WHATSAPP_NUMBER` untuk mengganti nomor tujuan pesanan.

---
© 2024 Serbada E-Commerce. Dibuat dengan React & Tailwind.
