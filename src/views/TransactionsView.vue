<script setup>
import MainTitle from "@/components/sections/MainTitle.vue"
import SingleContact from "@/components/sections/SingleContact.vue"
import User from '@/request/User.js'
import NewContactIcon from "@/components/icons/NewContactIcon.vue";
import { orderBy, where, whereBetweenDates } from '@/components/utils/filters/filters.js';
import { ref, computed } from 'vue'
import { showErrorAlert } from '@/components/alerts/sweetAlerts.js'

const userCollection = await User.getMy()
const filteredCollection = ref([])
const startDate = ref('');
const endDate = ref('');
const orderActive = ref('asc');
const filterActive = ref('');
const dateActive = ref(false);
const orderValueActive = ref('');

filteredCollection.value = { ...userCollection }


const resetFilters = () => {
    startDate.value = '';
    endDate.value = '';
    orderActive.value = 'asc';
    filterActive.value = '';
    dateActive.value = false;
    orderValueActive.value = '';
    filteredCollection.value = { ...userCollection }
}

const filterBy = (field, value) => {
    filterActive.value = value;
    filteredCollection.value.transfers = where(userCollection.transfers, field, value)
}

const orderByDate = (order) => {
    orderActive.value = order;
    orderValueActive.value = ''
    filteredCollection.value.transfers = orderBy(filteredCollection.value.transfers, 'createdAt', order)
}

const orderByValue = (order) => {
    orderValueActive.value = order;
    orderActive.value = ''
    filteredCollection.value.transfers = orderBy(filteredCollection.value.transfers, 'payment', order)
}

// Ver proprio dia de hoje
const filterByDateRange = () => {
    filteredCollection.value.transfers = userCollection.transfers;
    const startDateObj = new Date(startDate.value);
    const endDateObj = new Date(endDate.value);

    if (startDateObj.getTime() > endDateObj.getTime()) {
        showErrorAlert('Start date must be before end date');
        return;
    }
    dateActive.value = true;
    filteredCollection.value.transfers = whereBetweenDates(filteredCollection.value.transfers, 'createdAt', startDate.value, endDate.value);
};

</script>

<template>
    <div class="container__direction-column-start" v-if="userCollection.transfers.length > 0">
        <div class="input__group-col">
            <MainTitle title="Transactions" type="" class="mt-55" />
            <div class="transationcs__filters">
                <button class="transactions__filter" :class="orderActive == 'asc' ? 'active' : ''"
                    @click="orderByDate('asc')" :disabled="!userCollection.transfers.length > 0">Date ASC</button>
                <button class="transactions__filter" :class="orderActive == 'desc' ? 'active' : ''"
                    @click="orderByDate('desc')" :disabled="!userCollection.transfers.length > 0">Date DESC</button>
            </div>
            <div class="transationcs__filters">
                <button class="transactions__filter" :class="orderValueActive == 'asc' ? 'active' : ''"
                    @click="orderByValue('asc')" :disabled="!userCollection.transfers.length > 0">Value ASC</button>
                <button class="transactions__filter" :class="orderValueActive == 'desc' ? 'active' : ''"
                    @click="orderByValue('desc')" :disabled="!userCollection.transfers.length > 0">Value DESC</button>
            </div>
            <div class="transationcs__filters">

                <button class="transactions__filter" :class="filterActive == 'send' ? 'active' : ''"
                    @click="filterBy('type', 'send')" :disabled="!userCollection.transfers.length > 0">Expenses</button>
                <button class="transactions__filter" :class="filterActive == 'receive' ? 'active' : ''"
                    @click="filterBy('type', 'receive')" :disabled="!userCollection.transfers.length > 0">Incomes</button>
            </div>
            <div class="transationcs__filters">
                <input type="date" class="transactions__filter" name="start_date" v-model="startDate"
                    placeholder="Start Date">
                <input type="date" class="transactions__filter" name="end-date" v-model="endDate" placeholder="End Date">
            </div>
            <div class="transationcs__filters">
                <button class="transactions__filter"
                    :class="{ 'disabled': startDate.length === 0 || endDate.length === 0, 'active': dateActive }"
                    @click="filterByDateRange"
                    :disabled="startDate.length === 0 || endDate.length === 0 || !userCollection.transfers.length > 0">
                    Filter by Date Range
                </button>

            </div>
            <div class="transationcs__filters">
                <button class="transactions__filter" @click="resetFilters">Reset</button>
            </div>
        </div>
        <div class="space">
            <SingleContact v-if="userCollection.transfers.length > 0 && filteredCollection.transfers.length > 0" v-for="(contact, key) in filteredCollection.transfers"
                :key="key" :member="null" :phone="contact.phone ? contact.phone : contact.tel" :date="contact.createdAt"
                :type="contact.type" :isTransaction="true" :money="contact.payment" :balance="contact.balance_after" />
                <NewContactIcon v-else />

        </div>
    </div>
    <div v-else>
        <MainTitle title="Transactions" type="" class="mt-55" />
        <NewContactIcon />
        <h1 class="t-align-center  primary-font mt-30">Seems like you don't have any moviments in your account</h1>
    </div>
</template>

<style></style>
