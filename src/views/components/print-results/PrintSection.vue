<template>
  <div
    class="h-full flex flex-col justify-start items-start relative"
    style="min-height: 1048px; border: 0.1px solid #dddddd; border-radius: 4px"
  >
    <div class="header">
      <img
        src="/src/assets/header_secretaria.svg"
        alt="Encabezado"
        class="header-img"
      />
    </div>
    <div class="pl-2">
      <slot />
    </div>
    <footer class="footer w-full mt-auto">
      <img
        class="footer-img"
        src="/src/assets/footer_logos1.svg"
        alt="logo_footer"
      />
    </footer>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.header {
  margin-bottom: 10px;
}

.header-img {
  height: 50px;
}

.footer {
  background-color: #242c4f;
  height: 50px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: left;
  justify-self: end;
  border-radius: 0 0 4px 4px;
  position: absolute;
  bottom: 0;
  .footer-img {
    padding-left: 5%;
    height: 30px;
  }
}
</style>
