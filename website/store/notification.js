export const useNotificationStore = defineStore("notification", {
  state: () => ({
    notification: [],
  }),
  getters: {
    getNotication: (state) => state.notification,
  },
  actions: {
    setData(data) {
      this.notification = data;
    },
  },
});
