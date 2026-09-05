<script setup>
defineProps({
  member: { type: Object, required: true },
})

const getPhotoStyle = (member) => ({
  transform: `translate3d(${member.photoPositionX ?? 0}px, ${member.photoPositionY ?? 0}px, 0) scale(${member.photoScale ?? 1})`,
  transformOrigin: 'center',
})
</script>

<template>
  <article class="flex h-full min-h-[18rem] min-w-0 flex-col items-center rounded-[1.25rem] border border-white/90 bg-white px-5 py-4 text-center shadow-[0_16px_45px_rgba(8,36,76,0.07)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-[0_20px_55px_rgba(8,101,140,0.12)] sm:px-6">
    <div class="relative size-[7.5rem] shrink-0 rounded-full bg-gradient-to-br from-cyan-100 via-white to-blue-100 p-[2px] shadow-sm">
      <div class="size-full overflow-hidden rounded-full bg-slate-100">
        <NuxtImg
          :src="member.photo"
          :alt="`Foto ${member.name}`"
          width="160"
          height="160"
          loading="lazy"
          class="size-full object-contain will-change-transform"
          :style="getPhotoStyle(member)"
        />
      </div>
    </div>

    <h3 class="mt-5 max-w-full break-words text-base font-bold text-[#08244c]">{{ member.name }}</h3>

    <p class="mt-1.5 max-w-full break-words text-center text-xs font-semibold text-cyan-700">
      {{ member.role }}
    </p>

    <p class="mt-4 max-w-[15rem] break-words text-xs leading-5 text-slate-600">
      {{ member.description }}
    </p>
  </article>
</template>
