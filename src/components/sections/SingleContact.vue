<template>
    <div class="single-contact__container">
        <div class="single-contact__avatar-wrapper">
            <img class="single-contact__avatar" src="https://avatar.iran.liara.run/public/40" alt="avatar">
        </div>
        <div class="single-contact__info">
            <div class="single-contact__name">
                <h3>{{ name }}</h3>
            </div>
            <div class="single-contact__phone">
                <p>{{ phone }}</p>
            </div>
        </div>
        <div class="single-contact__button">
            <button class="cube-button"><LogoButtonIcon/></button>
        </div>
    </div>
</template>
  
<script setup>
import LogoButtonIcon from '@/components/icons/LogoButtonIcon.vue';
defineProps({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
});
</script>
  