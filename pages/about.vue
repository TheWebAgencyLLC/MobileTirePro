<template>
  <PromoBanner/>
  <div id="history-section"
       class="rounded-lg relative overflow-hidden mt-6 md:mt-12 md:mx-auto mb-8 md:mb-16 min-h-[600px] text-dark-charcoal max-w-7xl px-4 sm:px-6 lg:px-8 py-4 md:py-2">
    <div class="flex flex-col md:flex-row">
      <div
          class="w-full xl:w-7/12 relative z-10 dark:bg-dark-charcoal bg-light-gray border border-off-white shadow-2xl rounded-lg drop-shadow-md bg-opacity-90 p-6 sm:p-8 md:p-12 text-dark-charcoal dark:text-white">
        <h2 class="text-2xl font-bold mb-4">About Us</h2>
        <hr class="w-24 h-1 bg-vivid-red border-0 rounded mt-2"/>
        <p class="text-md mb-8 mt-2">
          Welcome to Mobile Tire Pro, your trusted mobile tire installation service. <b>With over a decade of industry
          experience</b>, we are committed to providing top-notch tire
          services
          that prioritize your safety, deliver exceptional quality, and ensure a superior customer experience.
        </p>
        <h2 class="text-2xl font-bold mb-4">Our Mission</h2>
        <hr class="w-24 h-1 bg-vivid-red border-0 rounded mt-2"/>
        <p class="text-md mb-4 mt-2">
          At Mobile Tire Pro, our mission is to bring convenience and peace of mind to our customers by
          offering professional sales and tire installation right at their doorstep. We understand the
          importance of safe and reliable tires, and we strive to make the process as seamless and efficient
          as possible.
        </p>
        <h2 class="text-2xl font-bold mb-4">Our Experience</h2>
        <hr class="w-24 h-1 bg-vivid-red border-0 rounded mt-2"/>
        <div class="flex flex-col gap-2 mt-2">
          <p class="text-md mt-2">
            <b>With over a decade of industry experience</b>, our team has honed their skills and knowledge to deliver
            the
            highest standards of service. Our experience has been built on a foundation of:
          </p>
          <li class="text-md">
            <span class="font-bold">Customer Safety:</span> Ensuring the safety of our customers is our top
            priority. We meticulously inspect and install tires to meet all safety standards.
          </li>
          <li class="text-md">
            <span class="font-bold">Quality Workmanship:</span> We take pride in our attention to detail and
            commitment to quality. Each tire installation is performed with precision and care.
          </li>
          <li class="text-md">
            <span class="font-bold">Excellent Customer Service:</span> We believe in creating positive and
            memorable experiences for our customers. Our friendly and professional team is here to assist
            you with all your tire needs.
          </li>
        </div>
        <h2 class="text-2xl font-bold mb-4 mt-2">Why Choose Us?</h2>
        <hr class="w-24 h-1 bg-vivid-red border-0 rounded mt-2"/>
        <div class="flex flex-col gap-2 mt-2">
          <li class="text-md"><span class="font-bold">Convenience:</span> Our mobile service brings the tire
            shop to you, saving you time and hassle.
          </li>
          <li class="text-md"><span class="font-bold">Expertise:</span> Our technicians are experienced and
            trained to handle a wide range of tire services.
          </li>
          <li class="text-md"><span class="font-bold">Reliability:</span> We use high-quality products and
            equipment to ensure the best results.
          </li>
          <li class="text-md"><span class="font-bold">Customer-Centric Approach:</span> We listen to your
            needs and provide personalized solutions to keep you safe on the road.
          </li>
          <p class="text-md underline">Thank you for choosing Mobile Tire Pro. We look forward to serving you
            and ensuring your vehicle is equipped with the best tires for a smooth and safe journey.</p>
        </div>
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
