<template>
    <button v-if="!to" :class="{ 'main-button--disabled': disabled }" :type="type" :disabled="loading || disabled" @click="emits('btnClick')">
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
    disabled: {
        type: Boolean,
        default: false,
    },
});

</script>
