import bootstrap from "@/data/bootsrap.json";
export const useBootstrapStore = defineStore({
  id: "bootstrap",
  state: () => {
    return {
      bootstrap: bootstrap.tableData1,
      inverse: bootstrap.inverse,
      hoverable: bootstrap.hoverable,
      table: bootstrap.table2,
      sizingTablesXl: bootstrap.sizingTablesXl,
      Responsive: bootstrap.Responsive,
      tableData: bootstrap.tableData,
      tableData2: bootstrap.tableData2,
      profileModal: null,
      // datatable:datatable.Item
    };
  },
  getters: {},
  actions: {
    setProfileModal(data) {
      this.profileModal = data;
    },
    closeProfileModal() {
      this.profileModal.hide();
    },
  },
});
