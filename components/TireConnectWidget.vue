<script setup lang="ts">
const props = withDefaults(defineProps<{
  containerId?: string
  lazy?: boolean
}>(), {
  containerId: 'tireconnect',
  lazy: true,
})

const config = useRuntimeConfig()
const wrapper = ref<HTMLElement | null>(null)

const initWidget = () => {
  if (!window.TCWidget) return
  window.TCWidget.init({
    apikey: config.public.tireConnect,
    container: props.containerId,
  })
}

const loadWidget = () => {
  const existingScript = document.querySelector('script[data-tireconnect-widget]')
  if (existingScript) {
    initWidget()
    return
  }

  const script = document.createElement('script')
  script.src = 'https://app.tireconnect.ca/js/widget.js'
  script.async = true
  script.dataset.tireconnectWidget = 'true'
  script.onload = initWidget
  document.body.appendChild(script)
}

onMounted(() => {
  if (!props.lazy) {
    loadWidget()
    return
  }

  if (!wrapper.value) return

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        loadWidget()
        observer.disconnect()
      }
    },
    { rootMargin: '100px' }
  )

  observer.observe(wrapper.value)
})
</script>

<template>
  <div ref="wrapper" class="tireconnect-wrapper w-full">
    <div :id="containerId"></div>
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
