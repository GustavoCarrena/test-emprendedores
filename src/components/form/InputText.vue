<script setup>
import InputText from 'primevue/inputtext'

defineProps({
  label: { type: String, default: null },
  name: { type: String, default: null },
  errorMsg: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
})

const model = defineModel()
</script>

<template>
  <div class="flex flex-col items-start gap-0.5">
    <label
      v-if="name === 'phone'"
      class="pl-1 text-sm font-semibold"
      for="inputtext"
      >{{ label }}</label
    >
    <label class="pl-1 text-sm font-semibold" for="inputtext">{{
      label
    }}</label>

    <InputText
      id="inputtext"
      v-model="model"
      class="w-full"
      maxlength="40"
      :name
      :invalid="!!errorMsg"
    />
    <span class="text-red-500 text-xs">{{ errorMsg }}</span>
  </div>
</template>
