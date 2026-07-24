<script setup lang="ts">
import vehicleTypeSquare from "~/components/vehicleTypeSquare.vue"
import promoBanner from "./promoBanner.vue";

const config = useRuntimeConfig();

onMounted(() => {
  const wrapper = document.querySelector('.tireconnect-wrapper')
  if (!wrapper) return

  const loadWidget = () => {
    if (document.querySelector('script[data-tireconnect-widget]')) return

    const script = document.createElement('script')
    script.src = 'https://app.tireconnect.ca/js/widget.js'
    script.async = true
    script.dataset.tireconnectWidget = 'true'
    script.onload = () => {
      if (window.TCWidget) {
        window.TCWidget.init({
          apikey: config.public.tireConnect,
          container: 'tireconnect'
        })
      }
    }
    document.body.appendChild(script)
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        loadWidget()
        observer.disconnect()
      }
    },
    { rootMargin: '100px' }
  )

  observer.observe(wrapper)
})


</script>

<template>
  <PromoBanner/>
  <section
      class="flex justify-center gap-20 mt-8 text-center mx-auto text-dark-charcoal px-4 sm:px-6 lg:px-8 max-w-7xl 2xl:px-12 2xl:max-w-8xl">
    <div class="space-y-2 items-center flex flex-col p-4 sm:p-8 2xl:p-12">
      <h1 class="text-3xl sm:text-4xl lg:text-5xl 2xl:text-7xl font-lato dark:text-white">New Tires At Home</h1>
      <p class="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-kumbh text-vivid-red">Skip the hassle.
        We bring expert tire
        installation right to you!
      </p>
      <p
          class="text-base sm:text-lg lg:text-xl 2xl:text-2xl font-kumbh text-slate-600 dark:text-slate-400 max-w-full sm:max-w-[750px] 2xl:max-w-[1000px]">
        Save time and stress with our mobile tire service. Whether you’re at home or work, we don’t compromise on
        quality of service. Book your appointment with ease! Start by selecting your vehicle or tire size below
      </p>
      <div class="tireconnect-wrapper w-full">
        <div id="tireconnect"></div>
      </div>

      <h2 class="text-4xl font-bold mb-2">
          <span class="dark:text-white">Vehicles We </span><span class="text-red-500">Service</span>
        </h2>
      <div class="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2 sm:gap-4 2xl:gap-6">
        <vehicleTypeSquare vehicleType="Sedan" imageUrl="/images/icons/sedan.webp"/>
        <vehicleTypeSquare vehicleType="SUV" imageUrl="/images/icons/SUV.webp"/>
        <vehicleTypeSquare vehicleType="Truck" imageUrl="/images/icons/pickuptruck.webp"/>
        <vehicleTypeSquare vehicleType="EV" imageUrl="/images/icons/electriccar.webp"/>
        <vehicleTypeSquare vehicleType="Sports Car" imageUrl="/images/icons/supercar.webp"/>
        <vehicleTypeSquare vehicleType="Work Vehicle" imageUrl="/images/icons/workvehicle.webp"/>
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
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
