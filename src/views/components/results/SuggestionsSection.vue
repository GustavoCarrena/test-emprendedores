<template>
  <section class="suggestions-section">
    <div class="suggestions-wrapper">
      <div class="suggestions-title">Recomendaciones:</div>
      <div
        v-for="suggestions in results.recomendaciones"
        :key="suggestions.id"
        class="suggestions-items flex justify-between items-baseline gap-2"
      >
        <i class="pi pi-check icon-check" />
        <span>{{ suggestions.texto }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  results: Object,
})
</script>

<style lang="scss" scoped>
.suggestions-section {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  @media (min-width: 768px) {
    width: 85%;
  }
  @media (min-width: 1024px) {
    width: 92%;
  }
  @media (min-width: 1440px) {
    width: 96%;
  }

  .suggestions-wrapper {
    display: flex;
    flex-flow: column nowrap;
    align-items: baseline;
    justify-content: center;
    width: 90%;

    .suggestions-title {
      color: #333333;
      font-weight: 600;
      font-size: 21px;
      padding-bottom: 0.5rem;
      @media (min-width: 1024px) {
        font-size: 24px;
      }
    }
    .suggestions-items {
      text-align: left;
      padding-bottom: 0.4rem;
      font-size: 13px;
      @media (min-width: 1024px) {
        font-size: 16px;
      }
      .icon-check {
        font-size: 10px;
        @media (min-width: 1024px) {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
