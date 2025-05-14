<template>
  <div
    v-for="allQuestions in data"
    :key="allQuestions.pregunta_id"
    class="question-wrapper flex flex-col justify-between items-start pt-4"
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

      <div class="button-wrapper">
        <div
          v-for="answer in questions.respuestas"
          :key="answer.respuesta_id"
          class="button-box"
        >
          <Button
            class="text-white mt-2 mb-2 button"
            :class="{
              'selected-button':
                selectedButton[questions.pregunta_id] === answer.respuesta_id,
            }"
            @click="
              handleButtonClick(questions.pregunta_id, answer.respuesta_id)
            "
            ><span> {{ answer.texto_respuesta }}</span></Button
          >
        </div>
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
  background: #f6f6f6;
  padding: 1% 5%;
  border-radius: 8px;
  margin-top: 10px;
  @media (min-width: 768px) {
    width: 85vw;
    justify-self: center;
  }

  .question-box {
    padding: 5px 0;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    display: flex;

    .question-text-wrapper {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: baseline;
      width: 100%;
      font-weight: 800;
      padding: 5px 0;
      font-size: 0.94rem;
      margin-top: 10px;
      @media (min-width: 768px) {
        font-size: 1.15rem;
      }
      .question-number {
        margin-right: 0.4rem;
      }
      .question-text {
        text-align: left;
        width: 95%;
        @media (min-width: 1440px) {
          width: 100%;
        }
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
      @media (min-width: 1024px) {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: 1fr;
      }
      .button-box {
        width: 100%;
        .button {
          display: flex;
          height: 90px;
          width: 100%;
          flex-flow: row nowrap;
          align-items: center;
          justify-content: left;
          background: #707070 !important;
          border: 1px solid #707070 !important;
          font-size: 0.85rem;
          text-align: left;
          &.selected-button,
          &:active,
          &:hover {
            background: #3e5a7e !important;
            border: 1px solid #3e5a7e !important;
          }
          @media (min-width: 1024px) {
            height: 130px;
            font-size: 1rem;
            padding: 2%;
          }
        }
      }
    }
  }
}
</style>
