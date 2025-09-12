<template>
  <footer class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <div class="max-w-7xl mx-auto pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <!-- Brand Section -->
        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <img src="/public/images/logos/mtpLogo.png" 
                class="w-40 h-auto max-h-10 sm:w-44 sm:max-h-11 md:w-48 md:max-h-12 object-contain" 
                alt="Mobile Tire Pro Logo">
          </div>
          <p class="text-gray-600 dark:text-gray-300">
            Convenience meets expertise in tire care, bringing professional service directly to you.
          </p>
        </div>

        <!-- Services Section -->
        <div class="space-y-4">
          <div class="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h3 class="font-semibold text-gray-900 dark:text-white">Services</h3>
          </div>
          <ul class="space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              <NuxtLink to="/services/tire-installation"
                class="hover:text-red-600 dark:hover:text-red-400 transition-colors">Tire Installaton</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/services/electric-vehicle-services"
                class="hover:text-red-600 dark:hover:text-red-400 transition-colors">EV Servicing</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/services/seasonal-changeover"
                class="hover:text-red-600 dark:hover:text-red-400 transition-colors">Seasonal Changeover</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/services" class="hover:text-red-600 dark:hover:text-red-400 transition-colors">Tire Repair
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/services" class="hover:text-red-600 dark:hover:text-red-400 transition-colors">TPMS
                Recalibration</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Hours Section -->
        <div class="space-y-4">
          <div class="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="font-semibold text-gray-900 dark:text-white">Hours</h3>
          </div>
          <ul class="space-y-2 text-gray-600 dark:text-gray-300">
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
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <h3 class="font-semibold text-gray-900 dark:text-white">Contact</h3>
          </div>
          <ul class="space-y-2">
            <li>
              <a href="tel:815-355-1437"
                class="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                (815) 355-1437
              </a>
            </li>
            <li>
              <a href="mailto:mobiletireprollc@gmail.com"
                class="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                mobiletireprollc@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 mt-8 border-t border-gray-200 dark:border-gray-700">
        <p class="text-center text-gray-500 dark:text-gray-400 text-sm">
          © {{ new Date().getFullYear() }} MobileTirePro. All rights reserved.
        </p>
        <div class="text-sm text-[#1f1f1f] text-center">
          Built by the
          <NuxtLink class="text-[#0d3d4f] underline" to="https://thewebagency.app">
            TheWebAgency
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>