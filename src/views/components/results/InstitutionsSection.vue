<template>
  <section class="institutions-section">
    <div
      class="institutions-wrapper"
      :style="`border: 1px solid ${colors(results.resultado_id)}`"
    >
      <div class="header">
        <span
          >Conocé las instituciones de apoyo emprendedor de tu Provincia</span
        >
      </div>
      <Divider style="margin: 0; padding: 10px 0" />
      <a
        href="https://www.argentina.gob.ar/economia/pymes-emprendedores-y-economia-del-conocimiento/ecosistema-emprendedor/listado-de-organizaciones"
        target="_blank"
        class="body"
      >
        <span>Ingresá aquí</span>
      </a>
    </div>
  </section>
  <section class="remember-section">
    <div
      class="remember-wrapper"
      :style="`border: 1px solid ${colors(results.resultado_id)}`"
    >
      <span class="header" :style="`color: ${colors(results.resultado_id)}`"
        >¡Recordá que cada paso que das en tu camino emprendedor es
        valioso!</span
      ><span class="body" :style="`color: ${colors(results.resultado_id)}`"
        >Usá estos resultados como una guía para crecer y fortalecer tu
        proyecto.</span
      >
    </div>
  </section>
</template>

<script setup>
import Divider from 'primevue/divider'
import { colors } from '@/constants/response/resultColors.js'
defineProps({
  results: Object,
})
</script>

<style lang="scss" scoped>
.institutions-section {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
  @media (min-width: 768px) {
    width: 85%;
  }
  @media (min-width: 1024px) {
    width: 92%;
  }
  @media (min-width: 1440px) {
    width: 95%;
  }
  .institutions-wrapper {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    width: 90%;
    padding: 2%;
    margin-bottom: 15px;
    border-radius: 8px;
    border: 1px solid lightgray;
    overflow: hidden;
    box-shadow:
      #b5b5b5 0px 2px 2px,
      #b5b5b5 0px -2px 2px,
      #b5b5b5 0px 2px 4px,
      #b5b5b5 0px 10px 8px,
      #b5b5b5 0px 0px 2px;
    .header {
      font-weight: 600;
      margin-bottom: 5px;
      font-size: 16px;
      @media (min-width: 1024px) {
        font-size: 22px;
      }
    }
    .body {
      font-weight: 800;
      font-size: 14px;
    }
  }
}

.remember-section {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media (min-width: 768px) {
    width: 85%;
  }
  @media (min-width: 1024px) {
    width: 92%;
  }
  @media (min-width: 1440px) {
    width: 95%;
  }
  .remember-wrapper {
    padding: 3%;
    border-radius: 8px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
    text-align: left;
    width: 90%;
    box-shadow:
      #b5b5b5 0px 2px 2px,
      #b5b5b5 0px -2px 2px,
      #b5b5b5 0px 2px 4px,
      #b5b5b5 0px 10px 8px,
      #b5b5b5 0px 0px 2px;
    .header {
      font-weight: 600;
      margin-bottom: 5px;
      font-size: 16px;
      @media (min-width: 1024px) {
        font-size: 22px;
      }
    }
    .body {
      font-weight: 400;
      font-size: 13px;
      @media (min-width: 1024px) {
        font-size: 15px;
      }
    }
  }
}
</style>
