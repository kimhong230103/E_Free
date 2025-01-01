<template>
  <div>
    <IFormHeader
      title="process"
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

      <template #created_at="row">
        <span> {{ dateTimeFormat(row.created_at) }} </span>
      </template>

      <template #image="row">
        <img
          :src="getImagePath(row.image)"
          class="img-fluid rounded-1"
          width="60"
          alt="image"
        />
      </template>

      <template #post_translate="{ post_translate }">
        <span>{{ getNameByLang(post_translate,'name') }}</span>
      </template>
    </IFormTable>

    <div v-if="processModalShow">
      <modalProcess ref="processModalRef" :action-type="actionType" @close-modal="closeModal"/>
    </div>
  </div>
</template>

<script setup>
import { moduleKey } from "~/constants/moduleKey";
import modalProcess from "~/components/process/modal.vue";
import { processAPI } from "~/constants/api";
import { permissionConst } from "~/constants/permission";
import { appConst } from "~/constants/app";
definePageMeta({
  middleware: "alc",
  moduleKey: moduleKey.PROCESS,
});
const tableHeader = [
  {
    label: "action",
    key: "action",
    sort: false,
    textAlign: "center",
    classes: "action-dropdown",
  },
  {
    label: "image",
    key: "image",
    sort: false,
    textAlign: "center",
  },
  {
    label: "name",
    key: "post_translate",
    sort: true,
    classes: "name-col",
    textAlign: "center",
  },
  {
    label: "order",
    key: "order",
    sort: true,
    textAlign: "center",
  },
  {
    label: "created_at",
    key: "created_at",
    sort: true,
    textAlign: "center",
    classes: "createdby-col",
    defaultSortBy: true,
    defaultSortType: "DESC",
  },
];
const lists = ref([]);
const actionType = ref()
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
const processModalRef = ref(null);
const processModalShow = ref(false);

const toggleColumn = () => {
  formTable.value.setShowColumn();
};

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
  await ifetch(processAPI.get, input).then((res) => {
    setInput(res);
  });
};
const setInput = (data) => {
  lists.value = data.data;
  pagination.value = data.pagination;
};

const openAddModal = () => {
  processModalShow.value = true;
  nextTick().then(() => {
    actionType.value = appConst.formAction.add
    processModalRef.value.showModal();
  });
};

const editItem = (data) => {
  processModalShow.value = true;
  nextTick().then(() => {
    actionType.value = appConst.formAction.update
    processModalRef.value.showModal(data.row);
  });
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
          await ifetch(processAPI.delete, { id: id });
          iAlert().success();
          getData();
          resolve();
        });
      },
      allowOutsideClick: () => !swal.isLoading(),
    });
  };

const closeModal = (isUpdate) =>{
  if (isUpdate){
    getData();
  }
  processModalShow.value = false 
}
</script>

<style lang="scss" scoped></style>
