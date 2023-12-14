<script setup>
import NewContactIcon from "@/components/icons/NewContactIcon.vue";
import MainTitle from "@/components/sections/MainTitle.vue";
import SingleContact from "@/components/sections/SingleContact.vue";
import User from "@/request/User.js";
import { orderBy, limit } from "@/components/utils/filters/filters.js";
import MainButton from "@/components/buttons/MainButton.vue";
import Chart from 'chart.js/auto'
import { PieChart, usePieChart } from "vue-chart-3";
import { ref } from "vue";

const userCollection = await User.getMy();
const viewActive = ref(false);
const orderdTransactions = ref(limit(
    orderBy(userCollection.piggy_transfers, "createdAt", "desc"),
    4
));

const chartData = ref({
    labels: ["Spendable Balance", "Deposit Balance"],
    datasets: [
        {
            backgroundColor: ["#36A2EB", "#F7BE20"],
            data: [userCollection.spendable_balance, userCollection.deposit_balance],
        },
    ],
});

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
};

const { pieChartProps } = usePieChart({
    chartData,
    options: chartOptions,
});

const viewAll = () => {
    viewActive.value = true;
    orderdTransactions.value = userCollection.piggy_transfers
}

const viewLess = () => {
    viewActive.value = false;
    orderdTransactions.value = limit(
        orderBy(userCollection.piggy_transfers, "createdAt", "desc"),
        4
    );
}


</script>

<template>
    <div class="container__direction-column-start">
        <MainTitle title="Piggy Bank" class="mt-50" />
        <PieChart v-bind="pieChartProps" v-if="userCollection.spendable_balance > 0 || userCollection.deposit_balance > 0"/>
        <h1 class="input__error-text" v-else> You dont have any balance right now</h1>

        <div class="piggy-bank__button-wrapper">
            <MainButton class="primary-button mt-30  piggy-bank__button" :to="{ name: 'SendMoney', params: { type: 'W' } }">
                Withdraw Money
            </MainButton>
            <MainButton class="secondary-button  color-black mt-30 piggy-bank__button"
                :to="{ name: 'SendMoney', params: { type: 'D' } }">
                Deposit Money
            </MainButton>

        </div>

        <div class="mt-30 dashboard__row-upper">
            <div class="dashboard__container-top-content t-align-left color-black font-thin"> Piggy Transactions </div>
            <div class="dashboard__container-top-content content-align-right">
                <button v-if="viewActive" class="color-blue font-thin" @click="viewLess"> View
                    less</button>
                <button v-else class="color-blue font-thin" @click="viewAll"> View all</button>

            </div>
        </div>

        <SingleContact v-if="orderdTransactions.length > 0" v-for="(contact, key) in orderdTransactions" :key="key"
            :member="null" :phone="contact.phone ? contact.phone : contact.tel" :date="contact.createdAt"
            :type="contact.type" :isTransaction="true" :money="contact.payment" :balance="contact.balance_after" />
        <div v-else>
            <NewContactIcon />
            <h1 class="t-align-center  primary-font mt-30">Seems like you don't have any movements in your account</h1>
        </div>
    </div>
</template>
