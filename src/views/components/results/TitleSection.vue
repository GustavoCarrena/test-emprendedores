<template>
  <section class="title-section">
    <div class="font-semibold title">Resultado del Test de Emprendedores</div>
    <div class="img-title-wrapper">
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
        <span class="text">{{ results.subtitulo }}</span>
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
          class="circle-text -mt-2"
          :style="`color: ${colors(results.resultado_id)}`"
          >Puntos</span
        >
      </div>
      <div class="ejes-wrapper">
        <div
          v-for="unitScoring in results.puntajes"
          :key="unitScoring.numero_eje"
          class="scoring-wrapper"
        >
          <div class="scoring-content">
            <div class="scoring-image">
              <img
                :src="`/src/assets/step-${unitScoring.numero_eje}.svg`"
                alt="eje1"
              />
            </div>
            <div class="scoring-number w-max">
              Eje {{ unitScoring.numero_eje }}
              <span class="pl-1 mr-1">:</span>

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
  // border: 1px solid red;
  padding-top: 1rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
    width: 85%;
  }

  @media (min-width: 1440px) {
    width: 88%;
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
      width: 100%;
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
      align-items: flex-start;
    }
    @media (min-width: 1440px) {
      font-size: 40px;
    }
  }
  .img-title-wrapper {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    width: 90%;
    @media (min-width: 1024px) {
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
    }
    .image {
      width: 70%;
      @media (min-width: 500px) {
        width: 50%;
      }
      @media (min-width: 768px) {
        width: 45%;
      }

      @media (min-width: 1024px) {
        width: 250px;
        margin-top: 30px;
        border-radius: 14px;
      }
      @media (min-width: 1200px) {
        width: 300px;
      }
    }
    .title-text {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      .text {
        font-weight: 700;
        font-size: 18px;
        @media (min-width: 768px) {
          font-size: 27px;
        }
        @media (min-width: 1024px) {
          font-size: 29px;
        }
        @media (min-width: 1200px) {
          font-size: 33px;
        }
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
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (min-width: 1024px) {
      width: 98%;
      padding: 2% 5rem;
    }

    @media (min-width: 1400px) {
      padding: 2% 15rem;
      width: 100%;
    }
    .circle {
      border-radius: 50%;
      width: 70px;
      height: 70px;
      padding: 40px;
      @media (min-width: 1024px) {
        width: 125px;
        height: 125px;
      }
      @media (min-width: 1200px) {
        width: 150px;
        height: 150px;
      }

      .circle-number {
        font-weight: 900;
        font-size: 25px;
        @media (min-width: 1024px) {
          font-size: 34px;
        }
        @media (min-width: 1200px) {
          font-size: 40px;
        }
      }
      .circle-text {
        font-size: 15px;
        font-weight: 500;
        @media (min-width: 1024px) {
          font-size: 20px;
        }
        @media (min-width: 1200px) {
          font-size: 22px;
        }
      }
    }
    .ejes-wrapper {
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
      text-align: left;
      width: 55%;

      @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        width: 80%;
      }
      @media (min-width: 1200px) {
        width: 70%;
      }

      .scoring-wrapper {
        .scoring-content {
          width: 100%;
          font-weight: 700;
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-evenly;
          align-items: center;
          height: 40px;
          @media (min-width: 1024px) {
            justify-content: flex-end;
            height: 50px;
          }
          @media (min-width: 1200px) {
            justify-content: center;
            height: 70px;
          }
          .scoring-image {
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: baseline;
            align-items: center;
            @media (min-width: 1024px) {
              margin-right: 5px;

              img {
                width: 95%;
                height: 95%;
              }
            }
            @media (min-width: 1200px) {
              width: 35px;
              height: 35px;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
          .scoring-number {
            @media (min-width: 1024px) {
              font-size: 18px;
              width: 180px;
            }
            @media (min-width: 1200px) {
              font-size: 20px;
            }
          }
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
      width: 98%;
      font-size: 16px;
      margin-bottom: 15px;
    }
    @media (min-width: 1200px) {
      font-size: 18px;
    }
  }
}
</style>
