<template>
  <div class="-mt-1.5 -ml-2.5">
    <Image
      src="/src/assets/header_secretaria.svg"
      alt="Image"
      imageStyle="height: 55px"
    />
  </div>

  <div class="pdf-document flex flex-col justify-baseline items-baseline pt-2">
    <!-- <TitleSection :results /> -->
    <div class="">Imagen</div>
    <div>Y</div>
    <h1>Resultados</h1>
  </div>
</template>

<script setup>
import { Image } from 'primevue'
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
  width: 210mm;
  height: 297mm;
  color: black;
  margin-left: 5px;
}

@media print {
  @page {
    size: A4;
    margin: 0;
  }
  body {
    background: white !important;
  }
  .pdf-document {
    padding: 0;
  }
}
</style>
