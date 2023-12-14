<script setup>
import MainModal from '@/components/modals/MainModal.vue'
import MainButton from '@/components/buttons/MainButton.vue'
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import User from '@/request/User.js'
import { useRouter } from 'vue-router';
import { showSuccessAlert, showErrorAlert } from '@/components/alerts/sweetAlerts.js'
import { ref } from 'vue'

const router = useRouter()
const password = ref('')

const emit = defineEmits(['update:value'])

const closeModal = () => {
    emit('update:value', false)
}


const deleteUser = async () => {
    try {
        await User.deleteMyData(password.value)
        localStorage.setItem('token', '')
        localStorage.setItem('piggyBankChecked', 'false')
        localStorage.setItem('notificationsChecked', 'false')
        localStorage.setItem('ImportedContacts', '[]')
        showSuccessAlert('Your account has been deleted')
        router.push({ name: 'Register' });
    } catch (errorResponse) {
        showErrorAlert('It seems like your password is incorrect')
    }
}

</script>

<template>
    <MainModal>
        <h1 class="code-modal__title">Are you sure you want to delete your account?</h1>
        <DeleteIcon class="w-100" />
            <input type="password" v-model="password" name="password" class="input__field" placeholder="Enter your password" />
        <div class="code-modal__buttons-wrapper">
            <MainButton class="sub-button" @click="closeModal">
                Cancel</MainButton>
            <MainButton class="delete-button" @click="deleteUser">
                Confirm</MainButton>
        </div>
    </MainModal>
</template>
