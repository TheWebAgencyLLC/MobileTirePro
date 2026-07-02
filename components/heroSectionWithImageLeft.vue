<script setup lang="ts">
import ServiceCard from './servicesCard.vue'

const $gtm = useGTM()

const trackServiceClick = (serviceTitle: string) => {
  $gtm.trackEvent({
    event: 'service_availability_check',
    serviceTitle: serviceTitle
  })
}

// Types for the service.
interface Service {
  title: string;
  description: string;
  icon: string;
  ctaText?: string;  // Optional CTA text per service
  link?: string;
  comingSoon?: boolean;
}

const services: Service[] = [
  {
    title: 'Professional Sales & Tire Installation',
    description: "With 8 years of specialized expertise, we not only sell a comprehensive selection of top-brand tires but also provide expert installation and precision balancing services. From helping you choose the perfect tires for your vehicle to ensuring they're professionally mounted and balanced, we deliver complete tire care with uncompromising attention to safety and quality.",
    icon: '/images/icons/tireIcon.svg',
    ctaText: 'Schedule Installation',
    link: '/bookings?service=installation'
  }, {
    title: 'Professional Tire Repair',
    description: 'At Proline Wheel & Tire, we specialize in safe and reliable tire repairs to get you back on the road with peace of mind. We use high quality materials and a precise process to ensure that your tire is repaired to the highest safety standards. Please note that we do not offer roadside assistance; for tire repairs your vehicle must be in a safe location such as a driveway, garage, or public parking lot.',
    icon: '/images/icons/tireIcon.svg',
    ctaText: 'Schedule Repair',
    link: '/bookings?service=tirerepair'
  },
  {
    title: 'TPMS Sensor Installation and Recalibration',
    description: 'We offer new TPMS sensors (if needed or requested) for every vehicle. TPMS should always be in working order to alert drivers when tire pressures have dropped below manufacture specifications.',
    icon: '/images/icons/sensorIcon.svg',
    ctaText: '',
    link: '/bookings'
  },
  {
    title: 'Seasonal Changeover',
    description: `Whether it's separate tire & wheel assemblies or just tires, we can change them over for you so your vehicle is prepared for the weather ahead. Temperature controlled Storage for your separate tires is included with this service.`,
    icon: '/images/icons/seasonIcon.svg',
    ctaText: '',
    link: '/bookings?service=seasonalchangeover'
  },
  {
    title: 'Oil Changes',
    description: `Our mobile oil change service provides convenient, professional oil changes at your location. Using premium quality oils and filters, we'll help maintain your engine's performance and longevity without you having to visit a shop.`,
    icon: '/images/icons/oil-can.svg',
    ctaText: 'Schedule Oil Change',
    link: '/services/oil-changes'
  }
]
</script>

<template>
  <div class="relative dark:bg-deep-charcoal overflow-hidden bg-gray-100 hero-bg">
    <div class="absolute inset-0 bg-black opacity-50 lg:hidden"></div>
    <div class="container mx-auto px-4 py-12 lg:py-16 relative z-10">
      <div class="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        <div class="hidden lg:block lg:w-1/2">
          <img
            src="/images/isometric-car-repair-horizontal-banner-with-serviceman-making-tire-service-vector-illustration.webp"
            alt="Tire Service Technician Illustration"
            class="w-full h-auto">
        </div>
        <div class="w-full lg:w-1/2 text-center lg:text-left p-6 lg:p-0 bg-black bg-opacity-30 lg:bg-transparent rounded-lg">
          <h1
            class="text-3xl lg:text-5xl font-bold text-white lg:text-gray-800 dark:lg:text-white mb-4 text-shadow lg:text-shadow-none">
            Expert Tire Care, Wherever You Are
          </h1>
          <p
            class="text-lg lg:text-xl text-gray-100 lg:text-gray-600 dark:lg:text-gray-300 mb-8 text-shadow lg:text-shadow-none">
            Professional tire services delivered to your driveway, garage, or public parking lot
          </p>
          <NuxtLink
            to="/bookings"
            class="inline-block bg-vivid-red text-white font-bold py-3 px-8 rounded-md hover:bg-crimson-red transition duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-vivid-red focus:ring-offset-2">
            Book a Service
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>

  <div class="container mx-auto px-4 py-12">
    <div
      class="bg-gradient-to-r from-pale-red to-vivid-red dark:from-gray-900 dark:to-vivid-red rounded-lg shadow-lg p-8 mb-12">
      <div class="flex flex-col lg:flex-row justify-between items-center">
        <div class="lg:w-2/3 mb-6 lg:mb-0">
          <h2 class="text-3xl font-bold text-dark-charcoal dark:text-white mb-2">Comprehensive Tire Solutions for Every
            Vehicle</h2>
          <p class="text-xl text-dark-charcoal dark:text-white">From installation to seasonal changes, we've got you
            covered</p>
        </div>
        <div class="lg:w-1/3 text-right">
          <p class="text-white text-lg">
            <span class="text-4xl font-bold block mb-1">8 years</span>
            of industry experience and training
          </p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <ServiceCard v-for="service in services" :key="service.title" :service="service" :ctaLink='service.link'
        ctaText="Check Availability" @cta-click="trackServiceClick(service.title)" />
    </div>
  </div>
</template>


<style scoped>
h1,
h2,
h3 {
  font-family: 'Lato', sans-serif;
}

h4,
h5,
h6,
p {
  font-family: 'Kumbh Sans', sans-serif;
}

@media (max-width: 1023px) {
  .hero-bg {
    background-image: url('/images/stockTiresImage.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
}

.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.lg\:text-shadow-none {
  text-shadow: none;
}
</style>
