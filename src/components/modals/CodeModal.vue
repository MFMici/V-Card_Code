<script setup>
import MainModal from '@/components/modals/MainModal.vue'
import MainForm from '@/components/forms/MainForm.vue'
import SquaredInput from '@/components/inputs/SquaredInput.vue'
import MainButton from '@/components/buttons/MainButton.vue'
import { ref } from 'vue'

const emit = defineEmits(['update:ready'])

defineProps({
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
})

const isProcessing = ref(false)
const form = ref({
    digit1: '',
    digit2: '',
    digit3: '',
    digit4: '',
})

const codeConfirmation = async () => {
    try {
        //const response = props.type === 'N' ? await createCode() : await confirmCode()
        emit('update:ready', true);
    }
    catch (errorResponse) {
        console.error(errorResponse)
        emit('update:ready', false);
    }
}

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
                <SquaredInput 
                id="input1" v-model:value="form.digit1" type="text" name="code" :required="true"
                    @input="focusNextInput(1)" />
                <SquaredInput 
                id="input2" v-model:value="form.digit2" type="text" name="code" :required="true"
                    @input="focusNextInput(2)" />
                <SquaredInput
                id="input3" v-model:value="form.digit3" type="text" name="code" :required="true"
                    @input="focusNextInput(3)" />
                <SquaredInput id="input4" v-model:value="form.digit4" type="text" name="code" :required="true" />
            </div>
            <div class="code-modal__buttons-wrapper">
                <MainButton className="sub-button">Cancel</MainButton>
                <MainButton type="submit" className="primary-button" :loading="isProcessing">Confirm</MainButton>
            </div>
        </MainForm>
    </MainModal>
</template>
