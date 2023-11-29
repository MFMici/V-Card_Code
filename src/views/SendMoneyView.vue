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
const router = useRouter()
const errorStore = useErrorStore()


const form = ref({
    phone: '',
    payment: '',
    message: ''
})

const openModal = ref(false)

const isSubmitDisabled = computed(() => {
    return form.value.phone.length === 0 || form.value.payment.length === 0 || errorStore.getErrorStatus();
})

const sendPayment = async () => {
    try {

        const formattedDate = (new Date()).getTime()
        const receivedPhone = removeSpaces(form.value.phone)
        const transferMoney = Number(form.value.payment)
        const receiverExists = await User.getField('phone', receivedPhone)

        if (receiverExists === undefined) {
            openModal.value = false
            return showErrorAlert('Error', 'This contact is not a V-Card user yet')
        }

        const [receiverUID, userCollection] = await Promise.all([
            User.getUserUID(receivedPhone),
            User.getMy(),
        ]);

        if(receivedPhone === userCollection.phone){
            openModal.value = false
            return showErrorAlert('Error', 'You can`t send money to yourself')
        }

        if (!userCollection.transfers) {
            userCollection.transfers = [];
        }


        if (!userCollection.spendable_balance) {
            userCollection.spendable_balance = 0;
        }

        if (!userCollection.deposit_balance) {
            userCollection.deposit_balance = 0;
        }

        if (transferMoney > userCollection.spendable_balance) {
            openModal.value = false
            return showErrorAlert('Error', 'You don`t have enough money to make this transfer')
        }

        userCollection.spendable_balance = userCollection.spendable_balance + userCollection.deposit_balance - transferMoney;

        userCollection.transfers.push({
            phone: receivedPhone,
            payment: transferMoney,
            message: form.value.message,
            balance_after: userCollection.spendable_balance,
            createdAt: formattedDate,
            type: 'send'
        });

        const getReceiverDoc = (await User.getDoc('phone', receivedPhone))[0]

        if (!getReceiverDoc.transfers) {
            getReceiverDoc.transfers = [];
        }

        if (!getReceiverDoc.spendable_balance) {
            getReceiverDoc.spendable_balance = 0;
        }

        if (!getReceiverDoc.deposit_balance) {
            getReceiverDoc.deposit_balance = 0;
        }

        getReceiverDoc.spendable_balance = getReceiverDoc.spendable_balance + getReceiverDoc.deposit_balance + transferMoney

        getReceiverDoc.transfers.push({
            phone: userCollection.phone,
            payment: transferMoney,
            message: form.value.message,
            balance_after: getReceiverDoc.spendable_balance,
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
        errorStore.setErrorStatus(true)
    }
}


</script>

<template>
    <CodeModal v-if="openModal" v-model:ready="isReady" :handleLogic="sendPayment" :to="{ name: 'Dashboard' }"
        @update:ready="handleUpdateReady" />
    <div class="container__direction-column">
        <MainTitle title="Send Money" class="mt-50" />
        <div class="contact__form-wrapper">
            <div class="contact__inputs-wrapper">
                <BasicInput v-model:value="form.phone" name="phone" label="Phone" type="text"
                    placeholder="Enter phone number" :required="true" />
                <BasicInput v-model:value="form.payment" name="payment" label="Payment Amount" type="number"
                    placeholder="Enter payment amount" :required="true" />
                <BasicInput v-model:value="form.message" name="message" label="Message" type="text"
                    placeholder="Enter your message" :required="true" />
            </div>
            <div class="contact__buttons-wrapper">
                <MainButton class="primary-button" :disabled="isSubmitDisabled" @click="openModal = true">Send Payment
                </MainButton>
            </div>
        </div>
    </div>
</template>