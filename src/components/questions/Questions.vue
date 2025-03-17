<template>
  <div class="flex justify-baseline items-baseline">
    <span class="ml-1 mr-3">1.</span>
    <span class="text-left"
      >¿Por qué crées que tu idea es una oportunidad de negocios?</span
    >
  </div>
  <div v-for="button in buttonArray" :key="button.id" class="button-wrapper">
    <Button
      class="w-100 text-white mt-2 mb-2 button"
      :class="{ 'selected-button': selectedButton === button.id }"
      @click="handleButtonClick(button.id)"
      ><span class="text-left button-text"> {{ button.content }}</span></Button
    >
  </div>
</template>

<script setup>
import Button from 'primevue/button'
import { ref } from 'vue'
const buttonArray = [
  {
    id: '1.1',
    content: 'Creo que puede tener potencial, pero necesito validar la idea',
  },
  {
    id: '1.2',
    content:
      'Verifiqué que satisface una necesidad o deseo claro en el mercado ',
  },
  {
    id: '1.3',
    content:
      'Quiero emprender algo, pero no tengo claro si  hay demanda o valor ',
  },
]

const selectedButton = ref(null)

const handleButtonClick = (id) => {
  selectedButton.value = id
  console.log(`Botón ${id} clickeado`)
  // Aquí podrías agregar lógica para manejar la selección del usuario
}
</script>

<style lang="scss" scoped>
.button-wrapper {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  .button {
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
