// https://nuxt.com/docs/api/configuration/nuxt-config
import { analyticsConfig } from './config/analytics'
import { schemaConfig } from './config/schema'
import { metaConfig } from './config/meta'
import { hotjarConfig } from './config/hotjar'
import { socialMetaConfig } from './config/social-meta'
import { externalScriptsConfig } from './config/external-scripts'

export default defineNuxtConfig({

    devtools: { enabled: process.env.NODE_ENV !== 'production' },
    app: {
        head: {
          title: metaConfig.title,
          link: metaConfig.link,
          meta: [
            ...metaConfig.meta,
            ...socialMetaConfig.meta
          ],
          script: [
            ...analyticsConfig.googleAnalytics,
            ...schemaConfig.script,
            ...externalScriptsConfig.script,
            ...hotjarConfig.script,
          ],
        }
    },
    modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts", "nuxt3-leaflet", "nuxt-mongoose", './modules/auth.module', 'nuxt-vue3-google-signin', "@pinia/nuxt", 'pinia-plugin-persistedstate/nuxt'],
    runtimeConfig: {
        accessToken: '',

        pass: '',
        public: {
            squareAppId: '',
            tireConnect: '',
            locationId: '',
            chatServerUrl: process.env.CHAT_SERVER_URL || 'http://localhost:4000'
        }
    },
    routeRules: {
        '/': { prerender: true },
        '/tires': { prerender: true },
        '/wheels': { prerender: true },
        '/fleet-services': { prerender: true },
        '/api/**': { ssr: true },
        '/**': { ssr: true }
    },
    tailwindcss: {
        configPath: '~/tailwind.config.js',
        exposeConfig: false,
        injectPosition: 0,
        viewer: process.env.NODE_ENV !== 'production',
    },
    //@ts-ignore
    googleSignIn: {
        clientId: '44678613954-1iv2ppns1kiosof9nkgdnr3orp3nbor4.apps.googleusercontent.com',
    },
    googleFonts: {
        families: {
            Lato: [400, 700],
            'Kumbh Sans': [400, 700]
        },
        display: 'swap',
        preload: true,
        prefetch: false,
    },
    mongoose: {
        uri: process.env.MONGODB_URI,
        options:
            {}
        ,
        modelsDir: 'models',
        devtools:
            true,
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
            cssnano:
                process.env.NODE_ENV === 'production'
                    ? {preset: ['default', {discardComments: {removeAll: true}}]}
                    : false, // disable cssnano when not in production
        },
    },
    build: {
        transpile: ['@vuepic/vue-datepicker']
    }

})
