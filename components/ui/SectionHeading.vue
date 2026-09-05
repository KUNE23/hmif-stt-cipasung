<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' },
})
</script>

<template>
  <header class="mb-6 min-w-0 max-w-2xl">
    <h2 class="break-words text-2xl leading-tight sm:text-3xl">{{ title }}</h2>
    <p v-if="description" class="mt-2 break-words text-slate-600">{{ description }}</p>
  </header>
</template>
