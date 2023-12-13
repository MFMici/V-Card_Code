<script setup>
import MainButton from '@/components/buttons/MainButton.vue';
import BasicInput from '@/components/inputs/BasicInput.vue'
import CodeModal from '@/components/modals/CodeModal.vue';
import MainTitle from "@/components/sections/MainTitle.vue";
import { ref, computed } from 'vue'
import { useErrorStore } from '@/stores/ErrorStore'
import User from '@/request/User.js'
import { showErrorAlert, showSuccessAlert } from '@/components/alerts/sweetAlerts.js'
import { removeSpaces } from '@/components/utils/hydration/dataFormater.js';
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2';

const router = useRouter()
const errorStore = useErrorStore()
const getPiggyBankChecked = localStorage.getItem('piggyBankChecked') === 'true';
const isPiggyBankTransaction = router.currentRoute.value.params.type === 'W' || router.currentRoute.value.params.type === 'D';

const form = ref({
    phone: router.currentRoute.value.params.type.startsWith('9') ? router.currentRoute.value.params.type : '',
    payment: '',
    message: ''
})

const openModal = ref(false)

const isSubmitDisabled = computed(() => {
    if (isPiggyBankTransaction) {
        return form.value.payment.length === 0 || errorStore.getErrorStatus();
    }
    return form.value.phone.length === 0 || form.value.payment.length === 0 || errorStore.getErrorStatus();
})

const sendPayment = async () => {
    try {
        const formattedDate = (new Date()).getTime()
        const transferMoney = Number(form.value.payment)

        if (router.currentRoute.value.params.type === 'W') {
            const userCollection = await User.getMy()

            if (transferMoney > userCollection.deposit_balance) {
                openModal.value = false
                return showErrorAlert('Error', 'You don`t have enough money in your deposit to make this transfer')
            }

            userCollection.deposit_balance -= transferMoney;
            userCollection.spendable_balance += transferMoney;

            userCollection.piggy_transfers.push({
                phone: userCollection.phone,
                payment: transferMoney,
                message: form.value.message,
                balance_after: userCollection.deposit_balance,
                createdAt: formattedDate,
                type: 'send'
            });

            await User.updateMy(userCollection)
            showSuccessAlert('', 'It was withdrawn ' + transferMoney + '€ from your deposit with success');
            openModal.value = false
            router.push({ name: 'Dashboard' })
            return
        }

        if (router.currentRoute.value.params.type === 'D') {
            const userCollection = await User.getMy()

            if (transferMoney > userCollection.spendable_balance) {
                openModal.value = false
                return showErrorAlert('Error', 'You don`t have enough money in your spendable balance to make this transfer')
            }

            userCollection.spendable_balance -= transferMoney;
            userCollection.deposit_balance += transferMoney;

            userCollection.piggy_transfers.push({
                phone: userCollection.phone,
                payment: transferMoney,
                message: form.value.message,
                balance_after: userCollection.deposit_balance,
                createdAt: formattedDate,
                type: 'receive'
            });

            await User.updateMy(userCollection)
            showSuccessAlert('', 'It was deposited ' + transferMoney + '€ in your deposit with success');
            openModal.value = false
            router.push({ name: 'Dashboard' })
            return
        }

        const receivedPhone = removeSpaces(form.value.phone)
        const receiverExists = await User.getField('phone', receivedPhone)

        if (receiverExists === undefined) {
            openModal.value = false
            return showErrorAlert('Error', 'This contact is not a V-Card user yet')
        }

        const [receiverUID, userCollection] = await Promise.all([
            User.getUserUID(receivedPhone),
            User.getMy(),
        ]);

        if (receivedPhone === userCollection.phone) {
            openModal.value = false
            return showErrorAlert('Error', 'You can`t send money to yourself')
        }

        if (transferMoney > userCollection.spendable_balance) {
            openModal.value = false
            if (transferMoney <= userCollection.spendable_balance + userCollection.deposit_balance) {
                return showErrorAlert('Error', 'You need to withdraw money from your deposit to make this transfer')
            }
            return showErrorAlert('Error', 'You don`t have enough money to make this transfer')
        }

        let difference = 0

        if (getPiggyBankChecked && (transferMoney % 1 !== 0)) {
                difference = Number((Math.ceil(transferMoney) - transferMoney).toFixed(2))
                userCollection.deposit_balance += difference;
                userCollection.piggy_transfers.push({
                    phone: userCollection.phone,
                    payment: difference,
                    message: form.value.message,
                    balance_after: userCollection.deposit_balance,
                    createdAt: formattedDate,
                    type: 'receive'
                });

                await User.updateMy(userCollection)
        }

        userCollection.spendable_balance = userCollection.spendable_balance - transferMoney - difference;

        userCollection.transfers.push({
            phone: receivedPhone,
            payment: transferMoney,
            message: form.value.message,
            balance_after: userCollection.spendable_balance + userCollection.deposit_balance,
            createdAt: formattedDate,
            type: 'send'
        });

        const getReceiverDoc = (await User.getDoc('phone', receivedPhone))[0]

        getReceiverDoc.spendable_balance += transferMoney;

        getReceiverDoc.transfers.push({
            phone: userCollection.phone,
            payment: transferMoney,
            message: form.value.message,
            balance_after: getReceiverDoc.spendable_balance + getReceiverDoc.deposit_balance,
            createdAt: formattedDate,
            type: 'receive'
        });


        await Promise.all([
            User.updateMy(userCollection),
            User.update(receiverUID, getReceiverDoc),
        ]);

        openModal.value = false
        showSuccessAlert('Sent Money with Success ', 'It was sent ' + transferMoney + '€ to ' + receivedPhone + ' with success');
        router.push({ name: 'Dashboard' })

    } catch (errorResponse) {
        console.error(errorResponse);
    }
}

const inputLabel = computed(() => {
    if (router.currentRoute.value.params.type === 'W') {
        return 'Withdraw Quantity'
    }
    if (router.currentRoute.value.params.type === 'D') {
        return 'Deposit Quantity'
    }
    return 'Payment Quantity'
})

const pageTitle = computed(() => {
    if (router.currentRoute.value.params.type === 'W') {
        return 'Withdraw Money'
    }
    if (router.currentRoute.value.params.type === 'D') {
        return 'Deposit Money'
    }
    return 'Send Money'
})
</script>

<template>
    <CodeModal v-if="openModal" v-model:ready="isReady" :handle-logic="sendPayment" :to="{ name: 'Dashboard' }"
        @update:ready="handleUpdateReady" />
    <div class="container__direction-column">
        <MainTitle :title="pageTitle" class="mt-50" />
        <div class="contact__form-wrapper">
            <div class="contact__inputs-wrapper">
                <BasicInput v-if="!isPiggyBankTransaction" v-model:value="form.phone" name="phone" label="Phone" type="text"
                    placeholder="Enter phone number" :required="true" />
                <BasicInput v-model:value="form.payment" name="payment" :label="inputLabel" type="number"
                    placeholder="Enter payment amount" :required="true" />
                <BasicInput v-if="!isPiggyBankTransaction" v-model:value="form.message" name="message" label="Message"
                    type="text" placeholder="Enter your message" :required="true" />
            </div>
            <div class="contact__buttons-wrapper">

                <MainButton class="primary-button mb-70" :disabled="isSubmitDisabled" @click="openModal = true">Send Payment
                </MainButton>
 
            </div>
        </div>
    </div>
</template>