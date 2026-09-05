<script setup>
import { ChevronLeft, ChevronRight, ImageIcon, X } from 'lucide-vue-next'

const props = defineProps({
  open: { type: Boolean, default: false },
  items: { type: Array, required: true },
  activeIndex: { type: Number, default: 0 },
})

const emit = defineEmits(['close', 'previous', 'next'])
const lightboxPanel = ref(null)
let previouslyFocusedElement = null

const activeItem = computed(() => props.items[props.activeIndex])
const closeLightbox = () => emit('close')

const formatDate = (date) => new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}).format(new Date(`${date}T00:00:00`))

const handleKeydown = (event) => {
  if (!props.open) return
  if (event.key === 'Escape') closeLightbox()
  if (event.key === 'ArrowLeft') emit('previous')
  if (event.key === 'ArrowRight') emit('next')
}

watch(
  () => props.open,
  async (isOpen) => {
    if (!import.meta.client) return

    document.body.style.overflow = isOpen ? 'hidden' : ''
    if (isOpen) {
      previouslyFocusedElement = document.activeElement
      await nextTick()
      lightboxPanel.value?.focus()
      return
    }

    previouslyFocusedElement?.focus?.()
  },
)

onMounted(() => window.addEventListener('keydown', handleKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="gallery-lightbox">
      <div
        v-if="open && activeItem"
        class="fixed inset-0 z-[110] flex items-center justify-center bg-[#031127]/90 p-3 backdrop-blur-sm sm:p-6"
        role="presentation"
        @click.self="closeLightbox"
      >
        <div
          ref="lightboxPanel"
          class="gallery-lightbox__panel relative flex max-h-[94dvh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-[#071a36] shadow-2xl outline-none ring-1 ring-white/15"
          role="dialog"
          aria-modal="true"
          :aria-label="`Foto ${activeItem.title}`"
          tabindex="-1"
        >
          <div class="flex min-h-14 items-center justify-between gap-4 border-b border-white/10 px-4 sm:px-5">
            <p class="font-mono text-xs tracking-[0.12em] text-white/65">
              {{ activeIndex + 1 }} / {{ items.length }}
            </p>
            <button
              type="button"
              class="grid size-9 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              aria-label="Tutup galeri"
              @click="closeLightbox"
            >
              <X :size="20" aria-hidden="true" />
            </button>
          </div>

          <div class="relative flex min-h-0 flex-1 items-center justify-center bg-[#041329]">
            <NuxtImg
              v-if="activeItem.image"
              :src="activeItem.image"
              :alt="activeItem.alt"
              class="max-h-[66dvh] w-full max-w-full object-contain sm:max-h-[72vh]"
              width="1600"
              height="1100"
              quality="88"
            />
            <div v-else class="gallery-placeholder flex min-h-[55vh] w-full items-center justify-center text-white/65">
              <div class="text-center">
                <ImageIcon :size="30" :stroke-width="1.4" class="mx-auto" aria-hidden="true" />
                <p class="mt-4 font-mono text-[10px] uppercase tracking-[0.22em]">Tambahkan Foto</p>
              </div>
            </div>

            <button
              type="button"
              class="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-[#061630]/65 text-white shadow-lg transition hover:bg-cyan-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-5 sm:size-12"
              aria-label="Foto sebelumnya"
              @click="emit('previous')"
            >
              <ChevronLeft :size="24" aria-hidden="true" />
            </button>
            <button
              type="button"
              class="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-[#061630]/65 text-white shadow-lg transition hover:bg-cyan-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-5 sm:size-12"
              aria-label="Foto berikutnya"
              @click="emit('next')"
            >
              <ChevronRight :size="24" aria-hidden="true" />
            </button>
          </div>

          <div class="min-w-0 border-t border-white/10 px-4 py-4 sm:px-6">
            <h3 class="break-words text-base font-bold text-white sm:text-lg">{{ activeItem.title }}</h3>
            <p class="mt-1 break-words text-xs text-slate-400 sm:text-sm">
              {{ activeItem.category }} · {{ formatDate(activeItem.date) }}
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.gallery-placeholder {
  background: linear-gradient(135deg, #153766 0%, #183c73 42%, #08a4c2 100%);
}

.gallery-lightbox-enter-active,
.gallery-lightbox-leave-active {
  transition: opacity 220ms ease;
}

.gallery-lightbox-enter-active .gallery-lightbox__panel,
.gallery-lightbox-leave-active .gallery-lightbox__panel {
  transition: opacity 220ms ease, transform 220ms ease;
}

.gallery-lightbox-enter-from,
.gallery-lightbox-leave-to,
.gallery-lightbox-enter-from .gallery-lightbox__panel,
.gallery-lightbox-leave-to .gallery-lightbox__panel {
  opacity: 0;
}

.gallery-lightbox-enter-from .gallery-lightbox__panel,
.gallery-lightbox-leave-to .gallery-lightbox__panel {
  transform: scale(0.97) translateY(8px);
}
</style>
