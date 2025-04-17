<template>
  <div>{{ data.titulo }}</div>
  <div v-for="eje in data.preguntas" :key="eje.id">
    {{ eje.texto_pregunta }}
    <div v-for="respuestas in eje.respuestas" :key="respuestas.respuesta_id">
      {{ respuestas.texto_respuesta }} Puntaje: {{ respuestas.puntaje }}
    </div>
  </div>
</template>

<script setup>
defineProps({ data: { type: Object, default: () => [] } })
</script>

<style lang="scss" scoped></style>
