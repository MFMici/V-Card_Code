<script setup>
import User from '@/request/User.js'
import SingleNotification from "@/components/sections/SingleNotification.vue"
import MainTitle from "@/components/sections/MainTitle.vue"
import NewContactIcon from "@/components/icons/NewContactIcon.vue";
import { where } from '@/components/utils/filters/filters.js';
import { ref } from 'vue';
import WhiteEyeIcon from '@/components/icons/WhiteEyeIcon.vue'

const filteredNotifications = ref([])
const userCollection = ref(await User.getMy()) 
filteredNotifications.value.transfers = where(userCollection.value.transfers, 'notification', true)

const handleRemoval = async (key) => {
  userCollection.value.transfers[key].notification = false
  await User.updateMy(userCollection.value)
  userCollection.value = await User.getMy()
  filteredNotifications.value.transfers = where(userCollection.value.transfers, 'notification', true)
}


</script>

<template>
  <MainTitle title="Notifications" type="" class="mt-55" />

  <div class="space">
    <div class="single-contact__container" @categoryChange="categoryChangeHandler"
      v-if="userCollection.transfers.length > 0 && filteredNotifications.transfers.length > 0" v-for="(contact, key) in userCollection.transfers" v-show="contact.notification === true">
      <div class="single-contact__info" v-if="contact.phone">
        <div class="single-contact__phone">
          <p>{{ contact.phone }}</p>
        </div>
        <div class="single-contact__member">
          <h3>{{ contact.message }} </h3>
        </div>
      </div>
      <div class="single-contact__button">
        <button class="cube-button" @click="handleRemoval(key)">
          <WhiteEyeIcon />
        </button>
      </div>
    </div>
  <div v-else>
    <NewContactIcon />
    <h1 class="t-align-center  primary-font mt-30">Seems like you don't have any notifications</h1>
  </div>
</div></template>