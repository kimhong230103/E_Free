<template>
  <div>
    <IFormHeader
      title="banner"
      :sortColumn="tableHeader"
      :moduleKey="moduleKey"
      :enableFilter="false"
      :filter="filter"
      ref="formHeader"
      @toggleColumn="toggleColumn"
      @addClick="addNew"
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
      <template #action="{row}">
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

      <template #image="{ image }">
        <img :src="getImagePath(image, 'banner')" height="80" />
      </template>

      <template #banner_type="{ type }">
        {{ $t(bannerTypeEnum.getKey(type)) }}
      </template>

      <template #image_type="{ image_type }">
        {{ $t(bannerImageTypeEnum.getKey(image_type)) }}
      </template>

      <template #created_at="{ created_at }">
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
    <div v-if="showModal">
      <actionModal
        ref="modal"
        :actionType="actionType"
        @closeModal="closeModal"
      />
    </div>
  </div>
</template>
<script setup>
import actionModal from "~/components/banner/modal.vue";
import { moduleKey } from "~/constants/moduleKey";
import { bannerAPI } from "~/constants/api";
import { permissionConst } from "~/constants/permission";
import { appConst } from "~/constants/app";
definePageMeta({
  middleware: "alc",
  moduleKey: moduleKey.BANNER_LIST,
});

let tableHeader = [
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
    key: "name",
    sort: true,
    classes: "name-col",
  },
  {
    label: "banner_type",
    key: "banner_type",
    sort: true,
    textAlign: "center",
  },
  {
    label: "image_type",
    key: "image_type",
    sort: true,
    textAlign: "center",
  },
  {
    label: "created_at",
    key: "created_at",
    sort: true,
    classes: "created_at",
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
const actionType = ref("");
const modal = ref(null);
const formHeader = ref(null);
const formTable = ref(null);
const showModal = ref(false);

// @fundtion block
onMounted(() => {
  getData();
});

const getData = async () => {
  let input = getInput();
  const data = await ifetch(bannerAPI.get, input);
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

const addNew = () => {
  showModal.value = true;
  actionType.value = appConst.modalAction.add;
  nextTick(() => {
    modal.value.showModal();
  });
};

const closeModal = (isRefresh = false) => {
  showModal.value = false;
  actionType.value = null;
  if (isRefresh) {
    getData();
  }
};

const editItem = (id, item) => {
  
  showModal.value = true;
  actionType.value = appConst.modalAction.update;
  nextTick(() => {
    modal.value.showModal(id, item);
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
        await ifetch(bannerAPI.delete, { id: id });
        iAlert().success();
        getData();
        resolve();
      });
    },
    allowOutsideClick: () => !swal.isLoading(),
  });
};

const handleStatusChange = async (value, row, reload) => {
  if (row.id) {
    await ifetch(bannerAPI.updateStatus, {
      id: row.id,
      status: value,
    });
    getData();
  }
};
</script>
