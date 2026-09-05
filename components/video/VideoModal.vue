<script setup>
import { X } from 'lucide-vue-next'

const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
})

const emit = defineEmits(['close'])
const dialogPanel = ref(null)
let previouslyFocusedElement = null

const closeModal = () => emit('close')
const handleKeydown = (event) => {
  if (event.key === 'Escape' && props.open) closeModal()
}

watch(
  () => props.open,
  async (isOpen) => {
    if (!import.meta.client) return

    document.body.style.overflow = isOpen ? 'hidden' : ''
    if (isOpen) {
      previouslyFocusedElement = document.activeElement
      await nextTick()
      dialogPanel.value?.focus()
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
    <Transition name="video-modal">
      <div
        v-if="open"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-[#061630]/80 p-3 backdrop-blur-sm sm:p-8"
        role="presentation"
        @click.self="closeModal"
      >
        <div
          ref="dialogPanel"
          class="video-modal__panel relative w-full max-w-5xl overflow-hidden rounded-2xl bg-[#071a36] shadow-2xl outline-none ring-1 ring-white/15"
          role="dialog"
          aria-modal="true"
          :aria-label="title"
          tabindex="-1"
        >
          <div class="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-5">
            <h3 class="min-w-0 truncate text-sm font-semibold text-white sm:text-base">{{ title }}</h3>
            <button
              type="button"
              class="grid size-9 shrink-0 place-items-center rounded-full text-slate-300 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              aria-label="Tutup video"
              @click="closeModal"
            >
              <X :size="20" aria-hidden="true" />
            </button>
          </div>

          <div class="aspect-video max-h-[70dvh] w-full bg-black">
            <iframe
              v-if="open"
              class="size-full border-0"
              :src="videoUrl"
              :title="title"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.video-modal-enter-active,
.video-modal-leave-active {
  transition: opacity 220ms ease;
}

.video-modal-enter-active .video-modal__panel,
.video-modal-leave-active .video-modal__panel {
  transition: opacity 220ms ease, transform 220ms ease;
}

.video-modal-enter-from,
.video-modal-leave-to,
.video-modal-enter-from .video-modal__panel,
.video-modal-leave-to .video-modal__panel {
  opacity: 0;
}

.video-modal-enter-from .video-modal__panel,
.video-modal-leave-to .video-modal__panel {
  transform: scale(0.96) translateY(8px);
}
</style>
