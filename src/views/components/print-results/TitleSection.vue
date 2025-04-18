<template>
  <section class="title-section">
    <div class="font-semibold title">Resultado del Test de Emprendedores</div>
    <div class="flex justify-baseline items-center w-full gap-2">
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
      <div class="flex flex-col">
        <div
          class="title-text"
          :style="`color: ${colors(results.resultado_id)}`"
        >
          <span class="text"> Sos un /a {{ results.titulo }} </span>
        </div>
        <div
          class="title-text"
          :style="`color: ${colors(results.resultado_id)}`"
        >
          <span class="text">{{ results.subtitulo }}</span>
        </div>
      </div>
    </div>
    <div class="box-wrapper">
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
          class="circle-text"
          :style="`color: ${colors(results.resultado_id)}`"
          >Puntos</span
        >
      </div>

      <div class="scoring-grid">
        <div
          v-for="unitScoring in results.puntajes"
          :key="unitScoring.numero_eje"
          class="scoring-item"
        >
          <div class="scoring-content">
            <div class="scoring-wrapper">
              <div class="scoring-image">
                <img
                  :src="`/src/assets/step-${unitScoring.numero_eje}.svg`"
                  alt="eje1"
                />
              </div>
              <div class="scoring-text">
                Eje {{ unitScoring.numero_eje
                }}<span class="pl-1 mr-0.5">:</span>
                <div>{{ unitScoring.puntaje }} puntos</div>
              </div>
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
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 99%;
  .title {
    color: #242c4f;
    font-size: 25px;
  }
  .image {
    width: 120px;
    margin-top: 30px;
    border-radius: 14px;
  }
  .title-text {
    .text {
      font-weight: 700;
      font-size: 20px;
    }
  }
  .box-wrapper {
    border: 0.5px solid #242c4f;
    width: 100%;
    border-radius: 8px;
    margin-top: 10px;
    padding: 10px 120px;
    background-color: #fafafa;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 95px;
    .circle {
      border-radius: 50%;
      width: 75px;
      height: 75px;
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: center;
      padding-bottom: 15px;
      .circle-number {
        font-weight: 900;
        font-size: 17px;
      }
      .circle-text {
        font-weight: 500;
        font-size: 12px;
      }
    }
    .scoring-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, auto);

      font-size: 11px;
      padding-top: 5px;
      .scoring-item {
        width: 160px;
        .scoring-content {
          font-weight: 600;
          width: 100%;
          height: 100%;
          .scoring-wrapper {
            display: flex;
            justify-content: baseline;
            gap: 5px;
            align-items: center;
            width: 100%;
            height: 100%;
            .scoring-image {
              width: 18px !important;
              height: 18px !important;
            }
            .scoring-text {
              width: 100%;
              display: flex;
              justify-content: flex-start;
              align-items: flex-start;
              height: 35px;
            }
          }
        }
      }
    }
  }

  .result-text {
    padding: 0.5rem 0;
    text-align: left;
    width: 100%;
    font-size: 12px;
  }
}
</style>
