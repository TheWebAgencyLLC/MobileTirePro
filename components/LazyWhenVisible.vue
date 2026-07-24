<template>
  <div ref="root" v-bind="$attrs">
    <slot v-if="isVisible" />
  </div>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })
const props = withDefaults(defineProps<{
  rootMargin?: string
}>(), {
  rootMargin: '200px',
})

const root = ref<HTMLElement | null>(null)
const isVisible = ref(false)

onMounted(() => {
  if (!root.value) return

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        isVisible.value = true
        observer.disconnect()
      }
    },
    { rootMargin: props.rootMargin }
  )

  observer.observe(root.value)
})
</script>
