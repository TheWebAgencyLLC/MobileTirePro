<template>
    <div class="min-h-screen bg-gray-50">
        <div class="relative h-[300px] bg-gray-900">
            <img src="../public/images/stockTiresImage.jpg" alt="Tire Service"
                class="absolute inset-0 w-full h-full object-cover object-center" />
            <div class="absolute inset-0 bg-black/50"></div>

            <div
                class="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col items-center justify-center text-center -top-5">
                <h1 class="text-4xl md:text-5xl font-bold text-white mb-8">
                    Order Your Tires and Schedule Installation
                </h1>
                <div class="bg-red-100 text-red-600 px-6 py-2 rounded-md">
                    Proline Wheel & Tire offers a wide selection of tires from trusted brands. Order your tires and schedule
                    installation today!
                </div>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 py-8">
            <div class="bg-white rounded-lg shadow-lg p-8 mb-12">
                <form name="tire-order" method="POST" data-netlify="true" data-netlify-honeypot="bot-field"
                    class="grid gap-6 md:grid-cols-2">
                    <input type="hidden" name="form-name" value="tire-order" />

                    <div>
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900">
                            First name
                        </label>
                        <input type="text" id="first_name" name="firstName"
                            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="John" required />
                    </div>

                    <div>
                        <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900">
                            Last name
                        </label>
                        <input type="text" id="last_name" name="lastName"
                            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Doe" required />
                    </div>

                    <div>
                        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900">
                            Phone number
                        </label>
                        <input type="tel" id="phone" name="phoneNumber"
                            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="(123) 456-7890" required />
                    </div>

                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900">
                            Email Address
                        </label>
                        <input type="email" id="email" name="email"
                            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="john@example.com" required />
                    </div>

                    <div>
                        <label for="vehicle" class="block mb-2 text-sm font-medium text-gray-900">
                            Year, Make, Model
                        </label>
                        <input type="text" id="vehicle" name="vehicle"
                            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="2020 Honda Civic" required />
                    </div>

                    <div>
                        <label for="wheel_diameter"
                            class="block mb-2 text-sm font-medium text-gray-900 flex items-center gap-2">
                            Wheel Diameter / Rim Size
                            <div class="relative inline-block group">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-500 cursor-help"
                                    viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                        clip-rule="evenodd" />
                                </svg>
                                <div
                                    class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity">
                                    Tire size can be found in two places: on the door placard inside the driver's door
                                    or directly on the tire (e.g., 205/55/R16).
                                    <div
                                        class="absolute left-1/2 -bottom-1 -translate-x-1/2 border-4 border-transparent border-t-gray-900">
                                    </div>
                                </div>
                            </div>
                        </label>
                        <select id="wheel_diameter" name="wheelDiameter"
                            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required>
                            <option value="">Select wheel diameter</option>
                            <option value="12">12 inches</option>
                            <option value="13">13 inches</option>
                            <option value="14">14 inches</option>
                            <option value="15">15 inches</option>
                            <option value="16">16 inches</option>
                            <option value="17">17 inches</option>
                            <option value="18">18 inches</option>
                            <option value="19">19 inches</option>
                            <option value="20">20 inches</option>
                            <option value="21">21 inches</option>
                            <option value="22">22 inches</option>
                        </select>
                    </div>

                    <div class="md:col-span-2">
                        <fieldset>
                            <legend class="block mb-2 text-sm font-medium text-gray-900">What tires are you looking for?
                            </legend>
                            <div class="space-y-2">
                                <div class="flex items-center">
                                    <input id="tire-original" name="tirePreference" type="radio"
                                        value="original-equipment"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500">
                                    <label for="tire-original" class="ml-2 text-sm font-medium text-gray-900">
                                        Original Equipment (Stock)
                                    </label>
                                </div>
                                <div class="flex items-center">
                                    <input id="tire-safety" name="tirePreference" type="radio" value="safest-rated"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500">
                                    <label for="tire-safety" class="ml-2 text-sm font-medium text-gray-900">
                                        Safest Rated
                                    </label>
                                </div>
                                <div class="flex items-center">
                                    <input id="tire-cost" name="tirePreference" type="radio" value="cost-efficient"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500">
                                    <label for="tire-cost" class="ml-2 text-sm font-medium text-gray-900">
                                        Cost Efficient
                                    </label>
                                </div>
                                <div class="flex items-center">
                                    <input id="tire-unsure" name="tirePreference" type="radio" value="not-sure"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500">
                                    <label for="tire-unsure" class="ml-2 text-sm font-medium text-gray-900">
                                        I'm not sure
                                    </label>
                                </div>
                            </div>
                        </fieldset>
                    </div>

                    <div class="md:col-span-2">
                        <label for="notes" class="block mb-2 text-sm font-medium text-gray-900">
                            Additional Notes
                        </label>
                        <textarea id="notes" name="notes" rows="4"
                            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Please enter any additional information, special requests, or questions here..."></textarea>
                    </div>

                    <div class="md:col-span-2 mt-6">
                        <button type="submit"
                            class="w-full bg-vivid-red hover:bg-vivid-red text-white font-medium py-2.5 px-4 rounded-lg transition-colors">
                            Submit Inquiry
                        </button>
                    </div>
                </form>
            </div>

            <div class="bg-white rounded-lg p-8 mb-12">
                <h2 class="text-2xl font-semibold text-center mb-8">Trusted Brands</h2>
                <div class="flex justify-center items-center gap-8 flex-wrap">
                    <img src="../public/images/Michelin_Corporate_Logo___color.jpg" alt="Michelin"
                        class="h-16 object-contain" />

                    <div class="h-16 flex items-center">
                        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 73.04"
                            class="w-auto h-full" width="400" height="72">
                            <polygon fill="#e31f26"
                                points="7.05 0.01 0.98 0 35.55 34.58 35.69 34.7 35.55 34.85 1.23 69.17 7.31 69.17 41.76 34.7 7.05 0.01">
                            </polygon>
                            <polygon fill="#e31f26"
                                points="17.72 0.01 11.64 0.01 46.2 34.58 46.35 34.7 46.2 34.85 11.9 69.16 17.99 69.16 52.43 34.7 17.72 0.01">
                            </polygon>
                            <polygon fill="#e31f26"
                                points="28.4 0 22.34 0.01 56.89 34.58 57.01 34.7 56.89 34.85 22.58 69.16 28.66 69.16 63.13 34.7 28.4 0">
                            </polygon>
                            <polygon fill="#e31f26"
                                points="39.08 0 32.99 0 67.56 34.56 67.7 34.7 67.56 34.85 33.24 69.16 39.33 69.17 73.79 34.7 39.08 0">
                            </polygon>
                            <path fill="#e31f26"
                                d="M81.55,31.52l-.14.14-.13-.14-2-2-.13-.16.13-.13L108.49,0h-6.08L76.22,26.19l-.15.15-.13-.15-2-2L73.79,24l.14-.13L97.81,0H91.73L70.89,20.86l-.14.15-.15-.15-2-2-.15-.14.15-.16L87.14,0H81.06L65.55,15.52l-.15.15-.14-.16-2-2-.14-.15.14-.13L76.45,0H70.39L60.2,10.17l-.13.14-.13-.14L49.77,0h-6.1L78.24,34.56l.12.14-.12.15L43.93,69.16H50c.13-.1,34.59-34.58,34.59-34.58L119.17,0h-6.09Z">
                            </path>
                            <polygon fill="#000"
                                points="159.4 8.65 149.58 8.65 138.53 31.31 127.47 8.65 117.65 8.65 134.2 41.55 134.2 61.18 142.83 61.17 142.83 41.55 159.4 8.65">
                            </polygon>
                            <path fill="#000"
                                d="M161,34.92a18,18,0,1,0,18-18,18,18,0,0,0-18,18M179,8.21A26.71,26.71,0,1,1,152.3,34.92,26.71,26.71,0,0,1,179,8.21">
                            </path>
                            <path fill="#000"
                                d="M244.92,34.89a18,18,0,1,0,18-18,18,18,0,0,0-18,18m18-26.7a26.72,26.72,0,1,1-26.74,26.7,26.75,26.75,0,0,1,26.74-26.7">
                            </path>
                            <polygon fill="#000"
                                points="244.73 8.21 233.25 8.21 217.11 30.57 217.11 8.21 207.97 8.21 207.97 60.74 217.11 60.74 217.11 39.09 232.49 60.74 243.97 60.74 224.43 34.99 244.73 8.21">
                            </polygon>
                            <polygon fill="#000"
                                points="320.13 8.62 320.13 30.93 301.28 30.93 301.28 8.62 291.91 8.62 291.91 61.17 301.28 61.17 301.28 39.94 320.13 39.94 320.13 61.17 329.47 61.17 329.47 8.66 320.13 8.62">
                            </polygon>
                            <path fill="#000"
                                d="M349,40.39l6.6-17.87,6.62,17.87Zm20.87,20.78h9.82L360.22,8.62h-9.34l-19.4,52.55h9.8l4.83-13.39H365Z">
                            </path>
                            <path fill="#000"
                                d="M455.83,40.39l6.61-17.89,6.62,17.89ZM476.7,61.17h9.83L467.14,8.62h-1l-8,0h-.4L438.35,61.17h9.85L453,47.76h18.88Z">
                            </path>
                            <polygon fill="#000"
                                points="432.97 8.62 426.08 8.62 424.1 8.66 408.62 48.91 393.13 8.62 391.13 8.66 384.28 8.62 381.58 8.66 381.58 61.17 390.97 61.17 391.13 26.83 404.23 61.17 404.64 61.17 412.56 61.17 412.97 61.17 426.09 26.83 426.25 61.17 435.66 61.17 435.66 8.62 432.97 8.62">
                            </polygon>
                            <path fill="#000"
                                d="M489.94,56.3a4.74,4.74,0,1,1,4.73,4.75,4.74,4.74,0,0,1-4.73-4.75m-.6,0A5.33,5.33,0,1,0,494.67,51a5.33,5.33,0,0,0-5.33,5.32">
                            </path>
                            <path fill="#000"
                                d="M493.32,55.94h1.44a1.65,1.65,0,0,0,.71-.12.84.84,0,0,0,.4-.37,1.14,1.14,0,0,0,.15-.56,1,1,0,0,0-.28-.75,1.14,1.14,0,0,0-.82-.26h-1.6Zm-.69,3.48V53.19h2.26a2.53,2.53,0,0,1,1.05.16,1.35,1.35,0,0,1,.55.58,2,2,0,0,1,.22,1,1.79,1.79,0,0,1-.36,1.14,1.69,1.69,0,0,1-1.07.56,1.45,1.45,0,0,1,.43.35,3.68,3.68,0,0,1,.54.79l.88,1.7h-.85l-.67-1.29a7,7,0,0,0-.6-1,1.07,1.07,0,0,0-.39-.36,1.25,1.25,0,0,0-.53-.1h-.77v2.78Z">
                            </path>
                        </svg>
                    </div>

                    <img src="../public/images/goodyear-logo-yellow.png" alt="Goodyear" class="h-12 object-contain" />
                    <img src="../public/images/BridgestoneMark-Black.png" alt="Bridgestone"
                        class="h-12 object-contain" />
                    <img src="../public/images/logo-pirelli2x.jpg" alt="Pirelli" class="h-12 object-contain" />
                </div>
            </div>

            <div class="bg-white rounded-lg p-8">
                <h2 class="text-2xl font-semibold text-center mb-8">Quick Tire Guide</h2>
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
useHead({
  title: 'Order Tires Online | Mobile Installation Service',
  meta: [
    { 
      name: 'description', 
      content: 'Order premium tires from trusted brands like Michelin, Goodyear, and Bridgestone. Schedule convenient mobile installation service that comes to your location.'
    },
    { name: 'keywords', content: 'order tires online, mobile tire installation, tire brands, tire replacement service' },
    { property: 'og:title', content: 'Order Tires Online | Mobile Installation Service' },
    { property: 'og:description', content: 'Mobile Tire Pro offers a wide selection of tires from trusted brands. Order your tires and schedule installation today!' },
    { property: 'og:type', content: 'website' }
  ]
})
</script>