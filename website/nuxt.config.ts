import { defineNuxtConfig } from "nuxt/config";
export default defineNuxtConfig({
  builder: "vite",
  css: ["@/assets/scss/app.scss",'@/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  routeRules: {
    "/**": { ssr: true },
  },

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  app: {
    head: {
      title: "E-Free",
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, maximum-scale=1",
        },
        {
          hid: "description",
          name: "description",
          content: "ផលិតផលល្អ លឿន រហ័ស ទាន់ចិត្ត",
        },
        { hid: "image", name: "image", content: "/e-free-logo.png" },
        {
          name: "apple-mobile-web-app-capable",
          content: "yes",
        },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black",
        },
      ],
      link: [
        {
          href: "https://fonts.googleapis.com/css?family=Rubik:400,400i,500,500i,700,700i&amp;display=swap",
          rel: "stylesheet",
        },
        {
          href: "https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i,900&amp;display=swap",
          rel: "stylesheet",
        },
        {
          href: "https://fonts.googleapis.com/css2?family=Battambang:wght@100;300;400;700;900&display=swap",
          rel: "stylesheet",
        },
        {
          href: "https://unpkg.com/vue-multiselect@2.1.6/dist/vue-multiselect.min.css",
          rel: "stylesheet",
        },
        { rel: "icon", type: "image/png", href: "/e-free-logo.png" },
      ],
    },
    baseURL: "/",
  },

  modules: [
    "@nuxt/image",
    "nuxt-icon",
    "@nuxtjs/i18n",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ],
    "@element-plus/nuxt",
    "dayjs-nuxt",
  ],

  i18n: {
    locales: [
      {
        icon: "flag-icon-kh",
        code: "kh",
        name: "ខ្មែរ",
        short: "(KH)",
      },
    ],
    strategy: "prefix_except_default",
    defaultLocale: "kh",
    vueI18n: "./i18n.config.ts",
  },

  plugins: [
    { src: "~/plugins/plugins.js", mode: "client" },
    { src: "~/plugins/iCan.js", mode: "all" },
    { src: "./plugins/useBootstrap.client.ts", mode: "client" },
  ],

  runtimeConfig: {
    public: {
    },
    serviceWorker: true,
  },

  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },

  devServer: {
    port: 3535,
  },

  experimental: {
    asyncContext: true,
  },

  compatibilityDate: "2024-08-27",
});