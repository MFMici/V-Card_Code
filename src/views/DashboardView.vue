<script setup>
import MainButton from "@/components/buttons/MainButton.vue";
import BellIcon from "@/components/icons/BellIcon.vue";
import ChartIcon from "@/components/icons/ChartIcon.vue";
import PiggyBankIcon from "@/components/icons/PiggyBankIcon.vue";
import SingleContact from "@/components/sections/SingleContact.vue"
import User from '@/request/User.js'
import NewContactIcon from "@/components/icons/NewContactIcon.vue";
import { orderBy, limit } from '@/components/utils/filters/filters.js';

const userCollection = await User.getMy()

const orderdTransactions = limit(orderBy(userCollection.transfers, 'createdAt', 'desc'), 4)

</script>

<template>
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
          <p class="t-align-left dashboard__user">Hi, {{ userCollection.phone }}</p>
          <p class="t-align-left dashboard__total-balance">Total Balance</p>
          <h1 class="t-align-left dashboard__balance">{{ userCollection.deposit_balance + userCollection.spendable_balance
          }} €</h1>
        </div>
        <div class="dashboard__container-top-content">
          <div class="dashboard__icons">
            <router-link :to="{ name: 'PiggyBank' }">
              <PiggyBankIcon />
            </router-link>
            <router-link :to="{ name: 'Notifications' }">
              <BellIcon />
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <MainButton class="secondary-button mt-30 color-black" :to="{ name: 'SendMoney', params: { type: 'N' } }">Send Money
    </MainButton>
    <div class="mt-30 dashboard__row-upper">
      <div class="dashboard__container-top-content t-align-left color-black font-thin"> Last Transactions </div>
      <div class="dashboard__container-top-content content-align-right">
        <router-link class="color-blue font-thin" :to="{ name: 'Transactions' }"> View all</router-link>
      </div>
    </div>
    <div class="space">
      <SingleContact v-if="orderdTransactions.length > 0" v-for="(contact, key) in orderdTransactions" :key="key"
        :member="null" :phone="contact.phone ? contact.phone : contact.tel" :date="contact.createdAt" :type="contact.type"
        :isTransaction="true" :money="contact.payment" :balance="contact.balance_after" />
      <div v-else>
        <NewContactIcon />
        <h1 class="t-align-center  primary-font mt-30">Seems like you don't have any moviments in your account</h1>
      </div>
    </div>
  </div>
</template>

