<template>
  <div class="section-wrapper">
    <div class="step-title-wrapper">
      <div
        class="aside"
        :style="`background-color:${colors(data.numero_eje)}`"
      ></div>
      <div class="step-title">
        Eje {{ data.numero_eje }} : {{ data.titulo }}
      </div>
    </div>
    <div v-for="eje in data.preguntas" :key="eje.id" class="question-wrapper">
      <div class="questions">
        <div class="pr-1.5">{{ eje.numero_pregunta }}.</div>
        <div>
          {{ eje.texto_pregunta }}
        </div>
      </div>
      <div
        v-for="respuestas in eje.respuestas"
        :key="respuestas.respuesta_id"
        class="answers"
      >
        <div class="answers-content">
          <div
            :class="
              answers.includes(respuestas.respuesta_id)
                ? 'answers-content-response'
                : ''
            "
          >
            {{ respuestas.texto_respuesta }}
          </div>
          <div
            :class="
              answers.includes(respuestas.respuesta_id)
                ? 'answers-content-response'
                : ''
            "
          >
            Puntaje: {{ respuestas.puntaje }}
          </div>
        </div>
        <div class="border-bottom"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { colors } from '@/constants/response/resultColors.js'

defineProps({
  data: { type: Object, default: () => {} },
  answers: { type: Array, default: () => [] },
})
</script>

<style lang="scss" scoped>
.section-wrapper {
  margin-top: 15px;
  display: flex;
  flex-flow: column nowrap;
  align-items: baseline;
  justify-content: baseline;

  .step-title-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    background-color: #dddddd;
    border-radius: 4px;
    height: 30px;
    .aside {
      width: 15px;
      height: 100%;
      border-radius: 4px 0 0 4px;

      opacity: 0.9;
    }
    .step-title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-weight: 700;
      font-size: 15px;
      height: 100%;
      padding: 5px 0 20px 3px;
    }
  }

  .question-wrapper {
    width: 100%;
    padding: 5px 0 5px 20px;
    .questions {
      font-size: 11px;
      font-weight: 500;
      margin-bottom: 5px;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: baseline;
    }

    .answers {
      padding-left: 15px;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: baseline;
      .answers-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 9px;
        font-weight: 400;
        width: 100%;
        padding-right: 5px;
        padding-bottom: 5px;
      }
      .answers-content-response {
        font-weight: 700;
        color: #155c24;
      }
      .border-bottom {
        border-top: 0.1px solid lightgrey;
        width: 99%;
      }
    }
  }
}
</style>
