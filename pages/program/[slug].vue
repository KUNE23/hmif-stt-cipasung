<script setup>
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Eye,
  LayoutGrid,
  UserRound,
} from 'lucide-vue-next'

const route = useRoute()
const { getAllProfiles, getBySlug } = useDivisions()
const { getByDivision } = usePrograms()
const { getDivisionHead } = useMembers()

const slug = computed(() => String(route.params.slug || ''))
const division = computed(() => getBySlug(slug.value))

if (!division.value) {
  throw createError({ statusCode: 404, statusMessage: 'Divisi tidak ditemukan' })
}

const programs = computed(() => getByDivision(slug.value))
const divisionHead = computed(() => getDivisionHead(slug.value))
const displayName = computed(() => division.value.profileName || division.value.name)

const divisions = getAllProfiles()
const currentIndex = computed(() => divisions.findIndex((item) => item.slug === slug.value))
const previousDivision = computed(() => divisions[(currentIndex.value - 1 + divisions.length) % divisions.length])
const nextDivision = computed(() => divisions[(currentIndex.value + 1) % divisions.length])

useSeoMeta({
  title: () => `Program Kerja ${displayName.value} | HMIF STT Cipasung`,
  description: () => `Daftar program kerja ${displayName.value} HMIF STT Cipasung periode ${division.value.period}.`,
  ogTitle: () => `Program Kerja ${displayName.value} | HMIF STT Cipasung`,
  ogDescription: () => division.value.description,
  ogImage: () => division.value.logo,
})
</script>

<template>
  <div class="bg-[#f5f8fb] text-[#071f4b]">
    <section class="relative overflow-hidden pb-14 pt-28 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40">
      <div class="container-hmif relative">
        <nav class="flex min-w-0 flex-wrap items-center gap-1.5 break-words text-xs font-semibold text-slate-500" aria-label="Breadcrumb">
          <NuxtLink to="/" class="transition hover:text-cyan-700">Beranda</NuxtLink>
          <ChevronRight :size="13" aria-hidden="true" />
          <NuxtLink to="/#divisi" class="transition hover:text-cyan-700">Divisi</NuxtLink>
          <ChevronRight :size="13" aria-hidden="true" />
          <NuxtLink :to="`/divisi/${division.slug}`" class="transition hover:text-cyan-700">{{ displayName }}</NuxtLink>
          <ChevronRight :size="13" aria-hidden="true" />
          <span class="font-bold text-[#092650]">Program Kerja</span>
        </nav>

        <div class="mt-8 grid min-w-0 items-center gap-9 sm:gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
          <Motion
            as="div"
            class="min-w-0"
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut' } }"
          >
            <p class="inline-flex max-w-full items-center gap-2 rounded-full bg-cyan-100 px-3 py-1.5 text-[10px] font-bold uppercase leading-5 tracking-[0.1em] text-cyan-800">
              <span class="size-1.5 rounded-full bg-cyan-500" aria-hidden="true" />
              Program Kerja Divisi
            </p>
            <h1 class="mt-5 break-words text-3xl font-extrabold leading-tight text-[#031b4b] sm:text-5xl sm:leading-[1.05] lg:text-6xl">
              Program Kerja<br>{{ displayName }}
            </h1>
            <p class="mt-6 max-w-xl break-words text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              Mendukung visi HMIF {{ division.period }} melalui program strategis {{ displayName }} yang relevan, kolaboratif, dan berdampak bagi mahasiswa Informatika STT Cipasung.
            </p>
            <div class="mt-8 flex flex-wrap gap-3">
              <span class="inline-flex items-center gap-2 rounded-full bg-slate-200/80 px-4 py-2.5 text-xs font-semibold text-[#17345f]">
                <CalendarDays :size="15" aria-hidden="true" /> Periode {{ division.period }}
              </span>
              <span class="inline-flex items-center gap-2 rounded-full bg-slate-200/80 px-4 py-2.5 text-xs font-semibold text-[#17345f]">
                <CheckCircle2 :size="15" aria-hidden="true" /> {{ programs.length }} Program Kerja
              </span>
            </div>
          </Motion>

          <Motion
            as="div"
            class="relative mx-auto grid min-h-52 w-full max-w-xs place-items-center overflow-hidden sm:min-h-72 sm:max-w-md"
            :initial="{ opacity: 0, scale: 0.94 }"
            :enter="{ opacity: 1, scale: 1, transition: { duration: 700, delay: 120, ease: 'easeOut' } }"
          >
            <span class="pointer-events-none absolute left-1/2 top-1/2 max-w-full -translate-x-1/2 -translate-y-1/2 -rotate-6 select-none truncate text-[clamp(3.4rem,16vw,5rem)] font-black tracking-tight text-slate-200/70 sm:text-[clamp(4.5rem,10vw,8rem)]" aria-hidden="true">
              {{ division.accentText }}
            </span>
            <div class="relative grid size-44 place-items-center rounded-full bg-gradient-to-br from-cyan-50 to-cyan-200 shadow-[0_22px_70px_rgba(34,201,225,0.16)] sm:size-64">
              <div class="grid size-[78%] place-items-center rounded-full bg-white/90 shadow-sm">
                <NuxtImg :src="division.logo" :alt="`Logo ${displayName}`" width="220" height="220" class="size-28 rounded-full object-cover sm:size-40" loading="eager" />
              </div>
            </div>
            <span class="absolute right-6 top-3 size-3 rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.75)]" aria-hidden="true" />
            <span class="absolute bottom-8 left-6 size-2 rounded-full bg-slate-400" aria-hidden="true" />
          </Motion>
        </div>

        <Motion
          as="div"
          class="relative mt-14 min-w-0 overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_20px_50px_rgba(16,36,70,0.05)] sm:mt-20 sm:p-10 lg:mt-24"
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 620, delay: 220, ease: 'easeOut' } }"
        >
          <div class="absolute -right-16 -top-28 size-80 rounded-full bg-cyan-100/70" aria-hidden="true" />
          <div class="relative grid min-w-0 items-center gap-8 lg:grid-cols-[1fr_280px] lg:gap-16">
            <div class="min-w-0">
              <h2 class="break-words text-2xl font-bold sm:text-3xl">Tentang Divisi</h2>
              <p class="mt-5 max-w-3xl break-words text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">{{ division.description }}</p>
            </div>
            <dl class="min-w-0 space-y-3">
              <div class="flex min-w-0 items-center gap-4 rounded-xl border border-slate-200 bg-[#f6f8fa] p-4">
                <span class="grid size-10 place-items-center rounded-full bg-cyan-100 text-[#092650]"><UserRound :size="18" aria-hidden="true" /></span>
                <div class="min-w-0"><dt class="text-[9px] uppercase tracking-wider text-slate-500">Kepala Divisi</dt><dd class="mt-0.5 break-words text-xs font-bold">{{ divisionHead?.name || 'Belum tersedia' }}</dd></div>
              </div>
              <div class="flex min-w-0 items-center gap-4 rounded-xl border border-slate-200 bg-[#f6f8fa] p-4">
                <span class="grid size-10 place-items-center rounded-full bg-cyan-100 text-[#092650]"><Eye :size="18" aria-hidden="true" /></span>
                <div class="min-w-0"><dt class="text-[9px] uppercase tracking-wider text-slate-500">Fokus</dt><dd class="mt-0.5 break-words text-xs font-bold">{{ division.focus }}</dd></div>
              </div>
            </dl>
          </div>
        </Motion>
      </div>
    </section>

    <section class="pb-20 sm:pb-24" aria-labelledby="program-list-title">
      <div class="container-hmif">
        <h2 id="program-list-title" class="text-2xl font-bold sm:text-3xl">Daftar Program Kerja</h2>
        <p class="mt-3 text-sm text-slate-600">Inisiatif strategis kami untuk periode {{ division.period }}.</p>

        <div v-if="programs.length" class="mt-10 grid min-w-0 gap-6 lg:grid-cols-2">
          <Motion
            v-for="(program, index) in programs"
            :key="program.id"
            as="div"
            :initial="{ opacity: 0, y: 18 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 80 + (index % 4) * 70, ease: 'easeOut' } }"
          >
            <ProgramCard :program="program" :number="String(index + 1).padStart(2, '0')" />
          </Motion>
        </div>
        <div v-else class="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center text-sm text-slate-500">
          Belum ada program kerja yang dipublikasikan.
        </div>
      </div>
    </section>

    <nav class="border-t border-slate-200 py-10" aria-label="Navigasi program kerja divisi">
      <div class="container-hmif grid min-w-0 items-center gap-5 sm:grid-cols-[1fr_auto_1fr] sm:gap-7">
        <NuxtLink :to="`/program/${previousDivision.slug}`" class="group flex min-w-0 items-center gap-3 justify-self-start break-words text-sm font-semibold text-slate-600 transition hover:text-cyan-700">
          <ArrowLeft :size="18" class="transition group-hover:-translate-x-1" aria-hidden="true" /> {{ previousDivision.shortName }}
        </NuxtLink>
        <NuxtLink to="/#divisi" class="inline-flex min-h-11 items-center gap-2 justify-self-center rounded-full border border-slate-300 bg-white px-6 text-xs font-semibold transition hover:border-cyan-400 hover:text-cyan-700">
          <LayoutGrid :size="14" aria-hidden="true" /> Lihat Semua Divisi
        </NuxtLink>
        <NuxtLink :to="`/program/${nextDivision.slug}`" class="group flex min-w-0 items-center gap-3 justify-self-end break-words text-right text-sm font-semibold text-slate-600 transition hover:text-cyan-700">
          {{ nextDivision.shortName }} <ArrowRight :size="18" class="transition group-hover:translate-x-1" aria-hidden="true" />
        </NuxtLink>
      </div>
    </nav>

    <section class="pb-20 sm:pb-24">
      <div class="container-hmif">
        <div class="overflow-hidden rounded-3xl bg-gradient-to-r from-[#102a5a] to-[#3d507d] px-5 py-12 text-center text-white shadow-[0_20px_55px_rgba(4,29,70,0.14)] sm:px-10 sm:py-16">
          <h2 class="break-words text-2xl font-extrabold sm:text-4xl">Jelajahi Divisi Lainnya</h2>
          <p class="mx-auto mt-5 max-w-2xl break-words text-sm leading-7 text-slate-300 sm:text-base">Pelajari lebih lanjut tentang divisi-divisi lain di HMIF STT Cipasung yang bekerja sama untuk memajukan mahasiswa Informatika.</p>
          <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <NuxtLink to="/#struktur" class="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-[#092650] transition hover:bg-cyan-50">Lihat Semua Divisi</NuxtLink>
            <NuxtLink to="/" class="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-8 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200">Kembali ke Beranda</NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
