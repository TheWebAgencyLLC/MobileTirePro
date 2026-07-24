import { createGtm } from "@gtm-support/vue-gtm";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(
    createGtm({
      id: "GTM-N9TR8WBG",
      defer: false,
      compatibility: false,
      enabled: process.env.NODE_ENV === "production",
      debug: false,
      loadScript: true,
      vueRouter: useRouter(),
      trackOnNextTick: false,
    })
  );
});
