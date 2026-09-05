<script setup>
import {
  ArrowUpRight,
  Blocks,
  Building2,
  CalendarDays,
  Monitor,
  Sparkles,
  Users,
} from 'lucide-vue-next'

const { getAll } = useDivisions()
const divisions = getAll()

const divisionIcons = {
  Sparkles,
  Building2,
  Monitor,
  CalendarDays,
  Users,
  Blocks,
}
</script>

<template>
  <section id="divisi" class="bg-white py-16 sm:py-24 lg:py-28">
    <div class="container-hmif">
      <header class="max-w-3xl">
        <p
          v-motion
          :initial="{ opacity: 0, x: -16 }"
          :visible-once="{ opacity: 1, x: 0, transition: { duration: 500, ease: 'easeOut' } }"
          class="flex min-w-0 items-center gap-3 font-mono text-[9px] font-semibold uppercase leading-5 tracking-[0.14em] text-slate-500 sm:text-[10px] sm:tracking-[0.2em]"
        >
          <span class="h-px w-7 shrink-0 bg-slate-400" aria-hidden="true" />
          Struktur Organisasi — Contoh Tampilan, Sesuaikan dengan Susunan Pengurus Aktif
        </p>

        <h2
          v-motion
          :initial="{ opacity: 0, y: 22 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: 80, ease: 'easeOut' } }"
          class="mt-5 break-words text-3xl font-bold leading-tight tracking-tight text-[#08244c] sm:text-5xl sm:leading-[1.14] lg:text-[3.35rem]"
        >
          <span class="block">Divisi yang Menjalankan Roda</span>
          <span class="block">Organisasi</span>
        </h2>
      </header>

      <div
        v-motion
        :initial="{ opacity: 0, y: 24 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 620, delay: 160, ease: 'easeOut' } }"
        class="mt-10 overflow-hidden rounded-2xl border border-slate-200 border-t-[5px] border-t-slate-200 bg-white shadow-[0_18px_50px_rgba(8,36,76,0.055)] sm:mt-12"
      >
        <div class="grid min-w-0 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="(division, index) in divisions"
            :key="division.id"
            v-motion
            :initial="{ opacity: 0, y: 14 }"
            :visible-once="{
              opacity: 1,
              y: 0,
              transition: { duration: 450, delay: 70 + index * 55, ease: 'easeOut' },
            }"
            :to="`/program/${division.slug}`"
            class="division-cell group relative min-h-52 min-w-0 cursor-pointer p-5 transition duration-300 hover:bg-cyan-50/60 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-500 sm:min-h-56 sm:p-7 lg:p-8"
            :aria-label="`Lihat program kerja ${division.name}`"
          >
            <div class="flex items-start justify-between gap-5">
              <span class="font-mono text-[10px] font-medium tracking-[0.12em] text-slate-400">
                {{ division.number }}
              </span>

              <span class="grid size-10 place-items-center rounded-lg bg-cyan-50 text-cyan-600 transition duration-300 group-hover:bg-cyan-100 group-hover:text-cyan-700">
                <component
                  :is="divisionIcons[division.icon]"
                  :size="17"
                  :stroke-width="1.7"
                  class="transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                />
              </span>
            </div>

            <div class="mt-7 min-w-0 pr-5">
              <h3 class="break-words text-[15px] font-bold leading-6 text-[#08244c] transition-colors duration-300 group-hover:text-cyan-700 sm:text-base">
                {{ division.name }}
              </h3>
              <p class="mt-3 break-words text-xs leading-5 text-slate-500 sm:text-[13px] sm:leading-6">
                {{ division.description }}
              </p>
            </div>

            <ArrowUpRight
              :size="16"
              class="absolute bottom-6 right-6 translate-y-1 text-cyan-600 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
              aria-hidden="true"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.division-cell {
  border-bottom: 1px solid rgb(226 232 240);
}

.division-cell:last-child {
  border-bottom: 0;
}

@media (min-width: 640px) {
  .division-cell:nth-child(odd) {
    border-right: 1px solid rgb(226 232 240);
  }

  .division-cell:nth-last-child(-n + 2) {
    border-bottom: 0;
  }
}

@media (min-width: 1024px) {
  .division-cell:nth-child(odd) {
    border-right: 0;
  }

  .division-cell:not(:nth-child(3n)) {
    border-right: 1px solid rgb(226 232 240);
  }

  .division-cell:nth-last-child(-n + 3) {
    border-bottom: 0;
  }
}
</style>
