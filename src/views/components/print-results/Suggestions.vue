<template>
  <section class="suggestions-section">
    <div class="suggestions-wrapper">
      <div class="suggestions-title">Recomendaciones:</div>
      <div
        v-for="suggestions in results.recomendaciones"
        :key="suggestions.id"
        class="suggestions-items flex justify-between items-baseline gap-2"
      >
        <span>* {{ suggestions.texto }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  results: { type: Object, default: () => {} },
})
</script>

<style lang="scss" scoped>
.suggestions-section {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-left: 35px;
  padding-top: 10px;

  .suggestions-wrapper {
    display: flex;
    flex-flow: column nowrap;
    align-items: baseline;
    justify-content: center;
    width: 100%;

    .suggestions-title {
      color: #333333;
      font-weight: 600;
      padding-bottom: 0.5rem;
      font-size: 15px;
    }
    .suggestions-items {
      text-align: left;
      padding-bottom: 0.4rem;
      font-size: 10px;
    }
  }
}
</style>
