<template>
  <div v-if="props.selectedService" class="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all">

    <!-- Installation, Repair, or Single-Tire Services -->
    <div v-if="selectedService.tireCount > 1 && selectedService.name !== 'Seasonal Changeover'" class="space-y-6">
      <div class="flex items-center justify-between">
        <h3 class="text-xl font-semibold dark:text-white">
          {{ selectedService.name }}
        </h3>
        <div class="text-vivid-red font-bold">
          {{calculatedPrice == 150 ? `Starting at  $${selectedService.Price}`: `$${calculatedPrice}` }}
        </div>
      </div>


      <!-- Rim Size Selection -->
      <div class="space-y-2">
        <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold">
          Rim Size
          <button @mouseenter="showRimTip = true" @mouseleave="showRimTip = false"
                  class="ml-2 text-blue-500 hover:text-blue-600 text-sm">
            (?)
          </button>
        </label>
        <div v-if="showRimTip"
             class="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 p-3 rounded-md mb-2">
          Find your tire size on the driver's door placard or tire sidewall (e.g., 205/55/R16)
        </div>
        <select v-model.number="rimSize"
                class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <option value="" disabled>Select rim size</option>
          <option v-for="size in rimSizes" :key="size" :value="size">
            {{ size }} inches
          </option>
        </select>
      </div>

      <!-- Tire Count Selection (for Installation) -->
      <div v-if="props.selectedService === 'installation' || 'repair'" class="space-y-2">
        <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold">
          Number of Tires
        </label>
        <select v-model.number="tireCount"
                class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <option value="" disabled>Select number of tires</option>
          <option v-for="count in [1, 2, 3, 4]" :key="count" :value="count">
            {{ count }} {{ count === 1 ? 'Tire' : 'Tires' }}
          </option>
        </select>
      </div>
    </div>
    <div v-if="selectedService.tireCount == 1 || !selectedService.tireCount" class="space-y-4">
      <div class="flex justify-between items-center">
        <h3 class="text-xl font-semibold dark:text-white">{{selectedService.name}} Service</h3>

      </div>
      <p class="text-gray-600 dark:text-gray-400">
        {{ selectedService.description }}
      </p>
      <button @click="proceedToScheduling"
              class="w-full bg-vivid-red text-white py-3 rounded-lg hover:bg-red-700 transition-colors">
        Continue to Scheduling
      </button>
    </div>

    <!-- Seasonal Changeover Options -->
    <div v-if="selectedService.name === 'Seasonal Changeover' " class="space-y-6">
      <h3 class="text-xl font-semibold dark:text-white">Select Changeover Type</h3>

      <div class="space-y-4">
        <div @click="selectChangeoverType('assembly')"
             class="border p-4 rounded-lg cursor-pointer transition-all"
             :class="changeoverType === 'assembly' ? 'border-vivid-red' : 'border-gray-200'">
          <div class="flex justify-between items-start">
            <div>
              <h4 class="font-semibold dark:text-white">Wheels/Tire Assemblies</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">Complete wheel and tire sets</p>
            </div>
            <span class="text-vivid-red font-bold">${{calculatedPrice || '125'}}</span>
          </div>
          <div class="mt-2 text-sm text-gray-500">
            • Complete assembly swap
          </div>
        </div>

        <div @click="selectChangeoverType('tires')" class="border p-4 rounded-lg cursor-pointer transition-all"
             :class="changeoverType === 'tires' ? 'border-vivid-red' : 'border-gray-200'">
          <div class="flex justify-between items-start">
            <div>
              <h4 class="font-semibold dark:text-white">Tires Only</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">Tire swap on existing wheels</p>
            </div>
            <span class="text-vivid-red font-bold">From $150</span>
          </div>
          <div class="mt-2 text-sm text-gray-500">
            • $25-30 per tire
            • Plus mobile service charge
          </div>
        </div>
      </div>

      <!-- Storage Add-on Option -->
      <div v-if="changeoverType" class="mt-6 border-t pt-6">
        <div class="flex items-center justify-between">
          <div>
            <h4 class="font-semibold dark:text-white">Add Seasonal Storage</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">Store your tires until next season</p>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-vivid-red font-bold">+$25</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="includeStorage" class="sr-only peer">
              <div
                  class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-vivid-red/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vivid-red">
              </div>
            </label>
          </div>
        </div>
      </div>

      <div v-if="changeoverType === 'tires'" class="mt-4 space-y-4">
        <!-- Rim Size Selection -->
        <div class="space-y-2">
          <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold">
            Rim Size
            <button @mouseenter="showRimTip = true" @mouseleave="showRimTip = false"
                    class="ml-2 text-blue-500 hover:text-blue-600 text-sm">
              (?)
            </button>
          </label>
          <div v-if="showRimTip"
               class="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 p-3 rounded-md mb-2">
            Find your tire size on the driver's door placard or tire sidewall (e.g., 205/55/R16)
          </div>
          <select v-model="rimSize"
                  class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="" disabled>Select rim size</option>
            <option v-for="size in rimSizes" :key="size" :value="size">
              {{ size }} inches
            </option>
          </select>

        </div>

        <!-- Tire Count Selection -->
        <div class="space-y-2">
          <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold">
            Number of Tires
          </label>
          <select v-model="tireCount"
                  class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="" disabled>Select number of tires</option>
            <option v-for="count in [1, 2, 3, 4]" :key="count" :value="count">
              {{ count }} {{ count === 1 ? 'Tire' : 'Tires' }}
            </option>
          </select>
          <button @click="proceedToScheduling"
                  class="w-full bg-vivid-red text-white py-3 rounded-lg hover:bg-red-700 transition-colors">
            Continue to Scheduling
          </button>
        </div>
      </div>
    </div>

    <!-- Direct to Schedule (Rotation & Balance) -->
    <div v-if="props.selectedService === 'rotation'" class="space-y-4">
      <div class="flex justify-between items-center">
        <h3 class="text-xl font-semibold dark:text-white">Rotation & Balance Service</h3>
        <span class="text-vivid-red font-bold">$50</span>
      </div>
      <p class="text-gray-600 dark:text-gray-400">
        Includes complete rotation and balancing service with mobile fee
      </p>
      <button @click="proceedToScheduling"
              class="w-full bg-vivid-red text-white py-3 rounded-lg hover:bg-red-700 transition-colors">
        Continue to Scheduling
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, watch} from 'vue'
import type {Service} from "~/types"; // Added watch import

const props = defineProps<{
  selectedService: Service
  serviceFee: number
}>()

const selectedService = props.selectedService as Service
const SERVICE_FEE = props.serviceFee

console.log(SERVICE_FEE)

const calculatedPrice = computed<number>(() => {
  // If neither rimSize nor tireCount has been selected, return the default price
  if (!rimSize.value && !tireCount.value && !changeoverType.value) {
    return selectedService.Price + SERVICE_FEE ;
  }

  // For "assembly" changeover, return fixed price plus optional storage
  if(changeoverType.value === 'assembly'){
    return 125 + (includeStorage.value ? 25 : 0) + SERVICE_FEE;
  }

  // For services that are not "tires" changeover, calculate price based on tire count and rim size
  if (changeoverType.value !== 'tires') {
    return ((rimSize.value <= 18 ? 25 : 30) * tireCount.value) + SERVICE_FEE;
  }

  // For "tires" changeover, add a base price and include the cost per tire,
  // plus an extra storage fee if includeStorage is true.
  if (rimSize.value && tireCount.value && changeoverType.value === 'tires') {
    return ((rimSize.value <= 18 ? 25 : 30) * tireCount.value) + (includeStorage.value ? 25 : 0) + SERVICE_FEE;
  }



  // Fallback: return the default service price if none of the above conditions match
  return selectedService.Price;
});




const emit = defineEmits(['ready-for-scheduling', 'next'])

// State
const rimSize = ref<number | null>(null)
const tireCount = ref<number>(0)
const showRimTip = ref(false)
const changeoverType = ref<'tires' | 'assembly' | ''>('')
const includeStorage = ref(false)

watch(tireCount, (newTire, oldTire) => {
  if(tireCount.value && rimSize.value) {
    proceedToScheduling()
  }
})

// Constants
const rimSizes = Array.from({length: 11}, (_, i) => i + 12) // 12 to 22 inches

// Computed
const needsRimSelection = computed(() => {
  return ['installation', 'repair'].includes(props.selectedService)
  // Remove the changeover condition from here since we handle it separately
})

const serviceTitle = computed(() => {
  switch (props.selectedService) {
    case 'installation':
      return 'Tire Installation'
    case 'repair':
      return 'Tire Repair'
    case 'rotation':
      return 'Rotation & Balance'
    case 'changeover':
      return 'Seasonal Changeover'
    default:
      return ''
  }
})

const getServicePrice = computed(() => {
  if (props.selectedService === 'repair') return 25
  if (props.selectedService === 'rotation') return 50
  if (props.selectedService === 'changeover') {
    if (changeoverType.value === 'assembly') {
      const basePrice = 125
      return includeStorage.value ? basePrice + 25 : basePrice
    } else if (changeoverType.value === 'tires') {
      // If both rim size and tire count are selected
      if (rimSize.value && tireCount.value) {
        const pricePerTire = parseInt(rimSize.value) <= 18 ? 25 : 30
        const basePrice = (pricePerTire * parseInt(tireCount.value)) + 65 // Per tire + mobile service
        return includeStorage.value ? basePrice + 25 : basePrice
      }
      // Default price when selections aren't complete
      return includeStorage.value ? 175 : 150
    }
  }
  return 150 // Default for installation
})

const calculatePrice = computed(() => {
  if (props.selectedService === 'repair') return '$80'
  if (props.selectedService === 'rotation') return '50'
  if (props.selectedService === 'changeover') {
    if (changeoverType.value === 'assembly') {
      return `$${getServicePrice.value}`
    } else if (changeoverType.value === 'tires') {
      if (rimSize.value) {
        return `$${getServicePrice.value}`
      }
      return 'From $150'  // Show "From" price only when rim size not selected
    }
  }
  return 'Starting at $150'
})

// Methods
const selectChangeoverType = (type) => {
  changeoverType.value = type
  // Immediately emit the service details when type is selected
  proceedToScheduling()
}

const proceedToScheduling = () => {
  const serviceDetails: any = {
    service: props.selectedService as Service,
    rimSize: rimSize.value as number,
    tireCount: tireCount.value as number,
    price: calculatedPrice as number,
    // Add the computed price
  }
  emit('ready-for-scheduling', serviceDetails)
}

watch([rimSize, tireCount, changeoverType], () => {
  if (props.selectedService === 'rotation') {
    // Handle rotation service
    proceedToScheduling()
  } else if (props.selectedService === 'changeover') {
    // Handle changeover service
    if (changeoverType.value === 'assembly' ||
        (changeoverType.value === 'tires' && rimSize.value && tireCount.value)) {
      proceedToScheduling()
    }
  } else if (needsRimSelection.value) {
    // Handle installation service
    if (rimSize.value && (props.selectedService !== 'installation' || tireCount.value)) {
      proceedToScheduling()
    }
  }
})

watch(includeStorage, () => {
  if (props.selectedService === 'changeover') {
    proceedToScheduling()
  }
})
</script>
