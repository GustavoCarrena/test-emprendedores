<template>
  <div
    class="h-full flex flex-col justify-start items-start relative"
    style="min-height: 1048px; border: 0.1px solid #dddddd; border-radius: 4px"
  >
    <div class="header">
      <img
        src="/src/assets/header_secretaria.svg"
        alt="Encabezado"
        class="header-img"
      />
    </div>
    <div class="pl-2">
      <TitleSection :results />
    </div>
    <div class="pl-2">
      <div class="text-xs w-full">
        A continuación podrás visualizar el resultado por pregunta en cada uno
        de los ejes :
      </div>
      <Answers :data="data[EJE[1]]" style="width: 698px" :answers />
    </div>
    <footer class="footer w-full">
      <img
        class="footer-img"
        src="/src/assets/footer_logos1.svg"
        alt="logo_footer"
      />
    </footer>
  </div>

  <div
    class="h-full flex flex-col justify-start items-start relative"
    style="height: 1048px; border: 0.1px solid #dddddd; border-radius: 4px"
  >
    <div class="header">
      <img
        src="/src/assets/header_secretaria.svg"
        alt="Encabezado"
        class="header-img"
      />
    </div>

    <div class="pl-2">
      <Answers :data="data[EJE[2]]" style="width: 698px" :answers />
      <Answers :data="data[EJE[3]]" style="width: 698px" :answers />
    </div>
    <footer class="footer w-full mt-auto">
      <img
        class="footer-img"
        src="/src/assets/footer_logos1.svg"
        alt="logo_footer"
      />
    </footer>
  </div>

  <div
    class="h-full flex flex-col justify-start items-start relative"
    style="height: 1048px; border: 0.1px solid #dddddd; border-radius: 4px"
  >
    <div class="header">
      <img
        src="/src/assets/header_secretaria.svg"
        alt="Encabezado"
        class="header-img"
      />
    </div>

    <div class="pl-2">
      <Answers :data="data[EJE[4]]" style="width: 698px" :answers />
      <Suggestions :results />
    </div>
    <footer class="footer w-full mt-auto">
      <img
        class="footer-img"
        src="/src/assets/footer_logos1.svg"
        alt="logo_footer"
      />
    </footer>
  </div>

  <div
    class="h-full flex flex-col justify-start items-start relative"
    style="height: 1048px; border: 0.1px solid #dddddd; border-radius: 4px"
  >
    <div class="header">
      <img
        src="/src/assets/header_secretaria.svg"
        alt="Encabezado"
        class="header-img"
      />
    </div>

    <div class="pl-2">
      <Stronger v-if="results.resultado_id !== 4" :results />
      <Books :results />
    </div>
    <footer class="footer w-full mt-auto">
      <img
        class="footer-img"
        src="/src/assets/footer_logos1.svg"
        alt="logo_footer"
      />
    </footer>
  </div>
</template>

<script setup>
import TitleSection from './components/print-results/TitleSection.vue'
import Answers from './components/print-results/Answers.vue'
import { useQuestions } from '@/composables/questions.js'
import Suggestions from './components/print-results/Suggestions.vue'
import Stronger from './components/print-results/Stronger.vue'
import Books from './components/print-results/Books.vue'

defineProps({
  results: { type: Object, default: () => {} },
  answers: { type: Array, default: () => [] },
})

const { data, isPending } = useQuestions()

const EJE = {
  1: 0,
  2: 1,
  3: 2,
  4: 3,
}
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 10px;
}

.header-2 {
  margin-bottom: 10px;
}

.header-img {
  height: 50px;
}

@media print {
  .page-break {
    display: none !important;
  }
}

.footer {
  background-color: #242c4f;
  height: 50px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: left;
  justify-self: end;
  border-radius: 0 0 4px 4px;
  position: absolute;
  bottom: 0;
  .footer-img {
    padding-left: 5%;
    height: 30px;
  }
}
</style>
