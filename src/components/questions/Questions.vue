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
              'selected-button': selectedButton === answer.respuesta_id,
            }"
            @click="handleButtonClick(answer.respuesta_id)"
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
import { ref } from 'vue'

defineProps({ data: { type: Array, default: () => [] } })

const selectedButton = ref(null)

const handleButtonClick = (id) => {
  selectedButton.value = id
  console.log(`Botón ${id} clickeado`)
}
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
