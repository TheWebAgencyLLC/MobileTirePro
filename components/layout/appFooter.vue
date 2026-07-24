<template>
  <footer class="bg-gradient-to-br from-vivid-red to-crimson-red dark:from-crimson-red dark:to-[#991b1b] text-white">
    <div class="max-w-7xl mx-auto pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <!-- Brand Section -->
        <div class="space-y-4">
          <div class="inline-flex bg-white rounded-lg px-4 py-2">
            <img src="/images/logos/ProlineLogo-header.webp"
                class="w-52 h-auto max-h-14 sm:w-60 sm:max-h-16 md:w-64 md:max-h-20 object-contain"
                alt="Proline Wheel & Tire Logo">
          </div>
          <p class="text-red-50/90">
            Convenience meets expertise in tire care, bringing professional service directly to you.
          </p>
          <div>
            <p class="text-sm font-semibold text-white mb-3">Follow Us</p>
            <LayoutSocialLinks variant="footer" />
          </div>
        </div>

        <!-- Services Section -->
        <div class="space-y-4">
          <div class="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h3 class="font-semibold text-white">Services</h3>
          </div>
          <ul class="grid grid-cols-2 gap-x-4 gap-y-2 text-red-50/90">
            <li>
              <NuxtLink to="/services/tire-installation"
                class="hover:text-white transition-colors">Tire Installaton</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/services/electric-vehicle-services"
                class="hover:text-white transition-colors">EV Servicing</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/services/seasonal-changeover"
                class="hover:text-white transition-colors">Seasonal Changeover</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/services" class="hover:text-white transition-colors">Tire Repair
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/services" class="hover:text-white transition-colors">TPMS
                Recalibration</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/services/oil-changes"
                class="hover:text-white transition-colors">Oil Changes</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Hours Section -->
        <div class="space-y-4">
          <div class="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="font-semibold text-white">Hours</h3>
          </div>
          <ul class="space-y-2 text-red-50/90">
            <li class="flex justify-between">
              <span>Weekdays</span>
              <span>7:00am - 5:00pm</span>
            </li>
            <li class="flex justify-between">
              <span>Saturday</span>
              <span>7:00am - 4:00pm</span>
            </li>
            <li class="flex justify-between">
              <span>Sunday</span>
              <span>Closed</span>
            </li>
          </ul>
        </div>

        <!-- Contact Section -->
        <div class="space-y-4">
          <div class="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <h3 class="font-semibold text-white">Contact</h3>
          </div>
          <ul class="space-y-2">
            <li>
              <a href="tel:815-355-1437"
                @click="$gtm.trackPhoneClick('footer')"
                class="text-red-50/90 hover:text-white transition-colors">
                (815) 355-1437
              </a>
            </li>
            <li>
              <a href="mailto:prolinewheelandtire@gmail.com"
                class="text-red-50/90 hover:text-white transition-colors">
                prolinewheelandtire@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 mt-8 border-t border-white/20">
        <p class="text-center text-red-50/80 text-sm">
          © {{ new Date().getFullYear() }} Proline Wheel & Tire. All rights reserved.
        </p>
        <div class="text-sm text-red-50/80 text-center mt-1">
          Built by the
          <NuxtLink class="text-white underline hover:text-red-50 transition-colors" to="https://thewebagency.app">
            TheWebAgency
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const $gtm = useGTM()
</script>
