<template>
  <div ref="root" class="relative max-w-5xl mx-auto h-[400px] overflow-hidden rounded-lg shadow-lg">
    <img
      v-if="isVisible && currentImage"
      :key="currentImage.src"
      :src="currentImage.src"
      :alt="currentImage.alt"
      class="absolute inset-0 w-full h-full object-cover"
      width="1024"
      height="400"
      loading="lazy"
      decoding="async"
    />
    <button
      type="button"
      aria-label="Previous slide"
      @click="prevSlide"
      class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center focus:outline-none"
    >
      &#8592;
    </button>
    <button
      type="button"
      aria-label="Next slide"
      @click="nextSlide"
      class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center focus:outline-none"
    >
      &#8594;
    </button>
  </div>
</template>

<script setup lang="ts">
interface CarouselImage {
  id: number
  src: string
  alt: string
}

const props = defineProps<{
  images: CarouselImage[]
}>()

const root = ref<HTMLElement | null>(null)
const currentIndex = ref(0)
const isVisible = ref(false)

const currentImage = computed(() => props.images[currentIndex.value])

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length
}

onMounted(() => {
  if (!root.value) return

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        isVisible.value = true
        observer.disconnect()
      }
    },
    { rootMargin: '200px' }
  )

  observer.observe(root.value)
})
</script>
