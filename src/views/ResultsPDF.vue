<template>
  <!-- Contenido completo de la primera página -->
  <div
    class="h-full flex flex-col justify-baseline items-baseline mb-4"
    style="height: 275mm; border: 1px solid blue"
  >
    <div class="header">
      <img
        src="/src/assets/header_secretaria.svg"
        alt="Encabezado"
        class="header-img"
      />
    </div>
    <div class="p-2">
      <TitleSection :results />
    </div>
    <div class="p-2">
      <div class="text-xs w-full">
        A continuación podrás visualizar el resultado por pregunta en cada uno
        de los ejes :
      </div>
      <EjeUno :data="data[0]" />
    </div>
  </div>

  <div
    class="h-full flex flex-col justify-baseline items-baseline"
    style="height: 275mm; border: 1px solid blue"
  >
    <div class="header-2">
      <img
        src="/src/assets/header_secretaria.svg"
        alt="Encabezado"
        class="header-img"
      />
    </div>
    <div class="p-2">
      <!-- <h1>Resultados - Hoja 2</h1> -->
      <div>Contenido - Hoja 1</div>
      <div>Contenido - Hoja 1</div>
      <div>Contenido - Hoja 1</div>
      <div>Contenido -</div>
      <div>Contenido -</div>
      <div>Contenido - Hoja 1</div>
      <div>Contenido - Hoja 1</div>
      <div>Contenido - Hoja 1</div>
      <div>Contenido - Hoja 1</div>
      <div>Contenido - Hoja 1</div>
      <div>Contenido -</div>
      <div>Contenido -</div>
      <div>Contenido - Hoja 1</div>
      <div>Contenido - Hoja 1</div>
      <div>Contenido - Hoja 1</div>
      <div>Contenido - Hoja 1</div>
      <div>Contenido - Hoja 1</div>
      <div>Contenido - Hoja 1</div>
      <div>Contenido - Hoja 1</div>
    </div>
  </div>
</template>

<script setup>
import { responsesMock } from '@/constants/response/responses'
import TitleSection from './components/print-results/TitleSection.vue'
import EjeUno from './components/print-results/EjeUno.vue'
import { useQuestions } from '@/composables/questions.js'

//Descomentar cuando termine de mockear
// const props = defineProps({
//  results: { type: Object, default: () => {} },

// })

const results = responsesMock.data

const { data, isPending } = useQuestions()
</script>

<style scoped>
.header {
  margin-bottom: 10px; /* Espacio después del encabezado */
}

.header-2 {
  margin-bottom: 10px; /* Espacio después del encabezado */
  /* margin-top: 80px; */
}

.header-img {
  height: 50px;
}

/* Elimina TODOS los saltos de página */
@media print {
  /* body,
  .single-page {
    height: auto !important;
    overflow: visible !important;
  } */
  .page-break {
    display: none !important; /* Elimina clases de salto */
  }
}
</style>
