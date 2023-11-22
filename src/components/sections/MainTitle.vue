<template>
  <div class="contact__header__wrapper">
    <router-link class="add-icon__position" v-if="type === 'N'" :to="{name: 'new-contact'}">
      <AddIcon />
    </router-link>
    <BackButton v-else @click="router.go(-1)" />
    <h1 class="contact__title">{{title}}</h1>
  </div>
</template>

<script setup>
import BackButton from "@/components/buttons/BackButton.vue";
import AddIcon from "@/components/icons/AddIcon.vue";
import { useRouter } from 'vue-router';

defineProps({
  title: {
    type: String,
    required: true,
  },
  type: {
        type: String,
        default: 'C',
        validator: (value) => {
            return ['N', 'C'].includes(value);
        },
    },
});

const router = useRouter();
</script>
