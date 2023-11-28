<script setup>
import LogoSquare from "@/components/logo/LogoSquare.vue";
import MainButton from "@/components/buttons/MainButton.vue";
import MainMenu from "@/components/layouts/MainMenu.vue";
import MainContainer from "@/components/containers/MainContainer.vue";
</script>

<template>
  <div class="dashboard__main-container">
    <MainMenu />
    <div class="container__direction-column">
    <!-- Parte azul do topo -->
      <div class="dashboard__container-top">
        <div class="dashboard__container-top-content"> David </div>
        <!-- Falta por os svgs e etc -->
      </div>
      <!-- Parte branca (resto do ecra) -->
      <!-- Botão "Send Money" -->
      <MainButton class="secondary-button">
        <span>Send Money</span>
      </MainButton>

        <!-- <MainButton class="secondary-button" type="submit">BotaoFixe</MainButton> -->
      <!-- Necessario um div para "mostrar os contactos" -->

      <!-- No final, ter um modal com os outros 4 icons -->
    </div>
  </div>
</template>
