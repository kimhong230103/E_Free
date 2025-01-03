export const useUserTypeStore = defineStore({
    id: 'user_type',
    state: () => ({
        type: {
            IDG: 1,
            COMPANY: 2,
            BRANCH: 3
        },
        lists: [],
        listAll: []
    }),
    getters: {
        getList: (state) => state.lists,
        getListAll: (state) => state.listAll,
        getName: (state) => {
            return  (userTypeId) => {
                const obj = state.lists.find(obj => obj.id == userTypeId)
                return !isEmpty(obj)? obj.type: ''
            } 
        },
        IDG: (state) => state.type.IDG,
        COMPANY: (state) => state.type.COMPANY,
        BRANCH: (state) => state.type.BRANCH,
    },
    actions: {
        setData(data) {
            this.lists = data
        },

        setListAll(data) {
            this.listAll = data
        },

    }
})