<script setup>
import MainContainer from '@/components/containers/MainContainer.vue';
import MainButton from '@/components/buttons/MainButton.vue';
import BasicInput from '@/components/inputs/BasicInput.vue'
import { ref, computed } from 'vue'
import { useErrorStore } from '@/stores/ErrorStore'
import NewContactIcon from "@/components/icons/NewContactIcon.vue";
import MainForm from "@/components/forms/MainForm.vue";
import { showErrorAlert, showSuccessAlert } from '@/components/alerts/sweetAlerts.js'
import { removeSpaces } from '@/components/utils/hydration/dataFormater.js';
import MainTitle from "@/components/sections/MainTitle.vue";
import { useRouter } from 'vue-router';

const errorStore = useErrorStore()
const router = useRouter();
const isProcessing = ref(false);

const form = ref({
  name: '',
  phone: '',
})

const isSubmitDisabled = computed(() => {
  return form.value.phone.length === 0  || errorStore.getErrorStatus();
})

const addContact = async () => {
  try {

    const newPhone = {
      tel: removeSpaces(form.value.phone),
      member: "Imported Contact"
    }
    
    const existingContacts = localStorage.getItem('ImportedContacts') === null ? [] : JSON.parse(localStorage.getItem('ImportedContacts'))

    if (existingContacts.some(contact => contact.tel === newPhone.tel)) {
      return showErrorAlert('Error', 'This contact already exists in your contact list')
    }

    saveImportedContacts(existingContacts, newPhone)
    saveContactOnPhone(newPhone)

    showSuccessAlert('Success', 'This contact was added to your contact list.')
    router.push({ name: 'Contacts' });
  }
  catch (errorResponse) {
    showErrorAlert('Error', 'There`s no user with this phone number on V-Card.')
  }
}

const saveContactOnPhone = (newPhone) => {
  const vCardData = `BEGIN:VCARD\nVERSION:3.0\nFN:${newPhone.tel}\nTEL:${newPhone.tel}\nEND:VCARD`;
  const blob = new Blob([vCardData], { type: 'text/vcard' });
  const a = document.createElement('a');

  a.href = URL.createObjectURL(blob);
  a.download = `${newPhone.tel}.vcf`;
  document.body.appendChild(a);
  a.click();

  const openFile = confirm('Do you want to save this contact in your phone?');

  if (openFile) {
    const instructions = 'Please open the downloaded file manually by clicking the "Open" button in your browser\'s download bar.';
    alert(instructions);
  }
  document.body.removeChild(a);
}

const saveImportedContacts = (contacts, newContact) => {
  const serializedContacts = JSON.stringify([...contacts, newContact]);
  localStorage.setItem('ImportedContacts', serializedContacts);
}

</script>

<template>
  <MainForm v-model:is-processing="isProcessing" :handleLogic="addContact">
    <MainContainer>
      <div class="container__direction-column">
        <MainTitle title="New contact" class="mt-50"/>
        <div class="contact__form-wrapper">
          <div class="contact__inputs-wrapper">
            <NewContactIcon />
            <BasicInput 
            v-model:value="form.phone" name="phone" label="Phone" type="text" placeholder="Enter phone number"
              :required="true" />
          </div>
          <div class="contact__buttons-wrapper">
            <MainButton class="primary-button" :loading="isProcessing" :disabled="isSubmitDisabled" type="submit">Add
              contact
            </MainButton>
          </div>
        </div>
      </div>
    </MainContainer>
  </MainForm>
</template>