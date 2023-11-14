import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    modal: false,
  }),
  actions: {
    openModal(value) {
      this.modal = value;
    },
    closeModal() {
      this.modal = false;
    },
  },
});
