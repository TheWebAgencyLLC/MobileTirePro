<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
    <!-- Standard Installation -->
    <div v-for="service in FETCHED_SERVICES" @click="selectService(service)"
         class="border rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer" :class="[
                props.selectedService === 'installation' ? 'border-vivid-red shadow-lg' : 'border-gray-200',
                'dark:bg-gray-800'
            ]">
      <div class="flex-col items-start mb-3">
        <h3 class="text-lg font-semibold dark:text-white">{{ service.name }}</h3>
        <span
            class="text-vivid-red font-bold my-2">{{
            (service.name.includes('Tire Installation') ? 'Starting at $' + service.Price : '$' + service.Price)
          }}</span>
      </div>
      <p class="text-sm text-gray-600 dark:text-gray-300">{{
          service.description
        }}
      </p>
      <!--            <div class="mt-3 text-sm text-gray-500">Includes mounting and balancing</div>-->
    </div>
    <!--        &lt;!&ndash; Tire Repair &ndash;&gt;-->
    <!--        <div @click="selectService('repair')"-->
    <!--            class="border rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer relative" :class="[-->
    <!--                props.selectedService === 'repair' ? 'border-vivid-red shadow-lg' : 'border-gray-200',-->
    <!--                'dark:bg-gray-800'-->
    <!--            ]">-->
    <!--            <div class="flex-col items-start mb-3">-->
    <!--                <h3 class="text-lg font-semibold dark:text-white">Tire Repair</h3>-->
    <!--                <span class="text-vivid-red font-bold my-2">$80</span>-->
    <!--            </div>-->
    <!--            <p class="text-sm text-gray-600 dark:text-gray-300">$15 repair + $65 mobile service charge</p>-->
    <!--            <div class="mt-3 text-sm text-gray-500">Professional on-site repair service</div>-->
    <!--        </div>-->

    <!--        &lt;!&ndash; Rotation & Balance &ndash;&gt;-->
    <!--        <div @click="selectService('rotation')"-->
    <!--            class="border rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer" :class="[-->
    <!--                props.selectedService === 'rotation' ? 'border-vivid-red shadow-lg' : 'border-gray-200',-->
    <!--                'dark:bg-gray-800'-->
    <!--            ]">-->
    <!--            <div class="flex-col items-start mb-3">-->
    <!--                <h3 class="text-lg font-semibold dark:text-white">Rotation & Balance</h3>-->
    <!--                <span class="text-vivid-red font-bold my-2">$75</span>-->
    <!--            </div>-->
    <!--            <p class="text-sm text-gray-600 dark:text-gray-300">Complete service including mobile fee</p>-->
    <!--            <div class="mt-3 text-sm text-gray-500">Extends tire life and improves handling</div>-->
    <!--        </div>-->


    <!-- Seasonal Changeover -->
    <div @click="selectService(SEASONAL_CHANGEOVER)"
         class="border rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer" :class="[
                props.selectedService === 'changeover' ? 'border-vivid-red shadow-lg' : 'border-gray-200',
                'dark:bg-gray-800'
            ]">
      <div class="flex-col items-start mb-3">
        <h3 class="text-lg font-semibold dark:text-white">Seasonal Changeover</h3>
        <span class="text-vivid-red font-bold">From $125</span>
      </div>
      <p class="text-sm text-gray-600 dark:text-gray-300">Two options available:</p>
      <div class="mt-2 space-y-1">
        <div class="text-sm text-gray-500">• Wheels/tire assemblies: $125 (includes storage)</div>
        <div class="text-sm text-gray-500">• Tires only: from $150 (includes storage)</div>
        <div class="text-sm text-vivid-red">Please call or text before scheduling this service.</div>
      </div>
    </div>

    <!-- TPMS -->
    <div @click="handleTPMSClick" class="border rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer"
         :class="[
                props.selectedService === 'tpms' ? 'border-vivid-red shadow-lg' : 'border-gray-200',
                'dark:bg-gray-800'
            ]">
      <div class="flex-col items-start mb-3">
        <h3 class="text-lg font-semibold dark:text-white">TPMS Service</h3>
        <span class="text-vivid-red font-bold my-2">Contact Us</span>
      </div>
      <p class="text-sm text-gray-600 dark:text-gray-300">Tire Pressure Monitoring System service</p>
      <div class="mt-3 text-sm text-gray-500">Please contact us for specific pricing</div>
    </div>
  </div>

  <!-- TPMS Contact Modal -->
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
import {ref} from 'vue'
import type {Service} from "~/types";


const {data: FETCHED_SERVICES} = await useFetch('/api/services/list', {
  method: 'GET',
  server: false
})

const route = useRoute();

console.log(FETCHED_SERVICES.value)

const SEASONAL_CHANGEOVER: Service = {
  name: 'Seasonal Changeover',
  description: 'Two options available:',
  price: 125,
  tireCount: 4,
  isActive: true
}


const props = defineProps({
  selectedService: {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    }

  }
})

onMounted(() => {
  if (route.query?.service?.includes('seasonalchangeover')) {
    selectService(SEASONAL_CHANGEOVER)
  }
  if (route.query?.service?.includes('tirerepair')) {
    const TARGET = FETCHED_SERVICES?.value?.find((SERVICE: Service) => SERVICE.name.includes('Tire Repair'))
    selectService(TARGET)
  }
  if (route.query?.service?.includes('installation')) {
    const TARGET = FETCHED_SERVICES?.value?.find((SERVICE: Service) => SERVICE.name.includes('Tire Installation'))

    selectService(TARGET)
  }
})

const showTPMSModal = ref(false)
const emit = defineEmits(['service-selected'])

const selectService = (service: Service) => {
  console.log(service)
  emit('service-selected', service)
}

const handleTPMSClick = () => {
  showTPMSModal.value = true
}
</script>
