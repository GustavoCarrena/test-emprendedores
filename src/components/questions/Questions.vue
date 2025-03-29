<template>
  <div v-for="allQuestions in data" :key="allQuestions.pregunta_id">
    <span
      v-for="questions in allQuestions.preguntas"
      :key="questions.pregunta_id"
      class="flex flex-col justify-center items-start"
    >
      <div class="flex justify-baseline items-center">
        <div class="ml-1 mr-3">{{ questions.pregunta_id }}</div>
        <div class="text-left">{{ questions.texto_pregunta }}</div>
      </div>
      <div class="button-wrapper">
        <div v-for="answer in questions.respuestas" :key="answer.respuesta_id">
          <Button
            class="w-100 text-white mt-2 mb-2 button"
            :class="{
              'selected-button':
                selectedButton[questions.pregunta_id] === answer.respuesta_id,
            }"
            @click="
              handleButtonClick(questions.pregunta_id, answer.respuesta_id)
            "
            ><span class="text-left button-text">
              {{ answer.texto_respuesta }}</span
            ></Button
          >
        </div>
      </div>
    </span>
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
.button-wrapper {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 15px;

  .button {
    width: 350px;
    background: #707070;
    border: 1px solid #707070;
    height: 64px;
    font-size: 14px;
    &.selected-button,
    &:active,
    &:hover {
      background: #3e5a7e !important;
      border: 1px solid #3e5a7e !important;
    }
  }
}
</style>
