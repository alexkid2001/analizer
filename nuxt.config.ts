// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      tailwindcss: {},
      autoprefixer: {},
      serverUrl: process.env.NUXT_SERVER_URL
    }
  },
  css: ['vuetify/lib/styles/main.sass', '@/assets/css/main.css'],
  build: {
    transpile: ['vuetify']
  },
  modules: ['@pinia/nuxt']
});
