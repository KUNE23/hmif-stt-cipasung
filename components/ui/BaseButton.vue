<script setup>
import { ArrowRight } from 'lucide-vue-next'

const props = defineProps({
  to: { type: String, default: '' },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary'].includes(value),
  },
})

const buttonClass = computed(() => [
  'inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors',
  props.variant === 'primary'
    ? 'bg-teal-700 text-white hover:bg-teal-800'
    : 'border border-slate-300 bg-white text-slate-900 hover:bg-slate-100',
])
</script>

<template>
  <NuxtLink v-if="to" :to="to" :class="buttonClass">
    <slot />
    <ArrowRight :size="16" aria-hidden="true" />
  </NuxtLink>
  <button v-else type="button" :class="buttonClass">
    <slot />
    <ArrowRight :size="16" aria-hidden="true" />
  </button>
</template>
