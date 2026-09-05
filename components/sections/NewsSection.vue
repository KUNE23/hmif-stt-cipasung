<script setup>
import { ArrowUpRight, ImageIcon } from 'lucide-vue-next'
import { upcomingEvents } from '~/data/upcomingEvents'

const events = upcomingEvents.slice(0, 3)
const placeholderImage = '/images/placeholders/news.svg'

const isPlaceholder = (image) => image?.includes('/images/placeholders/')
const getEventImage = (event) => event.image || placeholderImage
</script>

<template>
  <section id="berita" class="bg-[#fbfdff] py-16 sm:py-24 lg:py-28">
    <div class="container-hmif">
      <header class="max-w-3xl">
        <p
          v-motion
          :initial="{ opacity: 0, x: -16 }"
          :enter="{ opacity: 1, x: 0, transition: { duration: 500, ease: 'easeOut' } }"
          class="flex min-w-0 items-center gap-3 font-mono text-[9px] font-semibold uppercase leading-5 tracking-[0.14em] text-slate-500 sm:text-[10px] sm:tracking-[0.2em]"
        >
          <span class="h-px w-7 shrink-0 bg-slate-400" aria-hidden="true" />
          Agenda dan kegiatan HMIF yang akan segera hadir.
        </p>
        <h2
          v-motion
          :initial="{ opacity: 0, y: 22 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 80, ease: 'easeOut' } }"
          class="mt-5 break-words text-3xl font-bold leading-tight tracking-tight text-[#08244c] sm:text-5xl lg:text-[3.35rem]"
        >
          Kegiatan Mendatang
        </h2>
      </header>

      <div v-if="events.length" class="mt-10 grid gap-x-6 gap-y-12 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
        <article
          v-for="(event, index) in events"
          :key="event.id"
          v-motion
          :initial="{ opacity: 0, y: 22 }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: { duration: 520, delay: 150 + index * 90, ease: 'easeOut' },
          }"
          class="group flex min-w-0 flex-col"
        >
          <div
            class="relative block aspect-video overflow-hidden rounded-2xl bg-[#12335f] shadow-[0_14px_34px_rgba(8,36,76,0.10)] outline-none focus-visible:ring-4 focus-visible:ring-cyan-400/70"
          >
            <NuxtImg
              :src="getEventImage(event)"
              :alt="`Gambar ${event.title}`"
              class="size-full object-cover transition-transform duration-300 group-hover:scale-[1.035]"
              width="720"
              height="405"
              format="webp"
              quality="82"
              loading="lazy"
            />

            <span
              v-if="isPlaceholder(getEventImage(event))"
              class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#183967] via-[#173d73] to-[#08a8c4] text-white/70"
              aria-hidden="true"
            >
              <span class="text-center">
                <ImageIcon :size="22" :stroke-width="1.4" class="mx-auto" />
                <span class="mt-3 block font-mono text-[8px] uppercase tracking-[0.2em]">Tambah Gambar</span>
              </span>
            </span>

            <span class="absolute inset-0 bg-[#061a38]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
            <ArrowUpRight
              :size="19"
              class="absolute right-4 top-4 translate-y-1 text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"
              aria-hidden="true"
            />
          </div>

          <div class="mt-5 flex min-w-0 flex-wrap items-center gap-3">
            <span class="rounded-full bg-cyan-50 px-3 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-cyan-700">
              {{ event.category }}
            </span>
            <span class="rounded-full bg-teal-50 px-3 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-teal-700 ring-1 ring-teal-200/70">
              {{ event.status }}
            </span>
          </div>

          <h3 class="mt-4 line-clamp-2 break-words text-lg font-bold leading-6 text-[#08244c] sm:text-xl sm:leading-7">
            {{ event.title }}
          </h3>
        </article>
      </div>

      <p v-else class="mt-10 text-sm text-slate-500">Belum ada kegiatan mendatang.</p>
    </div>
  </section>
</template>
