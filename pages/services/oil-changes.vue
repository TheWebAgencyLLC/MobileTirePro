<template>
    <div class="min-h-screen bg-gray-50">
        <div class="relative h-[350px] bg-gray-900">
            <img src="/images/isometric-car-repair-horizontal-banner-with-serviceman-making-tire-service-vector-illustration.webp"
                alt="Mobile Oil Change Service"
                class="absolute inset-0 w-full h-full object-cover object-center" />
            <div class="absolute inset-0 bg-black/60"></div>

            <div
                class="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
                <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
                    Mobile Oil Changes
                </h1>
                <p class="text-xl text-white max-w-3xl mx-auto mb-8">
                    Premium oil and filter changes delivered to your driveway, garage, or workplace
                </p>
                <NuxtLink to="/bookings"
                    class="bg-vivid-red hover:bg-vivid-red/90 text-white text-lg font-medium rounded-lg transition-all transform hover:scale-105 block w-[220px] py-4">
                    <span class="inline-block px-6">Book Service &#8594;</span>
                </NuxtLink>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 py-16 my-4">
            <div class="bg-white rounded-xl shadow-xl p-8 md:p-12 mb-16">
                <div class="flex flex-col md:flex-row gap-10 items-center">
                    <div class="md:w-1/2">
                        <h2 class="text-3xl font-bold text-gray-900 mb-6">Professional Oil Changes At Your Location</h2>
                        <p class="text-lg text-gray-700 mb-6 leading-relaxed">
                            Keep your engine running smoothly without the trip to the shop. Our mobile oil change service
                            brings convenient, professional maintenance right to you. Using premium quality oils and
                            filters, we help maintain your engine's performance and longevity while you go about your day.
                        </p>
                        <div v-for="feature in features" :key="feature" class="flex items-center gap-2 mb-4 last:mb-0">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-vivid-red flex-shrink-0"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 13l4 4L19 7" />
                            </svg>
                            <span class="text-gray-800 font-medium">{{ feature }}</span>
                        </div>
                    </div>
                    <div class="md:w-1/2">
                        <img src="/images/tire-installation-service.jpg" alt="Mobile Oil Change Service"
                            class="rounded-lg shadow-lg w-full h-auto" />
                    </div>
                </div>
            </div>

            <div class="mb-16">
                <h2 class="text-3xl font-bold text-center mb-12">How Our Mobile Oil Change Works</h2>
                <div class="grid md:grid-cols-3 gap-8">
                    <div v-for="(step, index) in steps" :key="step.title"
                        class="bg-white rounded-lg shadow-md p-8 text-center">
                        <div class="bg-gray-100 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6">
                            <span class="text-2xl font-bold text-vivid-red">{{ index + 1 }}</span>
                        </div>
                        <h3 class="text-xl font-semibold mb-4">{{ step.title }}</h3>
                        <p class="text-gray-600">{{ step.description }}</p>
                    </div>
                </div>
            </div>

            <div class="mb-16 bg-white rounded-xl shadow-xl overflow-hidden">
                <div class="grid md:grid-cols-2">
                    <div class="relative h-full min-h-[350px]">
                        <img src="/images/happyCustomer.jpg" alt="Mobile maintenance convenience"
                            class="absolute inset-0 w-full h-full object-cover object-center" />
                    </div>
                    <div class="p-8 md:p-12 flex flex-col justify-center">
                        <h2 class="text-3xl font-bold text-gray-900 mb-6">Why Choose Mobile Oil Changes?</h2>
                        <div v-for="benefit in benefits" :key="benefit.title" class="flex items-start gap-4 mb-6 last:mb-0">
                            <div class="flex-shrink-0 mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-vivid-red" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-xl font-semibold mb-2">{{ benefit.title }}</h3>
                                <p class="text-gray-600">{{ benefit.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-gray-900 text-white py-12">
            <div class="max-w-7xl mx-auto px-4 text-center">
                <h2 class="text-3xl font-bold mb-6">Ready for a Mobile Oil Change?</h2>
                <p class="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                    Skip the waiting room. Proline Wheel & Tire brings professional oil change service to your location.
                </p>
                <NuxtLink to="/bookings"
                    class="inline-block bg-vivid-red hover:bg-vivid-red/90 text-white text-lg font-medium px-8 py-4 rounded-lg transition-all transform hover:scale-105">
                    Schedule Now
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
const features = [
    'Premium quality oils and filters',
    'Mobile service at your home, garage, or workplace',
    'Professional disposal of used oil and filters',
    'Multi-point visual inspection included',
]

const steps = [
    {
        title: 'Book Your Appointment',
        description: 'Choose a convenient time and location that works for your schedule.',
    },
    {
        title: 'We Come To You',
        description: 'Our mobile technician arrives fully equipped with oils, filters, and tools.',
    },
    {
        title: 'Drive Away Confident',
        description: 'Your oil and filter are replaced professionally so your engine stays protected.',
    },
]

const benefits = [
    {
        title: 'Save Time',
        description: 'No shop waiting rooms or drop-off hassles. We work while you stay productive.',
    },
    {
        title: 'Engine Protection',
        description: 'Regular oil changes help extend engine life and maintain peak performance.',
    },
    {
        title: 'Trusted Expertise',
        description: 'The same professional care you expect from Proline Wheel & Tire, at your location.',
    },
]

useHead({
    title: 'Mobile Oil Change Service | Proline Wheel & Tire',
    meta: [
        {
            name: 'description',
            content: 'Convenient mobile oil change service at your home or workplace. Premium oils and filters, professional installation, and multi-point inspection from Proline Wheel & Tire.',
        },
        {
            name: 'keywords',
            content: 'mobile oil change, oil change service, at-home oil change, mobile car maintenance, Proline Wheel & Tire',
        },
        { property: 'og:title', content: 'Mobile Oil Change Service | Proline Wheel & Tire' },
        {
            property: 'og:description',
            content: 'Professional mobile oil changes delivered to your driveway, garage, or workplace.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/images/isometric-car-repair-horizontal-banner-with-serviceman-making-tire-service-vector-illustration.webp' },
    ],
})
</script>
