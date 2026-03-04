<!-- pages/bookings.vue -->
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import moment from 'moment-timezone'

const ZIP_CODES = [
  { name: "Algonquin", price: 50, zip: ["60013", "60102", "60118", "60142", "60156"] },
  { name: "Antioch", price: 75, zip: ["60002"] },
  { name: "Barrington", price: 75, zip: ["60010", "60011"] },
  { name: "Carpentersville", price: 75, zip: ["60102", "60110", "60118"] },
  { name: "Cary", price: 50, zip: ["60013"] },
  { name: "Crystal Lake", price: 50, zip: ["60012", "60014", "60039"] },
  { name: "Grayslake", price: 50, zip: ["60030"] },
  { name: "Gurnee", price: 75, zip: ["60031"] },
  { name: "Huntley", price: 50, zip: ["60142"] },
  { name: "Hawthorne Woods", price: 75, zip: ["60047", "60060"] },
  { name: "Island Lake", price: 50, zip: ["60042", "60051", "60084"] },
  { name: "Johnsburg", price: 50, zip: ["60050", "60051"] },
  { name: "Lake in the Hills", price: 50, zip: ["60102", "60156"] },
  { name: "Lake Villa", price: 75, zip: ["60046"] },
  { name: "Lake Zurich", price: 75, zip: ["60047", "60049"] },
  { name: "Lakemoor", price: 50, zip: ["60041", "60050", "60051", "60073"] },
  { name: "McHenry", price: 50, zip: ["60050", "60051"] },
  { name: "Richmond", price: 50, zip: ["60071"] },
  { name: "Ringwood", price: 50, zip: ["60072"] },
  { name: "Round Lake", price: 50, zip: ["60073"] },
  { name: "Spring grove", price: 50, zip: ["60081"] },
  { name: "Volo", price: 50, zip: ["60020", "60041", "60051", "60073"] },
  { name: "Wauconda", price: 50, zip: ["60084"] },
  { name: "Wonder Lake", price: 50, zip: ["60097"] },
  { name: "Woodstock", price: 50, zip: ["60098"] }
]

// Step management
const currentStep = ref(1)
const STEPS = ['Service', 'Schedule', 'Details', 'Pay']

// Service selection (from ServiceGrid)
const selectedServiceDetails = ref<any>(null)

// Scheduling
const appointmentDate = ref<string | null>(null)

// Contact form
const guestName = ref('')
const guestEmail = ref('')
const phone = ref('')
const address = ref({ street: '', city: '', zipcode: '' })
const zipError = ref(false)
const serviceFee = ref<number | null>(null)

// Vehicle
const vehicleYear = ref('')
const vehicleMake = ref('')
const vehicleModel = ref('')
const selectedCar = ref<any>('')

// Auth
const isLoggedIn = ref(false)
const carData = ref<any[]>([])

// Confirmation
const showConfirmation = ref(false)

const $gtm = useGTM()
const route = useRoute()

// Auth check
const { data: authData } = await useLazyFetch('/api/auth/test', {
  server: false,
  onResponse({ response }) {
    isLoggedIn.value = !!response._data.token
  }
})

// Fetch cars once logged-in status is confirmed
watch(isLoggedIn, async (loggedIn) => {
  if (loggedIn) {
    const data = await $fetch<any[]>('/api/car/list')
    carData.value = data
    if (data.length > 0) selectedCar.value = data[0]
  }
})

// Zip validation
watch(() => address.value.zipcode, (zip) => {
  zipError.value = false
  serviceFee.value = null
  if (zip.length === 5) {
    const city = ZIP_CODES.find(c => c.zip.includes(zip))
    if (city) {
      serviceFee.value = city.price
    } else {
      zipError.value = true
    }
  }
})

// Total price
const totalPrice = computed(() => {
  return (selectedServiceDetails.value?.price || 0) + (serviceFee.value || 0)
})

// Step 3 form validity
const isStep3Valid = computed(() => {
  const addressValid = address.value.street && address.value.city && address.value.zipcode && serviceFee.value && !zipError.value
  const phoneValid = !!phone.value

  if (isLoggedIn.value && carData.value.length > 0) {
    return addressValid && phoneValid && selectedCar.value
  }
  if (isLoggedIn.value) {
    // Logged in but no saved cars — use text inputs
    return addressValid && phoneValid && vehicleYear.value && vehicleMake.value && vehicleModel.value
  }
  // Guest
  return addressValid && phoneValid && guestName.value && guestEmail.value && vehicleYear.value && vehicleMake.value && vehicleModel.value
})

// Handlers
const handleServiceSelected = (details: any) => {
  selectedServiceDetails.value = details
  $gtm.trackEvent({ event: 'serviceSelection', servicesLink: details.service })
  currentStep.value = 2
}

const handleDateSelected = (bookingDetails: any) => {
  appointmentDate.value = bookingDetails.appointmentDate
  currentStep.value = 3
}

const handleSubmitBooking = async () => {
  try {
    const vehicleInfoStr = (isLoggedIn.value && selectedCar.value && carData.value.length > 0)
      ? `${selectedCar.value.year} ${selectedCar.value.make} ${selectedCar.value.model}`
      : `${vehicleYear.value} ${vehicleMake.value} ${vehicleModel.value}`

    const response = await $fetch('/api/apts/create', {
      method: 'POST',
      body: {
        appointmentDate: appointmentDate.value,
        carId: (isLoggedIn.value && selectedCar.value?._id) ? selectedCar.value._id : undefined,
        service: selectedServiceDetails.value.service.name,
        address: `${address.value.street} ${address.value.city} IL ${address.value.zipcode}`,
        phone: phone.value,
        rimSize: selectedServiceDetails.value.rimSize,
        tireCount: selectedServiceDetails.value.tireCount,
        guestName: isLoggedIn.value ? undefined : guestName.value,
        guestEmail: isLoggedIn.value ? undefined : guestEmail.value,
        vehicleInfo: vehicleInfoStr,
      }
    })

    if (response === 'OK') {
      showConfirmation.value = true
    }
  } catch (error) {
    console.error('Error creating appointment:', error)
  }
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-8">

    <!-- Step Progress Indicator -->
    <div v-if="!showConfirmation" class="flex items-center justify-center mb-10">
      <template v-for="(label, i) in STEPS" :key="i">
        <div class="flex flex-col items-center">
          <div class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors"
               :class="currentStep > i + 1
                 ? 'bg-vivid-red text-white'
                 : currentStep === i + 1
                   ? 'bg-vivid-red text-white ring-2 ring-vivid-red ring-offset-2'
                   : 'bg-gray-200 dark:bg-gray-700 text-gray-500'">
            <span v-if="currentStep > i + 1">✓</span>
            <span v-else>{{ i + 1 }}</span>
          </div>
          <span class="text-xs mt-1.5 dark:text-gray-400 hidden sm:block">{{ label }}</span>
        </div>
        <div v-if="i < STEPS.length - 1" class="w-12 h-0.5 mb-4 mx-1 transition-colors"
             :class="currentStep > i + 1 ? 'bg-vivid-red' : 'bg-gray-200 dark:bg-gray-600'"></div>
      </template>
    </div>

    <!-- ───────────────────────────── STEP 1: Pick Service ───────────────────────────── -->
    <div v-if="currentStep === 1 && !showConfirmation">
      <div class="mb-6">
        <h1 class="text-2xl font-bold dark:text-white">Schedule Your Service</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">Select a service to get started</p>
      </div>
      <BookingServiceGrid @service-selected="handleServiceSelected" />
    </div>

    <!-- ───────────────────────────── STEP 2: Pick Date & Time ───────────────────────────── -->
    <div v-if="currentStep === 2 && !showConfirmation">
      <div class="flex items-center gap-4 mb-6">
        <button @click="currentStep = 1" class="text-vivid-red hover:text-red-700 flex items-center gap-1 text-sm">
          ← Back
        </button>
        <div>
          <h2 class="text-2xl font-bold dark:text-white">Pick a Date & Time</h2>
          <p class="text-gray-600 dark:text-gray-400 mt-1">
            {{ selectedServiceDetails?.service?.name }}
          </p>
        </div>
      </div>
      <BookingCalendar
        :selected-service="selectedServiceDetails"
        @proceed-to-booking="handleDateSelected"
      />
    </div>

    <!-- ───────────────────────────── STEP 3: Your Details ───────────────────────────── -->
    <div v-if="currentStep === 3 && !showConfirmation">
      <div class="flex items-center gap-4 mb-6">
        <button @click="currentStep = 2" class="text-vivid-red hover:text-red-700 flex items-center gap-1 text-sm">
          ← Back
        </button>
        <h2 class="text-2xl font-bold dark:text-white">Your Details</h2>
      </div>

      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm space-y-5">

        <!-- Guest-only fields: Name & Email -->
        <template v-if="!isLoggedIn">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1">Full Name</label>
              <input v-model="guestName" type="text" placeholder="Jane Smith"
                     class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            </div>
            <div>
              <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1">Email</label>
              <input v-model="guestEmail" type="email" placeholder="jane@example.com"
                     class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            </div>
          </div>
        </template>

        <!-- Phone -->
        <div>
          <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1">Phone</label>
          <input v-model="phone" type="tel" placeholder="(555) 555-5555"
                 class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        </div>

        <!-- Service Address -->
        <div class="space-y-3">
          <h3 class="text-gray-700 dark:text-gray-300 text-sm font-bold">Service Address</h3>
          <input v-model="address.street" type="text" placeholder="Street address"
                 class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <div class="grid grid-cols-2 gap-3">
            <input v-model="address.city" type="text" placeholder="City"
                   class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <div>
              <input v-model="address.zipcode" type="text" maxlength="5" placeholder="Zip code"
                     class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                     :class="zipError ? 'border-vivid-red' : ''">
              <p v-if="zipError" class="text-vivid-red text-xs mt-1 italic">
                Sorry, we don't serve this zip code yet.
              </p>
              <p v-if="serviceFee !== null && !zipError" class="text-green-600 dark:text-green-400 text-xs mt-1">
                Service fee: ${{ serviceFee }}
              </p>
            </div>
          </div>
        </div>

        <!-- Vehicle -->
        <div>
          <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1">Vehicle</label>

          <!-- Logged-in with saved cars -->
          <select v-if="isLoggedIn && carData.length > 0" v-model="selectedCar"
                  class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="" disabled>Select a vehicle</option>
            <option v-for="car in carData" :key="car._id" :value="car">
              {{ car.year }} {{ car.make }} {{ car.model }}
            </option>
          </select>

          <!-- Guest or logged-in without saved cars -->
          <div v-else class="grid grid-cols-3 gap-2">
            <input v-model="vehicleYear" type="text" placeholder="Year"
                   class="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <input v-model="vehicleMake" type="text" placeholder="Make"
                   class="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <input v-model="vehicleModel" type="text" placeholder="Model"
                   class="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          </div>
        </div>

        <!-- Price Summary -->
        <div v-if="serviceFee !== null" class="border-t dark:border-gray-700 pt-4">
          <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>{{ selectedServiceDetails?.service?.name }}</span>
            <span>${{ selectedServiceDetails?.price }}</span>
          </div>
          <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
            <span>Service fee</span>
            <span>${{ serviceFee }}</span>
          </div>
          <div class="flex justify-between font-bold dark:text-white mt-2 text-lg">
            <span>Total</span>
            <span class="text-vivid-red">${{ totalPrice }}</span>
          </div>
        </div>

        <!-- Continue to Payment -->
        <div class="flex justify-end">
          <button @click="currentStep = 4"
                  :disabled="!isStep3Valid"
                  class="px-6 py-3 bg-vivid-red text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium">
            Continue to Payment
          </button>
        </div>
      </div>
    </div>

    <!-- ───────────────────────────── STEP 4: Pay ───────────────────────────── -->
    <div v-if="currentStep === 4 && !showConfirmation">
      <div class="flex items-center gap-4 mb-6">
        <button @click="currentStep = 3" class="text-vivid-red hover:text-red-700 flex items-center gap-1 text-sm">
          ← Back
        </button>
        <h2 class="text-2xl font-bold dark:text-white">Payment</h2>
      </div>

      <!-- Summary recap -->
      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-6 space-y-2 text-sm text-gray-600 dark:text-gray-400">
        <div class="flex justify-between">
          <span>Service</span>
          <span class="font-medium dark:text-white">{{ selectedServiceDetails?.service?.name }}</span>
        </div>
        <div v-if="selectedServiceDetails?.rimSize" class="flex justify-between">
          <span>Rim Size</span>
          <span class="font-medium dark:text-white">{{ selectedServiceDetails.rimSize }}"</span>
        </div>
        <div v-if="selectedServiceDetails?.tireCount" class="flex justify-between">
          <span>Tires</span>
          <span class="font-medium dark:text-white">{{ selectedServiceDetails.tireCount }}</span>
        </div>
        <div class="flex justify-between">
          <span>Appointment</span>
          <span class="font-medium dark:text-white">{{ moment(appointmentDate).format('h:mm A, MMM D') }}</span>
        </div>
        <div class="flex justify-between">
          <span>Address</span>
          <span class="font-medium dark:text-white text-right">{{ address.street }}, {{ address.city }} IL {{ address.zipcode }}</span>
        </div>
        <div class="border-t dark:border-gray-700 pt-2 flex justify-between font-bold text-base dark:text-white">
          <span>Total</span>
          <span class="text-vivid-red">${{ totalPrice }}</span>
        </div>
      </div>

      <SquarePayment :price="totalPrice" @payment="handleSubmitBooking" />
    </div>

    <!-- ───────────────────────────── CONFIRMATION ───────────────────────────── -->
    <div v-if="showConfirmation" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4 text-center">
        <h2 class="text-2xl font-bold mb-4 dark:text-white">Appointment Booked!</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Your appointment has been successfully scheduled.
          <span v-if="!isLoggedIn"> A confirmation has been sent to {{ guestEmail }}.</span>
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Please be advised that our service is weather based. We cannot work in
          heavy rain, heavy snow fall, or in temperatures under 20 degrees.
        </p>
        <NuxtLink to="/">
          <button class="bg-vivid-red text-white px-6 py-3 rounded hover:bg-red-700">
            Return Home
          </button>
        </NuxtLink>
      </div>
    </div>

  </div>
</template>

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
