import { defineStore } from 'pinia';

export const useErrorStore = defineStore('error', {
  state: () => ({
    errors: {},
  }),
  getters: {
    getErrorState: (state) => state.errors,
  },
  actions: {
    clearErrorMessages() {
      this.$state.errors = {};
    },
    setErrorMessages(name, messages) {
      this.$state.errors[name] = messages;
    },
    getError(search) {
      return this.$state.errors[search] ? this.$state.errors[search][0] : null;
    },
    getErrorMessages(search) {
      return this.$state.errors[search] ? this.$state.errors[search] : null;
    },
    getErrorStatus(){
      return Object.values(this.$state.errors).some(errors => errors && errors.length > 0);
    },
    clearError(search) {
      this.$state.errors[search] = null;
    },
  },
});
