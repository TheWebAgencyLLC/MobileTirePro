<template>
    <div class="min-h-screen bg-gray-50">
        <div class="relative h-[350px] bg-gray-900">
            <img src="/images/seasonal.jpg" alt="Wiper Blade Replacement Service"
                class="absolute inset-0 w-full h-full object-cover object-center" />
            <div class="absolute inset-0 bg-black/60"></div>

            <div
                class="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
                <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
                    Wiper Blade Replacement
                </h1>
                <p class="text-xl text-white max-w-3xl mx-auto mb-8">
                    Clear visibility in any weather with professional mobile wiper blade service
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
                        <h2 class="text-3xl font-bold text-gray-900 mb-6">Mobile Wiper Blade Service</h2>
                        <p class="text-lg text-gray-700 mb-6 leading-relaxed">
                            Streaking, skipping, or squeaking wipers are more than an annoyance—they're a safety issue.
                            Our mobile wiper blade service replaces worn blades at your location so you always have a
                            clear view of the road ahead, rain or shine.
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
                        <img src="/images/winter-tires.jpg" alt="Wiper Blade Replacement"
                            class="rounded-lg shadow-lg w-full h-auto" />
                    </div>
                </div>
            </div>

            <div class="mb-16">
                <h2 class="text-3xl font-bold text-center mb-12">When to Replace Your Wiper Blades</h2>
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div v-for="sign in warningSigns" :key="sign.title"
                        class="bg-white rounded-lg shadow-md p-6 text-center">
                        <div class="bg-gray-100 w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-vivid-red" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold mb-2">{{ sign.title }}</h3>
                        <p class="text-gray-600 text-sm">{{ sign.description }}</p>
                    </div>
                </div>
            </div>

            <div class="mb-16">
                <h2 class="text-3xl font-bold text-center mb-12">How It Works</h2>
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
                    <div class="p-8 md:p-12 flex flex-col justify-center">
                        <h2 class="text-3xl font-bold text-gray-900 mb-6">Drive Safer in Every Season</h2>
                        <p class="text-gray-700 mb-6 leading-relaxed">
                            Whether you're preparing for spring showers or winter snow, fresh wiper blades make a
                            noticeable difference. We install the correct size blades for your vehicle and ensure a
                            proper fit for streak-free performance.
                        </p>
                        <NuxtLink to="/bookings"
                            class="inline-flex items-center self-start bg-vivid-red hover:bg-vivid-red/90 text-white font-medium px-6 py-3 rounded-lg transition-all">
                            Book Wiper Replacement
                        </NuxtLink>
                    </div>
                    <div class="relative h-full min-h-[300px]">
                        <img src="/images/vecteezy_mobile-tire-service-abstract-concept-vector-illustration_35795024.eps.webp"
                            alt="Mobile vehicle service"
                            class="absolute inset-0 w-full h-full object-cover object-center" />
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-gray-900 text-white py-12">
            <div class="max-w-7xl mx-auto px-4 text-center">
                <h2 class="text-3xl font-bold mb-6">See Clearly. Drive Safely.</h2>
                <p class="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                    Don't wait for the next storm. Schedule mobile wiper blade replacement with Proline Wheel &amp; Tire
                    today.
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
    'Quality wiper blades matched to your vehicle',
    'Mobile installation at your location',
    'Front and rear wiper blade replacement available',
    'Streak-free visibility for safer driving',
]

const warningSigns = [
    {
        title: 'Streaking',
        description: 'Water smears across the windshield instead of wiping clean.',
    },
    {
        title: 'Skipping',
        description: 'Blades jump or miss sections of the glass while in use.',
    },
    {
        title: 'Squeaking',
        description: 'Noisy wipers often mean hardened or worn rubber.',
    },
    {
        title: 'Split Rubber',
        description: 'Cracked or peeling blade edges reduce wiping effectiveness.',
    },
]

const steps = [
    {
        title: 'Book Online',
        description: 'Schedule a convenient time at your home, garage, or workplace.',
    },
    {
        title: 'We Arrive On-Site',
        description: 'Our technician brings the correct wiper blades for your vehicle.',
    },
    {
        title: 'Quick Install',
        description: 'Old blades are removed and new ones installed in minutes.',
    },
]

useHead({
    title: 'Wiper Blade Replacement | Mobile Service | Proline Wheel & Tire',
    meta: [
        {
            name: 'description',
            content: 'Mobile wiper blade replacement at your location. Improve visibility and driving safety with professional wiper installation from Proline Wheel & Tire.',
        },
        {
            name: 'keywords',
            content: 'wiper blade replacement, mobile wiper service, windshield wiper change, car wiper blades, Proline Wheel & Tire',
        },
        { property: 'og:title', content: 'Wiper Blade Replacement | Mobile Service | Proline Wheel & Tire' },
        {
            property: 'og:description',
            content: 'Professional mobile wiper blade replacement for clear visibility in any weather.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/images/seasonal.jpg' },
    ],
})
</script>
