<template>
  <nav class="w-full h-18 p-0">
    <div class="w-full h-full pt-1">
      <Image
        src="/src/assets/header_secretaria.svg"
        alt="Image"
        imageStyle="padding-left:6%"
      />
    </div>
  </nav>
  <div
    class="flex justify-start"
    style="padding-left: 7%; background-color: #3d3d3d"
  >
    <div class="text-xs text-white ml-2 py-1 opacity-70">
      {{ route.name === 'login' ? 'inicio' : 'Test' }}
    </div>
  </div>
</template>

<script setup>
import Image from 'primevue/image'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
