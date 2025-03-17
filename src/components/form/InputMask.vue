<script setup>
import InputMask from 'primevue/inputmask'

const phone = defineModel()
defineProps({
  label: { type: String, default: null },
  name: { type: String, default: null },
})
</script>

<template>
  <div class="flex flex-col items-start gap-0.5">
    <label class="pl-1 text-sm font-semibold" for="phone">
      {{ label }}
      <span style="font-size: 0.6rem">
        (Incluí el
        <a
          href="https://www.argentina.gob.ar/pais/codigo-telefonia"
          target="_blank"
          style="color: blue; text-decoration: underline"
        >
          código de área
        </a>
        sin el número 15)
      </span></label
    >
    <InputMask
      id="phone"
      v-model="phone"
      class="phone"
      name="phone"
      mask="(999) 999-9999"
      placeholder="(123) 456-7890"
      fluid
    />
  </div>
</template>
