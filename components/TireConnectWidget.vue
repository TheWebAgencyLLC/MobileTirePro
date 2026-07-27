<script setup lang="ts">
const props = withDefaults(defineProps<{
  containerId?: string
  lazy?: boolean
  deferUntilIdle?: boolean
}>(), {
  containerId: 'tireconnect',
  lazy: true,
  deferUntilIdle: false,
})

const config = useRuntimeConfig()
const wrapper = ref<HTMLElement | null>(null)
const container = ref<HTMLElement | null>(null)
const isLoading = ref(true)

declare global {
  interface Window {
    TCWidget?: {
      init: (options: { apikey: string; container: string }) => void
    }
  }
}

const markReady = async () => {
  if (container.value) {
    await waitForDomContent(container.value, { timeout: 8000 })
  }
  isLoading.value = false
}

const initWidget = () => {
  if (!window.TCWidget) return
  window.TCWidget.init({
    apikey: config.public.tireConnect,
    container: props.containerId,
  })
  markReady()
}

const loadWidget = () => {
  loadScriptOnce(
    'https://app.tireconnect.ca/js/widget.js',
    'tireconnect-widget',
    initWidget
  )
}

const scheduleLoad = () => {
  if (props.deferUntilIdle) {
    scheduleWhenIdle(loadWidget, { timeout: 3000 })
  } else {
    loadWidget()
  }
}

onMounted(() => {
  const safetyTimer = setTimeout(() => {
    isLoading.value = false
  }, 10000)

  onUnmounted(() => clearTimeout(safetyTimer))

  if (!props.lazy) {
    scheduleLoad()
    return
  }

  if (!wrapper.value) return

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        scheduleLoad()
        observer.disconnect()
      }
    },
    { rootMargin: '100px' }
  )

  observer.observe(wrapper.value)
})
</script>

<template>
  <div ref="wrapper" class="tireconnect-wrapper relative w-full min-h-[480px]">
    <WidgetSkeleton
      v-if="isLoading"
      variant="search"
      min-height="480px"
      class="absolute inset-0 z-10"
    />
    <div
      ref="container"
      :id="containerId"
      class="tireconnect-content w-full transition-opacity duration-300"
      :class="isLoading ? 'opacity-0' : 'opacity-100'"
    />
  </div>
</template>

<style scoped>
.tireconnect-wrapper {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #ddd;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
