<template>
  <div>
    <IFormHeader
      title="ip_address"
      :sortColumn="tableHeader"
      :moduleKey="moduleKey"
      :enableFilter="false"
      :filter="filter"
      ref="formHeader"
      @toggleColumn="toggleColumn"
      @reloadData="getData"
      @addClick="openAddModal"
      @resetFilterClick="onResetFilter"
      @filterClick="getData"
    >
    </IFormHeader>

    <IFormTable
      :tableHeader="tableHeader"
      :tableData="lists"
      :pagination="pagination"
      @paginationChange="getData"
      ref="formTable"
    >
      <template #action="row">
        <IDropdown>
          <IDropdownOption
            label="edit"
            icon="material-symbols:edit-square-outline"
            v-can="permissionConst.UPDATE"
            @click="editItem(row.id, row)"
          />
          <IDropdownOption
            label="delete"
            icon="mdi:trash-can-outline"
            v-can="permissionConst.DELETE"
            @click="deleteItem(row.id)"
          />
        </IDropdown>
      </template>

      <template #created_at="{ created_at, created_by }">
        {{ created_by }}
        <br />
        {{ dateTimeFormat(created_at) }}
      </template>
    </IFormTable>
    <ActionModal
      ref="modal"
      :actionType="actionType"
      @closeModal="closeModal"
    />
  </div>
</template>
<script setup>
  import ActionModal from "~/components/IpAddress/modal";
  import { moduleKey } from "~/constants/moduleKey";
  import { ipAddressApi } from "~/constants/api";
  import { appConst } from "~/constants/app";
  import { permissionConst } from "~/constants/permission";
  import { useUserStore } from "~/store/user";
  import { storeToRefs } from "pinia";
  definePageMeta({
    middleware: "alc",
    moduleKey: moduleKey.IP_ADDRESS,
  });
  let tableHeader = [
    {
      label: "action",
      key: "action",
      sort: false,
      textAlign: "center",
      classes: "action-dropdown",
      headerClasses: "action-dropdown",
    },

    {
      label: "name",
      key: "name",
      sort: true,
      textAlign: "left",
      classes: "name-col",
    },
    {
      label: "ip_address",
      key: "ip_address",
      sort: true,
      textAlign: "center",
    },
    {
      label: "created_at",
      key: "created_at",
      sort: true,
      classes: "createdby-col",
      defaultSortBy: true,
      defaultSortType: "DESC",
      textAlign: "center",
      textAlignHeader: "center",
    },
    {
      label: "created_by",
      key: "created_by",
      sort: true,
      classes: "createdby-col",
      defaultSortBy: true,
      defaultSortType: "DESC",
      textAlign: "center",
      textAlignHeader: "center",
      hide: true,
    },
  ];

  const pagination = ref({
    currentPage: 1,
    per_page: 10,
    total: 0,
    to: 0,
    from: 0,
    last_page: 0,
  });
  const defaultFormFilter = {
    status: null,
    created_by: null,
  };
  const userStore = useUserStore();
  const { auth } = storeToRefs(userStore);
  let lists = ref([]);
  const modal = ref(null);
  const actionType = ref(null);
  const formHeader = ref(null);
  const formTable = ref(null);
  const filter = reactive({
    search: "",
    branch_id: null,
  });
  const createdByCombo = ref([]);

  onMounted(() => {
    getData();
    setDefaultForm();
  });

  const getData = async () => {
    let input = getInput();

    const data = await ifetch(ipAddressApi.get, input);
    setInput(data);
  };

  const setInput = (data) => {
    lists.value = data.data;
    pagination.value = data.pagination;
  };

  const getInput = () => {
    return {
      page: formTable.value.currentPage,
      table_size: formHeader.value.tableSize,
      filter: formHeader.value.filter,
      sort_by: formHeader.value.sortBy,
      sort_type: formHeader.value.sortType,
    };
  };

  const openAddModal = () => {
    modal.value.showModal();
    actionType.value = appConst.modalAction.add;
  };

  const editItem = async (id, row) => {
    modal.value.showModal(id);
    actionType.value = appConst.modalAction.update;
  };

  const deleteItem = async (id) => {
    const { $i18n } = useNuxtApp();
    swal({
      title: $i18n.t("are_you_sure"),
      text: $i18n.t("cannot_revert_this"),
      icon: "question",
      showCancelButton: true,
      confirmButtonText: $i18n.t("ok"),
      cancelButtonText: $i18n.t("cancel"),
      reverseButtons: true,
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return new Promise(async (resolve) => {
          await ifetch(ipAddressApi.delete, { id: id });
          iAlert().success();
          getData();
          resolve();
        });
      },
      allowOutsideClick: () => !swal.isLoading(),
    });
  };

  const closeModal = (refresh) => {
    if (refresh) {
      getData();
    }
  };

  const toggleColumn = () => {
    formTable.value.setShowColumn();
  };

  const handleStatusChange = async (value, row, reload) => {
    if (row.id) {
      await ifetch(ipAddressApi.updateStatus, {
        id: row.id,
        status: value,
      });
      getData();
    }
  };
  const onResetFilter = () => {
    setDefaultForm();
    getData();
  };
  const setDefaultForm = async () => {
    Object.assign(filter, defaultFormFilter);
    filter.branch_id = auth.value.branch_id;
    // const combo = await ifetch(ipAddressApi.getComboList);
    // createdByCombo.value = combo.created_by;
  };
</script>
