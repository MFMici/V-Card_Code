<script setup>
import LogoSquare from '@/components/logo/LogoSquare.vue';
import MainButton from '@/components/buttons/MainButton.vue';
</script>

<template>
  <div class="home__container">
    <div class="home__container-inner">
      <div class="home__container-content">
        <LogoSquare />
      </div>
      <h1 class="home__container-slogan fade-in">The Best Way To <span class="home__container-slogan-bold">Transfer
          Money</span> Safely</h1>
      <div class="home__container-buttons fade-in">
        <MainButton class="fade-in primary-button" :to="{ name: 'Register' }">Create new account</MainButton>
        <MainButton class="fade-in sub-button" :to="{ name: 'Home' }">Already have an account?</MainButton>
      </div>
    </div>
  </div>
</template>
