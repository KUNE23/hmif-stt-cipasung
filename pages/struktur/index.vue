<script setup>
const { getCoreMembers } = useMembers()
const { getAll: getDivisions } = useDivisions()

const coreMembers = getCoreMembers()
const divisions = getDivisions()

useSeoMeta({
  title: 'Struktur Organisasi | HMIF STT Cipasung',
  description: 'Struktur pengurus dan divisi HMIF STT Cipasung.',
})
</script>

<template>
  <section class="section-placeholder">
    <div class="container-hmif">
      <SectionHeading title="KSB / Pengurus Inti" />
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MemberCard v-for="member in coreMembers" :key="member.id" :member="member" />
      </div>

      <SectionHeading class="mt-12" title="Divisi HMIF" />
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DivisionCard v-for="division in divisions" :key="division.id" :division="division" />
      </div>
    </div>
  </section>
</template>
