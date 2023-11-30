<script setup>
import MainTitle from "@/components/sections/MainTitle.vue"
import SingleContact from "@/components/sections/SingleContact.vue"
import User from '@/request/User.js'
import NewContactIcon from "@/components/icons/NewContactIcon.vue";
import { orderBy, where, whereBetweenDates } from '@/components/utils/filters/filters.js';
import { ref } from 'vue'
import { showErrorAlert } from '@/components/alerts/sweetAlerts.js'


const userCollection = await User.getMy()
const filteredCollection = ref([])
const startDate = ref('');
const endDate = ref('');
const orderActive = ref('asc');
const filterActive = ref('');
const dateActive = ref(false);

filteredCollection.value = { ...userCollection }

const resetFilters = () => {
    startDate.value = '';
    endDate.value = '';
    orderActive.value = 'asc';
    filterActive.value = '';
    dateActive.value = false;
    filteredCollection.value = { ...userCollection }
}

const filterBy = (field, value) => {
    filterActive.value = value;
    filteredCollection.value.transfers = where(userCollection.transfers, field, value)
}

const orderByDate = (order) => {
    orderActive.value = order;
    filteredCollection.value.transfers = orderBy(filteredCollection.value.transfers, 'createdAt', order)
}

const filterByDateRange = () => {
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
    <div class="container__direction-column-start">
        <div class="input__group-col">
            <MainTitle title="Contacts" type="" class="mt-55" />
            <div class="transationcs__filters">
                <button class="transactions__filter" :class="orderActive == 'asc' ? 'active' : ''"
                    @click="orderByDate('asc')">ASC</button>
                <button class="transactions__filter" :class="orderActive == 'desc' ? 'active' : ''"
                    @click="orderByDate('desc')">DESC</button>
            </div>
            <div class="transationcs__filters">
                <button class="transactions__filter" :class="filterActive == 'send' ? 'active' : ''"
                    @click="filterBy('type', 'send')">Expenses</button>
                <button class="transactions__filter" :class="filterActive == 'receive' ? 'active' : ''"
                    @click="filterBy('type', 'receive')">Incomes</button>
            </div>
            <div class="transationcs__filters">
                <input type="date" class="transactions__filter" v-model="startDate" placeholder="Start Date">
                <input type="date" class="transactions__filter" v-model="endDate" placeholder="End Date">
            </div>
            <div class="transationcs__filters">
                <button class="transactions__filter"
                    :class="{ 'disabled': startDate.length === 0 || endDate.length === 0, 'active': dateActive }"
                    @click="filterByDateRange" :disabled="startDate.length === 0 || endDate.length === 0">
                    Filter by Date Range
                </button>

            </div>
            <div class="transationcs__filters">
                <button class="transactions__filter" @click="resetFilters">Reset</button>
            </div>
        </div>
        <SingleContact v-if="filteredCollection.transfers.length > 0" v-for="(contact, key) in filteredCollection.transfers"
            :key="key" :member="null" :phone="contact.phone ? contact.phone : contact.tel" :date="contact.createdAt"
            :type="contact.type" :isTransaction="true" :money="contact.payment" :balance="contact.balance_after" />
        <div v-else>
            <NewContactIcon />
            <h1 class="t-align-center  primary-font mt-30">Seems like you don't have any moviments in your account</h1>
        </div>
    </div>
</template>

