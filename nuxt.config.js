// относится к окружению запуска (server)
const serverEnvironmentIsProd = process.env.ENVIRONMENT === 'production'

export default {
  server: {
    port: process.env.NUXT_ENV_PORT || 3000,
    host: process.env.NUXT_ENV_HOST || '0.0.0.0',
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'association',
    htmlAttrs: {
      lang: 'ru',
    },
    dev: true,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'true',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700&display=swap',
      },
    ],
    script: [
      {
        src: '/detect-browser.js',
        async: 'async',
        body: true,
      },
      {
        src: 'https://polyfill.io/v3/polyfill.min.js?features=ResizeObserver',
        async: 'async',
        body: true,
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/style.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vee-validate' },
    { src: '~/plugins/vue-the-mask', mode: 'client' },
    { src: '~/plugins/auth' },
    { src: '~/plugins/axios' },
    { src: '~plugins/vue-range-component', ssr: false },
    { src: '~plugins/vue-datepicker', ssr: false },
    { src: '~/plugins/load-script' },
    { src: '~/plugins/chart', mode: 'client' },
    { src: '~/plugins/vue-rate', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    // Equivalent to { path: '~/components' }
    '~/components',
    { path: '~/components/layout-components', extensions: ['vue'] },
    { path: '~/components/ui', extensions: ['vue'] },
    { path: '~/components/mixins', extensions: ['vue'] },
    { path: '~/components/events-components', extensions: ['vue'] },
    { path: '~/components/catalog', extensions: ['vue'] },
    { path: '~/components/my-deal', extensions: ['vue'] },
    { path: '~/components/mygoods-components', extensions: ['vue'] },
    { path: '~/components/personal', extensions: ['vue'] },
    { path: '~/components/cart', extensions: ['vue'] },
    { path: '~/components/modals', extensions: ['vue'] },
    { path: '~/components/modules', extensions: ['vue'] },
    { path: '~/components/graphics', extensions: ['vue'] },
    { path: '~/components/svg', extensions: ['vue'] },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/moment',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://auth.nuxtjs.org/
    '@nuxtjs/auth-next',
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://sitemap.nuxtjs.org
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.API_ENDPOINT,
    },
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.API_ENDPOINT,
    },
  },

  auth: {
    plugins: ['~/plugins/auth.js'],
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'data.access_token',
          global: true,
          required: true,
          maxAge: 60 * 60 * 9,
          type: 'Bearer',
        },
        refreshToken: {
          property: 'data.access_token',
          data: 'data.access_token',
          maxAge: 60 * 60 * 24 * 30,
        },
        user: {
          property: 'data',
          // property: false,
          // autoFetch: false,
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          logout: { url: '/auth/logout', method: 'post' },
          refresh: { url: '/auth/refresh', method: 'post' },
          user: {
            url: '/profile',
            method: 'get',
            params: { include: 'company' },
          },
        },
        secure: true,
      },
    },
    redirect: {
      login: '/',
      logout: '/',
      home: '/',
    },
    // rewriteRedirects: false,
    watchLoggedIn: true,
    // autoLogout: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    parallel: true,
    transpile: ['vee-validate/dist/rules', 'vue-plugin-load-script'],
    extractCSS: true,
    extend(config, { isClient }) {
      if (isClient) {
        config.optimization.splitChunks.maxSize = 50_0000
      }
    },
    terser: {
      // https://github.com/terser/terser#compress-options
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
  },
  router: {
    middleware: ['settings'],
  },
  moment: {
    defaultLocale: 'ru',
    locales: ['ru'],
    timezone: true,
    defaultTimezone: 'Europe/Moscow',
  },

  robots: !serverEnvironmentIsProd
    ? {
        UserAgent: '*',
        Disallow: '/',
      }
    : {
        // временно пока сайт не прод
        UserAgent: '*',
        Disallow: '/',
      },
}
