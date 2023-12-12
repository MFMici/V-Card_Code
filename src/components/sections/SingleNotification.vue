<template>
    <div class="single-contact__container">
        <MainTitle title="Notification" type="" class="mt-50" />
        <div class="single-contact__info">
            <div class="single-contact__phone">
                <p>{{ title }}</p>
            </div>
            <div  class="single-contact__member">
                <h3>{{ body }} </h3>
            </div>
        </div>
        <div class="single-contact__button">
            <button class="cube-button" ><WhiteEyeIcon/></button>
        </div>
    </div>
</template>

<script setup>

import WhiteEyeIcon from '@/components/icons/WhiteEyeIcon.vue'
import { ref } from 'vue'



const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
})

const title = ref(props.title);
const body = ref(props.body);

</script>