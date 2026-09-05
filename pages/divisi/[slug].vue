<script setup>
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Grid2X2,
  Instagram,
  Link as LinkIcon,
  Linkedin,
  Network,
  Quote,
  Users,
} from 'lucide-vue-next'

const route = useRoute()
const { getAllProfiles, getBySlug } = useDivisions()
const { getByDivision, getDivisionHead, getDivisionStaff } = useMembers()

const slug = computed(() => String(route.params.slug || ''))
const division = computed(() => getBySlug(slug.value))

if (!division.value) {
  throw createError({ statusCode: 404, statusMessage: 'Divisi tidak ditemukan' })
}

const divisionHead = computed(() => getDivisionHead(slug.value))
const divisionStaff = computed(() => getDivisionStaff(slug.value))
const memberCount = computed(() => getByDivision(slug.value).length)
const displayName = computed(() => division.value.profileName || division.value.name)
const memberBackground = '/images/members/background.png'
const memberSectionBackgroundStyle = {
  backgroundImage: `linear-gradient(180deg, rgba(244, 247, 250, 0.93), rgba(244, 247, 250, 0.93)), url("${memberBackground}")`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
}
const memberPhotoBackgroundStyle = {
  backgroundImage: `url("${memberBackground}")`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
}

const profiles = getAllProfiles()
const currentIndex = computed(() => profiles.findIndex((item) => item.slug === slug.value))
const previousDivision = computed(() => profiles[(currentIndex.value - 1 + profiles.length) % profiles.length])
const nextDivision = computed(() => profiles[(currentIndex.value + 1) % profiles.length])

useSeoMeta({
  title: () => `${displayName.value} | Divisi HMIF STT Cipasung`,
  description: () => division.value.description,
  ogTitle: () => `${displayName.value} | HMIF STT Cipasung`,
  ogDescription: () => division.value.description,
  ogImage: () => division.value.logo,
})
</script>

<template>
  <div class="bg-white text-[#071f4b]">
    <section class="relative overflow-hidden bg-[#f4f8fb] pb-14 pt-28 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40">
      <div class="absolute right-[8%] top-28 size-3 rounded-full bg-cyan-400" aria-hidden="true" />
      <div class="absolute left-[58%] top-[62%] size-5 rounded-full border-2 border-cyan-400/70" aria-hidden="true" />

      <div class="container-hmif relative grid min-w-0 items-center gap-9 sm:gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
        <Motion
          as="div"
          class="min-w-0"
          :initial="{ opacity: 0, y: 22 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut' } }"
        >
          <div class="flex flex-wrap gap-2.5">
            <span class="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-[#17345f] shadow-sm">
              <CalendarDays :size="14" class="text-cyan-600" aria-hidden="true" />
              Periode {{ division.period }}
            </span>
            <span class="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-[#17345f] shadow-sm">
              <Users :size="14" class="text-cyan-600" aria-hidden="true" />
              {{ memberCount }} Anggota
            </span>
          </div>

          <p class="mt-6 inline-flex max-w-full rounded-full bg-cyan-100 px-3 py-1.5 text-[10px] font-bold uppercase leading-5 tracking-[0.12em] text-cyan-700">
            Divisi HMIF
          </p>
          <h1 class="mt-3 break-words text-3xl font-extrabold leading-tight text-[#031b4b] sm:text-5xl lg:text-6xl">
            {{ displayName }}
          </h1>
          <p class="mt-5 max-w-2xl break-words text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
            {{ division.description }}
          </p>
        </Motion>

        <Motion
          as="div"
          class="relative mx-auto grid min-h-52 w-full max-w-xs place-items-center overflow-hidden sm:min-h-80 sm:max-w-md"
          :initial="{ opacity: 0, scale: 0.94 }"
          :enter="{ opacity: 1, scale: 1, transition: { duration: 700, delay: 120, ease: 'easeOut' } }"
        >
          <span class="pointer-events-none absolute max-w-full select-none truncate text-[clamp(3.5rem,16vw,5rem)] font-black tracking-tight text-slate-200/70 sm:text-[clamp(4.5rem,12vw,9rem)]" aria-hidden="true">
            {{ division.accentText }}
          </span>
          <div class="relative grid size-44 place-items-center rounded-full border border-white bg-gradient-to-br from-white via-cyan-50 to-cyan-100 shadow-[0_24px_70px_rgba(9,66,111,0.12)] sm:size-72">
            <NuxtImg
              :src="division.logo"
              :alt="`Logo ${displayName}`"
              width="288"
              height="288"
              class="size-28 rounded-full object-cover sm:size-48"
              loading="eager"
            />
          </div>
        </Motion>
      </div>
    </section>

    <section class="py-16 sm:py-20 lg:py-24" :style="memberSectionBackgroundStyle" aria-labelledby="division-head-title">
      <div class="container-hmif">
        <div class="flex items-center gap-5">
          <h2 id="division-head-title" class="shrink-0 text-2xl font-bold sm:text-3xl">Kepala Divisi</h2>
          <span class="h-px w-full bg-slate-200" aria-hidden="true" />
        </div>

        <Motion
          v-if="divisionHead"
          as="article"
          class="mt-10 grid min-w-0 overflow-hidden rounded-3xl border border-slate-100 bg-white p-4 shadow-[0_22px_65px_rgba(15,34,68,0.08)] sm:p-6 lg:grid-cols-[minmax(280px,0.78fr)_1.22fr] lg:gap-10"
          :initial="{ opacity: 0, y: 24 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 620, delay: 80, ease: 'easeOut' } }"
        >
          <div class="group relative isolate grid min-h-[330px] overflow-hidden rounded-2xl bg-[#0b55c7] bg-cover bg-center sm:min-h-[520px]" :style="memberPhotoBackgroundStyle">
            <div class="pointer-events-none absolute inset-0 z-0 bg-white/10" aria-hidden="true" />
            <div class="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-1/3 bg-gradient-to-t from-[#031b4b]/20 to-transparent" aria-hidden="true" />
            <div class="pointer-events-none absolute inset-x-0 top-0 z-0 h-1/2 bg-gradient-to-b from-[#0e49b8]/25 to-transparent" aria-hidden="true" />
            <NuxtImg
              :src="divisionHead.photo"
              :alt="`Foto ${divisionHead.name}`"
              width="640"
              height="760"
              class="relative z-20 h-full max-h-[540px] w-full translate-y-3 object-contain object-bottom drop-shadow-[0_18px_24px_rgba(3,18,47,0.18)] transition duration-500 ease-out group-hover:scale-[1.015]"
            />
          </div>

          <div class="flex min-w-0 flex-col justify-center px-1 py-7 sm:px-3 lg:py-6">
            <h3 class="break-words text-2xl font-extrabold sm:text-4xl">{{ divisionHead.name }}</h3>
            <div class="mt-3 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
              <span class="break-words font-bold uppercase tracking-[0.1em] text-cyan-700">Kepala Divisi {{ displayName }}</span>
              <span class="text-slate-300" aria-hidden="true">•</span>
              <span class="text-slate-500">Angkatan {{ divisionHead.generation }}</span>
            </div>
            <p class="mt-6 max-w-2xl break-words text-sm leading-7 text-slate-700 sm:text-base sm:leading-8">
              {{ divisionHead.description || `Memimpin koordinasi dan pelaksanaan program kerja Divisi ${displayName}.` }}
            </p>

            <blockquote v-if="divisionHead.quote" class="relative mt-7 break-words rounded-2xl border border-slate-200 bg-[#f7f9fb] px-5 py-6 text-sm italic leading-7 text-slate-600 sm:px-9">
              <Quote :size="29" class="absolute -left-1 -top-3 fill-cyan-300 text-cyan-300" aria-hidden="true" />
              “{{ divisionHead.quote }}”
            </blockquote>

            <div v-if="divisionHead.instagram || divisionHead.linkedin" class="mt-7 flex gap-3" aria-label="Media sosial kepala divisi">
              <a v-if="divisionHead.instagram" :href="divisionHead.instagram" class="grid size-10 place-items-center rounded-full border border-slate-200 transition hover:border-cyan-400 hover:text-cyan-600" aria-label="Instagram">
                <Instagram :size="17" aria-hidden="true" />
              </a>
              <a v-if="divisionHead.linkedin" :href="divisionHead.linkedin" class="grid size-10 place-items-center rounded-full border border-slate-200 transition hover:border-cyan-400 hover:text-cyan-600" aria-label="LinkedIn">
                <Linkedin :size="17" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Motion>

        <div v-else class="mt-10 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center text-sm text-slate-500">
          Data kepala divisi belum tersedia.
        </div>
      </div>
    </section>

    <section class="py-16 sm:py-20 lg:py-24" :style="memberSectionBackgroundStyle" :aria-labelledby="`${slug}-members-title`">
      <div class="container-hmif">
        <div class="flex min-w-0 items-center gap-4 sm:gap-5">
          <h2 :id="`${slug}-members-title`" class="min-w-0 break-words text-xl font-bold sm:shrink-0 sm:text-3xl">Anggota {{ displayName }}</h2>
          <span class="h-px w-full bg-slate-200" aria-hidden="true" />
        </div>

        <div v-if="divisionStaff.length" class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Motion
            v-for="(member, index) in divisionStaff"
            :key="member.id"
            as="article"
            class="group min-w-0 rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_12px_30px_rgba(18,39,74,0.04)]"
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 80 + index * 70, ease: 'easeOut' } }"
          >
            <div class="relative isolate grid aspect-[4/5] overflow-hidden rounded-xl bg-[#0b55c7] bg-cover bg-center" :style="memberPhotoBackgroundStyle">
              <div class="pointer-events-none absolute inset-0 z-0 bg-white/10" aria-hidden="true" />
              <div class="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-1/3 bg-gradient-to-t from-[#031b4b]/20 to-transparent" aria-hidden="true" />
              <NuxtImg :src="member.photo" :alt="`Foto ${member.name}`" width="480" height="560" class="relative z-20 h-full w-full translate-y-2 object-contain object-bottom drop-shadow-[0_12px_18px_rgba(3,18,47,0.16)] transition duration-500 ease-out group-hover:scale-[1.015]" />
              <span class="absolute right-3 top-3 z-30 grid size-7 place-items-center rounded-full bg-white text-[10px] font-bold text-[#092650] shadow-sm">
                {{ String(index + 1).padStart(2, '0') }}
              </span>
            </div>
            <div class="px-2 pb-3 pt-4">
              <h3 class="break-words text-base font-bold">{{ member.name }}</h3>
              <p class="mt-1 break-words text-xs font-semibold text-cyan-700">Staff {{ displayName }}</p>
              <p class="mt-1.5 text-xs text-slate-500">Angkatan {{ member.generation }}</p>
            </div>
          </Motion>
        </div>

        <div v-else class="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-sm text-slate-500">
          Data anggota divisi belum tersedia.
        </div>
      </div>
    </section>

    <nav class="border-y border-slate-200 bg-white py-9" aria-label="Navigasi antar divisi">
      <div class="container-hmif grid min-w-0 items-center gap-5 sm:grid-cols-[1fr_auto_1fr] sm:gap-7">
        <NuxtLink :to="`/divisi/${previousDivision.slug}`" class="group flex min-w-0 items-center gap-3 justify-self-start sm:gap-4">
          <span class="grid size-11 place-items-center rounded-full border border-slate-200 transition group-hover:border-cyan-400 group-hover:text-cyan-600"><ArrowLeft :size="18" aria-hidden="true" /></span>
          <span class="min-w-0"><span class="block text-[9px] uppercase tracking-wider text-slate-500">Divisi sebelumnya</span><span class="mt-1 block break-words text-sm font-bold">{{ previousDivision.shortName }}</span></span>
        </NuxtLink>

        <NuxtLink to="/#struktur" class="inline-flex items-center gap-2 justify-self-center text-xs font-semibold text-cyan-600 hover:text-cyan-700">
          <Grid2X2 :size="15" aria-hidden="true" /> Lihat Semua Divisi
        </NuxtLink>

        <NuxtLink :to="`/divisi/${nextDivision.slug}`" class="group flex min-w-0 items-center gap-3 justify-self-end text-right sm:gap-4">
          <span class="min-w-0"><span class="block text-[9px] uppercase tracking-wider text-slate-500">Divisi selanjutnya</span><span class="mt-1 block break-words text-sm font-bold">{{ nextDivision.shortName }}</span></span>
          <span class="grid size-11 place-items-center rounded-full border border-slate-200 transition group-hover:border-cyan-400 group-hover:text-cyan-600"><ArrowRight :size="18" aria-hidden="true" /></span>
        </NuxtLink>
      </div>
    </nav>

    <section class="bg-[#eff8fc] py-20 text-center sm:py-24">
      <div class="container-hmif">
        <span class="mx-auto grid size-14 place-items-center rounded-2xl bg-white shadow-sm"><Network :size="24" aria-hidden="true" /></span>
        <h2 class="mt-8 break-words text-2xl font-extrabold sm:text-4xl">Kenali Struktur HMIF Lebih Lengkap</h2>
        <p class="mx-auto mt-5 max-w-xl break-words text-sm leading-7 text-slate-600">Pelajari lebih lanjut tentang divisi lain dan struktur organisasi yang mendukung pergerakan HMIF STT Cipasung.</p>
        <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <NuxtLink to="/#struktur" class="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#031b4b] px-7 text-sm font-semibold text-white transition hover:bg-[#0b3267]">Lihat Struktur Anggota</NuxtLink>
          <NuxtLink to="/" class="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-7 text-sm font-semibold text-[#071f4b] transition hover:border-cyan-400">Kembali ke Beranda</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
