<template>
    <div class="w-full flex flex-col md:flex-row gap-6 p-4">
        <!-- Calendar Section -->
        <div :class="[selectedDate && selectedTime ? 'hidden lg:flex lg:flex-col' : 'flex flex-col']" class="w-full md:w-2/3 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div class="mb-6 mt-4">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-semibold dark:text-white">
                        {{ moment(currentMonth).format('MMMM YYYY') }}
                    </h2>
                    <div class="flex gap-2">
                        <button @click="previousMonth"
                            class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                            <span class="sr-only">Previous month</span>
                            ←
                        </button>
                        <button @click="nextMonth" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                            <span class="sr-only">Next month</span>
                            →
                        </button>
                    </div>
                </div>

                <!-- Calendar Grid -->
                <div class="grid grid-cols-7 gap-1">
                    <!-- Day Headers -->
                    <template v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="day">
                        <div class="text-center text-sm text-gray-500 py-2">{{ day }}</div>
                    </template>

                    <!-- Calendar Days -->
                    <template v-for="{ date, isCurrentMonth, isAvailable, isPast } in calendarDays" :key="date">
                        <div @click="handleDateClick(date)" :class="[
                            'h-12 flex items-center justify-center rounded-lg cursor-pointer text-sm',
                            isCurrentMonth ? 'hover:bg-gray-100 dark:hover:bg-gray-700' : 'text-gray-400',
                            selectedDate === date ? 'bg-vivid-red text-white' : '',
                            isPast ? 'opacity-50 cursor-not-allowed' : '',
                            !isAvailable && !isPast ? 'bg-gray-100 dark:bg-gray-700' : '',
                            isAvailable && !isPast ? 'border-2 border-vivid-red/20' : ''
                        ]">
                            {{ moment(date).format('D') }}
                        </div>
                    </template>
                </div>
            </div>

            <!-- Time Slots -->
            <div v-if="selectedDate && availableSlots.length" class="mt-6">
                <h3 class="text-lg font-semibold mb-4 dark:text-white">
                    Available Times for {{ moment(selectedDate).format('dddd, MMMM D') }}
                </h3>
                <div class="grid grid-cols-4 gap-2">
                    <button v-for="slot in availableSlots" :key="slot" @click="selectTimeSlot(slot)" :class="[
                        'py-2 px-4 rounded-md text-sm text-center transition-colors',
                        selectedTime === slot
                            ? 'bg-vivid-red text-white'
                            : 'border border-gray-200 hover:border-vivid-red dark:border-gray-600'
                    ]">
                        {{ moment(slot).format('h:mm A') }}
                    </button>
                </div>
            </div>

            <div v-else-if="selectedDate" class="mt-6 text-center text-gray-500">
                No available times for this date. Please select another date.
            </div>
        </div>

        <!-- Summary Section -->
        <div :class="[selectedDate && selectedTime ? 'flex' : 'hidden lg:flex lg:flex-col']"  class="w-full md:w-2/3 space-y-4">
            <div v-if="props.selectedService" class="bg-white w-full dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 class="text-lg font-semibold mb-4 dark:text-white">Booking Summary</h3>

                <div class="space-y-3">
                    <div class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-400">Service</span>
                        <span class="font-medium dark:text-white">{{ props.selectedService.service.name }}</span>
                    </div>

                    <div v-if="props.selectedService.rimSize" class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-400">Rim Size</span>
                        <span class="font-medium dark:text-white">{{ selectedService.rimSize }}"</span>
                    </div>

                    <div v-if="props.selectedService.tireCount" class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-400">Tire Count</span>
                        <span class="font-medium dark:text-white">{{ selectedService.tireCount }}</span>
                    </div>

                    <div v-if="props.selectedService.includeStorage" class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-400">Seasonal Storage</span>
                        <span class="font-medium dark:text-white">+$25</span>
                    </div>

                    <div v-if="selectedDate && selectedTime" class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-400">Appointment</span>
                        <span class="font-medium dark:text-white">
                            {{ moment(selectedTime).format('h:mm A, MMM D') }}
                        </span>
                    </div>

                    <div class="pt-3 border-t">
                        <div class="flex justify-between text-lg">
                            <span class="font-semibold dark:text-white">Total</span>
                            <span class="font-bold text-vivid-red">${{ calculateTotal() }}</span>
                        </div>
                      <div class="text-xs italic dark:text-gray-400">
                         includes service fee for your selected Zipcode
                      </div>
                    </div>
                </div>

                <!-- Continue Button -->
                <button v-if="selectedDate && selectedTime" @click="proceedToBooking"
                    class="w-full mt-6 bg-vivid-red text-white py-3 rounded-lg hover:bg-red-700 transition-colors">
                    Continue to Booking
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import moment from 'moment-timezone'
import { useFetch } from '#app'

const props = defineProps({
    selectedService: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['proceed-to-booking'])

// State
const currentMonth = ref(moment().startOf('month'))
const selectedDate = ref(null)
const selectedTime = ref(null)
const availableDates = ref({})
const availableSlots = ref([])

// Fetch available dates
const fetchAvailableDates = async () => {
    try {
        const { data } = await useFetch('/api/apts/check', {
            server: false
        })
        availableDates.value = data.value || {}
        currentMonth.value = moment().tz('America/Chicago').startOf('month')
    } catch (err) {
        console.error('Error fetching available dates:', err)
    }
}

// Calendar computation
const calendarDays = computed(() => {
    const start = moment(currentMonth.value).tz('America/Chicago').startOf('month').startOf('week')
    const end = moment(currentMonth.value).tz('America/Chicago').endOf('month').endOf('week')
    const days = []
    const today = moment().tz('America/Chicago').startOf('day')
    const sevenDaysFromNow = moment().tz('America/Chicago').add(7, 'days').endOf('day')

    let day = start.clone()
    while (day.isSameOrBefore(end)) {
        const date = day.format('YYYY-MM-DD')
        const isWithinRange = day.isBetween(today, sevenDaysFromNow, 'day', '[]')

        days.push({
            date,
            isCurrentMonth: day.month() === currentMonth.value.month(),
            isAvailable: isWithinRange && checkDateAvailability(date),
            isPast: day.isBefore(today),
            isWithinRange
        })
        day.add(1, 'day')
    }

    return days
})

// Methods
const checkDateAvailability = (date) => {
    const formattedDate = moment(date).tz('America/Chicago').format('MM-DD-YYYY')
    return (availableDates.value[formattedDate]?.length || 0) > 0
}

const handleDateClick = (date) => {
    const today = moment().tz('America/Chicago').startOf('day')
    const sevenDaysFromNow = moment().tz('America/Chicago').add(7, 'days').endOf('day')
    const selectedMoment = moment(date).tz('America/Chicago')

    if (selectedMoment.isBefore(today) || selectedMoment.isAfter(sevenDaysFromNow)) return

    selectedDate.value = date
    selectedTime.value = null

    const formattedDate = selectedMoment.format('MM-DD-YYYY')
    availableSlots.value = availableDates.value[formattedDate] || []
}

const selectTimeSlot = (time) => {
    selectedTime.value = time
}

const previousMonth = () => {
    currentMonth.value = moment(currentMonth.value).subtract(1, 'month')
}

const nextMonth = () => {
    currentMonth.value = moment(currentMonth.value).add(1, 'month')
}

const calculateTotal = () => {
    if (!props.selectedService) return 0
    return props.selectedService.price || 0
}

const proceedToBooking = () => {
    if (!selectedDate.value || !selectedTime.value) return

    emit('proceed-to-booking', {
        ...props.selectedService,
        appointmentDate: selectedTime.value,
    })
}

// Initialize
onMounted(() => {
    fetchAvailableDates()
})
</script>
