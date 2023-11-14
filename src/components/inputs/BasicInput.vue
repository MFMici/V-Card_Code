<script setup>
import EyeIcon from '@/components/icons/EyeIcon.vue'
import EyeClosedIcon from '@/components/icons/EyeClosedIcon.vue'
import { validateInput } from '@/components/utils/validations/inputValidations'; // Adjust the path accordingly
import { ref, computed } from 'vue'
import { useErrorStore } from '@/stores/ErrorStore'
const errorStore = useErrorStore()

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: '',
  },
  placeholder: {
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
  maxlength: {
    type: String,
    default: null,
  },
  isNew: {
    type: Boolean,
    default: false,
  }
})

const emits = defineEmits(['update:value'])

const showPassword = ref(false);

const clearErrorAndEmit = async (newValue) => {
  if (props.name === 'phone' && newValue.length <= 10) {
    newValue = newValue.replace(/\D/g, '')
    newValue = newValue.slice(0, 9).replace(/(\d{3})(?=\d)/g, '$1 ');
    emits('update:value', newValue);
  }

  const { messages, isValid } = await validateInput(props.name, newValue, props.isNew);

  isValid ? errorStore.clearError(props.name) : errorStore.setErrorMessages(props.name, messages);

  emits('update:value', newValue);
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
}

const shouldShowEyeClosedIcon = computed(() => {
  return props.type === 'password' && showPassword.value;
});

const shouldShowEyeIcon = computed(() => {
  return props.type === 'password' && !showPassword.value;
});


</script>

<template>
  <div class="input__group-col">
    <label :for="name" class="input__label">{{ label }}</label>
    <input
      :type="showPassword ? 'text' : type"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      v-bind="$attrs"
      :value="value"
      :maxlength="maxlength"
      class="input__field"
      :class="{ 'input__field--error': errorStore.getError(name) }"
      @input="clearErrorAndEmit($event.target.value)"
    />
    <span @click="togglePasswordVisibility">
      <EyeClosedIcon v-if="shouldShowEyeClosedIcon" class="eye-icon" />
      <EyeIcon v-if="shouldShowEyeIcon" class="eye-icon" />
    </span>
    <span class="input__error-text">
      <ul>
        <li v-for="error in errorStore.getErrorMessages(name)" :key="error">{{ error }}</li>
      </ul>
    </span>
  </div>
</template>
