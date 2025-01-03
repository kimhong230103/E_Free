export const useFooterPageStore = defineStore('footer_page',{
    state: () => ({
        lists: []
    }),
    getters: {
        getList: (state) => state.lists,
    },
    actions: {
        setData(data) {
            this.lists = data
        },
    }
})