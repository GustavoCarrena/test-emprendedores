<template>
  <div class="books-title">Libros sugeridos:</div>
  <section class="books-section">
    <div v-for="book in results.libros" :key="book.id" class="books-wrapper">
      <div class="books-header">
        <i
          class="pi pi-book book-image"
          :style="`color:${colors(results.resultado_id)}`"
        ></i
        ><span class="book-header-title">{{ book.nombre }}</span>
      </div>
      <Divider style="padding: 0; margin: 0" />
      <div class="books-body">{{ book.autor }}</div>
    </div>
  </section>
  <section class="remember-section">
    <div
      class="remember-wrapper"
      :style="`border: 1px solid ${colors(results.resultado_id)}`"
    >
      <span class="header" :style="`color: ${colors(results.resultado_id)}`"
        >¡Recordá que cada paso que das en tu camino emprendedor es
        valioso!</span
      ><span class="body" :style="`color: ${colors(results.resultado_id)}`"
        >Usá estos resultados como una guía para crecer y fortalecer tu
        proyecto.</span
      >
    </div>
  </section>
</template>

<script setup>
import Divider from 'primevue/divider'
import { colors } from '@/constants/response/resultColors.js'
defineProps({
  results: Object,
})
</script>

<style lang="scss" scoped>
.books-title {
  text-align: left;
  align-self: baseline;
  color: #333333;
  font-weight: 600;
  font-size: 15px;
  padding: 0.5rem 0 0.8rem 3px;
  margin-top: -15px;
  margin-bottom: 10px;
}
.books-section {
  // display: flex;
  // flex-flow: column nowrap;
  // align-items: center;
  // justify-content: center;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 15px;
  justify-items: flex-start;
  align-items: center;

  .books-wrapper {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: flex-start;
    width: 190px;
    border-radius: 10px;
    border: 1px solid lightgray;
    overflow: hidden;

    .books-header {
      width: 100%;
      height: 100px;
      padding: 0 5px 15px 5px;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      justify-content: baseline;

      .book-header-title {
        font-weight: 600;
        font-size: 9px;
        text-align: center;
        margin-top: 8px;
      }
      .book-image {
        margin-bottom: 5px;
        font-size: 1.4rem;
      }
    }
    .books-body {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      justify-content: center;
      padding: 5px 0 15px 0;
      font-size: 9px;
      background-color: rgb(227, 227, 227);
      width: 100%;
      font-weight: 600;
    }
  }
}

.remember-wrapper {
  padding: 0 15px 10px 0;
  border-radius: 8px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0 0 0;
  text-align: left;
  width: 80%;
  align-self: center;
  justify-self: center;
  border-style: outset;
  .header {
    font-weight: 600;
    margin-bottom: 5px;
    font-size: 14px;
  }
  .body {
    font-weight: 400;
    font-size: 11px;
  }
}
</style>
