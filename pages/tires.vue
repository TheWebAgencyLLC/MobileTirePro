<template>
    <div class="min-h-screen bg-gray-50">
        <div class="relative h-[300px] bg-gray-900">
            <img src="/images/stockTiresImage.jpg" alt="Tire Service"
                class="absolute inset-0 w-full h-full object-cover object-center" />
            <div class="absolute inset-0 bg-black/50"></div>

            <div
                class="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
                <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
                    Order Your Tires
                </h1>
                <p class="text-lg text-gray-200 max-w-2xl">
                    Premium tires from trusted brands, installed at your location.
                </p>
            </div>
        </div>

        <div class="max-w-4xl mx-auto px-4 py-12">
            <div class="bg-white rounded-lg shadow-lg p-8 md:p-12">
                <h2 class="text-2xl font-bold text-gray-900 mb-2 text-center">Find Your Tires</h2>
                <p class="text-gray-600 mb-8 text-center">
                    Search by vehicle or tire size below. Need help? Call us at
                    <a href="tel:815-355-1437" @click="$gtm.trackPhoneClick('tires_page')"
                        class="text-vivid-red hover:underline">(815) 355-1437</a>.
                </p>
                <TireConnectWidget container-id="tireconnect-tires" :lazy="false" />
            </div>

            <div class="bg-white rounded-lg shadow-lg p-8 md:p-12 mt-8">
                <h2 class="text-2xl font-semibold text-center mb-8 text-gray-900">Brands We Carry</h2>
                <div class="flex justify-center items-center gap-8 flex-wrap">
                    <img src="/images/Michelin_Corporate_Logo___color.jpg" alt="Michelin"
                        class="h-16 object-contain" />

                    <div class="h-16 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 73.04"
                            class="w-auto h-full" width="400" height="72" aria-label="Yokohama">
                            <polygon fill="#e31f26"
                                points="7.05 0.01 0.98 0 35.55 34.58 35.69 34.7 35.55 34.85 1.23 69.17 7.31 69.17 41.76 34.7 7.05 0.01" />
                            <polygon fill="#e31f26"
                                points="17.72 0.01 11.64 0.01 46.2 34.58 46.35 34.7 46.2 34.85 11.9 69.16 17.99 69.16 52.43 34.7 17.72 0.01" />
                            <polygon fill="#e31f26"
                                points="28.4 0 22.34 0.01 56.89 34.58 57.01 34.7 56.89 34.85 22.58 69.16 28.66 69.16 63.13 34.7 28.4 0" />
                            <polygon fill="#e31f26"
                                points="39.08 0 32.99 0 67.56 34.56 67.7 34.7 67.56 34.85 33.24 69.16 39.33 69.17 73.79 34.7 39.08 0" />
                            <path fill="#e31f26"
                                d="M81.55,31.52l-.14.14-.13-.14-2-2-.13-.16.13-.13L108.49,0h-6.08L76.22,26.19l-.15.15-.13-.15-2-2L73.79,24l.14-.13L97.81,0H91.73L70.89,20.86l-.14.15-.15-.15-2-2-.15-.14.15-.16L87.14,0H81.06L65.55,15.52l-.15.15-.14-.16-2-2-.14-.15.14-.13L76.45,0H70.39L60.2,10.17l-.13.14-.13-.14L49.77,0h-6.1L78.24,34.56l.12.14-.12.15L43.93,69.16H50c.13-.1,34.59-34.58,34.59-34.58L119.17,0h-6.09Z" />
                            <polygon fill="#000"
                                points="159.4 8.65 149.58 8.65 138.53 31.31 127.47 8.65 117.65 8.65 134.2 41.55 134.2 61.18 142.83 61.17 142.83 41.55 159.4 8.65" />
                            <path fill="#000"
                                d="M161,34.92a18,18,0,1,0,18-18,18,18,0,0,0-18,18M179,8.21A26.71,26.71,0,1,1,152.3,34.92,26.71,26.71,0,0,1,179,8.21" />
                            <path fill="#000"
                                d="M244.92,34.89a18,18,0,1,0,18-18,18,18,0,0,0-18,18m18-26.7a26.72,26.72,0,1,1-26.74,26.7,26.75,26.75,0,0,1,26.74-26.7" />
                            <polygon fill="#000"
                                points="244.73 8.21 233.25 8.21 217.11 30.57 217.11 8.21 207.97 8.21 207.97 60.74 217.11 60.74 217.11 39.09 232.49 60.74 243.97 60.74 224.43 34.99 244.73 8.21" />
                            <polygon fill="#000"
                                points="320.13 8.62 320.13 30.93 301.28 30.93 301.28 8.62 291.91 8.62 291.91 61.17 301.28 61.17 301.28 39.94 320.13 39.94 320.13 61.17 329.47 61.17 329.47 8.66 320.13 8.62" />
                            <path fill="#000"
                                d="M349,40.39l6.6-17.87,6.62,17.87Zm20.87,20.78h9.82L360.22,8.62h-9.34l-19.4,52.55h9.8l4.83-13.39H365Z" />
                            <path fill="#000"
                                d="M455.83,40.39l6.61-17.89,6.62,17.89ZM476.7,61.17h9.83L467.14,8.62h-1l-8,0h-.4L438.35,61.17h9.85L453,47.76h18.88Z" />
                            <polygon fill="#000"
                                points="432.97 8.62 426.08 8.62 424.1 8.66 408.62 48.91 393.13 8.62 391.13 8.66 384.28 8.62 381.58 8.66 381.58 61.17 390.97 61.17 391.13 26.83 404.23 61.17 404.64 61.17 412.56 61.17 412.97 61.17 426.09 26.83 426.25 61.17 435.66 61.17 435.66 8.62 432.97 8.62" />
                            <path fill="#000"
                                d="M489.94,56.3a4.74,4.74,0,1,1,4.73,4.75,4.74,4.74,0,0,1-4.73-4.75m-.6,0A5.33,5.33,0,1,0,494.67,51a5.33,5.33,0,0,0-5.33,5.32" />
                            <path fill="#000"
                                d="M493.32,55.94h1.44a1.65,1.65,0,0,0,.71-.12.84.84,0,0,0,.4-.37,1.14,1.14,0,0,0,.15-.56,1,1,0,0,0-.28-.75,1.14,1.14,0,0,0-.82-.26h-1.6Zm-.69,3.48V53.19h2.26a2.53,2.53,0,0,1,1.05.16,1.35,1.35,0,0,1,.55.58,2,2,0,0,1,.22,1,1.79,1.79,0,0,1-.36,1.14,1.69,1.69,0,0,1-1.07.56,1.45,1.45,0,0,1,.43.35,3.68,3.68,0,0,1,.54.79l.88,1.7h-.85l-.67-1.29a7,7,0,0,0-.6-1,1.07,1.07,0,0,0-.39-.36,1.25,1.25,0,0,0-.53-.1h-.77v2.78Z" />
                        </svg>
                    </div>

                    <img src="/images/goodyear-logo-yellow.png" alt="Goodyear" class="h-12 object-contain" />
                    <img src="/images/BridgestoneMark-Black.png" alt="Bridgestone" class="h-12 object-contain" />
                    <img src="/images/logo-pirelli2x.jpg" alt="Pirelli" class="h-12 object-contain" />
                </div>
            </div>

            <div class="bg-white rounded-lg shadow-lg p-8 md:p-12 mt-8">
                <h2 class="text-2xl font-semibold text-center mb-8 text-gray-900">Quick Tire Guide</h2>
                <div class="grid md:grid-cols-2 gap-8">
                    <div class="bg-gray-50 p-6 rounded-lg">
                        <h3 class="font-semibold mb-4">How to Read Your Tire Size</h3>
                        <p class="text-gray-600">
                            Example: P215/55R17
                            <br />- P: Passenger vehicle tire
                            <br />- 215: Width in millimeters
                            <br />- 55: Aspect ratio
                            <br />- R: Radial construction
                            <br />- 17: Wheel diameter in inches
                        </p>
                    </div>
                    <div class="bg-gray-50 p-6 rounded-lg">
                        <h3 class="font-semibold mb-4">Popular Tire Sizes</h3>
                        <p class="text-gray-600">
                            Common sizes for popular vehicles:
                            <br />- Sedans: 205/55R16, 215/55R17
                            <br />- SUVs: 235/65R17, 265/65R17
                            <br />- Trucks: 245/75R16, 265/70R17
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const $gtm = useGTM()
useHead({
  title: 'Order Tires | Proline Wheel & Tire',
  meta: [
    {
      name: 'description',
      content: 'Shop premium tires from Michelin, Goodyear, Bridgestone, and more. Search by vehicle or tire size with Proline Wheel & Tire.'
    },
    { name: 'keywords', content: 'order tires online, mobile tire installation, tire brands, tire replacement service' },
    { property: 'og:title', content: 'Order Tires | Proline Wheel & Tire' },
    { property: 'og:description', content: 'Search by vehicle or tire size and order tires for mobile installation.' },
    { property: 'og:type', content: 'website' }
  ]
})
</script>
