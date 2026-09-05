<script setup>
defineProps({ member: { type: Object, required: true } })
</script>

<template>
  <article class="min-w-0 rounded-lg border border-slate-200 bg-white p-4">
    <NuxtImg :src="member.photo" :alt="`Foto ${member.name}`" width="320" height="240" class="aspect-[4/3] w-full max-w-full rounded-md object-cover" />
    <h3 class="mt-4 break-words text-base font-bold sm:text-lg">{{ member.name }}</h3>
    <p class="break-words text-sm text-slate-600">{{ member.role }} · Angkatan {{ member.generation }}</p>
  </article>
</template>
