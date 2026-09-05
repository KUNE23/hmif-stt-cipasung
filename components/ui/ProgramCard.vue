<script setup>
import { Clock3, MapPin, Target, UserRound, Users } from 'lucide-vue-next'

const props = defineProps({
  program: { type: Object, required: true },
  number: { type: String, required: true },
})

const toList = (value) => Array.isArray(value) ? value : value ? [value] : []
const objectives = computed(() => toList(props.program.objectives ?? props.program.goal))
const targets = computed(() => toList(props.program.targets ?? props.program.target))
const peopleInCharge = computed(() => toList(props.program.personInCharge))
const executionPeriod = computed(() => props.program.period ?? props.program.timeline)
</script>

<template>
  <article class="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_15px_38px_rgba(15,35,70,0.05)] transition duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-[0_20px_48px_rgba(15,55,90,0.1)] sm:p-8">
    <span class="pointer-events-none absolute -right-1 -top-5 select-none text-[4.8rem] font-black leading-none tracking-tighter text-slate-200/80 sm:-top-6 sm:text-[6.5rem]" aria-hidden="true">
      {{ number }}
    </span>

    <div class="relative min-w-0">
      <span v-if="program.category" class="inline-flex rounded-full bg-cyan-50 px-3 py-1.5 text-[10px] font-bold tracking-wide text-cyan-800">
        {{ program.category }}
      </span>
      <h3 class="mt-5 max-w-[88%] break-words text-lg font-bold leading-snug text-[#061f50] sm:max-w-[82%] sm:text-2xl">{{ program.title }}</h3>
      <p class="mt-4 break-words text-sm leading-7 text-slate-600">{{ program.description }}</p>
    </div>

    <dl class="relative mt-6 min-w-0 space-y-4 rounded-2xl border border-slate-200 bg-[#f6f8fa] p-4 text-xs text-[#102c57] sm:p-5">
      <div class="grid min-w-0 grid-cols-[18px_minmax(0,1fr)] gap-2">
        <Target :size="14" class="mt-0.5 text-[#092650]" aria-hidden="true" />
        <div class="min-w-0">
          <dt class="text-[10px] text-slate-500">Tujuan</dt>
          <dd class="mt-1 break-words font-medium leading-5">
            <span v-for="objective in objectives" :key="objective" class="block [&+&]:mt-1">{{ objective }}</span>
          </dd>
        </div>
      </div>
      <div class="grid min-w-0 grid-cols-[18px_minmax(0,1fr)] gap-2">
        <Users :size="14" class="mt-0.5 text-[#092650]" aria-hidden="true" />
        <div class="min-w-0">
          <dt class="text-[10px] text-slate-500">Target</dt>
          <dd class="mt-1 break-words font-medium leading-5">
            <span v-for="target in targets" :key="target" class="block [&+&]:mt-1">{{ target }}</span>
          </dd>
        </div>
      </div>
      <div class="grid min-w-0 grid-cols-[18px_minmax(0,1fr)] gap-2">
        <Clock3 :size="14" class="mt-0.5 text-[#092650]" aria-hidden="true" />
        <div class="min-w-0"><dt class="text-[10px] text-slate-500">Periode Pelaksanaan</dt><dd class="mt-1 break-words font-medium leading-5">{{ executionPeriod }}</dd></div>
      </div>
      <div v-if="program.place" class="grid min-w-0 grid-cols-[18px_minmax(0,1fr)] gap-2">
        <MapPin :size="14" class="mt-0.5 text-[#092650]" aria-hidden="true" />
        <div class="min-w-0"><dt class="text-[10px] text-slate-500">Tempat</dt><dd class="mt-1 break-words font-medium leading-5">{{ program.place }}</dd></div>
      </div>
      <div v-if="peopleInCharge.length" class="grid min-w-0 grid-cols-[18px_minmax(0,1fr)] gap-2">
        <UserRound :size="14" class="mt-0.5 text-[#092650]" aria-hidden="true" />
        <div class="min-w-0">
          <dt class="text-[10px] text-slate-500">Penanggung Jawab</dt>
          <dd class="mt-1 break-words font-medium leading-5">
            <span v-for="person in peopleInCharge" :key="person" class="block [&+&]:mt-1">{{ person }}</span>
          </dd>
        </div>
      </div>
    </dl>
  </article>
</template>
