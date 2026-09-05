<script setup>
import { Instagram } from 'lucide-vue-next'
import { footerData } from '~/data/footer'
import { navigationItems } from '~/data/navigation'

const socialIcons = {
  Instagram,
}

const isValidEmail = (email) => email.includes('@') && !email.startsWith('[')
</script>

<template>
  <footer id="kontak" class="bg-[#071a38] text-white">
    <div class="container-hmif pt-14 pb-7 sm:pt-20">
      <div class="grid min-w-0 gap-x-12 gap-y-10 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-[1.35fr_0.65fr_0.9fr_0.9fr] lg:gap-x-16">
        <div class="min-w-0 max-w-sm">
          <NuxtLink to="/" class="group inline-flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300" aria-label="HMIF STT Cipasung - Beranda">
            <span class="grid size-10 place-items-center overflow-hidden rounded-xl bg-white p-0.5 ring-1 ring-white/15 transition-transform duration-300 group-hover:-translate-y-0.5">
              <NuxtImg
                src="/images/placeholders/logo.png"
                alt="Logo HMIF STT Cipasung"
                width="40"
                height="40"
                class="object-contain rounded-full size-9"
                loading="lazy"
              />
            </span>
            <span class="leading-none">
              <span class="block text-base font-extrabold tracking-[0.04em] text-white">{{ footerData.brand.name }}</span>
              <span class="mt-1 block text-[9px] font-medium uppercase tracking-[0.2em] text-slate-400">{{ footerData.brand.subtitle }}</span>
            </span>
          </NuxtLink>

          <p class="mt-5 break-words text-sm leading-7 text-slate-400">
            {{ footerData.brand.description }}
          </p>

          <div class="flex items-center gap-3 mt-6" aria-label="Media sosial HMIF">
            <a
              v-for="social in footerData.socialLinks"
              :key="social.name"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              class="grid size-10 place-items-center rounded-lg border border-white/15 text-slate-400 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-400/70 hover:bg-white/5 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              :aria-label="`${social.name} HMIF`"
            >
              <component :is="socialIcons[social.icon]" :size="17" :stroke-width="1.7" aria-hidden="true" />
            </a>
          </div>
        </div>

        <nav aria-label="Navigasi footer">
          <h2 class="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Navigasi</h2>
          <ul class="mt-6 space-y-3.5">
            <li v-for="item in navigationItems" :key="item.label">
              <NuxtLink
                :to="item.to"
                class="inline-flex break-words text-sm text-slate-400 transition duration-200 hover:translate-x-1 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <div>
          <h2 class="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Kontak</h2>
          <div class="mt-6 min-w-0 space-y-5 break-words text-sm leading-6 text-slate-400">
            <a
              v-if="isValidEmail(footerData.contact.email)"
              :href="`mailto:${footerData.contact.email}`"
              class="inline-flex max-w-full break-all transition-colors hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              {{ footerData.contact.email }}
            </a>
            <p v-else>{{ footerData.contact.email }}</p>

            <a
              v-if="footerData.contact.whatsapp"
              :href="footerData.contact.whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex transition-colors hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              WhatsApp HMIF
            </a>

            <p class="max-w-[15rem] break-words">{{ footerData.contact.location }}</p>
          </div>
        </div>

        <div>
          <h2 class="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Organisasi</h2>
          <ul class="mt-6 space-y-4 text-sm leading-6 text-slate-400">
            <li v-for="item in footerData.organization" :key="item" class="break-words">{{ item }}</li>
          </ul>
        </div>
      </div>

      <div class="pt-6 border-t mt-14 border-white/10 sm:mt-16">
        <p class="break-words text-xs text-slate-500">{{ footerData.copyright }}</p>
      </div>
    </div>
  </footer>
</template>
