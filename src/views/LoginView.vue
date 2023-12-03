<script setup>
import MainButton from '@/components/buttons/MainButton.vue';
import BasicInput from '@/components/inputs/BasicInput.vue'
import MainForm from '@/components/forms/MainForm.vue'
import { ref, computed } from 'vue'
import { useErrorStore } from '@/stores/ErrorStore'
import User from "@/request/User.js";
import { useRoute } from 'vue-router';
import { showErrorAlert } from '@/components/alerts/sweetAlerts.js'

const router = useRoute();

const errorStore = useErrorStore()

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

const loginUser = async () => {
  try {
    await User.login(formatedPhoneNumber.value.phoneWithEmail, form.value.password);
    router.push({name: 'Dashboard'})
  }
  catch (err) {
    showErrorAlert('Error', 'Invalid credentials')
  }
}

</script>

<template>
  <MainForm class="register__form-wrapper" :is-submit-disabled="isSubmitDisabled" :handle-logic="loginUser" :is-processing="isReady" >
    <div class="container__direction-column">
      <h1 class="register__title mt-50">Login and start transferring</h1>
      <div class="register__form-wrapper">
        <div class="register__inputs-wrapper">
          <BasicInput
v-model:value="form.phone" name="phone" label="Phone" type="text" placeholder="Enter your phone"
            :required="true" />
          <BasicInput
v-model:value="form.password" name="password" label="Password" type="password"
            placeholder="Enter your password" :required="true" />
        </div>
        <div class="register__buttons-wrapper">
          <MainButton class="primary-button" :disabled="isSubmitDisabled" :loading="isReady">Login
          </MainButton>
          <MainButton :to="{ name: 'Register' }" class="sub-button">Dont have an account?</MainButton>
        </div>
      </div>
    </div>
  </MainForm>
</template>

