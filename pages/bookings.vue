<!-- pages/bookings.vue -->
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import moment from 'moment-timezone'
import { SHOP_SUPPLIES_LABEL, SERVICE_PRICING, getServiceFeeForZip } from '~/config/service-pricing'
import { SITE } from '~/config/site'

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
const isSubmitting = ref(false)
const bookingError = ref<string | null>(null)
const paymentRef = ref<any>(null)
const idempotencyKey = ref('')

const $gtm = useGTM()

const requiresQuote = computed(() => selectedServiceDetails.value?.requiresQuote === true)

const activeSteps = computed(() =>
  requiresQuote.value ? ['Service', 'Schedule', 'Details'] : STEPS
)

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
    const fee = getServiceFeeForZip(zip)
    if (fee !== null) {
      serviceFee.value = fee
    } else {
      zipError.value = true
    }
  }
})

// Total price — mirrors server/utils/pricing.ts, which is the authority.
const storageFee = computed(() =>
  selectedServiceDetails.value?.includeStorage ? SERVICE_PRICING.seasonalStorageFee : 0
)

const totalPrice = computed(() => {
  const total = (selectedServiceDetails.value?.price || 0)
    + (serviceFee.value || 0)
    + (selectedServiceDetails.value?.shopSuppliesFee || 0)
    + (selectedServiceDetails.value?.tireDisposalFee || 0)
    + storageFee.value
  return Math.round(total * 100) / 100
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
  bookingError.value = null
  $gtm.trackBookingStep('schedule', {
    service: selectedServiceDetails.value?.service?.name,
    appointmentDate: bookingDetails.appointmentDate,
  })
  currentStep.value = 3
}

const newIdempotencyKey = () =>
  (typeof crypto !== 'undefined' && crypto.randomUUID)
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`

const goToPayment = () => {
  bookingError.value = null
  // One key per payment attempt, so a retried network error can't double-charge.
  idempotencyKey.value = newIdempotencyKey()
  $gtm.trackBookingStep('details', {
    service: selectedServiceDetails.value?.service?.name,
    totalPrice: totalPrice.value,
  })
  currentStep.value = 4
}

// Receives { token, method } from SquarePayment, or a click event on the quote-only path.
const handleSubmitBooking = async (paymentPayload?: any) => {
  const payment = (paymentPayload && typeof paymentPayload.token === 'string') ? paymentPayload : null

  if (isSubmitting.value) return
  isSubmitting.value = true
  bookingError.value = null

  try {
    const vehicleInfoStr = (isLoggedIn.value && selectedCar.value && carData.value.length > 0)
      ? `${selectedCar.value.year} ${selectedCar.value.make} ${selectedCar.value.model}`
      : `${vehicleYear.value} ${vehicleMake.value} ${vehicleModel.value}`

    // Prices are deliberately absent: the server recomputes them from these inputs.
    const response: any = await $fetch('/api/apts/create', {
      method: 'POST',
      body: {
        appointmentDate: appointmentDate.value,
        carId: (isLoggedIn.value && selectedCar.value?._id) ? selectedCar.value._id : undefined,
        service: selectedServiceDetails.value.service.name,
        address: `${address.value.street} ${address.value.city} IL ${address.value.zipcode}`,
        zip: address.value.zipcode,
        phone: phone.value,
        rimSize: selectedServiceDetails.value.rimSize,
        tireCount: selectedServiceDetails.value.tireCount,
        changeoverType: selectedServiceDetails.value.changeoverType,
        includeStorage: selectedServiceDetails.value.includeStorage,
        guestName: isLoggedIn.value ? undefined : guestName.value,
        guestEmail: isLoggedIn.value ? undefined : guestEmail.value,
        vehicleInfo: vehicleInfoStr,
        sourceId: payment?.token,
        idempotencyKey: idempotencyKey.value,
      }
    })

    if (response?.ok) {
      if (payment) {
        $gtm.trackPaymentSuccess({
          amount: response.quote?.totalPrice ?? totalPrice.value,
          method: payment.method,
        })
      }
      $gtm.trackBookingComplete({
        service: selectedServiceDetails.value?.service?.name,
        totalPrice: response.quote?.totalPrice ?? totalPrice.value,
        rimSize: selectedServiceDetails.value?.rimSize,
        tireCount: selectedServiceDetails.value?.tireCount,
      })
      showConfirmation.value = true
    }
  } catch (error: any) {
    console.error('Error creating appointment:', error)
    const status = error?.statusCode ?? error?.status ?? error?.response?.status
    const serverMessage = error?.data?.statusMessage

    if (status === 409) {
      bookingError.value = 'That time slot was just booked by someone else. Please choose another time — your card has not been charged.'
      appointmentDate.value = null
      currentStep.value = 2
    } else if (status === 402) {
      bookingError.value = serverMessage || 'Your card was declined. Please check your details or try another payment method.'
    } else if (status === 400) {
      bookingError.value = serverMessage || 'Some of your booking details are invalid. Please review them and try again.'
    } else {
      bookingError.value = `Something went wrong while completing your booking. If your card was charged you will not be charged twice — please call us at ${SITE.phone} to confirm your appointment.`
    }

    // A fresh key so the next attempt is a genuinely new charge.
    idempotencyKey.value = newIdempotencyKey()
    paymentRef.value?.resetProcessing?.()
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-8">

    <!-- Step Progress Indicator -->
    <div v-if="!showConfirmation" class="flex items-center justify-center mb-10">
      <template v-for="(label, i) in activeSteps" :key="label">
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
        <div v-if="i < activeSteps.length - 1" class="w-12 h-0.5 mb-4 mx-1 transition-colors"
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
      <div v-if="bookingError"
           class="mb-6 p-4 rounded-lg border border-vivid-red bg-red-50 dark:bg-red-900/20 text-vivid-red text-sm">
        {{ bookingError }}
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
        <div v-if="requiresQuote" class="border-t dark:border-gray-700 pt-4">
          <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Oil change pricing varies by vehicle. We may reach out for additional details about your car
            to provide an accurate quote before your appointment. No payment is collected online for this service.
          </p>
        </div>
        <div v-else-if="serviceFee !== null" class="border-t dark:border-gray-700 pt-4">
          <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>{{ selectedServiceDetails?.service?.name }}</span>
            <span>${{ selectedServiceDetails?.price }}</span>
          </div>
          <div v-if="selectedServiceDetails?.shopSuppliesFee" class="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
            <span>{{ SHOP_SUPPLIES_LABEL }}</span>
            <span>${{ selectedServiceDetails.shopSuppliesFee.toFixed(2) }}</span>
          </div>
          <div v-if="selectedServiceDetails?.tireDisposalFee" class="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
            <span>Tire disposal</span>
            <span>${{ selectedServiceDetails.tireDisposalFee.toFixed(2) }}</span>
          </div>
          <div v-if="storageFee" class="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
            <span>Seasonal storage</span>
            <span>${{ storageFee.toFixed(2) }}</span>
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

        <!-- Continue -->
        <div class="flex justify-end">
          <button v-if="requiresQuote"
                  @click="handleSubmitBooking"
                  :disabled="!isStep3Valid || isSubmitting"
                  class="px-6 py-3 bg-vivid-red text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium">
            {{ isSubmitting ? 'Booking...' : 'Book Appointment' }}
          </button>
          <button v-else @click="goToPayment"
                  :disabled="!isStep3Valid"
                  class="px-6 py-3 bg-vivid-red text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium">
            Continue to Payment
          </button>
        </div>
      </div>
    </div>

    <!-- ───────────────────────────── STEP 4: Pay ───────────────────────────── -->
    <div v-if="currentStep === 4 && !showConfirmation && !requiresQuote">
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
        <div v-if="selectedServiceDetails?.shopSuppliesFee" class="flex justify-between">
          <span>{{ SHOP_SUPPLIES_LABEL }}</span>
          <span class="font-medium dark:text-white">${{ selectedServiceDetails.shopSuppliesFee.toFixed(2) }}</span>
        </div>
        <div v-if="selectedServiceDetails?.tireDisposalFee" class="flex justify-between">
          <span>Tire disposal</span>
          <span class="font-medium dark:text-white">${{ selectedServiceDetails.tireDisposalFee.toFixed(2) }}</span>
        </div>
        <div v-if="storageFee" class="flex justify-between">
          <span>Seasonal storage</span>
          <span class="font-medium dark:text-white">${{ storageFee.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between">
          <span>Service fee</span>
          <span class="font-medium dark:text-white">${{ serviceFee }}</span>
        </div>
        <div class="border-t dark:border-gray-700 pt-2 flex justify-between font-bold text-base dark:text-white">
          <span>Total</span>
          <span class="text-vivid-red">${{ totalPrice }}</span>
        </div>
      </div>

      <div v-if="bookingError"
           class="mb-6 p-4 rounded-lg border border-vivid-red bg-red-50 dark:bg-red-900/20 text-vivid-red text-sm">
        {{ bookingError }}
      </div>

      <SquarePayment ref="paymentRef" :price="totalPrice" @payment="handleSubmitBooking" />
    </div>

    <!-- ───────────────────────────── CONFIRMATION ───────────────────────────── -->
    <div v-if="showConfirmation" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4 text-center">
        <h2 class="text-2xl font-bold mb-4 dark:text-white">Appointment Booked!</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Your appointment has been successfully scheduled.
          <span v-if="!isLoggedIn"> A confirmation has been sent to {{ guestEmail }}.</span>
        </p>
        <p v-if="requiresQuote" class="text-sm text-gray-500 dark:text-gray-400 mb-4">
          We'll contact you if we need any additional vehicle details to provide an accurate oil change quote before your visit.
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
