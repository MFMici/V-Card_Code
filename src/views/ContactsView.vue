<script setup>
import MainContainer from '@/components/containers/MainContainer.vue'
import ImportContactsIcon from '@/components/icons/ImportContactsIcon.vue'
import { ref, watch } from 'vue'
import MainTitle from "@/components/sections/MainTitle.vue"
import SingleContact from "@/components/sections/SingleContact.vue"
import User from '@/request/User.js'

const searchTerm = ref('')
const contacts = ref([])
const allContacts = ref([])
const opts = { multiple: true }

const fetchContacts = async () => {
    await fetchImportedContacts(false)
    if (contacts.value === undefined) {
        contacts.value = []
        allContacts.value = []
    }
}
// We validate if the contacts we are importing have an account on V-Card
const importNewContacts = async () => {
    try {
        const newImportedContacts = await navigator.contacts.select(['tel'], opts)

        await Promise.all(newImportedContacts.map(async (contact) => {
            const existingContact = await User.getField('phone', contact.tel[0])
            existingContact ? contact["member"] = "V-Card User" : contact["member"] = "Imported Contact"
        }))

        saveNewImportedContacts(newImportedContacts)
        fetchImportedContacts(true)
    } catch (error) {
        console.error(error)
    }
}

const saveNewImportedContacts = (newContacts) => {
    const formatedContacts = validateAndFormatImportedContacts(newContacts)
    localStorage.setItem('ImportedContacts', JSON.stringify(formatedContacts))
    contacts.value.push(formatedContacts)
    allContacts.value.push(formatedContacts)
}

const validateAndFormatImportedContacts = (newContacts) => {
    const existingContacts = JSON.parse(localStorage.getItem('ImportedContacts') ?? '[]')
    const existingContactsSet = new Set(existingContacts.map(contact => contact.tel))
    const newImportedContacts = newContacts
        .filter(contact => !existingContactsSet.has(contact.tel[0]))
        .map(contact => ({
            tel: contact.tel[0],
            member: contact.member
        }))

    return [...existingContacts, ...newImportedContacts]
}


// We need to make sure that a user didn't destroyed the account or it registered into the app
const fetchImportedContacts = async (skip) => {
    const storedContacts = localStorage.getItem('ImportedContacts')
    if (storedContacts) {
        const parsedContacts = JSON.parse(storedContacts)
        if (!skip) {
            await Promise.all(parsedContacts.map(async (contact) => {
                const existingContact = await User.getField('phone', contact.tel)
                existingContact ? contact.member = "V-Card User" : contact.member = "Imported Contact"
            }))
            parsedContacts.sort((a, b) => b.member.localeCompare(a.member));
            localStorage.setItem('ImportedContacts', JSON.stringify(parsedContacts))
        }
        contacts.value = parsedContacts
        allContacts.value = parsedContacts
    }
}

const searchContacts = (searchValue) => {
    if (searchValue === '') {
        contacts.value = allContacts.value
        return
    }
    contacts.value = contacts.value.filter((contact) => {
        return contact.member?.toLowerCase()?.includes(searchValue.toLowerCase()) || contact.phone?.includes(searchValue) || contact.tel?.includes(searchValue)
    })
}

await fetchContacts()

watch(searchTerm, (newValue, oldValue) => {
    if (newValue.length <= oldValue.length) {
        contacts.value = allContacts.value
    }
    searchContacts(newValue)
})
</script>

<template>
        <div class="container__direction-column">
            <div class="input__group-col">
                <MainTitle title="Contacts" type="N" class="mt-50" />
                <input type="text" name="searchTerm" placeholder="Type here ..." :required="required" v-model="searchTerm"
                    class="input__field" />
                <div class="single-contact__wrapper">
                    <button class="single-contact__import-contacts" @click="importNewContacts">Import Contacts
                        <ImportContactsIcon />
                    </button>
                    <SingleContact 
                    v-for="(contact, key) in contacts" :key="key" :member="contact.member"
                        :phone="contact.phone ? contact.phone : contact.tel" />
                </div>
            </div>
        </div>
</template>
