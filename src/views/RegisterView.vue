<script setup>
import MainContainer from '@/components/containers/MainContainer.vue';
import MainButton from '@/components/buttons/MainButton.vue';
import BasicInput from '@/components/inputs/BasicInput.vue'
import { ref, computed } from 'vue'
import { useErrorStore } from '@/stores/ErrorStore'
import { useAuthStore } from '@/stores/AuthStore'
import CodeModal from '@/components/modals/CodeModal.vue';

const errorStore = useErrorStore()
const authStore = useAuthStore()

const openModal = ref(false);
const isReady = ref(false);

const form = ref({
  phone: '',
  password: '',
})

const isSubmitDisabled = computed(() => {
  return form.value.phone.length === 0 || form.value.password.length === 0 || errorStore.getErrorStatus();
})

const formatedPhoneNumber = computed(() => {
  const passwordWithoutSpaces = form.value.phone.replace(/\s/g, '');
  const phoneWithEmail = passwordWithoutSpaces + '@gmail.com';
  return {
        passwordWithoutSpaces,
        phoneWithEmail,
    }
})

const registerUser = async () => {
   try {
    await authStore.registerUser(formatedPhoneNumber.value.phoneWithEmail, form.value.password, formatedPhoneNumber.value.passwordWithoutSpaces);
   }
   catch(errorResponse) {
     console.error(errorResponse);
   }
}

</script>

<template>
  <CodeModal
  v-if="openModal" v-model:ready="isReady" type="N" :handleLogic="registerUser" :to="{ name: 'Dashboard' }"
    @update:ready="handleUpdateReady" />
  <MainContainer>
    <div class="container__direction-column">
      <h1 class="register__title mt-50">Register and start transferring</h1>
      <div class="register__form-wrapper">
        <div class="register__inputs-wrapper">
          <BasicInput
v-model:value="form.phone" name="phone" label="Phone" type="text" placeholder="Enter your phone"
            :required="true" :isNew="true" />
          <BasicInput
v-model:value="form.password" name="password" label="Password" type="password"
            placeholder="Enter your password" :required="true" />
        </div>

        <div class="register__buttons-wrapper">
          <MainButton class="primary-button" :disabled="isSubmitDisabled" @click="openModal = true">Create V-Card
          </MainButton>
          <MainButton :to="{ name: 'Home' }" class="sub-button">Already have an account?</MainButton>
        </div>
      </div>
    </div>
  </MainContainer>
</template>

