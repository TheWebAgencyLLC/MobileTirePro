<!-- app.vue -->
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <!-- Add the chat widget -->
<!--    <ClientOnly>-->
<!--      <Chat />-->
<!--    </ClientOnly>-->
  </div>
</template>

<script setup lang="ts">
useHead({
  script: [
    {
      src: 'https://analytics.ahrefs.com/analytics.js',
      'data-key': 'jwx4Ux/8zI8uMeuakw68/Q',
      defer: true
    }
  ]
})
</script>
