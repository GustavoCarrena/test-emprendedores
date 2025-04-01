<template>
  <main>
    <NavBar />
    <div class="flex flex-col w-auto custom-container">
      <slot />
    </div>
  </main>
  <Footer />
</template>

<script setup>
import NavBar from '../navbar/NavBar.vue'
import Footer from '../footer/Footer.vue'
</script>

<style scoped>
.custom-container {
  padding: 0;
}
</style>
