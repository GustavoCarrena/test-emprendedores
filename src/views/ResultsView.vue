<template>
  <div class="results-wrapper">
    <section class="title-section">
      <div class="font-semibold title">Resultado del Test de Emprendedores</div>
      <img
        v-if="results.resultado_id == 1"
        src="../assets/results/header1.svg"
        class="image"
        alt="image"
      />
      <img
        v-if="results.resultado_id == 2"
        src="../assets/results/header2.svg"
        class="image"
        alt="image"
      />
      <img
        v-if="results.resultado_id == 3"
        src="../assets/results/header3.svg"
        class="image"
        alt="image"
      />
      <img
        v-if="results.resultado_id == 4"
        src="../assets/results/header4.svg"
        class="image"
        alt="image"
      />
      <div class="title-text" :style="`color: ${colors(results.resultado_id)}`">
        <span class="text"> Sos un /a {{ results.titulo }} </span>
      </div>
      <div class="title-text" :style="`color: ${colors(results.resultado_id)}`">
        <span class="text">{{ results.subtitulo }}</span>
      </div>

      <div class="flex justify-between items-center box-wrapper">
        <div
          class="flex flex-col justify-center items-center circle"
          :style="`border: 3px dashed ${colors(results.resultado_id)}`"
        >
          <span
            class="circle-number"
            :style="`color: ${colors(results.resultado_id)}`"
          >
            {{ results.puntajeTotal }}</span
          >
          <span
            class="circle-text -mt-2"
            :style="`color: ${colors(results.resultado_id)}`"
            >Puntos</span
          >
        </div>
        <div
          class="flex flex-col w-1/2 justify-between text-left items-baseline"
        >
          <div
            v-for="unitScoring in results.puntajes"
            :key="unitScoring.numero_eje"
            class="scoring-wrapper"
          >
            <div
              class="flex justify-baseline w-32 items-center scoring-content"
            >
              <div
                class="scoring-section font-bold w-14 flex justify-around items-center"
              >
                Eje {{ unitScoring.numero_eje }}
                <span class="pl-1 mr-1">:</span>
              </div>
              <div class="scoring-number w-max">
                {{ unitScoring.puntaje }} puntos
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="result-text">{{ results.texto }}</div>
    </section>

    <section class="suggestions-section">
      <div class="suggestions-wrapper">
        <div class="suggestions-title">Recomendaciones:</div>
        <div
          v-for="suggestions in results.recomendaciones"
          :key="suggestions.id"
          class="suggestions-items flex justify-between items-baseline gap-2"
        >
          <i class="pi pi-check icon-check" />
          <span>{{ suggestions.texto }}</span>
        </div>
      </div>
    </section>

    <section class="stronger-section">
      <div class="stronger-title">Además fortalecete en:</div>
      <div
        v-for="recomendations in results.recomendaciones_adicionales"
        :key="recomendations.id"
        class="box-wrapper"
      >
        <div class="box-header">
          <div class="box-header-title">{{ recomendations.eje }}</div>
        </div>
        <div class="box-body">
          <div class="box-body-content">
            {{ splitTextWithLink(recomendations).before }}
            <a
              v-if="splitTextWithLink(recomendations).link"
              :href="splitTextWithLink(recomendations).link.url"
              target="_blank"
              class="recommendation-link"
            >
              {{ splitTextWithLink(recomendations).link.text }}
            </a>
            {{ splitTextWithLink(recomendations).after }}
          </div>
        </div>
      </div>
    </section>

    <section class="books-section">
      <div class="books-title">Libros sugeridos:</div>
      <div v-for="book in results.libros" :key="book.id" class="books-wrapper">
        <div class="books-header">
          <i
            class="pi pi-book book-image"
            :style="`font-size: 1.2rem; color:${colors(results.resultado_id)}`"
          ></i
          ><span>{{ book.nombre }}</span>
        </div>
        <Divider style="padding: 0; margin: 0" />
        <div class="books-body">{{ book.autor }}</div>
      </div>
    </section>

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

    <section class="button-section">
      <Button class="button-home" label="Volvé al Inicio" @click="goToLogin" />
      <Button class="button-download" label="Descargá los resultados" />
    </section>
  </div>
</template>

<script setup>
//quitar cuando se termine de mockear
import { responsesMock } from '@/constants/response/responses'
import 'primeicons/primeicons.css'
import Divider from 'primevue/divider'
import Button from 'primevue/button'
import router from '@/router'

//Descomentar cuando termine de mockear
// const props = defineProps({
//  results: { type: Object, default: () => {} },

// })

const results = responsesMock.data

const goToLogin = () => router.replace({ name: 'login' })

const colors = (resultado_id) => {
  if (resultado_id === 1) return '#2E7D33'
  if (resultado_id === 2) return '#3526C3'
  if (resultado_id === 3) return '#C2185B'
  if (resultado_id === 4) return '#50B7B2'
}
function splitTextWithLink(item) {
  const index = item.texto.indexOf(item.textoUrl)
  if (index === -1) {
    return { before: item.texto, link: null, after: '' }
  }

  return {
    before: item.texto.substring(0, index),
    link: {
      text: item.textoUrl,
      url: item.url,
    },
    after: item.texto.substring(index + item.textoUrl.length),
  }
}
</script>

<style lang="scss" scoped>
.results-wrapper {
  background-color: #f2f2f2;
  color: #333333;
  width: 100%;

  .title-section {
    padding-top: 1rem;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    .title {
      color: #242c4f;
      font-size: 24px;
      width: 90%;
    }
    .image {
      width: 90%;
    }
    .title-text {
      .text {
        font-weight: 700;
        font-size: 26px;
      }
    }
    .box-wrapper {
      border: 1px solid #242c4f;
      width: 90%;
      border-radius: 8px;
      margin-top: 10px;
      padding: 5%;
      background-color: #fafafa;
      .circle {
        border-radius: 50%;
        width: 70px;
        height: 70px;
        padding: 40px;

        .circle-number {
          font-weight: 900;
          font-size: 25px;
        }
        .circle-text {
          font-size: 15px;
          font-weight: 500;
        }
      }
    }
    .result-text {
      padding: 1rem 0;
      font-size: 15px;
      text-align: left;
      width: 90%;
    }
  }

  .suggestions-section {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    width: 100%;

    .suggestions-wrapper {
      display: flex;
      flex-flow: column nowrap;
      align-items: baseline;
      justify-content: center;
      width: 90%;

      .suggestions-title {
        color: #333333;
        font-weight: 600;
        font-size: 21px;
        padding-bottom: 0.5rem;
      }
      .suggestions-items {
        text-align: left;
        padding-bottom: 0.4rem;
        font-size: 13px;
        .icon-check {
          font-size: 10px;
        }
      }
    }
  }

  .stronger-section {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    width: 100%;

    .stronger-title {
      text-align: left;
      align-self: baseline;
      color: #333333;
      font-weight: 600;
      font-size: 21px;
      padding: 0.5rem 0 0.8rem 5%;
    }
    .box-wrapper {
      display: flex;
      flex-flow: column nowrap;
      align-items: baseline;
      justify-content: center;
      width: 90%;
      margin-bottom: 15px;

      .box-header {
        width: 100%;
        font-weight: 600;
        .box-header-title {
          background-color: #3e5a7e;
          color: #fafafa;
          border-radius: 8px 8px 0 0;
          height: max-content;
          padding: 10px 7px;
          font-size: 14px;
        }
      }
      .box-body {
        background-color: #fafafa;
        border-radius: 0 0 8px 8px;
        .box-body-content {
          font-size: 12px;
          text-align: left;
          padding: 10px;
        }
      }
    }
  }

  .books-section {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    .books-title {
      text-align: left;
      align-self: baseline;
      color: #333333;
      font-weight: 600;
      font-size: 21px;
      padding: 0.5rem 0 0.8rem 5%;
    }
    .books-wrapper {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      justify-content: center;
      width: 90%;
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

      .books-header {
        width: 100%;
        font-weight: 600;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
        padding: 2%;
        .book-image {
          margin-bottom: 5px;
        }
      }
      .books-body {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
        padding: 2%;
        font-size: 13px;
        background-color: rgb(227, 227, 227);
        width: 100%;
      }
    }
  }

  .institutions-section {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 10px;
    background-color: #fafafa;
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
    width: 90%;
    margin-left: 5%;
    background-color: #fafafa;
    .remember-wrapper {
      padding: 3%;
      border-radius: 8px;
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
      align-items: center;
      background-color: #fafafa;
      margin: 10px 0;
      text-align: left;
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
      }
      .body {
        font-weight: 400;
        font-size: 13px;
      }
    }
  }

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
