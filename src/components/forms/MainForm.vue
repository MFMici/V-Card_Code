<script setup>
const emits = defineEmits(['update:isProcessing'])


const props = defineProps({
  isProcessing: Boolean,
  handleLogic: {
    type: Function,
    default: () => {},
  },
})


const submitForm = async () => {
  emits('update:isProcessing', true)
  try {
    await props.handleLogic()
  } catch (errorResponse) {
    console.error(errorResponse)
  } finally {
    setInterval(() => {
      emits('update:isProcessing', false)
    }, 2000)
  }
}
</script>
<template>
  <form @submit.prevent="submitForm">
    <slot></slot>
  </form>
</template>
