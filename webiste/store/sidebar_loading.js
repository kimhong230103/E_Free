import { defineStore } from 'pinia';

export const useSideBarStore = defineStore('sidebar', {
  state: () => ({
    active: true
  }),
  getters: {
    // getEnum: (state) => state.enums,
  },
  actions: {
    setSideBarLoading(data) {
      if (data === false) {
        this.active = false;
      }
    }
  }
});
