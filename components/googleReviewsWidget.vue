<script setup lang="ts">
const widgetRef = ref<HTMLElement | null>(null)
const isLoading = ref(true)

const ELFSIGHT_SCRIPT = 'https://static.elfsight.com/platform/platform.js'

const loadElfsightScript = () => {
  loadScriptOnce(ELFSIGHT_SCRIPT, 'elfsight-platform', () => markReady(), 'head')
}

const markReady = async () => {
  if (widgetRef.value) {
    await waitForDomContent(widgetRef.value, { timeout: 8000 })
  }
  isLoading.value = false
}

onMounted(() => {
  const safetyTimer = setTimeout(() => {
    isLoading.value = false
  }, 10000)

  onUnmounted(() => clearTimeout(safetyTimer))

  scheduleWhenIdle(loadElfsightScript, { timeout: 3000 })
})
</script>

<template>
  <div class="reviews-wrapper relative w-full min-h-[420px]">
    <WidgetSkeleton
      v-if="isLoading"
      variant="reviews"
      min-height="420px"
      class="absolute inset-0 z-10"
    />
    <div
      ref="widgetRef"
      class="elfsight-app-f4faac47-6e2f-4d2a-b390-57a413673396 transition-opacity duration-300"
      :class="isLoading ? 'opacity-0' : 'opacity-100'"
    />
  </div>
</template>

<style scoped>
.reviews-wrapper {
  border-radius: 16px;
  overflow: hidden;
}
</style>
