<script setup>
const route = useRoute()
const { getBySlug } = useNews()

const article = computed(() => getBySlug(route.params.slug))

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Berita tidak ditemukan' })
}

useSeoMeta({
  title: () => `${article.value.title} | HMIF STT Cipasung`,
  description: () => article.value.excerpt,
})
</script>

<template>
  <article class="section-placeholder">
    <div class="container-hmif max-w-4xl">
      <p class="break-words text-sm text-slate-500">{{ article.date }} · {{ article.category }}</p>
      <h1 class="mt-3 break-words text-2xl leading-tight sm:text-4xl">{{ article.title }}</h1>
      <NuxtImg :src="article.image" :alt="article.title" width="960" height="540" class="mt-8 aspect-video w-full max-w-full rounded-lg object-cover" />
      <p class="mt-8 break-words leading-7 text-slate-700">{{ article.content }}</p>
    </div>
  </article>
</template>
