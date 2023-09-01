// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  nitro: {
    plugins: ["~/server/index.ts"],
  },

  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
    secretKey: process.env.SECRET_KEY
  },
  css: ['~/assets/css/main.scss']

})
