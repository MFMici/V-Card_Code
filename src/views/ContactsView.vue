<script setup>
import MainContainer from '@/components/containers/MainContainer.vue';
import { ref, watch } from 'vue'
import MainTitle from "@/components/sections/MainTitle.vue";
import SingleContact from "@/components/sections/SingleContact.vue";
import { removeEmail } from '@/components/utils/hydration/dataFormater.js';
import { getAuth } from "firebase/auth";
import User from '@/request/User.js'

const searchTerm = ref('');
const contacts = ref([]);
const allContacts = ref([]);

const fetchContacts = async () => {
    try {
        const existingContactDoc = await User.getDoc('phone', removeEmail(getAuth().currentUser.providerData[0].email));

        if (existingContactDoc[0].contacts === undefined) {
            contacts.value = [];
            allContacts.value = [];
        }

        contacts.value = existingContactDoc[0].contacts;
        allContacts.value = existingContactDoc[0].contacts;
    }
    catch (errorResponse) {
        console.error(errorResponse);
    }
}

const searchContacts = (searchValue) => {

    if(searchValue === '') {
        contacts.value = allContacts.value;
        return;
    }
    contacts.value = contacts.value.filter((contact) => {
        return contact.name.toLowerCase().includes(searchValue.toLowerCase()) || contact.phone.includes(searchValue);
    })
}

await fetchContacts();

watch(searchTerm, (newValue, oldValue) => {
    if(newValue.length <= oldValue.length){
        contacts.value = allContacts.value
    }
    searchContacts(newValue);
});
</script>

<template>
  <div class="container__direction-column">
      <div class="input__group-col">
          <MainTitle title="Contacts" type="N" />
          <input
              type="text" name="searchTerm" placeholder="Type here ..." :required="required"
              v-model="searchTerm" class="input__field"
          />
          <div class="single-contact__wrapper">
          <SingleContact v-for="(contact, key) in contacts" :key="key" :name="contact.name" :phone="contact.phone" />
      </div>
      </div>
  </div>
</template>
