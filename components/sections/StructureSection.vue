<script setup>
import { Autoplay, Mousewheel } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { bphMembers } from '~/data/structure'
import 'swiper/css'

const swiperModules = [Autoplay, Mousewheel]
const { getStructureDivisions } = useDivisions()
const structureDivisions = getStructureDivisions()
const reducedMotion = ref(false)
const bphSwiper = shallowRef(null)
const divisionSwiper = shallowRef(null)
let reducedMotionQuery

const createRuntimeLoop = (items, copies = 3) => Array.from(
  { length: copies },
  (_, copyIndex) => items.map((item) => ({
    item,
    key: `${item.id}-${copyIndex}`,
  })),
).flat()

const bphLoopSlides = createRuntimeLoop(bphMembers)
const divisionLoopSlides = createRuntimeLoop(structureDivisions)

const autoplayBph = computed(() => reducedMotion.value
  ? false
  : {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
      reverseDirection: true,
      waitForTransition: true,
    })

const autoplayDivisions = computed(() => reducedMotion.value
  ? false
  : {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
      reverseDirection: false,
      waitForTransition: true,
    })

const setBphSwiper = (swiper) => {
  bphSwiper.value = swiper
}

const setDivisionSwiper = (swiper) => {
  divisionSwiper.value = swiper
}

const resumeContinuousMotion = (swiper, reverseDirection) => {
  if (reducedMotion.value || !swiper?.autoplay) return

  swiper.autoplay.stop()
  swiper.params.autoplay.reverseDirection = reverseDirection
  const currentTranslate = swiper.getTranslate()
  swiper.setTransition(0)
  swiper.setTranslate(currentTranslate)
  swiper.updateActiveIndex()
  swiper.updateSlidesClasses()

  requestAnimationFrame(() => {
    if (swiper.destroyed) return
    swiper.slideToClosest(0, false)
    swiper.autoplay.start()
  })
}

const syncReducedMotion = (event) => {
  reducedMotion.value = event.matches

  for (const swiper of [bphSwiper.value, divisionSwiper.value]) {
    if (event.matches) swiper?.autoplay?.stop()
    else swiper?.autoplay?.start()
  }
}

onMounted(() => {
  reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  syncReducedMotion(reducedMotionQuery)
  reducedMotionQuery.addEventListener('change', syncReducedMotion)
})

onBeforeUnmount(() => {
  reducedMotionQuery?.removeEventListener('change', syncReducedMotion)
})
</script>

<template>
  <section id="struktur" class="relative overflow-hidden bg-[#f5faff] py-16 sm:py-24 lg:py-32">
    <div class="pointer-events-none absolute -left-32 top-1/2 size-72 -translate-y-1/2 rounded-full bg-cyan-200/25 blur-[120px] sm:-left-40 sm:size-[28rem]" />
    <div class="pointer-events-none absolute -right-32 top-12 size-72 rounded-full bg-blue-200/20 blur-[120px] sm:-right-40 sm:size-96" />

    <div class="container-hmif relative">
      <header
        v-motion
        :initial="{ opacity: 0, y: 24 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut' } }"
        class="mx-auto max-w-3xl text-center"
      >
        <p class="inline-flex max-w-full rounded-full bg-cyan-100/80 px-4 py-2 font-mono text-[9px] font-semibold uppercase leading-5 tracking-[0.14em] text-cyan-700 sm:tracking-[0.22em]">
          Struktur Organisasi HMIF
        </p>
        <h2 class="mt-5 break-words text-3xl font-bold leading-tight tracking-tight text-[#08244c] sm:text-5xl">
          Struktur Anggota HMIF
        </h2>
        <p class="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-[15px]">
          Berkenalan dengan orang-orang yang menjalankan HMIF dan berperan dalam membangun kolaborasi, program kerja, serta pengembangan organisasi mahasiswa informatika.
        </p>
      </header>

      <div class="mt-12 min-w-0 sm:mt-20">
        <h3
          v-motion
          :initial="{ opacity: 0, x: -18 }"
          :visible-once="{ opacity: 1, x: 0, transition: { duration: 500, delay: 100 } }"
          class="flex min-w-0 items-center gap-3 text-base font-bold text-[#08244c] sm:text-lg"
        >
          <span class="h-7 w-0.5 rounded-full bg-cyan-500" />
          Badan Pengurus Inti
        </h3>

        <div
          v-motion
          :initial="{ opacity: 0, y: 22 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 550, delay: 180 } }"
          class="carousel-shell mt-7 overflow-hidden px-0.5"
          aria-label="Carousel Badan Pengurus Harian"
        >
          <Swiper
            class="structure-swiper !overflow-hidden"
            :modules="swiperModules"
            :slides-per-view="1"
            :space-between="14"
            :speed="7200"
            :loop="true"
            :loop-additional-slides="bphMembers.length"
            :autoplay="autoplayBph"
            :grab-cursor="true"
            :allow-touch-move="true"
            :simulate-touch="true"
            :touch-start-prevent-default="false"
            :mousewheel="{ forceToAxis: true, sensitivity: 0.55, releaseOnEdges: false }"
            :breakpoints="{
              360: { slidesPerView: 1.08, spaceBetween: 14 },
              430: { slidesPerView: 1.16, spaceBetween: 16 },
              640: { slidesPerView: 2.05, spaceBetween: 22 },
              1024: { slidesPerView: 3.3, spaceBetween: 26 },
            }"
            @swiper="setBphSwiper"
            @touch-end="resumeContinuousMotion(bphSwiper, true)"
          >
            <SwiperSlide v-for="slide in bphLoopSlides" :key="slide.key" class="!h-auto py-3">
              <BphCard :member="slide.item" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <div class="mt-12 min-w-0 sm:mt-20">
        <h3
          v-motion
          :initial="{ opacity: 0, x: -18 }"
          :visible-once="{ opacity: 1, x: 0, transition: { duration: 500, delay: 100 } }"
          class="flex min-w-0 items-center gap-3 text-base font-bold text-[#08244c] sm:text-lg"
        >
          <span class="h-7 w-0.5 rounded-full bg-cyan-500" />
          Divisi
        </h3>

        <div
          v-motion
          :initial="{ opacity: 0, y: 22 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 550, delay: 180 } }"
          class="carousel-shell mt-7 overflow-hidden px-0.5"
          aria-label="Carousel Divisi HMIF"
        >
          <Swiper
            class="structure-swiper !overflow-hidden"
            :modules="swiperModules"
            :slides-per-view="1"
            :space-between="14"
            :speed="7200"
            :loop="true"
            :loop-additional-slides="structureDivisions.length"
            :autoplay="autoplayDivisions"
            :grab-cursor="true"
            :allow-touch-move="true"
            :simulate-touch="true"
            :touch-start-prevent-default="false"
            :mousewheel="{ forceToAxis: true, sensitivity: 0.55, releaseOnEdges: false }"
            :breakpoints="{
              360: { slidesPerView: 1.08, spaceBetween: 14 },
              430: { slidesPerView: 1.16, spaceBetween: 16 },
              640: { slidesPerView: 2.05, spaceBetween: 22 },
              1024: { slidesPerView: 3.3, spaceBetween: 26 },
            }"
            @swiper="setDivisionSwiper"
            @touch-end="resumeContinuousMotion(divisionSwiper, false)"
          >
            <SwiperSlide v-for="slide in divisionLoopSlides" :key="slide.key" class="!h-auto py-3">
              <StructureDivisionCard :division="slide.item" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.carousel-shell {
  position: relative;
}

:deep(.structure-swiper .swiper-wrapper) {
  transition-timing-function: linear !important;
}

@media (prefers-reduced-motion: reduce) {
  :deep(.structure-swiper .swiper-wrapper) {
    transition-duration: 0ms !important;
  }
}
</style>
