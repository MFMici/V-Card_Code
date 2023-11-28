<script setup>
import MainButton from "@/components/buttons/MainButton.vue";
import BellIcon from "@/components/icons/BellIcon.vue";
import ChartIcon from "@/components/icons/ChartIcon.vue";
import PiggyBankIcon from "@/components/icons/PiggyBankIcon.vue";
import { getAuth } from "firebase/auth";
import { removeEmail } from '@/components/utils/hydration/dataFormater.js';
import SingleContact from "@/components/sections/SingleContact.vue"

const contacts = [{
  date: "Jun 21, 10:24h",
  phone: "+968 678 209",
  member: "+968 678 209"
}, {
  date: "Jun 21, 10:24h",
  phone: "+968 678 209",
  member: "+968 678 209"
}, {
  date: "Jun 21, 10:24h",
  phone: "+968 678 209",
  member: "+968 678 209"
}]
</script>

<template>
  <div class="container__direction-column-start">
    <div class="dashboard__container-top">
      <div class="dashboard__row-upper">
        <div class="dashboard__container-top-content t-align-left"> Dashboard </div>
        <div class="dashboard__container-top-content content-align-right"><img
class="single-contact__avatar"
            src="https://avatar.iran.liara.run/public/40" alt="avatar">
        </div>
      </div>
      <div class="dashboard__row-bottom">
        <div class="dashboard__container-top-content">
          <p class="t-align-left dashboard__user">Hi, {{ removeEmail(getAuth().currentUser.email) }}</p>
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
    <MainButton class="secondary-button mt-30 color-black" :to="{ name: 'Dashboard' }">Send Money</MainButton>
    <div class="mt-30 dashboard__row-upper">
      <div class="dashboard__container-top-content t-align-left color-black font-thin"> Last Transactions </div>
      <div class="dashboard__container-top-content content-align-right">
        <router-link class="color-blue font-thin" :to="{ name: 'Dashboard' }"> View all</router-link>
      </div>
    </div>
    <SingleContact
      v-for="(contact, key) in contacts" :key="key" 
      :member="contact.member"
      :phone="contact.phone ? contact.phone : contact.tel"
      :date="contact.date"
      :isTransaction="true" 
      
      />
  </div>
</template>

