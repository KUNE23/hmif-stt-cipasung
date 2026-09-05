<script setup>
const config = useRuntimeConfig()

const siteOrigin = computed(() => (config.public.siteUrl || 'https://hmif-stt-cipasung.vercel.app').replace(/\/$/, ''))
const siteUrl = computed(() => `${siteOrigin.value}/`)
const siteTitle = 'HMIF STT Cipasung | Explore, Create, Innovate.'
const siteDescription = 'Website resmi Himpunan Mahasiswa Informatika STT Cipasung periode 2026/2027. Kenali pengurus, divisi, program kerja, kegiatan, dan informasi terbaru HMIF STT Cipasung.'
const ogImagePath = '/og/hmif-og.png'
const ogImageUrl = computed(() => `${siteOrigin.value}${ogImagePath}`)
const ogImageAlt = 'Preview website HMIF STT Cipasung'

useSeoMeta({
  title: siteTitle,
  description: siteDescription,
  keywords: 'HMIF, HMIF STT Cipasung, Himpunan Mahasiswa Informatika, STT Cipasung, Informatika STT Cipasung, Organisasi Mahasiswa, Tasikmalaya',
  robots: 'index, follow',
  author: 'HMIF STT Cipasung',
  themeColor: '#197e45',
  ogTitle: siteTitle,
  ogDescription: siteDescription,
  ogType: 'website',
  ogSiteName: 'HMIF STT Cipasung',
  ogLocale: 'id_ID',
  ogUrl: () => siteUrl.value,
  ogImage: () => ogImageUrl.value,
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogImageAlt,
  twitterCard: 'summary_large_image',
  twitterTitle: siteTitle,
  twitterDescription: siteDescription,
  twitterImage: () => ogImageUrl.value,
  twitterImageAlt: ogImageAlt,
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
