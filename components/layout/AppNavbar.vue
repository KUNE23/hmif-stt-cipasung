<script setup>
import { Menu, X } from 'lucide-vue-next'
import { navigationItems } from '~/data/navigation'

const route = useRoute()
const isMenuOpen = ref(false)
const isScrolled = ref(false)

const landingSectionIds = [
  'beranda',
  'tentang',
  'struktur',
  'video-profile',
  'divisi',
  'galeri',
  'berita',
  'kolaborasi',
]

const registerLandingAnchors = () => {
  if (route.path !== '/') return

  document.querySelectorAll('main > section').forEach((section, index) => {
    if (landingSectionIds[index] && !section.id) section.id = landingSectionIds[index]
  })
}

const scrollToTarget = async (target) => {
  isMenuOpen.value = false

  if (route.path !== '/') {
    await navigateTo(`/#${target}`)
    await nextTick()
  }

  registerLandingAnchors()
  requestAnimationFrame(() => {
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 12
}

onMounted(() => {
  registerLandingAnchors()
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', handleScroll))

watch(() => route.fullPath, async () => {
  isMenuOpen.value = false
  await nextTick()
  registerLandingAnchors()

  if (route.hash) {
    requestAnimationFrame(() => {
      document.querySelector(route.hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 border-b transition-all duration-300"
    :class="isScrolled
      ? 'border-slate-200/80 bg-white/90 shadow-[0_8px_30px_rgba(8,36,78,0.05)] backdrop-blur-xl'
      : 'border-slate-200/60 bg-[#f5fbff]/90 backdrop-blur-md'"
  >
    <nav class="container-hmif flex h-[68px] items-center justify-between gap-3 lg:h-[84px]" aria-label="Navigasi utama">
      <NuxtLink to="/" class="group flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3" aria-label="HMIF STT Cipasung - Beranda">
        <span class="grid size-10 place-items-center overflow-hidden rounded-xl bg-white p-0.5 shadow-sm transition-transform group-hover:-translate-y-0.5">
          <NuxtImg
            src="/images/placeholders/logo.png"
            alt="Logo HMIF STT Cipasung"
            width="40"
            height="40"
            class="size-9 rounded-full object-contain"
            loading="eager"
          />
        </span>
        <span class="min-w-0 leading-none">
          <span class="block text-base font-extrabold tracking-[0.04em] text-[#08244c]">HMIF</span>
          <span class="mt-1 block text-[9px] font-medium uppercase tracking-[0.2em] text-slate-500">STT Cipasung</span>
        </span>
      </NuxtLink>

      <div class="hidden items-center gap-8 lg:flex">
        <NuxtLink
          v-for="item in navigationItems"
          :key="item.label"
          :to="item.to"
          class="relative py-2 text-sm font-medium text-slate-600 transition-colors hover:text-[#08244c] after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-cyan-500 after:transition-transform hover:after:scale-x-100"
          @click.prevent="scrollToTarget(item.target)"
        >
          {{ item.label }}
        </NuxtLink>
      </div>

      <a
        href="mailto:hmif@sttcipasung.ac.id"
        class="hidden rounded-full border border-slate-300 bg-white/60 px-6 py-3 text-sm font-semibold text-[#08244c] transition-all hover:border-cyan-400 hover:bg-cyan-50 lg:inline-flex"
      >
        Hubungi Kami
      </a>

      <button
        type="button"
        class="grid size-10 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white/80 text-[#08244c] lg:hidden"
        :aria-expanded="isMenuOpen"
        aria-controls="mobile-navigation"
        :aria-label="isMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'"
        @click="isMenuOpen = !isMenuOpen"
      >
        <X v-if="isMenuOpen" :size="22" aria-hidden="true" />
        <Menu v-else :size="22" aria-hidden="true" />
      </button>
    </nav>

    <div
      id="mobile-navigation"
      class="grid overflow-hidden border-t border-slate-200/70 bg-white/95 transition-[grid-template-rows,opacity] duration-300 lg:hidden"
      :class="isMenuOpen ? 'grid-rows-[1fr] opacity-100' : 'pointer-events-none grid-rows-[0fr] opacity-0'"
    >
      <div class="min-h-0">
        <div class="container-hmif flex max-h-[calc(100dvh-68px)] flex-col overflow-y-auto py-4">
          <NuxtLink
            v-for="(item, index) in navigationItems"
            :key="item.label"
            :to="item.to"
            class="break-words border-b border-slate-100 py-3.5 text-sm font-medium text-slate-700 transition-all hover:pl-2 hover:text-cyan-700"
            :style="{ transitionDelay: isMenuOpen ? `${index * 25}ms` : '0ms' }"
            @click.prevent="scrollToTarget(item.target)"
          >
            {{ item.label }}
          </NuxtLink>
          <a
            href="mailto:hmif@sttcipasung.ac.id"
            class="mt-4 inline-flex justify-center rounded-full bg-[#08244c] px-5 py-3 text-sm font-semibold text-white"
          >
            Hubungi Kami
          </a>
        </div>
      </div>
    </div>
  </header>
</template>
