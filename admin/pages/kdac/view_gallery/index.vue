<template>
  <div class="view_gallery">
    <IFormHeader
      title="view_gallery"
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
      <template #image="row">
        <img :src="getImagePath(row.image, 'view_gallery')" height="40px" :alt="image">
      </template>
      <template #created_at="row">
        <span>{{ dateTimeFormat(row.created_at) }}</span>
      </template>
      <template #status="{ status, row }">
          <StatusToggle
          :status="status"
          :row="row"
          @on-status-change="handleStatusChange"
          />
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
import { viewGalleryAPI } from "~/constants/api";
import { permissionConst } from "~/constants/permission";
import { appConst } from "~/constants/app";
import modal from "~/components/view_gallery/modal.vue";
import { useDepartmentStore } from "~/store/department";
definePageMeta({
  middleware: "alc",
  moduleKey: moduleKey.VIEW_GALLERY,
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
    label: "created_at",
    key: "created_at",
    textAlign: "center",
    classes: "createdby-col",
  },
  {
    label: "status",
    key: "status",
    sort: false,
    textAlign: "center",
  },
];

const lists = ref([]);
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
const modalShow = ref(false);
const modalShowRef = ref(false);
const actionType = ref(null);

const getInput = () => {
  return {
    page: formTable.value.currentPage,
    table_size: formHeader.value.tableSize,
    filter: formHeader.value.filter,
    sort_by: formHeader.value.sortBy,
    sort_type: formHeader.value.sortType,
  };
};

const setInput = (data) => {
  lists.value = data.data;
  pagination.value = data.pagination;
};

const toggleColumn = () => {
  formTable.value.setShowColumn();
};

onMounted(()=>{
  getData()
})

const getData = async () => {
  const input = getInput();
  await ifetch(viewGalleryAPI.get, input).then((res) => {
    setInput(res);
  });
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
        await ifetch(viewGalleryAPI.delete, { id: id });
        iAlert().success();
        getData();
        useDepartmentStore().reload()
        resolve();
      });
    },
    allowOutsideClick: () => !swal.isLoading(),
  });
};
const handleStatusChange = async (value, row, reload) => {
  if (row.id) {
    await ifetch(viewGalleryAPI.updateStatus, {
      id: row.id,
      status: value ? 1 : 0,
    });
    getData();
  }
};
const closeModal = (isUpdate) => {
  if (isUpdate) {
    getData();
  }
  modalShow.value = false;
};
</script>

<style >
  .view_gallery .box-search-header{
    display: none !important;
  }
</style>
