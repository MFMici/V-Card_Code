<script setup>
import User from '@/request/User.js'
import SingleNotification from "@/components/sections/SingleNotification.vue"
import MainTitle from "@/components/sections/MainTitle.vue"
import NewContactIcon from "@/components/icons/NewContactIcon.vue";


const userCollection = await User.getMy()

if (!userCollection.notifications) {
  userCollection.notifications = [];
}

</script>

<template>
    <MainTitle title="Notifications" type="" class="mt-55" />
    
    <div class="space">
        <SingleNotification
      v-show="contact.title !== ''"
      v-if="userCollection.notifications.length > 0"
      v-for="(contact, key) in userCollection.notifications"
      :key="key"
      :member="null"
      :title="contact.title"
      :body="contact.body"
    />
    <div v-else>
        <NewContactIcon />
        <h1 class="t-align-center  primary-font mt-30">Seems like you don't have any notifications</h1>
    </div>
    </div>

</template>