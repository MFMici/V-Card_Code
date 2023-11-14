<script setup>
 defineProps({
  name: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  value: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '1'
  }
})

const emits = defineEmits(['update:value'])

const clearErrorAndEmit = (newValue) => {
  emits('update:value', newValue);
}
</script>

<template>
    <input
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      v-bind="$attrs"
      :value="value"
      maxlength="1"
      class="squared-input__rounded"
      @input="clearErrorAndEmit($event.target.value)"
    />
</template>