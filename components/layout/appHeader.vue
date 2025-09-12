<template>
  <nav class="bg-pale-gray dark:bg-[#1e1f26] shadow-md relative z-50">
    <div
      class="hidden lg:flex justify-end items-center py-1 text-sm text-charcoal-gray dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8">
      <div class="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Open Mon-Fri: 7AM-5PM | Sat: 7AM-4PM | Closed Sun</span>
      </div>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <NuxtLink to="/" class="flex items-center">
          <img src="/images/logos/mtpLogo.png" alt="Mobile Tire Pro Logo"
            class="w-[15rem] h-auto max-h-14 min-w-[48px] mr-2 object-contain">
        </NuxtLink>
        <div class="hidden lg:flex items-center space-x-4">
          <NuxtLink @click="trackNavigation(link.label)" v-for="link in filteredDesktopLinks" :key="link.to"
            :to="link.to" class="text-charcoal-gray font-bold no-underline
            hover:underline
            underline-offset-8
            decoration-vivid-red decoration-4
            py-2 dark:text-gray-300 hover:text-dark-charcoal dark:hover:text-white">
            {{ link.label }}
          </NuxtLink>

          <!-- Services Dropdown -->
          <div class="relative group">
            <NuxtLink to="/services" @mouseenter="showServicesDropdown = true" @mouseleave="startHideTimer" class="text-charcoal-gray font-bold no-underline
              hover:underline
              underline-offset-8
              decoration-vivid-red decoration-4
              py-2 dark:text-gray-300 hover:text-dark-charcoal dark:hover:text-white
              flex items-center">
              Services
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" :class="{ 'rotate-180': showServicesDropdown }">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </NuxtLink>
            <div v-show="showServicesDropdown" @mouseenter="showServicesDropdown = true; clearHideTimer()"
              @mouseleave="startHideTimer"
              class="absolute left-0 mt-1 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md py-1 z-50 transition-opacity duration-300">
              <!-- Individual service links -->
              <NuxtLink v-for="service in serviceLinks" :key="service.to" :to="service.to"
                @click="trackNavigation(service.label)"
                class="block px-4 py-2 text-charcoal-gray dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-dark-charcoal dark:hover:text-white">
                {{ service.label }}
              </NuxtLink>
            </div>
          </div>

          <NuxtLink to="/login" v-if="!isLogged" class="text-charcoal-gray dark:text-gray-300 hover:text-dark-charcoal dark:hover:text-white font-bold no-underline
            hover:underline
            underline-offset-8
            decoration-vivid-red decoration-4">Log in
          </NuxtLink>
          <NuxtLink v-if="isLogged" class="text-charcoal-gray dark:text-gray-300 hover:text-dark-charcoal dark:hover:text-white font-bold no-underline
            hover:underline
            underline-offset-8
            decoration-vivid-red decoration-4" to="/profile">
            Profile</NuxtLink>
          <span @click="handleLogout" v-if="isLogged" class="cursor-pointer text-charcoal-gray dark:text-gray-300 hover:text-dark-charcoal dark:hover:text-white font-bold no-underline
            hover:underline
            underline-offset-8
            decoration-vivid-red decoration-4">Log
            out</span>
          <NuxtLink @click="closeMobileMenu" to="/tires" class="mr-2">
            <button
              class="w-full text-left bg-crimson-red text-pale-gray px-3 py-2 rounded-md hover:bg-vivid-red transition duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-vivid-red focus:ring-offset-2">
              Order Tires
            </button>
          </NuxtLink>
          <NuxtLink @click="closeMobileMenu" to="/bookings">
            <button
              class="w-full text-left bg-vivid-red text-pale-gray px-3 py-2 rounded-md hover:bg-crimson-red transition duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-vivid-red focus:ring-offset-2">
              Schedule
            </button>
          </NuxtLink>
          <LightDarkToggle />
        </div>
        <div class="lg:hidden flex items-center space-x-3">
          <!-- Mobile menu button -->
          <LightDarkToggle />
          <button @click="toggleMobileMenu" aria-label="Menu Button"
            class="text-slate-gray dark:text-gray-400 hover:text-charcoal-gray dark:hover:text-white focus:outline-none">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div v-if="mobileMenuOpen" class="lg:hidden mobile-menu-overlay">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <NuxtLink @click="closeMobileMenu" v-for="link in filteredMobileLinks" :key="link.to" :to="link.to"
            class="block px-3 py-2 text-charcoal-gray dark:text-gray-300 hover:text-dark-charcoal dark:hover:text-white">
            {{ link.label }}
          </NuxtLink>

          <!-- Mobile Services Dropdown -->
          <div>
            <div @click="toggleMobileServicesDropdown"
              class="flex justify-between items-center px-3 py-2 text-charcoal-gray dark:text-gray-300 hover:text-dark-charcoal dark:hover:text-white cursor-pointer">
              <span>Services</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-200"
                :class="{ 'rotate-180': mobileServicesOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <div v-show="mobileServicesOpen" class="pl-4 pb-1 space-y-1">
              <!-- All Services link -->
              <NuxtLink @click="closeMobileMenu" to="/services"
                class="block px-3 py-1 text-charcoal-gray dark:text-gray-300 hover:text-dark-charcoal dark:hover:text-white border-l-2 border-gray-300 dark:border-gray-700 font-medium">
                All Services
              </NuxtLink>
              <!-- Individual service links -->
              <NuxtLink @click="closeMobileMenu" v-for="service in serviceLinks" :key="service.to" :to="service.to"
                class="block px-3 py-1 text-charcoal-gray dark:text-gray-300 hover:text-dark-charcoal dark:hover:text-white border-l-2 border-gray-300 dark:border-gray-700">
                {{ service.label }}
              </NuxtLink>
            </div>
          </div>

          <NuxtLink to="/login" v-if="!isLogged" @click="closeMobileMenu"
            class="block px-3 py-2 text-charcoal-gray dark:text-gray-300 hover:text-dark-charcoal dark:hover:text-white">
            Log in
          </NuxtLink>
          <NuxtLink v-if="isLogged" to="/profile" @click="closeMobileMenu"
            class="block px-3 py-2 text-charcoal-gray dark:text-gray-300 hover:text-dark-charcoal dark:hover:text-white">
            Profile
          </NuxtLink>
          <a v-if="isLogged" @click="handleLogoutAndClose"
            class="block px-3 py-2 text-charcoal-gray dark:text-gray-300 hover:text-dark-charcoal dark:hover:text-white cursor-pointer">
            Log out
          </a>
          <div class="space-y-2">
            <NuxtLink @click="closeMobileMenu" to="/tires" class="block mb-2">
              <button
                class="w-full text-left bg-vivid-red text-pale-gray px-3 py-2 rounded-md hover:bg-crimson-red transition duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-vivid-red focus:ring-offset-2">
                Order Tires
              </button>
            </NuxtLink>
            <NuxtLink @click="closeMobileMenu" to="/bookings">
              <button
                class="w-full text-left bg-vivid-red text-pale-gray px-3 py-2 rounded-md hover:bg-crimson-red transition duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-vivid-red focus:ring-offset-2">
                Schedule
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch, computed } from 'vue';
import { useFetch } from '#app';

const mobileMenuOpen = ref(false);
const isLogged = ref(false);
const showServicesDropdown = ref(false);
const mobileServicesOpen = ref(false);
const hideTimer = ref(null);

const $gtm = useGTM();

interface Link {
  to: string;
  label: string;
}

const trackNavigation = (navigationLink: string) => {
  $gtm.trackEvent({
    event: 'navigation',
    navigationLink
  });
};

onBeforeMount(async () => {
  const { data } = await useFetch('/api/auth/test', {
    onResponse({ response }) {
      isLogged.value = !!response._data.token;
    }
  });
});

const handleLogout = async () => {
  await $fetch('/api/auth/logout', {
    method: "DELETE",
  });
  isLogged.value = false;
  navigateTo('/');
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
  mobileServicesOpen.value = false;
};

const handleLogoutAndClose = async () => {
  await handleLogout();
  closeMobileMenu();
};

const toggleServicesDropdown = () => {
  showServicesDropdown.value = !showServicesDropdown.value;
};

const toggleMobileServicesDropdown = () => {
  mobileServicesOpen.value = !mobileServicesOpen.value;
};

const startHideTimer = () => {
  hideTimer.value = setTimeout(() => {
    showServicesDropdown.value = false;
  }, 300);
};

const clearHideTimer = () => {
  if (hideTimer.value) {
    clearTimeout(hideTimer.value);
    hideTimer.value = null;
  }
};

const links: Link[] = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  // Services link will be handled by the dropdown
  { to: '/fleet-services', label: 'Fleet Services' }
];

const serviceLinks: Link[] = [
  { to: '/services/seasonal-changeover', label: 'Seasonal Changeover' },
  { to: '/services/tire-installation', label: 'Professional Sales & Tire Installation' },
  { to: '/services', label: 'Tire Repair' },
  { to: '/services', label: 'TPMS Sensor Recalibration' },
  { to: '/services/electric-vehicle-services', label: 'EV Servicing' }
  // Add more service pages as needed
];

// Don't filter out the main Services link, we'll show it alongside the dropdown
const filteredDesktopLinks = computed(() => links);
const filteredMobileLinks = computed(() => links);

watch(mobileMenuOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});
</script>

<style scoped>
.mobile-menu-overlay {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.99);
  z-index: 40;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.dark .mobile-menu-overlay {
  background-color: rgba(30, 31, 38, 0.95);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>