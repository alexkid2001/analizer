import { defineStore } from 'pinia';

interface ToastStore {
  show: boolean;
  color?: string;
  text: string;
  title?: string
  type: 'success' | 'info' | 'warning' | 'error'
  timeout?: number;
  icon?: string;
}
export const useToastStore = defineStore('toast', {
  state: (): ToastStore => ({
    show: false,
    text: 'Alert test text',
    title: undefined,
    type: 'success',
    timeout: 3000
  }),
  actions: {
    showSnackbar (payload: Omit<ToastStore, 'show'>) {
      this.$state = { ...this.$state, ...payload };
      this.show = true;
    }
  }
});
