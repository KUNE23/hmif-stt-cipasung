<script setup>
import { ArrowDownRight, ArrowRight } from 'lucide-vue-next'

const { getAll: getMembers } = useMembers()
const { getAll: getPrograms } = usePrograms()

const memberCount = getMembers().length
const programCount = getPrograms().length

const focusPoints = [
  { number: '01', title: 'Belajar', description: 'Pelatihan dan pengembangan potensi anggota.' },
  { number: '02', title: 'Berkarya', description: 'Menciptakan proyek, kreativitas, dan inovasi digital.' },
  { number: '03', title: 'Berkolaborasi', description: 'Membangun relasi, pengalaman, dan kerja sama.' },
  { number: '04', title: 'Berdampak', description: 'Memberikan kontribusi bagi kampus dan masyarakat.' },
]

const headingMotion = {
  initial: { opacity: 0, y: 30 },
  visibleOnce: { opacity: 1, y: 0, transition: { duration: 650, ease: 'easeOut' } },
}

const mascotMessages = [
  'Halo! Selamat datang di HMIF 👋',
  'Explore. Create. Innovate. 🚀',
  'Yuk kenalan lebih dekat dengan HMIF!',
  'Ada yang bisa kami tunjukkan? 👀',
]

const heroSection = ref(null)
const mascotParallax = ref(null)
const isMascotHovered = ref(false)
const isMascotReacting = ref(false)
const isBubbleVisible = ref(false)
const mascotMessage = ref(mascotMessages[0])

let messageIndex = -1
let bubbleTimer
let reactionTimer
let animationFrame
let finePointerQuery
let reducedMotionQuery
let canUseParallax = false
let currentX = 0
let currentY = 0
let currentRotate = 0
let targetX = 0
let targetY = 0
let targetRotate = 0

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const applyParallaxTransform = () => {
  if (!mascotParallax.value) return

  mascotParallax.value.style.setProperty('--mascot-x', `${currentX.toFixed(2)}px`)
  mascotParallax.value.style.setProperty('--mascot-y', `${currentY.toFixed(2)}px`)
  mascotParallax.value.style.setProperty('--mascot-rotate', `${currentRotate.toFixed(2)}deg`)
}

const animateParallax = () => {
  const easing = 0.12
  currentX += (targetX - currentX) * easing
  currentY += (targetY - currentY) * easing
  currentRotate += (targetRotate - currentRotate) * easing
  applyParallaxTransform()

  const isSettled = Math.abs(targetX - currentX) < 0.02
    && Math.abs(targetY - currentY) < 0.02
    && Math.abs(targetRotate - currentRotate) < 0.01

  if (isSettled) {
    currentX = targetX
    currentY = targetY
    currentRotate = targetRotate
    applyParallaxTransform()
    animationFrame = undefined
    return
  }

  animationFrame = window.requestAnimationFrame(animateParallax)
}

const requestParallaxFrame = () => {
  if (!animationFrame) animationFrame = window.requestAnimationFrame(animateParallax)
}

const handleHeroPointerMove = (event) => {
  if (!canUseParallax || !heroSection.value) return

  const bounds = heroSection.value.getBoundingClientRect()
  const normalizedX = clamp(((event.clientX - bounds.left) / bounds.width - 0.5) * 2, -1, 1)
  const normalizedY = clamp(((event.clientY - bounds.top) / bounds.height - 0.5) * 2, -1, 1)

  targetX = normalizedX * 10
  targetY = normalizedY * 8
  targetRotate = normalizedX * 2
  requestParallaxFrame()
}

const resetParallax = () => {
  targetX = 0
  targetY = 0
  targetRotate = 0

  if (typeof window !== 'undefined') requestParallaxFrame()
}

const updateMotionPreference = () => {
  canUseParallax = Boolean(finePointerQuery?.matches && !reducedMotionQuery?.matches)
  if (!canUseParallax) resetParallax()
}

const reactToMascot = async () => {
  window.clearTimeout(bubbleTimer)
  window.clearTimeout(reactionTimer)

  messageIndex = (messageIndex + 1) % mascotMessages.length
  mascotMessage.value = mascotMessages[messageIndex]
  isBubbleVisible.value = true

  isMascotReacting.value = false
  await nextTick()
  isMascotReacting.value = true

  reactionTimer = window.setTimeout(() => {
    isMascotReacting.value = false
  }, 620)

  bubbleTimer = window.setTimeout(() => {
    isBubbleVisible.value = false
  }, 2800)
}

onMounted(() => {
  finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
  reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  finePointerQuery.addEventListener('change', updateMotionPreference)
  reducedMotionQuery.addEventListener('change', updateMotionPreference)
  updateMotionPreference()
})

onBeforeUnmount(() => {
  window.clearTimeout(bubbleTimer)
  window.clearTimeout(reactionTimer)
  if (animationFrame) window.cancelAnimationFrame(animationFrame)
  finePointerQuery?.removeEventListener('change', updateMotionPreference)
  reducedMotionQuery?.removeEventListener('change', updateMotionPreference)
})
</script>

<template>
  <section
    id="beranda"
    ref="heroSection"
    class="hero-grid relative isolate overflow-hidden bg-[#f5fbff] pb-10 pt-24 sm:pt-32 lg:min-h-[850px] lg:pb-8 lg:pt-36"
    @pointermove.passive="handleHeroPointerMove"
    @pointerleave="resetParallax"
  >
    <div class="pointer-events-none absolute left-1/2 top-[42%] -z-10 size-72 -translate-x-1/2 rounded-full bg-cyan-300/25 blur-[100px] sm:size-[26rem]" />
    <div class="hero-particles pointer-events-none absolute inset-0 -z-10 opacity-70" />
    <span class="pointer-events-none absolute left-[8%] top-[31%] hidden h-px w-24 bg-cyan-400/40 lg:block" />
    <span class="pointer-events-none absolute right-[9%] top-[23%] hidden h-20 w-px bg-cyan-400/30 lg:block" />

    <div class="container-hmif flex min-h-[calc(100vh-7rem)] flex-col justify-center sm:min-h-[calc(100vh-9rem)] lg:min-h-[690px]">
      <div class="grid min-w-0 items-center gap-9 md:grid-cols-2 md:gap-12 lg:grid-cols-[1.04fr_.88fr_.76fr] lg:gap-8 xl:gap-14">
        <div class="relative z-10 order-1 min-w-0">
          <p
            v-motion
            :initial="{ opacity: 0, x: -18 }"
            :visible-once="{ opacity: 1, x: 0, transition: { duration: 500 } }"
            class="inline-flex max-w-full items-center rounded-full border border-slate-300/80 bg-white/55 px-4 py-2.5 font-mono text-[9px] uppercase leading-5 tracking-[0.12em] text-slate-600 sm:max-w-md sm:px-5 sm:text-xs sm:tracking-[0.18em]"
          >
            Himpunan Mahasiswa Informatika STT Cipasung
          </p>

          <h1
            v-motion="headingMotion"
            class="mt-6 break-words text-[clamp(2.75rem,15vw,3.7rem)] font-bold leading-[0.9] tracking-tight text-[#08244c] sm:mt-7 sm:text-[clamp(3.4rem,7.2vw,6.4rem)] sm:leading-[0.83] lg:text-[clamp(4.4rem,5.4vw,6rem)]"
          >
            <span class="block">Excellence,</span>
            <span class="block">Innovation,</span>
            <span class="block text-[#08a9c5]">Integrity.</span>
          </h1>

          <p
            v-motion
            :initial="{ opacity: 0, y: 18 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: 150 } }"
            class="mt-6 max-w-lg text-sm leading-7 text-slate-600 sm:mt-7 sm:text-lg"
          >
            Unggul dalam akademik, inovatif dalam teknologi, dan berintegritas dalam aksi. Bersama HMIF, kita kembangkan potensi untuk menjadi kualitas diri yang menginspirasi.
          </p>

          <div
            v-motion
            :initial="{ opacity: 0, y: 16 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 550, delay: 250 } }"
            class="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <NuxtLink to="#divisi" class="group inline-flex min-h-12 items-center justify-center gap-4 rounded-full bg-[#08244c] px-6 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(8,36,76,0.18)] transition-transform hover:-translate-y-0.5">
              Jelajahi HMIF
              <ArrowRight :size="16" class="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </NuxtLink>
            <NuxtLink to="#tentang" class="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 bg-white/55 px-6 text-sm font-semibold text-[#08244c] transition-colors hover:border-cyan-400 hover:bg-cyan-50">
              Kenal Lebih Dekat
            </NuxtLink>
          </div>
        </div>

        <div
          v-motion
          :initial="{ opacity: 0, scale: 0.92, y: 24 }"
          :visible-once="{ opacity: 1, scale: 1, y: 0, transition: { duration: 750, delay: 120, ease: 'easeOut' } }"
          class="relative order-2 mx-auto flex w-full max-w-[20rem] items-end justify-center self-end sm:max-w-[26rem] md:max-w-[34rem] lg:-ml-12 lg:-mr-10 lg:min-h-[590px] lg:max-w-none"
        >
          <div class="absolute left-1/2 top-1/2 -z-20 hidden -translate-x-1/2 -translate-y-1/2 text-[17rem] font-black leading-none tracking-[-0.12em] text-[#08244c]/[0.035] lg:block">HMIF</div>

          <div ref="mascotParallax" class="mascot-parallax relative isolate flex w-full items-end justify-center">
            <div
              class="mascot-glow pointer-events-none absolute bottom-[8%] left-1/2 -z-10 h-40 w-[70%] -translate-x-1/2 rounded-full bg-cyan-300/40 blur-[55px]"
              :class="{ 'is-hovered': isMascotHovered, 'is-reacting': isMascotReacting }"
              aria-hidden="true"
            />

            <Transition name="mascot-bubble">
              <div
                v-if="isBubbleVisible"
                role="status"
                aria-live="polite"
                class="mascot-speech pointer-events-none absolute right-0 top-2 z-20 max-w-[min(14rem,82vw)] rounded-2xl border border-cyan-200 bg-white px-3.5 py-3 text-xs font-semibold leading-5 text-[#08244c] shadow-[0_14px_38px_rgba(8,36,76,0.13)] sm:right-[3%] sm:top-[10%] sm:max-w-[16rem] sm:px-4 sm:text-sm"
              >
                {{ mascotMessage }}
              </div>
            </Transition>

            <div class="mascot-idle relative flex w-full items-end justify-center">
              <button
                type="button"
                class="mascot-button relative z-0 flex w-[78%] max-w-[19rem] touch-manipulation items-end justify-center rounded-[2rem] border-0 bg-transparent p-0 drop-shadow-[0_24px_22px_rgba(8,36,76,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-4 focus-visible:ring-offset-[#f5fbff] sm:w-[88%] sm:max-w-[32rem] sm:drop-shadow-[0_32px_28px_rgba(8,36,76,0.22)] lg:w-[115%] lg:max-w-[37rem]"
                :class="{ 'is-reacting': isMascotReacting }"
                aria-label="Sapa maskot HMIF"
                @pointerenter="isMascotHovered = true"
                @pointerleave="isMascotHovered = false"
                @click="reactToMascot"
              >
                <NuxtImg
                  src="/images/mascot/mascot-hmif.png"
                  alt="Mascot robot HMIF STT Cipasung"
                  width="1024"
                  height="1536"
                  preload
                  draggable="false"
                  class="h-auto w-full select-none object-contain"
                />
              </button>
            </div>
          </div>
        </div>

        <aside class="order-3 min-w-0 md:col-span-2 lg:col-span-1" aria-labelledby="hero-focus-title">
          <div class="mb-3 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-600 sm:tracking-[0.3em]">
            <span class="h-px w-6 bg-cyan-500" />
            <span id="hero-focus-title">Fokus Kami</span>
          </div>
          <div class="grid sm:grid-cols-2 lg:grid-cols-1">
            <article
              v-for="(item, index) in focusPoints"
              :key="item.number"
              v-motion
              :initial="{ opacity: 0, x: 22 }"
              :visible-once="{ opacity: 1, x: 0, transition: { duration: 500, delay: 180 + (index * 90) } }"
              class="group grid min-w-0 grid-cols-[2.2rem_minmax(0,1fr)] gap-3 border-t border-slate-300/80 py-5 sm:px-4 lg:px-0"
            >
              <span class="font-mono text-xs text-slate-500">{{ item.number }}</span>
              <div>
                <h2 class="break-words text-base font-bold text-[#08244c]">{{ item.title }}</h2>
                <p class="mt-2 max-w-[15rem] break-words text-sm leading-6 text-slate-600">{{ item.description }}</p>
              </div>
            </article>
          </div>
        </aside>
      </div>

      <div
        v-motion
        :initial="{ opacity: 0, y: 14 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 550, delay: 500 } }"
        class="mt-10 grid min-w-0 gap-5 border-t border-slate-300/80 pt-6 sm:mt-12 sm:grid-cols-[auto_auto_1fr] sm:gap-6 lg:mt-6"
      >
        <div>
          <p class="text-base font-semibold text-slate-500">{{ memberCount }}</p>
          <p class="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Anggota</p>
        </div>
        <div>
          <p class="text-base font-semibold text-slate-500">{{ programCount }}</p>
          <p class="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Program Kerja</p>
        </div>
        <div class="flex items-start justify-between gap-4 sm:justify-end">
          <div>
            <p class="font-semibold text-cyan-600">Periode 2026/2027</p>
            <p class="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Kepengurusan Aktif</p>
          </div>
          <ArrowDownRight :size="22" class="text-cyan-500" aria-hidden="true" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.mascot-parallax {
  --mascot-x: 0px;
  --mascot-y: 0px;
  --mascot-rotate: 0deg;
  transform: translate3d(var(--mascot-x), var(--mascot-y), 0) rotate(var(--mascot-rotate));
  transform-origin: 50% 72%;
  will-change: transform;
}

.mascot-idle {
  animation: mascot-idle 5.8s ease-in-out infinite;
  transform-origin: 50% 72%;
  will-change: transform;
}

.mascot-button {
  cursor: pointer;
  transform: translateY(0) scale(1);
  transform-origin: 50% 72%;
  transition: transform 300ms ease, filter 300ms ease;
  will-change: transform;
}

.mascot-button:hover {
  transform: translateY(-4px) scale(1.03);
}

.mascot-button.is-reacting {
  animation: mascot-reaction 620ms cubic-bezier(0.2, 0.85, 0.3, 1);
}

.mascot-glow {
  opacity: 0.72;
  scale: 1;
  transform: translateX(-50%) scale(1);
  transform-origin: center;
  animation: mascot-glow-breathe 4.8s ease-in-out infinite;
  transition: opacity 300ms ease, filter 300ms ease, scale 300ms ease;
  will-change: transform, opacity;
}

.mascot-glow.is-hovered {
  opacity: 0.9;
  scale: 1.06;
  filter: saturate(1.08);
}

.mascot-glow.is-reacting {
  animation: mascot-glow-click 620ms ease-out;
}

.mascot-speech::after {
  position: absolute;
  right: 2.1rem;
  bottom: -0.45rem;
  width: 0.85rem;
  height: 0.85rem;
  content: '';
  background: white;
  border-right: 1px solid rgb(165 243 252);
  border-bottom: 1px solid rgb(165 243 252);
  transform: rotate(45deg);
}

.mascot-bubble-enter-active,
.mascot-bubble-leave-active {
  transition: opacity 260ms ease, transform 260ms ease;
  transform-origin: 85% 100%;
}

.mascot-bubble-enter-from,
.mascot-bubble-leave-to {
  opacity: 0;
  transform: translateY(7px) scale(0.94);
}

@keyframes mascot-idle {
  0%,
  100% {
    transform: translateY(0) rotate(-0.25deg);
  }
  50% {
    transform: translateY(-6px) rotate(0.35deg);
  }
}

@keyframes mascot-reaction {
  0% {
    transform: translateY(0) scale(1) rotate(0deg);
  }
  34% {
    transform: translateY(-7px) scale(1.06) rotate(1.4deg);
  }
  66% {
    transform: translateY(1px) scale(0.98) rotate(-0.8deg);
  }
  100% {
    transform: translateY(0) scale(1) rotate(0deg);
  }
}

@keyframes mascot-glow-breathe {
  0%,
  100% {
    transform: translateX(-50%) scale(0.96);
  }
  50% {
    transform: translateX(-50%) scale(1.05);
  }
}

@keyframes mascot-glow-click {
  0%,
  100% {
    opacity: 0.72;
    transform: translateX(-50%) scale(1);
  }
  45% {
    opacity: 0.96;
    transform: translateX(-50%) scale(1.13);
  }
}

@media (prefers-reduced-motion: reduce) {
  .mascot-parallax,
  .mascot-idle,
  .mascot-button,
  .mascot-button:hover,
  .mascot-button.is-reacting,
  .mascot-glow,
  .mascot-glow.is-reacting {
    animation: none;
    transition: none;
    transform: none;
  }

  .mascot-glow,
  .mascot-glow.is-hovered {
    scale: 1;
    transform: translateX(-50%);
  }

  .mascot-bubble-enter-active,
  .mascot-bubble-leave-active {
    transition: opacity 120ms linear;
  }

  .mascot-bubble-enter-from,
  .mascot-bubble-leave-to {
    opacity: 0;
    transform: none;
  }
}
</style>
