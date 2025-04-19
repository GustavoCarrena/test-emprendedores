<template>
  <div class="books-title">Libros sugeridos:</div>
  <section class="books-section">
    <div v-for="book in results.libros" :key="book.id" class="books-wrapper">
      <div class="books-header">
        <i
          class="pi pi-book book-image"
          :style="`color:${colors(results.resultado_id)}`"
        ></i
        ><span>{{ book.nombre }}</span>
      </div>
      <Divider style="padding: 0; margin: 0" />
      <div class="books-body">{{ book.autor }}</div>
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
  font-size: 21px;
  padding: 0.5rem 0 0.8rem 5%;
  @media (min-width: 768px) {
    padding: 0.5rem 0 0.8rem 12%;
  }
  @media (min-width: 1024px) {
    font-size: 24px;
    margin-top: 15px;
    padding: 0.5rem 0 0.8rem 8.5%;
  }
  @media (min-width: 1440px) {
    padding: 0.5rem 0 0.8rem 7%;
  }
}
.books-section {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (min-width: 768px) {
    width: 75%;
    margin-bottom: 35px;
    @media (min-width: 1024px) {
      width: 84%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 10px;
      justify-items: center;
    }
    @media (min-width: 1200px) {
      grid-template-columns: 1fr 1fr 1fr;
      gap: 15px;
      justify-content: flex-start;
      width: 83%;
    }
    @media (min-width: 1440px) {
      width: 86%;
    }
  }

  .books-wrapper {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    width: 90%;
    margin-bottom: 15px;
    border-radius: 8px;
    border: 1px solid lightgray;
    overflow: hidden;
    box-shadow:
      #b5b5b5 0px 2px 2px,
      #b5b5b5 0px -2px 2px,
      #b5b5b5 0px 2px 4px,
      #b5b5b5 0px 10px 8px,
      #b5b5b5 0px 0px 2px;
    @media (min-width: 1024px) {
      width: 100%;
      max-width: 410px;
    }

    .books-header {
      width: 100%;
      font-weight: 600;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      justify-content: center;
      padding: 2%;
      @media (min-width: 1024px) {
        font-size: 15px;
        // border: 1px solid blue;
        height: 120px;
      }
      .book-image {
        margin-bottom: 5px;
        font-size: 1.4rem;
        @media (min-width: 1024px) {
          font-size: 1.6rem;
        }
      }
    }
    .books-body {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      justify-content: center;
      padding: 2%;
      font-size: 13px;
      background-color: rgb(227, 227, 227);
      width: 100%;
      @media (min-width: 1024px) {
        font-size: 14px;
      }
    }
  }
}
</style>
