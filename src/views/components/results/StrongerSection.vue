<template>
  <section class="stronger-section">
    <div class="stronger-title">Además fortalecete en:</div>
    <div
      v-for="recomendations in results.recomendaciones_adicionales"
      :key="recomendations.id"
      class="box-wrapper"
    >
      <div class="box-header">
        <div class="box-header-title">{{ recomendations.eje }}</div>
      </div>
      <div class="box-body">
        <div class="box-body-content">
          {{ splitTextWithLink(recomendations).before }}
          <a
            v-if="splitTextWithLink(recomendations).link"
            :href="splitTextWithLink(recomendations).link.url"
            target="_blank"
            class="recommendation-link"
          >
            {{ splitTextWithLink(recomendations).link.text }}
          </a>
          {{ splitTextWithLink(recomendations).after }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  results: Object,
})

function splitTextWithLink(item) {
  const index = item.texto.indexOf(item.textoUrl)
  if (index === -1) {
    return { before: item.texto, link: null, after: '' }
  }

  return {
    before: item.texto.substring(0, index),
    link: {
      text: item.textoUrl,
      url: item.url,
    },
    after: item.texto.substring(index + item.textoUrl.length),
  }
}
</script>

<style lang="scss" scoped>
.stronger-section {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  @media (min-width: 768px) {
    width: 85%;
  }
  @media (min-width: 1024px) {
    width: 80%;
  }
  .stronger-title {
    text-align: left;
    align-self: baseline;
    color: #333333;
    font-weight: 600;
    font-size: 21px;
    padding: 0.5rem 0 0.8rem 5%;
    @media (min-width: 1024px) {
      font-size: 24px;
      margin-top: 15px;
    }
  }
  .box-wrapper {
    display: flex;
    flex-flow: column nowrap;
    align-items: baseline;
    justify-content: center;
    width: 90%;
    margin-bottom: 15px;

    .box-header {
      width: 100%;
      font-weight: 600;
      .box-header-title {
        background-color: #3e5a7e;
        color: #fafafa;
        border-radius: 8px 8px 0 0;
        height: max-content;
        padding: 10px 7px;
        font-size: 14px;
        @media (min-width: 1024px) {
          font-size: 17px;
        }
      }
    }
    .box-body {
      background-color: #fafafa;
      border-radius: 0 0 8px 8px;
      .box-body-content {
        font-size: 12px;
        text-align: left;
        padding: 10px;
        @media (min-width: 1024px) {
          font-size: 13.5px;
        }
      }
    }
  }
}
</style>
