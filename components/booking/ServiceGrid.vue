<template>
  <div class="space-y-3 p-4">
    <!-- Dynamic fetched services -->
    <div v-for="service in FETCHED_SERVICES" :key="service._id"
         class="border rounded-lg transition-all dark:bg-gray-800"
         :class="expandedService?._id === service._id ? 'border-vivid-red shadow-md' : 'border-gray-200'">

      <!-- Card header -->
      <div @click="handleServiceClick(service)" class="p-4 cursor-pointer">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-lg font-semibold dark:text-white">{{ service.name }}</h3>
            <span class="text-vivid-red font-bold my-1 block">
              {{ service.name.includes('Tire Installation') ? 'Starting at $' + service.Price : '$' + service.Price }}
            </span>
            <p class="text-sm text-gray-600 dark:text-gray-300">{{ service.description }}</p>
          </div>
          <span v-if="expandedService?._id === service._id" class="text-vivid-red text-lg">▲</span>
          <span v-else-if="service.tireCount > 1" class="text-gray-400 text-lg">▼</span>
        </div>
      </div>

      <!-- Inline expansion for multi-tire services -->
      <div v-if="expandedService?._id === service._id && service.tireCount > 1"
           class="px-4 pb-4 space-y-4 border-t dark:border-gray-700" @click.stop>

        <!-- Rim Size -->
        <div class="space-y-2 pt-4">
          <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold">
            Rim Size
            <button @mouseenter="showRimTip = true" @mouseleave="showRimTip = false"
                    class="ml-2 text-blue-500 hover:text-blue-600 text-sm">(?)
            </button>
          </label>
          <div v-if="showRimTip"
               class="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
            Find your tire size on the driver's door placard or tire sidewall (e.g., 205/55/R16)
          </div>
          <select v-model.number="rimSize"
                  class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="" disabled>Select rim size</option>
            <option v-for="size in rimSizes" :key="size" :value="size">{{ size }} inches</option>
          </select>
        </div>

        <!-- Tire Count -->
        <div class="space-y-2">
          <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold">Number of Tires</label>
          <select v-model.number="tireCount"
                  class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="" disabled>Select number of tires</option>
            <option v-for="count in [1, 2, 3, 4]" :key="count" :value="count">
              {{ count }} {{ count === 1 ? 'Tire' : 'Tires' }}
            </option>
          </select>
        </div>

        <div v-if="rimSize && tireCount" class="text-sm text-gray-600 dark:text-gray-400">
          Base price: <span class="font-semibold text-vivid-red">${{ (rimSize <= 18 ? 25 : 30) * tireCount }}</span>
          <span class="italic"> + service fee (added at checkout)</span>
        </div>

        <button @click="confirmServiceWithConfig(service)"
                :disabled="!rimSize || !tireCount"
                class="w-full bg-vivid-red text-white py-3 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          Continue to Scheduling
        </button>
      </div>
    </div>

    <!-- Seasonal Changeover -->
    <div class="border rounded-lg transition-all dark:bg-gray-800"
         :class="expandedService?.name === 'Seasonal Changeover' ? 'border-vivid-red shadow-md' : 'border-gray-200'">

      <div @click="toggleChangeover" class="p-4 cursor-pointer">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-lg font-semibold dark:text-white">Seasonal Changeover</h3>
            <span class="text-vivid-red font-bold block my-1">From $125</span>
            <p class="text-sm text-gray-600 dark:text-gray-300">Swap summer/winter tires — two options available</p>
          </div>
          <span v-if="expandedService?.name === 'Seasonal Changeover'" class="text-vivid-red text-lg">▲</span>
          <span v-else class="text-gray-400 text-lg">▼</span>
        </div>
      </div>

      <div v-if="expandedService?.name === 'Seasonal Changeover'"
           class="px-4 pb-4 space-y-4 border-t dark:border-gray-700" @click.stop>

        <!-- Assembly vs Tires choice -->
        <div class="space-y-3 pt-4">
          <div @click="changeoverType = 'assembly'"
               class="border p-3 rounded-lg cursor-pointer transition-all"
               :class="changeoverType === 'assembly' ? 'border-vivid-red bg-red-50 dark:bg-red-900/10' : 'border-gray-200'">
            <div class="flex justify-between items-start">
              <div>
                <h4 class="font-semibold dark:text-white">Wheels/Tire Assemblies</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Complete wheel and tire sets</p>
              </div>
              <span class="text-vivid-red font-bold">$125</span>
            </div>
          </div>

          <div @click="changeoverType = 'tires'"
               class="border p-3 rounded-lg cursor-pointer transition-all"
               :class="changeoverType === 'tires' ? 'border-vivid-red bg-red-50 dark:bg-red-900/10' : 'border-gray-200'">
            <div class="flex justify-between items-start">
              <div>
                <h4 class="font-semibold dark:text-white">Tires Only</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Tire swap on existing wheels — $25–30/tire</p>
              </div>
              <span class="text-vivid-red font-bold">From $150</span>
            </div>
          </div>
        </div>

        <!-- Storage add-on -->
        <div v-if="changeoverType" class="flex items-center justify-between border-t dark:border-gray-700 pt-4">
          <div>
            <h4 class="font-semibold dark:text-white">Add Seasonal Storage</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">Store your tires until next season — +$25</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="includeStorage" class="sr-only peer">
            <div
                class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-vivid-red/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vivid-red">
            </div>
          </label>
        </div>

        <!-- Rim/tire config for tires-only -->
        <template v-if="changeoverType === 'tires'">
          <div class="space-y-2">
            <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold">Rim Size</label>
            <select v-model.number="rimSize"
                    class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="" disabled>Select rim size</option>
              <option v-for="size in rimSizes" :key="size" :value="size">{{ size }} inches</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold">Number of Tires</label>
            <select v-model.number="tireCount"
                    class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="" disabled>Select number of tires</option>
              <option v-for="count in [1, 2, 3, 4]" :key="count" :value="count">
                {{ count }} {{ count === 1 ? 'Tire' : 'Tires' }}
              </option>
            </select>
          </div>
        </template>

        <!-- Continue button -->
        <button v-if="changeoverType"
                @click="confirmChangeover"
                :disabled="changeoverType === 'tires' && (!rimSize || !tireCount)"
                class="w-full bg-vivid-red text-white py-3 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          Continue to Scheduling
        </button>
      </div>
    </div>

    <!-- TPMS -->
    <div @click="handleTPMSClick"
         class="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer dark:bg-gray-800">
      <h3 class="text-lg font-semibold dark:text-white">TPMS Service</h3>
      <span class="text-vivid-red font-bold my-2 block">Contact Us</span>
      <p class="text-sm text-gray-600 dark:text-gray-300">Tire Pressure Monitoring System service</p>
      <div class="mt-3 text-sm text-gray-500">Please contact us for specific pricing</div>
    </div>
  </div>

  <!-- TPMS Modal -->
  <div v-if="showTPMSModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
      <h3 class="text-xl font-bold mb-4 dark:text-white">Contact Us for TPMS Service</h3>
      <p class="text-gray-600 dark:text-gray-300 mb-4">
        TPMS systems vary by vehicle model. Please contact us for detailed information and pricing.
      </p>
      <div class="space-y-3">
        <a href="tel:1234567890"
           class="block w-full text-center bg-vivid-red text-white py-2 rounded-lg hover:bg-red-700">
          Call Us
        </a>
        <a href="mailto:service@example.com"
           class="block w-full text-center border border-vivid-red text-vivid-red py-2 rounded-lg hover:bg-red-50">
          Email Us
        </a>
        <button @click="showTPMSModal = false"
                class="block w-full text-center text-gray-600 py-2 hover:text-gray-800">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Service } from '~/types'

const { data: FETCHED_SERVICES } = await useFetch('/api/services/list', {
  method: 'GET',
  server: false
})

const route = useRoute()

const SEASONAL_CHANGEOVER = {
  name: 'Seasonal Changeover',
  description: 'Swap summer/winter tires with seasonal storage option',
  Price: 125,
  tireCount: 4,
  isActive: true
}

const emit = defineEmits(['service-selected'])

const expandedService = ref<any>(null)
const rimSize = ref<number | null>(null)
const tireCount = ref<number | null>(null)
const showRimTip = ref(false)
const changeoverType = ref<'assembly' | 'tires' | ''>('')
const includeStorage = ref(false)
const showTPMSModal = ref(false)

const rimSizes = Array.from({ length: 11 }, (_, i) => i + 12) // 12–22 inches

const handleServiceClick = (service: Service) => {
  if (service.tireCount === 1 || !service.tireCount) {
    // No config needed — emit immediately
    emit('service-selected', {
      service,
      rimSize: null,
      tireCount: service.tireCount || 1,
      price: service.Price
    })
  } else {
    // Toggle expansion for rim/tire config
    if (expandedService.value?._id === (service as any)._id) {
      expandedService.value = null
    } else {
      expandedService.value = service
      rimSize.value = null
      tireCount.value = null
    }
  }
}

const confirmServiceWithConfig = (service: Service) => {
  const basePrice = ((rimSize.value || 0) <= 18 ? 25 : 30) * (tireCount.value || 0)
  emit('service-selected', {
    service,
    rimSize: rimSize.value,
    tireCount: tireCount.value,
    price: basePrice
  })
}

const toggleChangeover = () => {
  if (expandedService.value?.name === 'Seasonal Changeover') {
    expandedService.value = null
  } else {
    expandedService.value = SEASONAL_CHANGEOVER
    changeoverType.value = ''
    rimSize.value = null
    tireCount.value = null
    includeStorage.value = false
  }
}

const confirmChangeover = () => {
  let price: number
  let serviceName: string

  if (changeoverType.value === 'assembly') {
    price = 125 + (includeStorage.value ? 25 : 0)
    serviceName = 'Seasonal Changeover (Assembly)'
  } else {
    const pricePerTire = (rimSize.value || 0) <= 18 ? 25 : 30
    price = pricePerTire * (tireCount.value || 0) + (includeStorage.value ? 25 : 0)
    serviceName = 'Seasonal Changeover (Tires Only)'
  }

  emit('service-selected', {
    service: { ...SEASONAL_CHANGEOVER, name: serviceName },
    rimSize: changeoverType.value === 'tires' ? rimSize.value : null,
    tireCount: changeoverType.value === 'tires' ? tireCount.value : 4,
    price,
    changeoverType: changeoverType.value,
    includeStorage: includeStorage.value
  })
}

const handleTPMSClick = () => {
  showTPMSModal.value = true
}

onMounted(() => {
  if (route.query?.service?.includes('seasonalchangeover')) {
    expandedService.value = SEASONAL_CHANGEOVER
  }
  if (route.query?.service?.includes('tirerepair')) {
    const target = FETCHED_SERVICES?.value?.find((s: Service) => s.name.includes('Tire Repair'))
    if (target) handleServiceClick(target)
  }
  if (route.query?.service?.includes('installation')) {
    const target = FETCHED_SERVICES?.value?.find((s: Service) => s.name.includes('Tire Installation'))
    if (target) expandedService.value = target
  }
})
</script>
