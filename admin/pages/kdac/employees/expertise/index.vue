<template>
    <div>
      <IFormHeader
        title="expertise"
        :sortColumn="tableHeader"
        :moduleKey="moduleKey"
        :enableFilter="false"
        :button-add="true"
        ref="formHeader"
        :button-refresh="true"
        :enableDatePicker="false"
        @addClick="openAddModal"
        @toggleColumn="toggleColumn"
        @filterClick="getData"
        @reloadData="getData"
      ></IFormHeader>
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
              @click="editItem(row)"
            />
            <IDropdownOption
              label="delete"
              icon="mdi:trash-can-outline"
              v-can="permissionConst.DELETE"
              @click="deleteItem(row.id)"
            />
          </IDropdown>
        </template>
  
        <template #name="row">
          <span>{{ getNameByLang(row.name,'name') }}</span>
        </template>
        <template #created_at="row">
          <span>{{ dateTimeFormat(row.created_at) }}</span>
        </template>
        <template #updated_at="row">
          <span>{{ dateTimeFormat(row.updated_at) }}</span>
        </template>
      </IFormTable>
  
      <!-- modal -->
      <div v-if="modalShow">
        <modal
          ref="modalShowRef"
          @close-modal="closeModal"
          :action-type="actionType"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { moduleKey } from "~/constants/moduleKey";
  import modal from "~/components/expertise/modal.vue";
  import { expertiseAPI } from "~/constants/api";
  import { permissionConst } from "~/constants/permission";
  import { appConst } from "~/constants/app";
  definePageMeta({
    middleware: "alc",
    moduleKey: moduleKey.EXPERTISE,
  });
  
  const tableHeader = [
    {
      label: "action",
      key: "action",
      sort: false,
      textAlign: "left",
      classes: "action-dropdown",
    },
    {
      label: "name",
      key: "name",
      sort: true,
      textAlign: "center",
      classes: "name-col",
    },
    {
      label: "created_at",
      key: "created_at",
      sort: true,
      textAlign: "center",
      classes: "createdby-col",
      defaultSortBy: true,
      defaultSortType: "desc",
    },
    {
      label: "updated_at",
      key: "updated_at",
      sort: true,
      textAlign: "center",
      classes: "createdby-col",
    },
  ];
  
  const modalShow = ref(false);
  const modalShowRef = ref(false);
  const lists = ref([]);
  const actionType = ref(null);
  const pagination = ref({
    currentPage: 1,
    per_page: 10,
    total: 0,
    to: 0,
    from: 0,
    last_page: 0,
  });
  const formHeader = ref(null);
  const formTable = ref(null);
  
  onMounted(() => {
    getData();
  });
  
  const getInput = () => {
    return {
      page: formTable.value.currentPage,
      table_size: formHeader.value.tableSize,
      filter: formHeader.value.filter,
      sort_by: formHeader.value.sortBy,
      sort_type: formHeader.value.sortType,
    };
  };
  
  const getData = async () => {
    const input = getInput();
    await ifetch(expertiseAPI.get, input).then((res) => {
      setInput(res);
    });
  };
  
  const setInput = (data) => {
    lists.value = data.data;
    pagination.value = data.pagination;
  };
  
  const toggleColumn = () => {
    formTable.value.setShowColumn();
  };
  
  const editItem = (row) => {
    modalShow.value = true;
    actionType.value = appConst.formAction.update;
    nextTick().then(() => {
      modalShowRef.value.showModal(row);
    });
  };
  
  const openAddModal = () => {
    modalShow.value = true;
    actionType.value = appConst.formAction.add;
    nextTick().then(() => {
      modalShowRef.value.showModal();
    });
  };
  const deleteItem = (id) => {
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
            await ifetch(expertiseAPI.delete, { id: id });
            iAlert().success();
            getData();
            resolve();
          });
        },
        allowOutsideClick: () => !swal.isLoading(),
      });
  };
  
  const closeModal = (isUpdate) => {
    if (isUpdate) {
      getData();
    }
    modalShow.value = false;
  };
  </script>
  
  <style lang="scss" scoped></style>
  