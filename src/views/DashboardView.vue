<script setup>
import MainButton from "@/components/buttons/MainButton.vue";
import MainMenu from "@/components/layouts/MainMenu.vue";
import BellIcon from "@/components/icons/BellIcon.vue";
import ChartIcon from "@/components/icons/ChartIcon.vue";
import PiggyBankIcon from "@/components/icons/PiggyBankIcon.vue";

</script>

<template>
  <div class="dashboard__main-container">
    <MainMenu />
    <div class="container__direction-column-start">
      <div class="dashboard__container-top">
        <div class="dashboard__row-upper">
          <div class="dashboard__container-top-content t-align-left"> Dashboard </div>
          <div class="dashboard__container-top-content content-align-right"><img class="single-contact__avatar"
              src="https://avatar.iran.liara.run/public/40" alt="avatar">
          </div>
        </div>
        <div class="dashboard__row-bottom">
          <div class="dashboard__container-top-content">
            <p class="t-align-left dashboard__user">Hi, David</p>
            <p class="t-align-left dashboard__total-balance">Total Balance</p>
            <h1 class="t-align-left dashboard__balance">$2064.59</h1>
          </div>
          <div class="dashboard__container-top-content">
            <div class="dashboard__icons">
              <ChartIcon />
              <PiggyBankIcon />
              <BellIcon />
            </div>
          </div>
        </div>
      </div>
      <div style="z-index: 9999;">
        <h1>ola</h1>
        <h1>ola</h1>
        <h1>ola</h1>
        <h1>ola</h1>
      </div>
      </div>
    </div>
</template>
