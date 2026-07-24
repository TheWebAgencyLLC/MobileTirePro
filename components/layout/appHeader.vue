<template>
  <nav class="bg-pale-gray dark:bg-[#1e1f26] shadow-md relative z-50">
    <div
      class="hidden lg:flex justify-between items-center py-1.5 text-sm text-charcoal-gray dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8">
      <LayoutSocialLinks variant="header" />
      <div class="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Open Mon-Fri: 7AM-5PM | Sat: 7AM-4PM | Closed Sun</span>
      </div>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center gap-4 min-h-[5.5rem] py-2.5">
        <NuxtLink to="/" class="flex items-center shrink-0">
          <img src="/images/logos/ProlineLogo-header.webp" alt="Proline Wheel & Tire Logo"
            width="352" height="96" fetchpriority="high" decoding="async"
            class="h-16 sm:h-20 xl:h-24 w-auto max-w-[16rem] sm:max-w-[20rem] xl:max-w-[22rem] object-contain object-left">
        </NuxtLink>
        <div class="hidden xl:flex items-center gap-x-2 2xl:gap-x-3 shrink min-w-0">
          <NuxtLink @click="trackNavigation(link.label)" v-for="link in filteredDesktopLinks" :key="link.to"
            :to="link.to" :class="navLinkClass">
            {{ link.label }}
          </NuxtLink>

          <!-- Order Dropdown -->
          <div class="relative group">
            <button type="button" @mouseenter="showOrderDropdown = true" @mouseleave="startOrderHideTimer"
              :class="[navLinkClass, 'flex items-center']">
              Order
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" :class="{ 'rotate-180': showOrderDropdown }">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div v-show="showOrderDropdown" @mouseenter="showOrderDropdown = true; clearOrderHideTimer()"
              @mouseleave="startOrderHideTimer"
              class="absolute left-0 mt-1 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md py-1 z-50 transition-opacity duration-300">
              <NuxtLink v-for="shopLink in shopLinks" :key="shopLink.to" :to="shopLink.to"
                @click="trackNavigation(shopLink.label)"
                class="block px-4 py-2 text-sm text-charcoal-gray dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-dark-charcoal dark:hover:text-white whitespace-nowrap">
                {{ shopLink.label }}
              </NuxtLink>
            </div>
          </div>

          <!-- Services Dropdown -->
          <div class="relative group">
            <NuxtLink to="/services" @mouseenter="showServicesDropdown = true" @mouseleave="startHideTimer"
              :class="[navLinkClass, 'flex items-center']">
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
                class="block px-4 py-2 text-sm text-charcoal-gray dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-dark-charcoal dark:hover:text-white">
                {{ service.label }}
              </NuxtLink>
            </div>
          </div>

          <NuxtLink to="/login" v-if="!isLogged" :class="navLinkClass">Log in</NuxtLink>
          <NuxtLink v-if="isLogged" :class="navLinkClass" to="/profile">Profile</NuxtLink>
          <span @click="handleLogout" v-if="isLogged" :class="[navLinkClass, 'cursor-pointer']">Log out</span>

          <NuxtLink @click="$gtm.trackScheduleClick('header_desktop')" to="/bookings" class="shrink-0">
            <button
              class="whitespace-nowrap bg-vivid-red text-pale-gray px-3 py-2 text-sm rounded-md hover:bg-crimson-red transition duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-vivid-red focus:ring-offset-2">
              Schedule
            </button>
          </NuxtLink>
        </div>
        <div class="xl:hidden flex items-center space-x-3 shrink-0">
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
      <div v-if="mobileMenuOpen" class="xl:hidden mobile-menu-overlay">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <NuxtLink @click="closeMobileMenu" v-for="link in filteredMobileLinks" :key="link.to" :to="link.to"
            class="block px-3 py-2 text-charcoal-gray dark:text-gray-300 hover:text-dark-charcoal dark:hover:text-white">
            {{ link.label }}
          </NuxtLink>

          <NuxtLink @click="closeMobileMenu" v-for="shopLink in shopLinks" :key="shopLink.to" :to="shopLink.to"
            class="block px-3 py-2 text-charcoal-gray dark:text-gray-300 hover:text-dark-charcoal dark:hover:text-white">
            {{ shopLink.label }}
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
          <div class="px-3 py-3">
            <LayoutSocialLinks variant="header" />
          </div>
          <div class="space-y-2">
            <NuxtLink @click="$gtm.trackScheduleClick('header_mobile'); closeMobileMenu()" to="/bookings">
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
const showOrderDropdown = ref(false);
const mobileServicesOpen = ref(false);
const hideTimer = ref(null);
const orderHideTimer = ref(null);

const navLinkClass =
  'whitespace-nowrap mr-4 text-lg 2xl:text-[15px] text-charcoal-gray font-bold no-underline hover:underline underline-offset-8 decoration-vivid-red decoration-4 py-2 dark:text-gray-300 hover:text-dark-charcoal dark:hover:text-white';

const $gtm = useGTM()

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
  const opening = !mobileMenuOpen.value
  mobileMenuOpen.value = opening;
  if (opening) {
    $gtm.trackEvent({ event: 'mobile_nav_open' })
  }
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

const startOrderHideTimer = () => {
  orderHideTimer.value = setTimeout(() => {
    showOrderDropdown.value = false;
  }, 300);
};

const clearOrderHideTimer = () => {
  if (orderHideTimer.value) {
    clearTimeout(orderHideTimer.value);
    orderHideTimer.value = null;
  }
};

const links: Link[] = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/road-hazard-coverage', label: 'Road Hazard Coverage' },
  // Services and order links are handled by dropdowns
  { to: '/fleet-services', label: 'Fleet Services' }
];

const shopLinks: Link[] = [
  { to: '/tires', label: 'Order Tires' },
  { to: '/wheels', label: 'Order Wheels' }
];

const serviceLinks: Link[] = [
  { to: '/services/seasonal-changeover', label: 'Seasonal Changeover' },
  { to: '/services/tire-installation', label: 'Professional Sales & Tire Installation' },
  { to: '/services', label: 'Tire Repair' },
  { to: '/services', label: 'TPMS Sensor Recalibration' },
  { to: '/services/electric-vehicle-services', label: 'EV Servicing' },
  { to: '/services/oil-changes', label: 'Oil Changes' }
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