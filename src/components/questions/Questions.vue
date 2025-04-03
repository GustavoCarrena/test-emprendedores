<template>
  <div
    v-for="allQuestions in data"
    :key="allQuestions.pregunta_id"
    class="question-wrapper flex flex-col justify-between items-start"
  >
    <div
      v-for="questions in allQuestions.preguntas"
      :key="questions.pregunta_id"
      class="question-box"
    >
      <div class="question-text-wrapper">
        <div class="question-number">{{ questions.pregunta_id }}.</div>
        <div class="question-text">{{ questions.texto_pregunta }}</div>
      </div>

      <div
        v-for="answer in questions.respuestas"
        :key="answer.respuesta_id"
        class="button-wrapper"
      >
        <Button
          class="text-white mt-2 mb-2 button"
          :class="{
            'selected-button':
              selectedButton[questions.pregunta_id] === answer.respuesta_id,
          }"
          @click="handleButtonClick(questions.pregunta_id, answer.respuesta_id)"
          ><span> {{ answer.texto_respuesta }}</span></Button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button'
import { ref, watch } from 'vue'

defineProps({ data: { type: Array, default: () => [] } })

const payloadModel = defineModel()

const selectedButton = ref({})

const handleButtonClick = (questionId, answerId) => {
  if (!Array.isArray(payloadModel.value)) {
    payloadModel.value = []
  }
  payloadModel.value = [
    ...payloadModel.value.filter(
      (id) => id !== selectedButton.value[questionId]
    ),
    answerId,
  ].sort((a, b) => a - b)
  selectedButton.value = { ...selectedButton.value, [questionId]: answerId }
}

watch(
  () => selectedButton,
  () => {
    console.log(payloadModel.value)
  },
  { immediate: true, deep: true }
)
</script>

<style lang="scss" scoped>
.question-wrapper {
  width: 90vw;
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 75vw;
  }
  .question-box {
    padding: 5px 0;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    .question-text-wrapper {
      display: flex;
      flex-flow: row nowrap;
      justify-content: baseline;
      align-items: baseline;
      width: 100%;
      font-weight: 800;
      padding: 5px 0;
      font-size: 0.9rem;

      @media (min-width: 768px) and (max-width: 1023px) {
        font-size: 1.15rem;
      }
      .question-number {
        margin-left: -0.8rem;
        margin-right: 0.8rem;
      }
      .question-text {
        text-align: left;
        width: 95%;
      }
    }

    .button-wrapper {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      width: 100%;
      gap: 15px;
      @media (min-width: 768px) and (max-width: 1023px) {
        align-items: left;
        padding-right: 5%;
      }

      .button {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        justify-content: left;
        background: #707070 !important;
        border: 1px solid #707070 !important;
        height: 75px;
        width: 100%;
        font-size: 0.82rem;
        text-align: left;
        &.selected-button,
        &:active,
        &:hover {
          background: #3e5a7e !important;
          border: 1px solid #3e5a7e !important;
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          font-size: 1rem;
          // text-align: center;
        }
      }
    }
  }
}
</style>
