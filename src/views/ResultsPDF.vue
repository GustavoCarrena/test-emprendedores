<template>
  <PrintSection>
    <TitleSection :results />
    <div class="text-xs w-full">
      A continuación podrás visualizar el resultado por pregunta en cada uno de
      los ejes :
    </div>
    <Answers :data="data[EJE[1]]" class="answers-width" :answers />
  </PrintSection>

  <PrintSection>
    <Answers :data="data[EJE[2]]" class="answers-width" :answers />
    <Answers :data="data[EJE[3]]" class="answers-width" :answers />
  </PrintSection>

  <PrintSection>
    <Answers :data="data[EJE[4]]" class="answers-width" :answers />
    <Suggestions :results />
  </PrintSection>

  <PrintSection>
    <Stronger v-if="results.resultado_id !== 4" :results />
    <Books :results />
  </PrintSection>
</template>

<script setup>
import PrintSection from './components/print-results/PrintSection.vue'
import TitleSection from './components/print-results/TitleSection.vue'
import Answers from './components/print-results/Answers.vue'
import Suggestions from './components/print-results/Suggestions.vue'
import Stronger from './components/print-results/Stronger.vue'
import Books from './components/print-results/Books.vue'
import { useQuestions } from '@/composables/questions.js'

defineProps({
  results: { type: Object, default: () => ({}) },
  answers: { type: Array, default: () => [] },
})

const { data } = useQuestions()

const EJE = {
  1: 0,
  2: 1,
  3: 2,
  4: 3,
}
</script>

<style lang="scss" scoped>
.text-xs {
  font-size: 0.75rem;
}

.answers-width {
  width: 698px;
}
</style>
