<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-2">
          <span class="dark:text-white">How It </span><span class="text-red-500">Works</span>
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          Driving Excellence: Our Tire Service Process
        </p>
      </div>

      <!-- Steps Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 md:col-span-2 border border-red-200 dark:border-red-800 shadow-sm hover:shadow-lg transition-all duration-300">
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <NumberedCircle :number="1"/>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="4" />
                <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17l1.4 1.4M5.6 18.4l1.4-1.4M17 7l1.4-1.4" />
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Order Tires</h2>
            <p class="text-gray-600 dark:text-gray-300">
              Enter your vehicle information or tire size above and view our large catalog of all major tire brands.
              Need help selecting the right tire for your vehicle? Call or text us at **(815) 355-1437**
            </p>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-300">
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <NumberedCircle :number="2"/>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Schedule Appointment</h2>
            <p class="text-gray-600 dark:text-gray-300">
              Select the day and time you’d like your onsite tire installation.
            </p>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 md:col-span-1 shadow-sm hover:shadow-lg transition-all duration-300">
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <NumberedCircle :number="3"/>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Prepare for Visit</h2>
            <p class="text-gray-600 dark:text-gray-300 text-sm">
              Ensure 2-3 feet of space on each side of the vehicle in your garage or driveway.
            </p>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 md:col-span-2 border border-red-200 dark:border-red-800 shadow-sm hover:shadow-lg transition-all duration-300">
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <NumberedCircle :number="4"/>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Kick back and relax!</h2>
            <p class="text-gray-600 dark:text-gray-300">
              Mobile Tire Pro will take care of the rest upon arrival. We'll have you back on the road in no time.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
