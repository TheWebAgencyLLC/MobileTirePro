<script setup>
import GoogleReviewsWidget from '@/components/googleReviewsWidget.vue'
import { SITE } from '~/config/site'

const ImageCarousel = defineAsyncComponent(() => import('@/components/imageCarousel.vue'))
const LeafletComponent = defineAsyncComponent(() => import('@/components/leafletComponent.vue'))

useHead({
  title: `Mobile Tire & Wheel Service in Chicagoland | ${SITE.name}`,
  meta: [
    {
      name: 'description',
      content: `${SITE.name} brings expert mobile tire installation and wheel services to your driveway. Book online for sedans, SUVs, trucks, and EVs across Chicagoland.`
    }
  ],
  link: [{ rel: 'canonical', href: `${SITE.url}/` }]
})
</script>

<script>
// Keep your existing data function for the car images
export default {
  data() {
    return {
      carImages: [
      {
          id: 1,
          src: '/images/carousel/genesis.jpg',
          alt: 'Hyundai Genesis SUV'
        },
        {
          id: 2,
          src: '/images/carousel/gtr.jpg',
          alt: 'Nissan GTR'
        },
        {
          id: 3,
          src: '/images/carousel/trailer.jpg',
          alt: 'Trailer'
        },
        {
          id: 4,
          src: '/images/carousel/rivianEV.jpg',
          alt: 'Rivian Truck'
        },
        {
          id: 5,
          src: '/images/carousel/jeep.jpg',
          alt: 'Jeep'
        },
        {
          id: 6,
          src: '/images/carousel/tesla.jpg',
          alt: 'Tesla'
        },
        {
          id: 7,
          src: '/images/carousel/classicCar.jpg',
          alt: 'Classic Car'
        },
        {
          id: 8,
          src: '/images/carousel/hyundai.jpg',
          alt: 'Hyundai'
        },
      ]
    }
  }
}
</script>

<template>
  <!-- <HeroSection /> -->
  <HeroSection />
  <div class="flex flex-col items-center justify-center mb-4 2xl:mb-6 text-dark-charcoal">
  </div>
  <BentoGrid />
  <div class="flex flex-col items-center justify-center mb-2 text-dark-charcoal">
    <p class="text-3xl dark:text-white">How It <span class="text-vivid-red">Looks</span></p>
    <h4 class="text-xl m-2 dark:text-white">Customer Testimonials & Car Showcase</h4>
  </div>
  <div class="p-4 xl:mb-8 mb-4">
    <LazyWhenVisible>
      <ImageCarousel :images="carImages" />
    </LazyWhenVisible>
  </div>

  <LazyWhenVisible class="xl:px-0 px-4 mb-8">
    <ClientOnly>
      <GoogleReviewsWidget />
    </ClientOnly>
  </LazyWhenVisible>

  <LazyWhenVisible>
    <LeafletComponent />
  </LazyWhenVisible>
</template>

<style>
body {
  background-color: #FAFAFA;
  font-family: 'Lato', sans-serif;
}
</style>
