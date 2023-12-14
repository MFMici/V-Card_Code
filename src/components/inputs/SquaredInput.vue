<script setup>
import { validateInput } from '@/components/utils/validations/inputValidations'; // Adjust the path accordingly
import { useErrorStore } from '@/stores/ErrorStore'
const errorStore = useErrorStore()

 const props = defineProps({
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

const clearErrorAndEmit = async (newValue) => {
  const { messages, isValid } = await validateInput(props.name, newValue, props.isNew);

  isValid ? errorStore.clearError(props.name) : errorStore.setErrorMessages(props.name, messages);

  emits('update:value', newValue);
}
</script>

<template>
    <input
      :type="type"
      :name="name"
      :placeholder="placeholder"
      v-bind="$attrs"
      :value="value"
      maxlength="1"
      class="squared-input__rounded"
      :class="{ 'input__field--error': errorStore.getError(name) }"
      @input="clearErrorAndEmit($event.target.value)"
    />
</template>