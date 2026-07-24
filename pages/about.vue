<template>
  <PromoBanner/>
  <div id="history-section"
       class="rounded-lg relative overflow-hidden mt-6 md:mt-12 md:mx-auto mb-8 md:mb-16 min-h-[600px] text-dark-charcoal max-w-7xl px-4 sm:px-6 lg:px-8 py-4 md:py-2">
    <div class="flex flex-col md:flex-row">
      <div
          class="w-full xl:w-7/12 relative z-10 dark:bg-dark-charcoal bg-light-gray border border-off-white shadow-2xl rounded-lg drop-shadow-md bg-opacity-90 p-6 sm:p-8 md:p-12 text-dark-charcoal dark:text-white">
        <h2 class="text-2xl font-bold mb-2">About Proline Wheel &amp; Tire</h2>
        <p class="text-lg font-semibold mb-4">Your Trusted Mobile Tire Experts—Formerly Mobile Tire Pro</p>
        <hr class="w-24 h-1 bg-vivid-red border-0 rounded mt-2"/>
        <p class="text-md mb-4 mt-4">
          At Proline Wheel &amp; Tire, we bring the tire shop experience directly to your driveway, workplace, or wherever you happen to be. You might previously have known us as Mobile Tire Pro, but we’ve upgraded our brand to better reflect the premium, professional, and reliable service we deliver every single day.
        </p>
        <p class="text-md mb-8">
          While our name has changed, our team, our values, and our commitment to keeping you rolling safely remain exactly the same.
        </p>

        <h2 class="text-2xl font-bold mb-4">Why Choose Proline?</h2>
        <hr class="w-24 h-1 bg-vivid-red border-0 rounded mt-2"/>
        <p class="text-md mb-4 mt-4">
          We know that tire maintenance isn't usually the highlight of your week. Waiting around in a cold, noisy shop while your Saturday slips away is a thing of the past. We’ve redesigned the entire process around your schedule.
        </p>
        <p class="text-md mb-4 font-semibold">Here is what sets us apart:</p>
        <ul class="flex flex-col gap-4 mb-8">
          <li class="text-md">
            <span class="font-bold">Over a Decade of In-Field Experience:</span> We aren't rookies. With more than 10 years of hands-on, real-world experience, we’ve handled everything from standard passenger cars to high-performance setups. We know the ins and outs of mobile tire installation like nobody else.
          </li>
          <li class="text-md">
            <span class="font-bold">Expert Product Knowledge:</span> We don’t just mount tires; we understand them. We can help you navigate tread designs, seasonal needs, and performance specs to find the exact right fit for your vehicle and driving habits.
          </li>
          <li class="text-md">
            <span class="font-bold">Uncompromising Safety &amp; Quality:</span> Your tires are the only thing connecting your vehicle to the road. We treat every single installation, balance, and repair with the absolute highest level of precision. If we wouldn't let our own families drive on it, we won't let you drive on it either.
          </li>
          <li class="text-md">
            <span class="font-bold">A Passion for Convenience:</span> We believe customer service isn't just about being polite—it's about respecting your time. We show up on time, fully equipped, and leave your location exactly how we found it.
          </li>
        </ul>
        <p class="text-md mb-8">
          Tires on your terms. No waiting rooms, no wasted hours. Just top-tier service delivered straight to you while you work, relax, or spend time with family.
        </p>

        <h2 class="text-2xl font-bold mb-4">Ready to Experience a Better Way to Buy Tires?</h2>
        <hr class="w-24 h-1 bg-vivid-red border-0 rounded mt-2"/>
        <p class="text-md mb-6 mt-4">
          Whether you need a brand-new set of tires, a seasonal swap, or a precision balance, the Proline team is ready to deliver high-quality, stress-free service right to your doorstep.
        </p>
        <NuxtLink to="/tires">
          <button class="bg-vivid-red text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium">
            Order your tires here
          </button>
        </NuxtLink>
      </div>
      <div class="hidden xl:block xl:w-5/12 relative overflow-hidden">
        <div class="absolute inset-0 opacity-50">
          <img class="w-full h-full object-cover transform translate-y-8"
               src="/images/vecteezy_mobile-tire-service-abstract-concept-vector-illustration_35795024.eps.webp"
               alt="Mobile Tire Service Illustration">
        </div>
      </div>
    </div>
  </div>
</template>
<style>
h2 {
  font-family: 'Lato', sans-serif;
}

p,
ul,
li {
  font-family: 'Kumbh Sans', sans-serif;
}

@media (min-width: 768px) {
  #history-section::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 58.33%;
    /* 7/12 of the container width */
    background: linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0));
    z-index: 5;
    pointer-events: none;
  }
}
</style>
<script setup lang="ts">
</script>
