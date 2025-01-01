<template>
  <div>
    <IFormHeader
      title="company"
      :sortColumn="tableHeader"
      :moduleKey="moduleKey"
      :enableFilter="false"
      :filter="filter"
      ref="formHeader"
      @toggleColumn="toggleColumn"
      @addClick="openAddModal"
      @reloadData="getData"
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
      <template #branch_name="{ branch_name }">
        {{ getNameByLocal(branch_name, "latin_name") }}
      </template>
      <template #created_by="{ created_at, created_by }">
        {{ created_by && created_by }}
        <br />
        {{ dateTimeFormat(created_at) }}
      </template>

      <template #status="{ status, row }">
        <StatusToggle
          :status="status"
          :row="row"
          @on-status-change="handleStatusChange"
        />
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
  import ActionModal from "~/components/company/modal";
  import { companyAPI } from "~/constants/api";
  import { appConst } from "~/constants/app";
  import { moduleKey } from "~/constants/moduleKey";
  import { permissionConst } from "~/constants/permission";

  definePageMeta({
    middleware: "alc",
    moduleKey: moduleKey.COMPANY,
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
      label: "code",
      key: "code",
      sort: true,
      textAlign: "center",
    },
    {
      label: "name",
      key: "company_name",
      sort: true,
      classes: "name-col",
    },
    {
      label: "phone",
      key: "phone",
      sort: true,
      textAlign: "center",
    },
    {
      label: "email",
      key: "email",
      sort: true,
      textAlign: "center",
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
    },
    {
      label: "status",
      key: "status",
      sort: true,
      textAlign: "center",
      classes: "status-col",
      headerClasses: "status-col",
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

  let lists = ref([]);
  const modal = ref(null);
  const actionType = ref(null);
  const formHeader = ref(null);
  const formTable = ref(null);
  const filter = reactive({
    search: "",
    branch_id: null,
  });
  onMounted(() => {
    getData();
  });

  const getData = async () => {
    let input = getInput();
    const data = await ifetch(companyAPI.get, input);
    setInput(data);
  };

  const setInput = (data) => {
    lists.value = data.data.map((value) => ({
      ...value,
      company_name: getNameByLocal(value.company_name),
    }));
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
          await ifetch(companyAPI.delete, { id: id });
          iAlert().success();
          getData();
          resolve();
        });
      },
      allowOutsideClick: () => !swal.isLoading(),
    });
  };

  const openAddModal = () => {
    modal.value.showModal();
    actionType.value = appConst.modalAction.add;
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
      await ifetch(companyAPI.updateStatus, {
        id: row.id,
        status: value,
      });
      getData();
    }
  };
</script>
