<template>
  <div class="pdf-document">
    <!-- <TitleSection :results /> -->
    <h1>Resultados</h1>
  </div>
</template>

<script setup>
// import TitleSection from './components/TitleSection.vue'
defineProps({
  results: {
    type: Object,
    required: true,
  },
})
</script>

<style lang="scss">
.pdf-document {
  padding: 20px;
}

@media print {
  @page {
    size: A4;
    margin: 1.5cm;
  }
  body {
    background: white !important;
  }
  .pdf-document {
    padding: 0;
  }
}
</style>
