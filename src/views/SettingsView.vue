<script setup>
import MainButton from '@/components/buttons/MainButton.vue';
import HeartIcon from "@/components/icons/HeartIcon.vue";
import MainTitle from "@/components/sections/MainTitle.vue";
import DestroyModal from '@/components/modals/DestroyModal.vue';

import { ref } from 'vue'

const openModal = ref(false)


const handlePiggyBankChange = (event) => {
    console.log(event.target.checked)
}

const handleNotificationsChange = (event) => {
    console.log(event.target.checked)
}

</script>

<template>
<DestroyModal v-if="openModal" v-model:ready="isReady" v-model:value="openModal"/>
    <div class="container__direction-column-start">
        <MainTitle title="Settings" type="" class="mt-50" />
        <h1 class="settings__title">General</h1>
        <MainButton class="settings-button mt-20" @click="openModal = true">
            <HeartIcon /> <span class="ml-10">Delete Account</span>
        </MainButton>
        <h1 class="settings__title mt-50">Transactions</h1>
        <div class="settings__switcher">
            <div>
                <h1 class="settings__subtitle">Round Up</h1>
                <p class="settings__subtitle">(It gets stored in the piggy bank vault)</p>
            </div>
            <input type="checkbox" name="piggy" @change="handlePiggyBankChange" />
        </div>
        <h1 class="settings__title mt-50">Notifications</h1>
        <div class="settings__switcher">
            <h1 class="settings__subtitle">Notifications:</h1>
            <input type="checkbox" name="notifications" @change="handleNotificationsChange" />
        </div>
    </div>
</template>