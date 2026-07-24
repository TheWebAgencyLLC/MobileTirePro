<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Hero Section -->
        <div class="relative h-[350px] bg-gray-900">
            <img src="/images/stockTiresImage.jpg" alt="Road Hazard Coverage"
                class="absolute inset-0 w-full h-full object-cover object-center" />
            <div class="absolute inset-0 bg-black/60"></div>

            <div
                class="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
                <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
                    Road Hazard Coverage
                </h1>
                <NuxtLink to="/bookings"
                    class="bg-vivid-red hover:bg-vivid-red/90 text-white text-lg font-medium rounded-lg transition-all transform hover:scale-105 block w-[220px] py-4">
                    <span class="inline-block px-6">Book Service &#8594;</span>
                </NuxtLink>
            </div>
        </div>

        <!-- Main Content -->
        <div class="max-w-7xl mx-auto px-4 py-16 my-4">
            <!-- Intro -->
            <div class="bg-white rounded-xl shadow-xl p-8 md:p-12 mb-16">
                <div class="max-w-4xl mx-auto text-center">
                    <h2 class="text-3xl font-bold text-gray-900 mb-6">Simple, Hassle-Free Road Hazard Protection</h2>
                    <p class="text-lg text-gray-700 leading-relaxed">
                        Potholes, nails, and road debris happen. When they do, our Road Hazard Coverage has your back.
                        We keep it simple: if you purchase our coverage when you buy your tires, you are protected against
                        the unexpected. No complicated fine print, just straightforward peace of mind.
                    </p>
                </div>
            </div>

            <!-- What's Covered & Exclusions -->
            <div class="grid md:grid-cols-2 gap-8 mb-16">
                <div class="bg-white rounded-xl shadow-xl p-8 md:p-10">
                    <h2 class="text-2xl font-bold text-gray-900 mb-6">What's Covered?</h2>
                    <ul class="space-y-5">
                        <li v-for="item in coveredItems" :key="item.title" class="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-vivid-red flex-shrink-0 mt-0.5"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 13l4 4L19 7" />
                            </svg>
                            <div>
                                <h3 class="font-semibold text-gray-900">{{ item.title }}</h3>
                                <p class="text-gray-600">{{ item.description }}</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="bg-white rounded-xl shadow-xl p-8 md:p-10">
                    <h2 class="text-2xl font-bold text-gray-900 mb-2">What is Not Covered (Exclusions)</h2>
                    <p class="text-gray-600 mb-6">To keep our program fair and affordable, this coverage specifically
                        protects against unpredictable road hazards. It does not cover:</p>
                    <ul class="space-y-5">
                        <li v-for="item in exclusionItems" :key="item.title" class="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400 flex-shrink-0 mt-0.5"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <div>
                                <h3 class="font-semibold text-gray-900">{{ item.title }}</h3>
                                <p class="text-gray-600">{{ item.description }}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- How It Works -->
            <div class="mb-16">
                <h2 class="text-3xl font-bold text-center mb-4">How It Works: The Fine Print Made Simple</h2>
                <div class="bg-white rounded-xl shadow-xl overflow-hidden mt-10">
                    <div class="grid md:grid-cols-2">
                        <div class="bg-vivid-red text-white p-8 md:p-10">
                            <h3 class="text-xl font-bold mb-4">What We Do</h3>
                            <p class="text-white/90 leading-relaxed">
                                We provide and install a replacement tire if yours cannot be safely repaired due to road
                                damage.
                            </p>
                        </div>
                        <div class="p-8 md:p-10">
                            <h3 class="text-xl font-bold text-gray-900 mb-4">What You Pay</h3>
                            <p class="text-gray-700 leading-relaxed">
                                You are only responsible for paying our standard Mobile Service Charge at the time of
                                service.
                            </p>
                        </div>
                    </div>
                    <div class="bg-gray-50 border-t border-gray-200 px-8 py-6 md:px-10">
                        <p class="text-gray-600 text-sm md:text-base">
                            <span class="font-semibold text-gray-900">Please Note:</span> While the cost of the
                            replacement tire itself is covered under this plan, the Mobile Service Charge applies to all
                            dispatch requests to cover the trip and on-site labor.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Why Choose -->
            <div class="mb-16">
                <h2 class="text-3xl font-bold text-center mb-12">Why Choose Road Hazard Coverage?</h2>
                <div class="grid md:grid-cols-3 gap-8">
                    <div v-for="benefit in benefits" :key="benefit.title"
                        class="bg-white rounded-lg shadow-md p-8 text-center">
                        <div class="bg-gray-100 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-vivid-red" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    :d="benefit.iconPath" />
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold mb-4">{{ benefit.title }}</h3>
                        <p class="text-gray-600">{{ benefit.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const coveredItems = [
    {
        title: '4 Years of Protection',
        description: 'You are covered for up to 4 years from the date of purchase.',
    },
    {
        title: 'Treadwear Life',
        description: 'Coverage lasts until the tire reaches 4/32nds of an inch of remaining tread depth.',
    },
    {
        title: 'Full Replacement',
        description: 'If your tire suffers road damage and is deemed not repairable, we will cover the cost of the replacement tire.',
    },
]

const exclusionItems = [
    {
        title: 'Acts of Vandalism',
        description: 'Intentional damage or slashed tires are not covered under this plan (these are typically covered by your auto insurance policy).',
    },
    {
        title: 'Mechanical Wear',
        description: 'Tires that wear out prematurely or unevenly on the edges due to vehicle mechanical issues (such as bad alignment, worn suspension, or improper inflation) are excluded.',
    },
]

const benefits = [
    {
        title: 'Zero Guesswork',
        description: "If it can't be fixed, it gets replaced.",
        iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    },
    {
        title: 'Convenience Delivered',
        description: 'We come directly to you to swap out the damaged tire.',
        iconPath: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    },
    {
        title: 'Long-Term Value',
        description: 'Four years of driving confidence for a fraction of the cost of a new tire.',
        iconPath: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
]

useHead({
    title: 'Road Hazard Coverage | Proline Wheel & Tire',
    meta: [
        {
            name: 'description',
            content: 'Simple, hassle-free road hazard protection for up to 4 years. Coverage for potholes, nails, and road debris with full tire replacement when repair is not possible.',
        },
        { name: 'keywords', content: 'road hazard coverage, tire protection, tire replacement, mobile tire service' },
        { property: 'og:title', content: 'Road Hazard Coverage | Proline Wheel & Tire' },
        {
            property: 'og:description',
            content: 'Protect your tires against potholes, nails, and road debris with straightforward road hazard coverage.',
        },
        { property: 'og:type', content: 'website' },
    ],
})
</script>
