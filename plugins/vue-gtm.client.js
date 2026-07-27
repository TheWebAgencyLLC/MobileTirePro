import { createGtm } from "@gtm-support/vue-gtm";
import { GTM_ID } from "../config/gtm";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(
    createGtm({
      id: GTM_ID,
      defer: false,
      compatibility: false,
      enabled: process.env.NODE_ENV === "production",
      debug: false,
      // GTM script is injected in nuxt.config head so Preview mode and Tag Assistant work.
      loadScript: false,
      vueRouter: useRouter(),
      trackOnNextTick: false,
    })
  );
});
