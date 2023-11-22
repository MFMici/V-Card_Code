<script setup>
import MainContainer from '@/components/containers/MainContainer.vue';
import MainButton from '@/components/buttons/MainButton.vue';
import BasicInput from '@/components/inputs/BasicInput.vue'
import { ref, computed } from 'vue'
import { useErrorStore } from '@/stores/ErrorStore'
import BackButton from "@/components/buttons/BackButton.vue";
import NewContactIcon from "@/components/icons/NewContactIcon.vue";
import MainForm from "@/components/forms/MainForm.vue";
import { getAuth } from "firebase/auth";
import User from '@/request/User.js'
import { showErrorAlert } from '@/components/alerts/sweetAlerts.js'
import { removeSpaces, removeEmail } from '@/components/utils/hydration/dataFormater.js'; 

const errorStore = useErrorStore()
const isProcessing = ref(false);

const form = ref({
  name: '',
  phone: '',
})

const isSubmitDisabled = computed(() => {
  return form.value.phone.length === 0 || form.value.name.length === 0 || errorStore.getErrorStatus();
})

const addContact = async () => {
  try {
    const newContactPhone = await User.getContact('phone', removeSpaces(form.value.phone));
    const existingContactDoc =  await User.findBy('phone', removeEmail(getAuth().currentUser.providerData[0].email));

    if(existingContactDoc[0].contacts.some(contact => contact.phone === newContactPhone)) {
      return showErrorAlert('Error', 'This contact already exists in your contact list');
    }

    existingContactDoc[0].contacts.push({ phone: newContactPhone, name: form.value.name });
    await User.update(existingContactDoc[0]);

  }
  catch(errorResponse) {
    isProcessing.value = false;
    showErrorAlert('Error', 'There`s no user with this phone number on V-Card.');
  }
}

</script>

<template>
  <MainForm v-model:is-processing="isProcessing" :handleLogic="addContact" >
    <MainContainer>
      <div class="container__direction-column">
        <div class="contact__header__wrapper">
          <BackButton />
          <h1 class="contact__title"> New contact</h1>
        </div>
        <div class="contact__form-wrapper">
          <div class="contact__inputs-wrapper">
            <NewContactIcon />
            <BasicInput
                v-model:value="form.name" name="name" label="Name" type="text" placeholder="Enter name"
                :required="true" :isNew="true" />
            <BasicInput
                v-model:value="form.phone" name="phone" label="Phone" type="text"
                placeholder="Enter phone number" :required="true" />
          </div>

          <div class="contact__buttons-wrapper">
            <MainButton class="primary-button" :loading="isProcessing" :disabled="isSubmitDisabled" type="submit">Add contact
            </MainButton>
          </div>
        </div>
      </div>
    </MainContainer>
  </MainForm>
</template>