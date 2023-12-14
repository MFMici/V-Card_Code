<script setup>
import MainButton from '@/components/buttons/MainButton.vue';
import HeartIcon from "@/components/icons/HeartIcon.vue";
import MainTitle from "@/components/sections/MainTitle.vue";
import DestroyModal from '@/components/modals/DestroyModal.vue';
import { ref } from 'vue'
import User from '@/request/User.js'

const openModal = ref(false)
const userCollection = await User.getMy()


const handlePiggyBankChange = (event) => {
    localStorage.setItem('piggyBankChecked', event.target.checked)
}

const handleNotificationsChange = async (event) => {
    userCollection.notificationChecked = event.target.checked
    await User.updateMy(userCollection)
    localStorage.setItem('notificationsChecked', event.target.checked)
}

const getNotificationsChecked = localStorage.getItem('notificationsChecked') === 'true';
const getPiggyBankChecked = localStorage.getItem('piggyBankChecked') === 'true';

</script>

<template>
<DestroyModal v-if="openModal" v-model:ready="isReady" v-model:value="openModal" />
    <div class="container__direction-column-start">
        <MainTitle title="Settings" type="" class="mt-50" />
        <h1 class="settings__title">General</h1>
        <MainButton class="settings-button mt-20" @click="openModal = true" :disabled="userCollection.spendable_balance > 0 || userCollection.deposit_balance > 0">
            <HeartIcon /> <span class="ml-10">Delete Account</span>
        </MainButton>
        <span class="input__error-text" v-if="userCollection.spendable_balance > 0 || userCollection.deposit_balance > 0">You cant delete an account that still has balance</span>
        <h1 class="settings__title mt-50">Transactions</h1>
        <div class="settings__switcher">
            <div>
                <h1 class="settings__subtitle">Round Up</h1>
                <p class="settings__subtitle">(It gets stored in the piggy bank vault)</p>
            </div>
            <input type="checkbox" name="piggy" :checked="getPiggyBankChecked" @change="handlePiggyBankChange" />
        </div>
        <h1 class="settings__title mt-50">Notifications</h1>
        <div class="settings__switcher">
            <h1 class="settings__subtitle">Notifications:</h1>
            <input type="checkbox" name="notifications" :checked="getNotificationsChecked" @change="handleNotificationsChange" />
        </div>
    </div>
</template>