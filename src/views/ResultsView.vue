<template>
  <div class="results-wrapper">
    <TitleSection :results />
    <SuggestionsSection :results />
    <StrongerSection v-if="results.resultado_id !== 4" :results />
    <BooksSection :results />
    <InstitutionsSection :results />

    <section class="button-section">
      <Button class="button-home" label="Volvé al Inicio" @click="goToLogin" />
      <Button
        class="button-download"
        label="Descargá los resultados"
        @click="generatePDF"
      />
    </section>

    <Teleport to="body">
      <div v-if="showPDF" ref="pdfContainer">
        <ResultsPDF ref="pdfComponent" :results="results" />
      </div>
    </Teleport>
  </div>
</template>

<script setup>
//quitar cuando se termine de mockear
import { responsesMock } from '@/constants/response/responses'
import 'primeicons/primeicons.css'
import Button from 'primevue/button'
import router from '@/router'
import { onMounted, ref, nextTick } from 'vue'
import html2pdf from 'html2pdf.js'
import ResultsPDF from './ResultsPDF.vue'
import TitleSection from './components/results/TitleSection.vue'
import SuggestionsSection from './components/results/SuggestionsSection.vue'
import InstitutionsSection from './components/results/InstitutionsSection.vue'
import StrongerSection from './components/results/StrongerSection.vue'
import BooksSection from './components/results/BooksSection.vue'

//Descomentar cuando termine de mockear
// const props = defineProps({
//  results: { type: Object, default: () => {} },

// })

const results = responsesMock.data

const showPDF = ref(false)
const pdfContainer = ref(null)

const generatePDF = async () => {
  showPDF.value = true

  await nextTick()

  const opt = {
    margin: 10,
    filename: 'resultados_emprendedor.pdf',
    image: { type: 'jpeg', quality: 0.99 },
    html2canvas: {
      scale: 6,
      logging: true,
      useCORS: true,
      allowTaint: true,
      scrollX: 0,
      scrollY: 0,
      windowWidth: 800,
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  }

  await html2pdf().set(opt).from(pdfContainer.value).save()

  showPDF.value = false
}

const goToLogin = () => router.replace({ name: 'login' })

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<style lang="scss" scoped>
.results-wrapper {
  background-color: #f2f2f2;
  color: #333333;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  .button-section {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin: 15px 0;
    .button-home {
      color: #fafafa;
      font-size: 15px;
      width: 200px;
      background-color: #242c4f;
      border-color: #242c4f;
    }
    .button-download {
      color: #fafafa;
      font-size: 15px;
      width: 200px;
      background-color: #2e7d33;
      border-color: #2e7d33;
    }
  }
}
</style>
