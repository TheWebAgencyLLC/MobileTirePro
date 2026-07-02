<template>
    <div class="min-h-screen bg-gray-50">
        <div class="relative h-[350px] bg-gray-900">
            <img src="/images/electricVehicle.jpg" alt="Engine and Cabin Air Filter Service"
                class="absolute inset-0 w-full h-full object-cover object-center" />
            <div class="absolute inset-0 bg-black/60"></div>

            <div
                class="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
                <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">
                    Engine &amp; Cabin Air Filter Changes
                </h1>
                <p class="text-xl text-white max-w-3xl mx-auto mb-8">
                    Breathe easier and protect your engine with mobile filter replacement service
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
                        <h2 class="text-3xl font-bold text-gray-900 mb-6">Mobile Air Filter Replacement Service</h2>
                        <p class="text-lg text-gray-700 mb-6 leading-relaxed">
                            Clean air filters are essential for engine performance and in-cabin comfort. Our mobile
                            service replaces both engine and cabin air filters at your location, helping your vehicle
                            run efficiently while keeping the air inside your car fresh and free of dust, pollen, and
                            debris.
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
                        <img src="/images/stockTiresImage.jpg" alt="Engine and Cabin Air Filter Service"
                            class="rounded-lg shadow-lg w-full h-auto" />
                    </div>
                </div>
            </div>

            <div class="grid md:grid-cols-2 gap-8 mb-16">
                <div class="bg-white rounded-xl shadow-xl p-8 md:p-10">
                    <h2 class="text-2xl font-bold text-gray-900 mb-4">Engine Air Filter</h2>
                    <p class="text-gray-700 mb-6 leading-relaxed">
                        Your engine air filter prevents dirt and debris from entering the engine. A clogged filter can
                        reduce fuel efficiency, hurt acceleration, and increase engine wear over time.
                    </p>
                    <ul class="space-y-3">
                        <li v-for="item in engineFilterBenefits" :key="item" class="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-vivid-red flex-shrink-0 mt-0.5"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 13l4 4L19 7" />
                            </svg>
                            <span class="text-gray-700">{{ item }}</span>
                        </li>
                    </ul>
                </div>

                <div class="bg-white rounded-xl shadow-xl p-8 md:p-10">
                    <h2 class="text-2xl font-bold text-gray-900 mb-4">Cabin Air Filter</h2>
                    <p class="text-gray-700 mb-6 leading-relaxed">
                        Your cabin air filter keeps the air inside your vehicle clean. Replacing it regularly improves
                        HVAC performance and reduces allergens, dust, and odors for a more comfortable drive.
                    </p>
                    <ul class="space-y-3">
                        <li v-for="item in cabinFilterBenefits" :key="item" class="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-vivid-red flex-shrink-0 mt-0.5"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 13l4 4L19 7" />
                            </svg>
                            <span class="text-gray-700">{{ item }}</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="mb-16">
                <h2 class="text-3xl font-bold text-center mb-12">Our Filter Replacement Process</h2>
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
        </div>

        <div class="bg-gray-900 text-white py-12">
            <div class="max-w-7xl mx-auto px-4 text-center">
                <h2 class="text-3xl font-bold mb-6">Ready for Fresh Filters?</h2>
                <p class="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                    Protect your engine and improve in-cabin air quality with mobile filter replacement from Proline
                    Wheel &amp; Tire.
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
    'Engine and cabin air filter replacement',
    'Mobile service at your home, garage, or workplace',
    'Quality filters matched to your vehicle',
    'Improved engine performance and in-cabin air quality',
]

const engineFilterBenefits = [
    'Better fuel efficiency and engine performance',
    'Reduced risk of contaminants entering the engine',
    'Recommended replacement based on manufacturer intervals',
]

const cabinFilterBenefits = [
    'Cleaner air for you and your passengers',
    'Improved airflow from your HVAC system',
    'Reduced dust, pollen, and odors inside the cabin',
]

const steps = [
    {
        title: 'Schedule Service',
        description: 'Book a time that works for you at your preferred location.',
    },
    {
        title: 'Filter Inspection',
        description: 'We inspect your current filters and confirm the correct replacements for your vehicle.',
    },
    {
        title: 'Quick Replacement',
        description: 'New filters are installed on-site so you can drive away with confidence.',
    },
]

useHead({
    title: 'Engine & Cabin Air Filter Changes | Mobile Service | Proline Wheel & Tire',
    meta: [
        {
            name: 'description',
            content: 'Mobile engine and cabin air filter replacement at your location. Improve engine performance, fuel efficiency, and in-cabin air quality with Proline Wheel & Tire.',
        },
        {
            name: 'keywords',
            content: 'engine air filter change, cabin air filter replacement, mobile air filter service, car filter change, Proline Wheel & Tire',
        },
        {
            property: 'og:title',
            content: 'Engine & Cabin Air Filter Changes | Mobile Service | Proline Wheel & Tire',
        },
        {
            property: 'og:description',
            content: 'Mobile engine and cabin air filter replacement delivered to your driveway, garage, or workplace.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/images/electricVehicle.jpg' },
    ],
})
</script>
