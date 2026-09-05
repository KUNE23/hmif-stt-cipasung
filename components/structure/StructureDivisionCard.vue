<script setup>
import { ArrowRight } from 'lucide-vue-next'

defineProps({
  division: { type: Object, required: true },
})
</script>

<template>
  <NuxtLink
    :to="`/divisi/${division.slug}`"
    class="group flex h-full min-h-[16.5rem] min-w-0 flex-col items-center justify-center rounded-[1.25rem] border border-white/90 bg-white px-5 py-7 text-center shadow-[0_16px_45px_rgba(8,36,76,0.07)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-cyan-300 hover:shadow-[0_22px_60px_rgba(8,101,140,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 sm:px-6"
  >
    <div class="rounded-full from-cyan-100 via-white to-blue-100 p-[2px] shadow-sm">
      <NuxtImg
        :src="division.logo"
        :alt="`Logo ${division.name}`"
        width="144"
        height="144"
        loading="lazy"
        class="size-28 rounded-full bg-slate-100 object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>

    <h3 class="mt-5 max-w-full break-words text-base font-bold text-[#08244c]">{{ division.name }}</h3>
    <span class="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-700">
      Lihat Divisi
      <ArrowRight :size="14" class="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
    </span>
  </NuxtLink>
</template>
