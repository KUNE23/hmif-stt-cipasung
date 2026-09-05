<script setup>
import { ImageIcon, Maximize2 } from 'lucide-vue-next'

const { getAll } = useGallery()
const galleryItems = getAll()
const isLightboxOpen = ref(false)
const activeIndex = ref(0)

const sizeClasses = {
  tall: 'gallery-item--tall',
  wide: 'gallery-item--wide',
  small: 'gallery-item--small',
}

const formatDate = (date) => new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}).format(new Date(`${date}T00:00:00`))

const openLightbox = (index) => {
  activeIndex.value = index
  isLightboxOpen.value = true
}

const showPrevious = () => {
  activeIndex.value = (activeIndex.value - 1 + galleryItems.length) % galleryItems.length
}

const showNext = () => {
  activeIndex.value = (activeIndex.value + 1) % galleryItems.length
}
</script>

<template>
  <section id="galeri" class="bg-[#edf8ff] py-16 sm:py-24 lg:py-28">
    <div class="container-hmif">
      <header class="max-w-3xl">
        <p class="gallery-reveal gallery-reveal--eyebrow flex min-w-0 items-center gap-3 font-mono text-[9px] font-semibold uppercase leading-5 tracking-[0.14em] text-slate-500 sm:text-[10px] sm:tracking-[0.2em]">
          <span class="h-px w-7 shrink-0 bg-slate-400" aria-hidden="true" />
          Contoh Galeri — Ganti dengan Dokumentasi Kegiatan HMIF
        </p>
        <h2 class="gallery-reveal gallery-reveal--heading mt-5 break-words text-3xl font-bold leading-tight tracking-tight text-[#08244c] sm:text-5xl lg:text-[3.35rem]">
          Dokumentasi Kegiatan HMIF
        </h2>
      </header>

      <div class="gallery-grid mt-10 min-w-0 sm:mt-12">
        <figure
          v-for="(item, index) in galleryItems"
          :key="item.id"
          :class="['gallery-item', sizeClasses[item.size] || sizeClasses.small]"
          :style="{ '--gallery-delay': `${160 + index * 65}ms` }"
        >
          <button
            type="button"
            class="group relative size-full overflow-hidden rounded-2xl bg-[#12335f] text-left shadow-[0_12px_30px_rgba(8,36,76,0.09)] outline-none focus-visible:ring-4 focus-visible:ring-cyan-400/70"
            :aria-label="`Buka foto ${item.title}`"
            @click="openLightbox(index)"
          >
            <NuxtImg
              v-if="item.image"
              :src="item.image"
              :alt="item.alt"
              class="size-full object-cover transition-transform duration-300 group-hover:scale-105"
              width="900"
              height="650"
              format="webp"
              quality="82"
              loading="lazy"
            />
            <span v-else class="gallery-placeholder absolute inset-0 flex items-center justify-center text-white/70">
              <span class="text-center transition-transform duration-300 group-hover:scale-105">
                <ImageIcon :size="22" :stroke-width="1.4" class="mx-auto" aria-hidden="true" />
                <span class="mt-3 block font-mono text-[8px] uppercase tracking-[0.2em]">Tambahkan Foto</span>
              </span>
            </span>

            <span class="absolute inset-0 bg-gradient-to-t from-[#031733]/85 via-[#08244c]/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true" />
            <span class="absolute inset-x-0 bottom-0 flex translate-y-3 items-end justify-between gap-4 p-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:p-5">
              <span class="min-w-0">
                <span class="block truncate text-sm font-bold text-white sm:text-base">{{ item.title }}</span>
                <span class="mt-1 block text-[10px] text-white/70 sm:text-xs">
                  {{ item.category }} · {{ formatDate(item.date) }}
                </span>
              </span>
              <Maximize2 :size="18" class="shrink-0 text-white" aria-hidden="true" />
            </span>
          </button>
        </figure>
      </div>
    </div>

    <GalleryLightbox
      :open="isLightboxOpen"
      :items="galleryItems"
      :active-index="activeIndex"
      @close="isLightboxOpen = false"
      @previous="showPrevious"
      @next="showNext"
    />
  </section>
</template>

<style scoped>
.gallery-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-auto-flow: dense;
  grid-auto-rows: 12rem;
  gap: 0.75rem;
}

.gallery-reveal,
.gallery-item {
  animation: gallery-reveal 520ms ease-out both;
}

.gallery-reveal--eyebrow {
  --gallery-delay: 0ms;
}

.gallery-reveal--heading {
  --gallery-delay: 80ms;
}

.gallery-reveal,
.gallery-item {
  animation-delay: var(--gallery-delay, 0ms);
}

.gallery-item--tall {
  grid-row: span 2;
}

.gallery-item--wide {
  grid-column: span 1;
}

.gallery-placeholder {
  background: linear-gradient(135deg, #153766 0%, #193b72 45%, #08a5c3 100%);
}

@keyframes gallery-reveal {
  from {
    opacity: 0;
    transform: translateY(14px) scale(0.985);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .gallery-reveal,
  .gallery-item {
    animation: none;
  }
}

@media (min-width: 640px) {
  .gallery-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-auto-rows: 10rem;
    gap: 0.875rem;
  }

  .gallery-item--wide {
    grid-column: span 2;
  }
}

@media (min-width: 1024px) {
  .gallery-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-auto-rows: 10.5rem;
  }
}
</style>
