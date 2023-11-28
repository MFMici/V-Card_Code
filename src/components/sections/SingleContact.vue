<template>
    <div class="single-contact__container">
        <div class="single-contact__avatar-wrapper">
            <img class="single-contact__avatar" src="https://avatar.iran.liara.run/public/40" alt="avatar">
        </div>
        <div class="single-contact__info">
            <div class="single-contact__phone">
                <p>{{ phone }}</p>
            </div>
            <div class="single-contact__member">
                <h3>{{ member }}</h3>
            </div>
        </div>
        <div class="single-contact__button">
            <button v-if="member == 'V-Card User'" class="cube-button"><LogoButtonIcon/></button>
        </div>
    </div>
</template>
  
<script setup>
import LogoButtonIcon from '@/components/icons/LogoButtonIcon.vue';
defineProps({
    member: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
});
</script>
  