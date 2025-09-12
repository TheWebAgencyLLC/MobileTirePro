<template>
  <div class="flex justify-center items-center min-h-screen bg-white p-4">
    <div class="flex rounded-2xl overflow-hidden shadow-xl max-w-[800px]">
      <!-- Left side image -->
      <div class="relative w-[350px] hidden md:block">
        <img src="/public/images/signupImage.png" alt="Mechanic" class="object-cover w-full h-full" />
        <div class="absolute inset-0 bg-red-400/40"></div>
      </div>

      <!-- Right side content -->
      <div class="w-full md:w-[400px] p-6 bg-white">
        <!-- Logo and progress indicator -->
        <div class="flex flex-col items-center mb-4">
          <img src="/public/images/raceWheel.png" alt="Racing logo" class="w-8 h-8 mb-3" />
          <div class="flex gap-2">
            <div class="w-10 h-1 rounded transition-all duration-300"
              :class="[currentStep >= 1 ? 'bg-red-500' : 'bg-gray-200']"></div>
            <div class="w-10 h-1 rounded transition-all duration-300"
              :class="[currentStep >= 2 ? 'bg-red-500' : 'bg-gray-200']"></div>
            <div class="w-10 h-1 rounded transition-all duration-300"
              :class="[currentStep === 3 ? 'bg-red-500' : 'bg-gray-200']"></div>
          </div>
        </div>

        <!-- Steps content -->
        <Transition name="fade" mode="out-in">
          <!-- Step 1: Create Account -->
          <div v-if="currentStep === 1" key="step1" class="space-y-4">
            <div class="text-center">
              <h1 class="text-xl font-semibold">Create an account</h1>
              <p class="text-gray-600 text-sm mt-1">Provide your email and choose a password.</p>
            </div>

            <form class="space-y-3">
              <div>
                <label class="block text-sm text-gray-600 mb-1">Name*</label>
                <input v-model="formData.name" type="text" placeholder="Enter your name"
                  class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-red-300 focus:ring-1 focus:ring-red-300 outline-none transition bg-white text-sm" />
              </div>

              <div>
                <label class="block text-sm text-gray-600 mb-1">Email*</label>
                <input v-model="formData.email" type="email" placeholder="Enter your email"
                  class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-red-300 focus:ring-1 focus:ring-red-300 outline-none transition bg-white text-sm" />
              </div>

              <div>
                <label class="block text-sm text-gray-600 mb-1">Password*</label>
                <input v-model="formData.password" type="password" placeholder="Choose a password"
                  class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-red-300 focus:ring-1 focus:ring-red-300 outline-none transition bg-white text-sm" />
              </div>

              <button @click.prevent="signUp"
                class="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors flex items-center justify-center text-sm">
                Continue
              </button>

              <div class="relative py-2">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center text-xs">
                  <span class="px-2 bg-white text-gray-500">OR</span>
                </div>
              </div>

              <GoogleSignInButton class="w-full" @success="handleLoginSuccess" />
            </form>
          </div>

          <!-- Step 2: Add Vehicle -->
          <div v-else-if="currentStep === 2" key="step2" class="space-y-4">
            <div class="text-center">
              <h1 class="text-xl font-semibold">Add Vehicle</h1>
              <p class="text-gray-600 text-sm mt-1">Enter your vehicle details to get started</p>
            </div>

            <form class="space-y-3">
              <div>
                <label class="block text-sm text-gray-600 mb-1">Year*</label>
                <select v-model="selectedYear"
                  class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-red-300 focus:ring-1 focus:ring-red-300 outline-none transition bg-white text-sm">
                  <option value="" disabled selected>Enter the vehicle's manufacturing year</option>
                  <option v-for="year in years" :value="year">{{ year }}</option>
                </select>
              </div>

              <div v-if="carData">
                <label class="block text-sm text-gray-600 mb-1">Make*</label>
                <select v-model="selectedMake"
                  class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-red-300 focus:ring-1 focus:ring-red-300 outline-none transition bg-white text-sm">
                  <option value="" disabled selected>Enter vehicle make</option>
                  <option :value="make" v-for="make in uniqueMakes">{{ make }}</option>
                </select>
              </div>

              <div v-if="carData && selectedMake">
                <label class="block text-sm text-gray-600 mb-1">Model*</label>
                <select v-model="selectedModel"
                  class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-red-300 focus:ring-1 focus:ring-red-300 outline-none transition bg-white text-sm">
                  <option value="" disabled selected>Enter vehicle model</option>
                  <option :value="model" v-for="model in filteredModels">{{ model }}</option>
                </select>
              </div>

              <button @click.prevent="addCar"
                class="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors flex items-center justify-center text-sm">
                Add Car
              </button>

              <div class="text-center">
                <a href="#" @click.prevent="skipAddingVehicle" class="text-xs text-red-500 hover:underline">
                  Or skip adding a vehicle for now and return to it later in your profile settings ->
                </a>
              </div>
            </form>
          </div>

          <!-- Step 3: Success -->
          <div v-else-if="currentStep === 3" key="step3" class="space-y-4">
            <div class="text-center">
              <h1 class="text-xl font-semibold">Welcome aboard!</h1>
              <p class="text-gray-600 text-sm mt-1">Here's what you've completed:</p>
            </div>

            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-sm line-through text-gray-500">Your Details</span>
              </div>

              <div class="flex items-center gap-3">
                <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-sm line-through text-gray-500">Enter your vehicle</span>
              </div>

              <div class="flex items-center gap-3">
                <div class="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <span class="text-sm text-gray-500">3</span>
                </div>
                <span class="text-sm text-gray-700">Explore your profile and our services</span>
              </div>
            </div>

            <div v-if="currentStep === 3" class="w-full">
              <div @click="login"
                class="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors flex items-center justify-center text-sm mt-4">
                Continue
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { reloadNuxtApp } from "nuxt/app";
const currentStep = ref(1)
const formData = ref({
  name: '',
  email: '',
  password: '',
})

const error = ref(null)

const nextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++
  }
}

// Method to skip adding vehicle
const skipAddingVehicle = () => {
  currentStep.value = 3; // Directly go to step 3
};

/* Logic to add populate car dropdowns */

/* Range of years that MTP allows */

const startYear = 1992 // start
const endYear = 2026 // Finish
const years = Array.from({ length: endYear - startYear + 1 }, (v, i) => startYear + i) //Array to hold that

/* State variables to hold everything car related */
const carData = ref('') // JSON with car information
const selectedYear = ref('') // Year
const selectedMake = ref('') // Make
const selectedModel = ref('') // Model

/**
 * This watches the reactivity of the selected year, that way whenever we select one year, it fetches the right Json with the cardata
 */

watch(selectedYear, async (newYear, oldYear) => {
  // console.log('lol')
  if (newYear) {
    const data = await $fetch(`/cars/${newYear}.json`)
    carData.value = data;
  }
})

watch(selectedMake, async (newMake) => {
  // console.log(newMake)
})

/**
 * A computed property that returns a list of unique car makes.
 *
 * This variable extracts the 'make' property from each car object in the
 * carData array, eliminates any duplicate makes, and provides a list of
 * unique car makes.
 *
 * @type {ComputedRef<string[]>}
 */

const uniqueMakes = computed(() => {
  const makes = carData.value.map(car => car.make)
  return [...new Set(makes)]
})

/**
 * A computed property that filters car models based on the selected make.
 *
 * This variable leverages a reactive approach to dynamically filter and return
 * an array of car models. When the selected make is not specified, it returns
 * an empty array. Otherwise, it filters the car data based on the make and
 * returns an array of corresponding car models.
 *
 * Dependencies:
 * - selectedMake: The make selected by the user.
 * - carData: The list of car data objects containing 'make' and 'model' fields.
 *
 * @type {Array<String>}
 */

const filteredModels = computed(() => {
  if (!selectedMake.value) return []
  return carData.value
    .filter(car => car.make === selectedMake.value)
    .map(car => car.model)
})

async function addCar() {
  try {
    const car = await $fetch('/api/car/add', {
      method: 'POST',
      body:
      {
        make: selectedMake.value,
        model: selectedModel.value,
        year: selectedYear.value,
        userEmail: formData.value.email,
        tires: [{ name: 'FL', pressure: 0, size: 'N/A', type: 'Normal' },
        { name: 'FR', pressure: 0, size: 'N/A', type: 'Normal' },
        { name: 'BL', pressure: 0, size: 'N/A', type: 'Normal' }, {
          name: 'BR',
          pressure: 0,
          size: 'N/A',
          type: 'Normal'
        },]
      }
    })
    if (car === 'OK') {
      nextStep();
    }


  } catch (e) {
    console.error(e.message)
  }
}

/**
 * Asynchronously signs up a user by sending their form data to the server.
 * Handles the response to determine if registration is successful and proceeds to the next step if so.
 * Logs any errors encountered during the process.
 *
 * @return {Promise<void>} A promise that resolves when the signup process is complete.
 */
async function signUp() {
  try {
    const user = await $fetch('/api/auth/signup', {
      method: 'POST',
      body:
        formData.value

    })
    if (user?.registered) {
      nextStep();

    }
  } catch (e) {
    console.error(e.message)
  }
}

/**
 * Attempts to log in using the provided email and password.
 * If successful, redirects the user to the home page.
 * Logs any errors encountered during the login process.
 *
 * @return {Promise<void>} A promise that resolves when the login operation is complete.
 */
async function login() {
  try {
    const user = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: formData.value.email,
        password: formData.value.password
      }
    })
    if (user?.loggedIn) {
      window.location.href = '/'
    }
  } catch (e) {
    console.error(e.message)
  }
}


</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>