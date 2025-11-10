// https://nuxt.com/docs/api/configuration/nuxt-config
import { analyticsConfig } from './config/analytics'
import { schemaConfig } from './config/schema'
import { metaConfig } from './config/meta'
import { hotjarConfig } from './config/hotjar'
import { socialMetaConfig } from './config/social-meta'
import { externalScriptsConfig } from './config/external-scripts'

export default defineNuxtConfig({

    devtools: {enabled: true},
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
    modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts", "nuxt3-leaflet", "nuxt-mongoose", './modules/auth.module', '@nuxtjs/color-mode', 'nuxt-vue3-google-signin', "@pinia/nuxt", 'pinia-plugin-persistedstate/nuxt'],
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
        // Static routes (including the form page)
            '/tires': { prerender: true },
        '/fleet-services': { prerender: true },
        // Server routes
        '/api/**': { ssr: true },
        // Default
        '/**': { ssr: true }
    },
    tailwindcss: {
        configPath: '~/tailwind.config.js',
        exposeConfig: true,
        injectPosition: 0,
        viewer: true,
    },
    //@ts-ignore
    googleSignIn: {
        clientId: '44678613954-1iv2ppns1kiosof9nkgdnr3orp3nbor4.apps.googleusercontent.com',
    },
    //@ts-ignore
    colorMode: {
        preference: 'light', // default value of $colorMode.preference
        fallback: 'light', // fallback value if not system preference found
        hid: 'nuxt-color-mode-script',
        globalName: '__NUXT_COLOR_MODE__',
        componentName: 'ColorScheme',
        classPrefix: '',
        classSuffix: '',
        storageKey: 'nuxt-color-mode',
    },
    googleFonts: {
        families: {
            Lato: [400, 700, 900],
            'Kumbh Sans': [400, 700, 900]
        },
        display: 'swap'
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
