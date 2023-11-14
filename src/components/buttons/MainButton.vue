<template>
    <button v-if="!to" :type="type" :disabled="loading" @click="emits('btnClick')">
        <div v-if="loading" class="main-button__loader"></div>
        <slot></slot>
    </button>
    <router-link v-else :to="to">
        <slot></slot>
    </router-link>
</template>

<script setup>
const emits = defineEmits(['btnClick'])
defineProps({
    to: {
        type: Object,
        default: null,
    },
    type: {
        type: String,
        default: '',
    },
    loading: {
        type: Boolean,
        default: false,
    },
});
</script>
