<template>
    <div
        class="text-dark-charcoal cursor-default select-none w-28 h-28 rounded-lg my-4 border border-gray-300 dark:border-gray-600 overflow-hidden">
        <div class="w-full h-full dark:text-white dark:bg-gray-900 flex flex-col items-center justify-center p-2">
            <img width="64" height="64" :src="imageUrl" :alt="vehicleType"
                loading="lazy" decoding="async"
                class="mb-1 max-w-full max-h-1/2 object-contain">
            <span class="text-center text-xs leading-tight">{{ vehicleType }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        vehicleType: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            default: "https://placeholder.com/48x48"
        }
    }
}
</script>

<style scoped>
span {
    font-family: 'Kumbh Sans', sans-serif
}
</style>