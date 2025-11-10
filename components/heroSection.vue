<script setup lang="ts">
const $gtm = useGTM()
import vehicleTypeSquare from "~/components/vehicleTypeSquare.vue"
import promoBanner from "./promoBanner.vue";

const colorMode = useColorMode()
const config = useRuntimeConfig();

const trackVehicleSelection = (vehicleType: string) => {
  $gtm.trackEvent({
    event: 'vehicle_selection',
    vehicleType: vehicleType
  })
}

onMounted(() => {
  // dynamically load the external script
  const script = document.createElement('script')
  script.src = 'https://app.tireconnect.ca/js/widget.js'
  script.async = true
  script.onload = () => {
    // init widget once script is loaded
    if (window.TCWidget) {
      window.TCWidget.init({
        apikey: config.public.tireConnect,
        container: 'tireconnect'
      })
    }
  }
  document.body.appendChild(script)
})


</script>

<template>
  <PromoBanner/>
  <section
      class="flex justify-center gap-20 mt-8 text-center mx-auto text-dark-charcoal px-4 sm:px-6 lg:px-8 max-w-7xl 2xl:px-12 2xl:max-w-8xl">
    <div class="space-y-2 items-center flex flex-col p-4 sm:p-8 2xl:p-12">
      <h1 class="text-3xl sm:text-4xl lg:text-5xl 2xl:text-7xl font-lato dark:text-white">Tire Installation at Your
        Doorstep</h1>
      <p class="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-kumbh text-vivid-red">Skip the tire shop hassle.
        We bring expert tire
        installation right to you!
      </p>
      <p
          class="text-base sm:text-lg lg:text-xl 2xl:text-2xl font-kumbh text-slate-600 dark:text-slate-400 max-w-full sm:max-w-[750px] 2xl:max-w-[1000px]">
        Save time and stress with our mobile tire service. Whether you’re at home or work, we don’t compromise on
        quality of service. Book your appointment with ease! Start by selecting your vehicle or tire size below
      </p>
      <div class="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2 sm:gap-4 2xl:gap-6">
        <NuxtLink to="/bookings?car=sedan" @click="trackVehicleSelection('Sedan')">
          <vehicleTypeSquare vehicleType="Sedan"
                             :imageUrl="colorMode.value === 'light' ? '/images/icons/sedan.webp' : '/images/icons/sedanwhite.webp'"/>
        </NuxtLink>
        <NuxtLink to="/bookings?car=suv" @click="trackVehicleSelection('SUV')">
          <vehicleTypeSquare vehicleType="SUV"
                             :imageUrl="colorMode.value === 'light' ? '/images/icons/SUV.webp' : '/images/icons/SUVwhite.webp'"/>
        </NuxtLink>
        <NuxtLink to="/bookings?car=truck" @click="trackVehicleSelection('Truck')">
          <vehicleTypeSquare vehicleType="Truck"
                             :imageUrl="colorMode.value === 'light' ? '/images/icons/pickuptruck.webp' : '/images/icons/pickuptruckwhite.webp'"/>
        </NuxtLink>
        <NuxtLink to="/bookings?car=ev" @click="trackVehicleSelection('EV')">
          <vehicleTypeSquare vehicleType="EV"
                             :imageUrl="colorMode.value === 'light' ? '/images/icons/electriccar.webp' : '/images/icons/electriccarwhite.webp'"/>
        </NuxtLink>
      </div>
      <div class="tireconnect-wrapper w-full">
        <div id="tireconnect"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
h1 {
  font-family: 'Lato', sans-serif;
}

p {
  font-family: 'Kumbh Sans', sans-serif
}

.tireconnect-wrapper {
  border-radius: 16px;
  overflow: hidden; /* Ensures the widget content respects the rounded corners */
  border: 1px solid #ddd;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}
</style>
