# HMIF STT Cipasung

Website resmi Himpunan Mahasiswa Informatika STT Cipasung periode 2026/2027. Website ini menampilkan profil organisasi, visi misi, struktur kepengurusan, divisi, program kerja, galeri kegiatan, berita/kegiatan mendatang, dan media profil HMIF.

## Tech Stack

- [Nuxt](https://nuxt.com/) 4
- [Vue](https://vuejs.org/) 3
- [Tailwind CSS](https://tailwindcss.com/)
- [Nuxt Image](https://image.nuxt.com/)
- [VueUse Motion](https://motion.vueuse.org/)
- [Lucide Vue Next](https://lucide.dev/)
- [Swiper](https://swiperjs.com/)

## Fitur

- Halaman beranda dengan section profil HMIF.
- Informasi visi, misi, dan kolaborasi organisasi.
- Struktur kepengurusan HMIF.
- Daftar divisi beserta profil masing-masing divisi.
- Detail program kerja berdasarkan slug.
- Galeri kegiatan dengan lightbox.
- Berita atau kegiatan mendatang.
- Video profile dengan modal.
- SEO dasar melalui `useSeoMeta`.

## Struktur Folder

```text
.
├── assets/css/              # Styling global
├── components/              # Komponen Vue reusable
│   ├── gallery/             # Komponen galeri
│   ├── layout/              # Navbar dan footer
│   ├── sections/            # Section halaman utama
│   ├── structure/           # Komponen struktur organisasi
│   ├── ui/                  # Komponen UI dasar
│   └── video/               # Komponen video profile
├── composables/             # Helper data untuk komponen
├── data/                    # Data konten website
├── docs/proker/             # Dokumen program kerja
├── pages/                   # Routing halaman Nuxt
├── public/images/           # Asset gambar publik
├── app.vue                  # Root app
├── nuxt.config.js           # Konfigurasi Nuxt
├── tailwind.config.js       # Konfigurasi Tailwind
└── package.json             # Dependency dan npm scripts
```

## Persyaratan

- Node.js versi LTS direkomendasikan.
- npm.

## Instalasi

Clone repository, lalu install dependency:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Secara default aplikasi berjalan di:

```text
http://localhost:3000
```

## NPM Scripts

```bash
npm run dev
```

Menjalankan server development Nuxt.

```bash
npm run build
```

Membuat build production.

```bash
npm run preview
```

Menjalankan preview hasil build production.

```bash
npm run generate
```

Menghasilkan output static site.

## Environment

Konfigurasi publik yang tersedia:

```env
NUXT_PUBLIC_SITE_URL=http://localhost:3000
```

Jika tidak diatur, nilai default akan menggunakan `http://localhost:3000`.

## Update Konten

Sebagian besar konten website disimpan di folder `data/`.

- Navigasi: `data/navigation.js`
- Tentang HMIF: `data/about.js`
- Divisi: `data/divisions.js`
- Program kerja: `data/programs.js`
- Struktur pengurus: `data/structure.js`
- Anggota: `data/members.js`
- Galeri: `data/gallery.js`
- Berita/kegiatan: `data/news.js` dan `data/upcomingEvents.js`
- Footer: `data/footer.js`

Asset gambar dapat ditambahkan ke folder `public/images/`, lalu dipanggil menggunakan path publik seperti:

```js
'/images/divisions/psdm.png'
```

## Routing Utama

- `/` - Halaman utama.
- `/struktur` - Halaman struktur organisasi.
- `/divisi/[slug]` - Detail divisi.
- `/program/[slug]` - Detail program kerja.
- `/berita/[slug]` - Detail berita atau kegiatan.

## Build Production

Untuk membuat build production:

```bash
npm run build
```

Untuk menjalankan hasil build:

```bash
npm run preview
```

## Lisensi

Project ini dibuat untuk kebutuhan website HMIF STT Cipasung.
