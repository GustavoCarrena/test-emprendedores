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
      <div class="question-text">
        <div class="ml-1 mr-3">{{ questions.pregunta_id }}</div>
        <div class="text-left">{{ questions.texto_pregunta }}</div>
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
          ><span class="text-left button-text">
            {{ answer.texto_respuesta }}</span
          ></Button
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
  width: 100%;
  .question-box {
    padding: 5px 0;
    @media (max-width: 529px) {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      width: 100%;
    }
    .question-text {
      display: flex;
      flex-flow: row nowrap;
      justify-content: baseline;
      align-items: baseline;
      width: 100%;
      font-weight: 600;
      padding: 5px 0;
      @media (max-width: 529px) {
        font-size: 0.9rem;
      }
    }

    .button-wrapper {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      width: 85%;
      gap: 15px;

      .button {
        background: #707070 !important;
        border: 1px solid #707070 !important;
        height: 64px;
        width: 100%;
        font-size: 14px;
        &.selected-button,
        &:active,
        &:hover {
          background: #3e5a7e !important;
          border: 1px solid #3e5a7e !important;
        }
        @media (max-width: 529px) {
          font-size: 0.8rem;
        }
      }
    }
  }
}
</style>
