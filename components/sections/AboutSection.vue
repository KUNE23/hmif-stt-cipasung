<script setup>
import { aboutMissions, aboutVision } from '~/data/about'

const { getAll: getDivisions } = useDivisions()
const { getAll: getMembers } = useMembers()
const { getAll: getPrograms } = usePrograms()

const divisions = getDivisions()
const members = getMembers()
const programs = getPrograms()

const activeGenerations = new Set(members.map((member) => member.generation)).size

const statistics = [
  { value: divisions.length, label: 'Divisi' },
  { value: activeGenerations, label: 'Angkatan Aktif' },
  { value: programs.length, label: 'Kegiatan / Tahun' },
]
</script>

<template>
  <section id="tentang" class="relative overflow-hidden bg-[#eef8ff] py-16 sm:py-24 lg:py-32">
    <div class="pointer-events-none absolute -left-32 top-12 size-64 rounded-full bg-cyan-200/20 blur-[100px] sm:size-80" />

    <div class="container-hmif relative grid min-w-0 items-start gap-10 sm:gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24 xl:gap-32">
      <div
        v-motion
        :initial="{ opacity: 0, y: 24 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut' } }"
        class="min-w-0 max-w-xl"
      >
        <p class="mb-5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-600 sm:tracking-[0.26em]">Tentang HMIF</p>
        <h2 class="max-w-lg break-words text-3xl font-bold leading-tight tracking-tight text-[#08244c] sm:text-5xl sm:leading-[1.08] lg:text-[3.35rem]">
          Perjalanan HMIF
STT Cipasung
        </h2>

        <div class="mt-7 space-y-5 break-words text-sm leading-7 text-slate-600 sm:mt-8 sm:text-[15px]">
          <p>
            HMIF STT Cipasung didirikan pada 20 Februari 2021 yang didirikan oleh rekan-rekan angkatan 2019 dan 2020. <br />
            <br />
  Periode kepemimpinan HMIF STT Cipasung: <br />
            1. Haerul Febriansyah periode 2021/2023  <br />
            2. Ananta Sukma Winata periode 2023/2024  <br />
            3. M. Chandra Nuralim periode 2024/2025  <br />
            4. Muhammad Hasbi As’ari periode 2025/2026
          </p>
          <p>
            Melalui program kerja, kegiatan, dan kolaborasi yang dijalankan setiap periode, HMIF berupaya menjadi wadah yang aktif, terbuka, dan relevan bagi perkembangan mahasiswa Informatika maupun lingkungan kampus secara luas.
          </p>
        </div>
      </div>

      <div
        v-motion
        :initial="{ opacity: 0, y: 28 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 650, delay: 120, ease: 'easeOut' } }"
      >
        <figure class="group relative flex aspect-video min-h-0 items-center justify-center overflow-hidden rounded-2xl bg-[#183663] shadow-[0_24px_60px_rgba(14,72,115,0.12)] sm:aspect-[16/8.4] sm:min-h-72 sm:rounded-[1.6rem]">
          <NuxtImg
            src="/images/placeholders/Foto_Kegiatan.jpeg"
            alt="Foto kegiatan HMIF STT Cipasung"
            width="1280"
            height="853"
            format="webp"
            quality="88"
            loading="lazy"
            class="absolute inset-0 size-full object-cover object-center transition duration-500 ease-out group-hover:scale-[1.025] group-hover:brightness-[1.04]"
          />
          <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08244c]/20 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-45" aria-hidden="true" />
          <figcaption class="sr-only">Foto kegiatan HMIF STT Cipasung</figcaption>
        </figure>

        <div class="mt-8 grid min-w-0 items-start gap-8 md:grid-cols-[0.34fr_0.66fr] md:gap-8 xl:gap-10">
          <article class="min-w-0 max-w-[19rem]">
            <h3 class="text-sm font-bold text-[#08244c]">Visi</h3>
            <p class="mt-3 break-words text-sm leading-[1.65] text-slate-600">{{ aboutVision }}</p>
          </article>
          <article class="min-w-0">
            <h3 class="text-sm font-bold text-[#08244c]">Misi</h3>
            <div class="mt-3 grid gap-x-8 gap-y-6 lg:grid-cols-2 xl:gap-x-10">
              <div
                v-for="(mission, index) in aboutMissions"
                :key="mission"
                class="border-b border-[#08244c]/10 pb-3"
                :class="{
                  'lg:col-span-2': index === aboutMissions.length - 1 && aboutMissions.length % 2 === 1,
                }"
              >
                <span class="mb-1.5 block font-mono text-[10px] font-semibold tracking-[0.12em] text-cyan-600">
                  {{ String(index + 1).padStart(2, '0') }}
                </span>
                <p class="break-words text-[13px] leading-[1.65] text-slate-600">{{ mission }}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
