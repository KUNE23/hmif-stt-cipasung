<script setup>
defineProps({ division: { type: Object, required: true } })
</script>

<template>
  <article class="h-full min-w-0 rounded-lg border border-slate-200 bg-white p-5">
    <NuxtImg :src="division.logo" :alt="`Logo ${division.name}`" width="96" height="96" class="size-20 max-w-full rounded-md object-cover" />
    <h3 class="mt-4 break-words text-base font-bold sm:text-lg">{{ division.name }}</h3>
    <p class="mt-2 break-words text-sm text-slate-600">{{ division.description }}</p>
    <BaseButton class="mt-4" :to="`/divisi/${division.slug}`" variant="secondary">Lihat divisi</BaseButton>
  </article>
</template>
