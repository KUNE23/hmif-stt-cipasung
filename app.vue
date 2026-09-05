<script setup>
const config = useRuntimeConfig()

const siteUrl = computed(() => (config.public.siteUrl || 'http://localhost:3000').replace(/\/$/, ''))
const siteTitle = 'HMIF STT Cipasung | Explore, Create, Innovate.'
const siteDescription = 'Website resmi Himpunan Mahasiswa Informatika STT Cipasung periode 2026/2027. Kenali pengurus, divisi, program kerja, kegiatan, dan informasi terbaru HMIF STT Cipasung.'
const ogDescription = 'Website resmi Himpunan Mahasiswa Informatika STT Cipasung periode 2026/2027. Kenali pengurus, divisi, program kerja, kegiatan, dan informasi terbaru HMIF.'
const twitterDescription = 'Website resmi Himpunan Mahasiswa Informatika STT Cipasung periode 2026/2027.'
const ogImagePath = '/images/video/video-profile-thumbnail.png'
const ogImageUrl = computed(() => `${siteUrl.value}${ogImagePath}`)

useSeoMeta({
  title: siteTitle,
  description: siteDescription,
  keywords: 'HMIF, HMIF STT Cipasung, Himpunan Mahasiswa Informatika, STT Cipasung, Informatika STT Cipasung, Organisasi Mahasiswa, Tasikmalaya',
  robots: 'index, follow',
  author: 'HMIF STT Cipasung',
  themeColor: '#197e45',
  ogTitle: siteTitle,
  ogDescription,
  ogType: 'website',
  ogSiteName: 'HMIF STT Cipasung',
  ogLocale: 'id_ID',
  ogUrl: () => siteUrl.value,
  ogImage: () => ogImageUrl.value,
  ogImageWidth: '1672',
  ogImageHeight: '941',
  twitterCard: 'summary_large_image',
  twitterTitle: siteTitle,
  twitterDescription,
  twitterImage: () => ogImageUrl.value,
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
