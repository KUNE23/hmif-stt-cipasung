<script setup>
import { ArrowUpRight, Instagram, Mail } from 'lucide-vue-next'
import { collaborationData } from '~/data/collaboration'

const isExternalLink = (href) => /^https?:\/\//.test(href)
</script>

<template>
  <section id="kolaborasi" class="bg-[#f4f9fc] py-12 sm:py-16 lg:py-20">
    <div class="container-hmif">
      <div class="relative isolate min-h-[370px] overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-[#071b3c] via-[#0b2856] to-[#173f78] px-5 py-9 shadow-[0_24px_60px_rgba(8,36,76,0.14)] sm:rounded-[1.75rem] sm:px-10 sm:py-12 lg:px-14 lg:py-14 xl:px-16">
        <div class="pointer-events-none absolute -right-20 top-1/2 -z-10 size-64 -translate-y-1/2 rounded-full bg-cyan-400/15 blur-[90px] sm:-right-12 sm:size-80" aria-hidden="true" />
        <div class="pointer-events-none absolute inset-x-6 top-8 -z-10 h-px bg-gradient-to-r from-transparent via-cyan-300/10 to-transparent sm:inset-x-12" aria-hidden="true" />
        <span class="pointer-events-none absolute bottom-12 left-[55%] -z-10 hidden h-px w-28 bg-cyan-300/15 lg:block" aria-hidden="true" />

        <div class="grid min-h-[258px] min-w-0 items-center gap-8 sm:gap-10 md:grid-cols-[1.1fr_0.9fr] lg:grid-cols-[1.2fr_0.8fr]">
          <div class="relative z-10 min-w-0 max-w-xl">
            <p
              v-motion
              :initial="{ opacity: 0, x: -16 }"
              :enter="{ opacity: 1, x: 0, transition: { duration: 500, ease: 'easeOut' } }"
              class="flex min-w-0 items-center gap-3 font-mono text-[10px] font-semibold uppercase leading-5 tracking-[0.14em] text-cyan-300 sm:tracking-[0.2em]"
            >
              <span class="h-px w-7 bg-cyan-400/70" aria-hidden="true" />
              {{ collaborationData.label }}
            </p>

            <h2
              v-motion
              :initial="{ opacity: 0, y: 22 }"
              :enter="{ opacity: 1, y: 0, transition: { duration: 620, delay: 80, ease: 'easeOut' } }"
              class="mt-5 max-w-lg break-words text-2xl font-bold leading-tight tracking-tight text-white sm:text-4xl sm:leading-[1.12] lg:text-[2.75rem]"
            >
              {{ collaborationData.title }}
            </h2>

            <p
              v-motion
              :initial="{ opacity: 0, y: 18 }"
              :enter="{ opacity: 1, y: 0, transition: { duration: 560, delay: 160, ease: 'easeOut' } }"
              class="mt-5 max-w-lg break-words text-sm leading-7 text-white/70 sm:text-[15px]"
            >
              {{ collaborationData.description }}
            </p>

            <div
              v-motion
              :initial="{ opacity: 0, y: 16 }"
              :enter="{ opacity: 1, y: 0, transition: { duration: 540, delay: 240, ease: 'easeOut' } }"
              class="mt-7 flex min-w-0 flex-col gap-3 min-[420px]:flex-row"
            >
              <a
                :href="collaborationData.primaryButton.href"
                :target="isExternalLink(collaborationData.primaryButton.href) ? '_blank' : undefined"
                :rel="isExternalLink(collaborationData.primaryButton.href) ? 'noopener noreferrer' : undefined"
                class="group inline-flex min-h-12 min-w-0 items-center justify-center gap-2.5 rounded-full bg-cyan-400 px-5 text-center text-sm font-bold text-[#062047] shadow-[0_10px_28px_rgba(34,211,238,0.2)] transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-300 hover:shadow-[0_14px_34px_rgba(34,211,238,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b2856] sm:px-6"
              >
                <Mail :size="16" aria-hidden="true" />
                {{ collaborationData.primaryButton.label }}
              </a>

              <a
                :href="collaborationData.secondaryButton.href"
                target="_blank"
                rel="noopener noreferrer"
                class="group inline-flex min-h-12 min-w-0 items-center justify-center gap-2.5 rounded-full border border-white/25 px-5 text-center text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-white/45 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b2856] sm:px-6"
              >
                <Instagram :size="16" aria-hidden="true" />
                {{ collaborationData.secondaryButton.label }}
                <ArrowUpRight :size="14" class="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div
            v-motion
            :initial="{ opacity: 0, x: 28, scale: 0.96 }"
            :enter="{ opacity: 1, x: 0, scale: 1, transition: { duration: 720, delay: 140, ease: 'easeOut' } }"
            class="relative flex min-h-48 min-w-0 items-end justify-center sm:min-h-56 md:min-h-[280px] md:justify-end"
          >
            <div class="pointer-events-none absolute bottom-6 right-1/2 h-24 w-52 translate-x-1/2 rounded-full bg-cyan-300/25 blur-[45px] md:right-[35%]" aria-hidden="true" />
            <NuxtImg
              :src="collaborationData.mascot"
              :alt="collaborationData.mascotAlt"
              width="520"
              height="760"
              format="webp"
              quality="86"
              loading="lazy"
              class="mascot-float relative z-10 h-auto max-h-56 w-auto max-w-full object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.22)] sm:max-h-72 md:max-h-[310px]"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.mascot-float {
  animation: mascot-float 5.5s ease-in-out infinite;
}

@keyframes mascot-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .mascot-float {
    animation: none;
  }
}
</style>
