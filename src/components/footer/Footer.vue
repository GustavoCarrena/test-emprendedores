<template>
  <footer class="footer w-full">
    <img
      class="footer-img"
      src="../../assets/footer_logos1.svg"
      alt="logo_footer"
    />
  </footer>
</template>

<script setup></script>

<style lang="scss" scoped>
.footer {
  background-color: #242c4f;
  height: 95px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  @media (min-width: 320px) and (max-width: 1023px) {
    justify-content: center;
  }
  @media (min-width: 1024px) {
    justify-content: left;
  }
  .footer-img {
    height: 50px;
    @media (min-width: 1024px) {
      padding-left: 5%;
      height: 60px;
    }
  }
}
</style>
