export const useEnumsStore = defineStore('enums',{
    state: () => ({
        enums: []
    }),
    getters: {
        // getEnum: (state) => state.enums,
    },
    actions: {
        setData(data) {
            this.enums = data
        },
    }
})