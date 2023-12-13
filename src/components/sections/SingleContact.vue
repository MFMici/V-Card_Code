<template>
    <div class="single-contact__container">
        <div class="single-contact__avatar-wrapper">
            <img class="single-contact__avatar" src="https://avatar.iran.liara.run/public/40" alt="avatar">
        </div>
        <div class="single-contact__info">
            <div class="single-contact__phone">
                <p>{{ phone }}</p>
            </div>
            <div v-if="isTransaction" class="single-contact__member">
                <h3>{{ formatedDate }} <br> {{ distanceDate }}</h3>
            </div>
            <div  v-else class="single-contact__member">
                <h3>{{ member }}</h3>
            </div>

        </div>
        <div v-if="!isTransaction" class="single-contact__button">
            <router-link :to="{name: 'SendMoney', params: {type: phone}}"><button class="cube-button" ><LogoButtonIcon/></button></router-link>
        </div>
        <div v-else class="single-contact__info">
            <div class="single-contact__phone">
                <p class="t-align-right font-bold primary-font"><span v-if="type == 'send'"> -</span><span v-else> +</span>{{ Number(money).toFixed(2) }}€</p>
            </div>
            <div class="single-contact__phone">
                <p class="t-align-right primary-font">{{ Number(balance).toFixed(2) }}€</p>
            </div>
        </div>

    </div>
</template>
  
<script setup>
import LogoButtonIcon from '@/components/icons/LogoButtonIcon.vue';
import { computed } from 'vue'
import { format, intlFormatDistance } from 'date-fns'


const formatedDate = computed(() => {
  const formatted = format(new Date(props.date), 'dd/MM/yy HH:mm');
  return formatted;
});

const distanceDate = computed(() => {
  const formatted = intlFormatDistance(new Date(props.date), new Date(), { addSuffix: true });
  return formatted;
});


const props = defineProps({
    member: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    isTransaction: {
        type: Boolean,
        default: false
    },
    money: {
        type: Number,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
});
</script>
  