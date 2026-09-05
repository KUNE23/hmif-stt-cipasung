export default defineNuxtConfig({
  srcDir: '.',
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@vueuse/motion/nuxt',
  ],
  components: [
    { path: '~/components', pathPrefix: false },
  ],
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'id' },
      meta: [
        { name: 'theme-color', content: '#197e45' },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/images/placeholders/logo.png?v=hmif-2026',
        },
        {
          rel: 'shortcut icon',
          type: 'image/png',
          href: '/images/placeholders/logo.png?v=hmif-2026',
        },
        {
          rel: 'apple-touch-icon',
          href: '/images/placeholders/logo.png?v=hmif-2026',
        },
      ],
    },
  },
  compatibilityDate: '2026-08-26',
})
