<template>
    <div class="min-h-screen bg-gray-50">
        <div class="relative h-[300px] bg-gray-900">
            <img src="/images/stockTiresImage.jpg" alt="Wheel Service"
                class="absolute inset-0 w-full h-full object-cover object-center" />
            <div class="absolute inset-0 bg-black/50"></div>

            <div
                class="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
                <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
                    Order Your Wheels
                </h1>
                <p class="text-lg text-gray-200 max-w-2xl">
                    Premium aftermarket wheels from top brands, installed at your location.
                </p>
            </div>
        </div>

        <div class="max-w-4xl mx-auto px-4 py-12">
            <div class="bg-white rounded-lg shadow-lg p-8 md:p-12 text-center">
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-vivid-red mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                </div>

                <h2 class="text-3xl font-bold text-gray-900 mb-4">Under Construction</h2>
                <p class="text-lg text-gray-600 mb-2">
                    Our online wheel catalog is coming soon.
                </p>
                <p class="text-gray-600 mb-8">
                    Please contact us for pricing and availability. We carry premium wheels from the brands below
                    and can help you find the right fit for your vehicle.
                </p>

                <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href="tel:815-355-1437"
                        @click="$gtm.trackPhoneClick('wheels_page')"
                        class="inline-flex items-center justify-center bg-vivid-red text-white font-medium px-6 py-3 rounded-lg hover:bg-crimson-red transition-colors">
                        Call (815) 355-1437
                    </a>
                    <a href="mailto:prolinewheelandtire@gmail.com"
                        class="inline-flex items-center justify-center border border-vivid-red text-vivid-red font-medium px-6 py-3 rounded-lg hover:bg-red-50 transition-colors">
                        Email Us
                    </a>
                </div>
            </div>

            <div class="bg-white rounded-lg shadow-lg p-8 md:p-12 mt-8">
                <h2 class="text-2xl font-semibold text-center mb-8 text-gray-900">Brands We Carry</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
                    <div v-for="brand in wheelBrands" :key="brand.name"
                        class="flex flex-col items-center justify-center p-6 rounded-lg min-h-[7rem]"
                        :class="brand.darkBg ? 'bg-gray-900' : 'bg-white border border-gray-200'">
                        <img :src="brand.logo" :alt="brand.name" class="max-h-12 w-full object-contain" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const $gtm = useGTM()

const wheelBrands = [
    { name: 'Fuel Off-Road', logo: '/images/brands/fuel-off-road.svg', darkBg: true },
    { name: 'Black Rhino', logo: '/images/brands/black-rhino.svg', darkBg: true },
    { name: 'Asanti', logo: '/images/brands/asanti.svg', darkBg: true },
    { name: 'TSW', logo: '/images/brands/tsw.svg', darkBg: false },
]

useHead({
  title: 'Order Wheels | Proline Wheel & Tire',
  meta: [
    {
      name: 'description',
      content: 'Premium aftermarket wheels from Fuel Off-Road, Black Rhino, Asanti, and TSW. Contact Proline Wheel & Tire for pricing and availability.'
    },
    { name: 'keywords', content: 'order wheels online, Fuel Off-Road, Black Rhino, Asanti, TSW, mobile wheel installation' },
    { property: 'og:title', content: 'Order Wheels | Proline Wheel & Tire' },
    { property: 'og:description', content: 'Contact us for wheel pricing and availability. We carry Fuel Off-Road, Black Rhino, Asanti, and TSW.' },
    { property: 'og:type', content: 'website' }
  ]
})
</script>
