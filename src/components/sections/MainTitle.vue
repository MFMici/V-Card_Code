<template>
  <div class="contact__header__wrapper">
    <BackButton @click="router.go(-1)" />
    <h1 class="contact__title">{{title}}</h1>
  </div>
</template>

<script setup>
import BackButton from "@/components/buttons/BackButton.vue";
import { useRouter } from 'vue-router';

defineProps({
  title: {
    type: String,
    required: true,
  },
});

const router = useRouter();
</script>
