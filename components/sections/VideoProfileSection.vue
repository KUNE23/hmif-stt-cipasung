<script setup>
import { Play } from 'lucide-vue-next'

const { getVideoProfile } = useVideoProfile()
const videoProfile = getVideoProfile()
const isVideoOpen = ref(false)

const contentMotion = {
  initial: { opacity: 0, y: 24 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 650, ease: 'easeOut' },
  },
}

const visualMotion = {
  initial: { opacity: 0, y: 28, scale: 0.97 },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 700, delay: 120, ease: 'easeOut' },
  },
}

const revealMotion = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 520, delay, ease: 'easeOut' },
  },
})
</script>

<template>
  <section id="video-profile" class="overflow-hidden bg-[#edf8ff] py-16 sm:py-20 lg:py-24">
    <div class="container-hmif">
      <div class="grid min-w-0 items-center gap-10 sm:gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 xl:gap-24">
        <div v-motion="contentMotion" class="min-w-0 max-w-xl">
          <p v-motion="revealMotion(40)" class="mb-3 break-words text-[0.68rem] font-bold uppercase leading-5 tracking-[0.14em] text-[#0b254b] sm:tracking-[0.18em]">
            {{ videoProfile.label }}
          </p>
          <h2 v-motion="revealMotion(100)" class="break-words text-3xl font-bold leading-tight text-[#08244b] sm:text-4xl">
            {{ videoProfile.title }}
          </h2>
          <p v-motion="revealMotion(160)" class="mt-5 max-w-lg break-words text-sm leading-7 text-slate-600 sm:text-base">
            {{ videoProfile.description }}
          </p>

          <ul v-motion="revealMotion(220)" class="mt-6 flex flex-wrap gap-2" aria-label="Topik video">
            <li
              v-for="tag in videoProfile.tags"
              :key="tag"
              class="max-w-full break-words rounded-full border border-cyan-200/80 bg-cyan-100/70 px-3.5 py-1.5 text-xs font-semibold text-[#0b4560]"
            >
              {{ tag }}
            </li>
          </ul>

          <button
            v-motion="revealMotion(280)"
            type="button"
            class="mt-8 inline-flex min-h-12 max-w-full items-center justify-center gap-2.5 rounded-lg bg-[#08244b] px-6 text-center text-sm font-semibold text-white shadow-[0_10px_24px_rgba(8,36,75,0.16)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#0b3268] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#edf8ff]"
            :aria-label="`${videoProfile.buttonText}: ${videoProfile.videoTitle}`"
            @click="isVideoOpen = true"
          >
            <Play :size="17" fill="currentColor" aria-hidden="true" />
            {{ videoProfile.buttonText }}
          </button>
        </div>

        <div v-motion="visualMotion" class="relative min-w-0">
          <div class="absolute -inset-4 -z-0 rounded-full bg-cyan-300/20 blur-3xl sm:-inset-8" aria-hidden="true" />
          <button
            type="button"
            class="group relative z-10 block aspect-video w-full overflow-hidden rounded-2xl bg-[#08244b] text-left shadow-[0_24px_60px_rgba(8,36,75,0.18)] outline-none ring-1 ring-[#08244b]/10 transition duration-300 hover:-translate-y-1 focus-visible:ring-4 focus-visible:ring-cyan-400/70"
            :aria-label="`Putar ${videoProfile.videoTitle}`"
            @click="isVideoOpen = true"
          >
            <NuxtImg
              :src="videoProfile.thumbnail"
              :alt="`Thumbnail ${videoProfile.videoTitle}`"
              class="size-full object-cover transition duration-500 group-hover:scale-[1.025]"
              width="1280"
              height="720"
              format="webp"
              quality="82"
              loading="lazy"
            />
            <span class="absolute inset-0 bg-gradient-to-t from-[#04152f]/90 via-[#08244b]/35 to-[#08244b]/10 transition duration-300 group-hover:bg-[#04152f]/20" aria-hidden="true" />
            <span class="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center">
              <span class="grid size-16 place-items-center rounded-full border border-white/60 bg-white/20 text-white shadow-xl backdrop-blur-md transition duration-200 group-hover:scale-105 group-hover:bg-cyan-400/80 sm:size-20">
                <Play class="ml-1" :size="30" fill="currentColor" aria-hidden="true" />
              </span>
              <span class="break-words text-base font-bold text-white drop-shadow sm:text-xl">
                {{ videoProfile.videoTitle }}
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>

    <VideoModal
      :open="isVideoOpen"
      :title="videoProfile.videoTitle"
      :video-url="videoProfile.videoUrl"
      @close="isVideoOpen = false"
    />
  </section>
</template>
