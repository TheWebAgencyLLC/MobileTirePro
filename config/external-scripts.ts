export const externalScriptsConfig = {
  // Square's Web SDK is loaded on demand by components/square/payment.vue so it
  // never costs anything on pages without a checkout. Sandbox vs production is
  // selected there from NUXT_PUBLIC_SQUARE_ENVIRONMENT.
  script: [] as { src?: string; async?: boolean; defer?: boolean }[]
}
