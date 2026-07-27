<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'search' | 'reviews'
  minHeight?: string
}>(), {
  variant: 'search',
  minHeight: '480px',
})
</script>

<template>
  <div
    class="widget-skeleton w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
    :style="{ minHeight }"
    aria-hidden="true"
  >
    <template v-if="variant === 'search'">
      <div class="mx-auto max-w-xl space-y-4">
        <div class="h-6 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div class="h-12 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div class="grid grid-cols-2 gap-3">
          <div class="h-12 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
          <div class="h-12 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
        </div>
        <div class="h-12 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div class="mx-auto h-11 w-48 animate-pulse rounded-lg bg-gray-300 dark:bg-gray-600" />
      </div>
    </template>

    <template v-else>
      <div class="mx-auto max-w-4xl space-y-5">
        <div class="flex items-center justify-center gap-2">
          <div v-for="i in 5" :key="i" class="h-5 w-5 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>
        <div class="h-5 w-56 animate-pulse rounded bg-gray-200 dark:bg-gray-700 mx-auto" />
        <div class="grid gap-4 md:grid-cols-3">
          <div
            v-for="i in 3"
            :key="i"
            class="space-y-3 rounded-xl border border-gray-100 p-4 dark:border-gray-700"
          >
            <div class="flex items-center gap-3">
              <div class="h-10 w-10 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
              <div class="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            </div>
            <div class="h-3 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div class="h-3 w-5/6 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div class="h-3 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
