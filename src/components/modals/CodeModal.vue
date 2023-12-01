<script setup>
import MainModal from '@/components/modals/MainModal.vue'
import { showSuccessAlert } from '@/components/alerts/sweetAlerts.js'
import MainForm from '@/components/forms/MainForm.vue'
import SquaredInput from '@/components/inputs/SquaredInput.vue'
import MainButton from '@/components/buttons/MainButton.vue'
import { useErrorStore } from '@/stores/ErrorStore'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import User from '@/request/User.js'
import { showErrorAlert } from '@/components/alerts/sweetAlerts.js'


const router = useRouter()
const errorStore = useErrorStore()
const props = defineProps({
    type: {
        type: String,
        default: 'C',
        validator: (value) => {
            return ['N', 'C'].includes(value);
        },
    },
    ready: {
        type: Boolean,
        default: false,
    },
    to: {
        type: Object,
        default: null,
    },

    handleLogic: {
        type: Function,
        default: () => { },
    },
})
const isProcessing = ref(false)
const form = ref({
    digit1: '',
    digit2: '',
    digit3: '',
    digit4: '',
})

const concatenatedDigits = computed(() => {
    return { confirmation_code: form.value.digit1 + form.value.digit2 + form.value.digit3 + form.value.digit4 };
});

const isSubmitDisabled = computed(() => {
    return form.value.digit1.length === 0 || form.value.digit2.length === 0 || form.value.digit2.length === 0 || form.value.digit4.length === 0 || errorStore.getErrorStatus();
})

const codeConfirmation = async () => {
    if (props.type === 'N') {
        try {
            concatenatedDigits.value.spendable_balance = 0
            concatenatedDigits.value.deposit_balance = 0
            await props.handleLogic();
            await User.updateMy(concatenatedDigits.value)
            showSuccessAlert('Welcome to V-Card', 'V-Card created with success.');
            router.push(props.to)
        } catch (errorResponse) {
            console.error(errorResponse);
        }
        return
    }
    try {
        const userCollection = await User.getMy()
        if(userCollection.confirmation_code === concatenatedDigits.value.confirmation_code){
            await props.handleLogic();
            return
        }

        return showErrorAlert('Error', 'The confirmation code is incorrect')

    } catch (errorResponse) {
        console.error(errorResponse);
    }
}

const firstErrorMessage = computed(() => {
    for (let i = 1; i <= 4; i++) {
        const code = `code${i}`;
        const errorMessages = errorStore.getErrorMessages(code);
        if (errorMessages?.length > 0) {
            return errorMessages[0];
        }
    }
    return '';
});

const focusNextInput = (currentInput) => {
    const nextInput = currentInput % 4 + 1;
    const inputId = `input${nextInput}`;
    const inputElement = document.getElementById(inputId);

    const fieldKey = Object.keys(form.value)[currentInput - 1];
    if (inputElement && form.value[fieldKey].length !== 1) {
        inputElement.focus();
    }
};

</script>

<template>
    <MainModal>
        <h1 class="code-modal__title">Confirm your code and conclude the transaction</h1>
        <MainForm v-model:is-processing="isProcessing" :handleLogic="codeConfirmation" class="code-modal__form-wrapper">
            <div class="code-modal__inputs-wrapper">
                <span class="input__error-text">
                    {{ firstErrorMessage }}
                </span>
                <SquaredInput id="input1" v-model:value="form.digit1" type="text" name="code1" :required="true"
                    @input="focusNextInput(1)" />
                <SquaredInput id="input2" v-model:value="form.digit2" type="text" name="code2" :required="true"
                    @input="focusNextInput(2)" />
                <SquaredInput id="input3" v-model:value="form.digit3" type="text" name="code3" :required="true"
                    @input="focusNextInput(3)" />
                <SquaredInput id="input4" v-model:value="form.digit4" type="text" name="code4" :required="true" />
            </div>
            <div class="code-modal__buttons-wrapper">
                <MainButton type="submit" class="primary-button" :loading="isProcessing" :disabled="isSubmitDisabled">
                    Confirm</MainButton>
            </div>
        </MainForm>
    </MainModal>
</template>
