<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-2">
          How It <span class="text-red-500">Works</span>
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          Driving Excellence: Our Tire Service Process
        </p>
      </div>

      <!-- Steps Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Create Account -->
        <div
            class="bg-white dark:bg-gray-800 rounded-lg p-6 md:col-span-2 border border-red-200 dark:border-red-800 shadow-sm hover:shadow-lg transition-all duration-300">
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <NumberedCircle :number="1"/>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <line x1="19" y1="8" x2="19" y2="14"/>
                <line x1="22" y1="11" x2="16" y2="11"/>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Create Your Account</h2>
            <p class="text-gray-600 dark:text-gray-300">
              Creating your account allows you to schedule appointments and see past services.
            </p>
          </div>
        </div>

        <!-- Order Tires -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-300">
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <NumberedCircle :number="2"/>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path
                    d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Order Tires</h2>
            <p class="text-gray-600 dark:text-gray-300">
              Enter your vehicle information or tire size and view our large catalog of all major tire brands. (Need
              same day service? Call us! (815)355-1437)

            </p>
          </div>
        </div>

        <!-- Schedule Appointment -->
        <div
            class="bg-white dark:bg-gray-800 rounded-lg p-6 md:col-span-3 shadow-sm hover:shadow-lg transition-all duration-300">
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <NumberedCircle :number="3"/>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Schedule An Appointment</h2>
            <p class="text-gray-600 dark:text-gray-300">
              Select the day and time you’d like your onsite tire installation.

            </p>
          </div>
        </div>

        <!-- Prepare For Visit -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-300">
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <NumberedCircle :number="4"/>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Prepare For Visit</h2>
            <p class="text-gray-600 dark:text-gray-300">
              Vehicle can be in your garage, driveway, or a safe parking lot. Please ensure 2-3 feet of space on each
              side of the vehicle.
            </p>
          </div>
        </div>

        <!-- Kick back and relax -->
        <div
            class="bg-white dark:bg-gray-800 rounded-lg p-6 md:col-span-2 border border-red-200 dark:border-red-800 shadow-sm hover:shadow-lg transition-all duration-300">
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <NumberedCircle :number="5"/>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 8h1a4 4 0 1 1 0 8h-1"/>
                <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/>
                <line x1="6" y1="2" x2="6" y2="4"/>
                <line x1="10" y1="2" x2="10" y2="4"/>
                <line x1="14" y1="2" x2="14" y2="4"/>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Kick back and relax!</h2>
            <p class="text-gray-600 dark:text-gray-300">
              Mobile Tire Pro will take care of the rest upon arrival.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
