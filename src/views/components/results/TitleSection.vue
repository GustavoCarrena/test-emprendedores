<template>
  <section class="title-section">
    <div class="font-semibold title">Resultado del Test de Emprendedores</div>
    <img
      v-if="results.resultado_id == 1"
      src="@/assets/results/header1.svg"
      class="image"
      alt="image"
    />
    <img
      v-if="results.resultado_id == 2"
      src="@/assets/results/header2.svg"
      class="image"
      alt="image"
    />
    <img
      v-if="results.resultado_id == 3"
      src="@/assets/results/header3.svg"
      class="image"
      alt="image"
    />
    <img
      v-if="results.resultado_id == 4"
      src="@/assets/results/header4.svg"
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
      <div class="flex flex-col w-1/2 justify-between text-left items-baseline">
        <div
          v-for="unitScoring in results.puntajes"
          :key="unitScoring.numero_eje"
          class="scoring-wrapper"
        >
          <div class="flex justify-baseline w-32 items-center scoring-content">
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
</template>

<script setup>
import { colors } from '@/constants/response/resultColors.js'
defineProps({
  results: Object,
})
</script>

<style lang="scss" scoped>
.title-section {
  padding-top: 1rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
    width: 85%;
  }
  @media (min-width: 1440px) {
    width: 80%;
  }
  .title {
    color: #242c4f;
    font-size: 24px;
    width: 90%;
    @media (min-width: 768px) {
      font-size: 32px;
    }
    @media (min-width: 1024px) {
      font-size: 36px;
    }
    @media (min-width: 1440px) {
      font-size: 40px;
    }
  }
  .image {
    width: 70%;
    @media (min-width: 500px) {
      width: 50%;
    }
    @media (min-width: 768px) {
      width: 45%;
    }
    @media (min-width: 1440px) {
      width: 40%;
    }
  }
  .title-text {
    .text {
      font-weight: 700;
      font-size: 26px;
      @media (min-width: 1024px) {
        font-size: 32px;
      }
      @media (min-width: 1440px) {
        font-size: 36px;
      }
    }
  }
  .box-wrapper {
    border: 1px solid #242c4f;
    width: 90%;
    border-radius: 8px;
    margin-top: 10px;
    padding: 5%;
    background-color: #fafafa;
    @media (min-width: 1024px) {
      width: 85%;
      padding: 2% 11rem;
    }
    @media (min-width: 1400px) {
      padding: 2% 14rem;
      width: 70%;
    }
    .circle {
      border-radius: 50%;
      width: 70px;
      height: 70px;
      padding: 40px;
      @media (min-width: 1024px) {
        width: 100px;
        height: 100px;
      }

      .circle-number {
        font-weight: 900;
        font-size: 25px;
        @media (min-width: 1024px) {
          font-size: 30px;
        }
      }
      .circle-text {
        font-size: 15px;
        font-weight: 500;
        @media (min-width: 1024px) {
          font-size: 20px;
        }
      }
    }
  }
  .result-text {
    padding: 1rem 0;
    font-size: 15px;
    text-align: left;
    width: 90%;
    @media (min-width: 1024px) {
      width: 70%;
      font-size: 16px;
      margin-bottom: 15px;
    }
  }
}
</style>
