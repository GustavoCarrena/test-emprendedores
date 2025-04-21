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
    <div v-if="loading" class="loading-overlay">
      <p class="loading-text">Descargando resultados, por favor aguarde...</p>
    </div>
    <Teleport v-if="showPDF" to="body">
      <div ref="pdfContainer">
        <ResultsPDF ref="pdfComponent" :results :answers />
      </div>
    </Teleport>
  </div>
</template>

<script setup>
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
import { getAnswersFromLocalStorage } from '@/helpers/answers.js'

defineProps({
  results: { type: Object, default: () => {} },
})

const answers = ref([])
const loading = ref(false)
const showPDF = ref(false)
const pdfContainer = ref(null)

const generatePDF = async () => {
  loading.value = true
  showPDF.value = true
  try {
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
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
    showPDF.value = false
  }
}

const goToLogin = () => router.replace({ name: 'login' })

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  answers.value = getAnswersFromLocalStorage()
  console.log({ RESPUESTAS: answers.value })
})
</script>

<style lang="scss" scoped>
.loading-text {
  font-size: 24px;
  color: #3498db;
  text-align: center;
  animation: blink 1.5s ease-in-out infinite;
  font-family: sans-serif;
  margin-top: 20px;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fafafa;
  opacity: 1;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.results-wrapper {
  background-color: #f2f2f2;
  color: #333333;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  @media (min-width: 1200px) {
    padding: 0 1.5%;
  }
  .button-section {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin: 15px 0;
    @media (min-width: 1024px) {
      flex-flow: row nowrap;
      justify-content: space-between;
      width: 82%;
      margin: 45px 0;
    }
    @media (min-width: 1440px) {
      width: 85%;
    }
    .button-home {
      color: #fafafa;
      font-size: 15px;
      width: 200px;
      background-color: #242c4f;
      border-color: #242c4f;
      @media (min-width: 1024px) {
        height: 50px;
        font-size: 18px;
        width: 240px;
      }
    }
    .button-download {
      color: #fafafa;
      font-size: 15px;
      width: 200px;
      background-color: #2e7d33;
      border-color: #2e7d33;
      @media (min-width: 1024px) {
        height: 55px;
        font-size: 18px;
        width: 240px;
      }
    }
  }
}
</style>
