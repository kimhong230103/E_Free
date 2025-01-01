<template>
  <div>
    <IFormHeader
      title="banner_position"
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
      <template #page="{ page }">
        {{ $t(bannerPageEnum.getKey(page)) }}
      </template>
      <template #name="{ name }">
        {{ $t(name) }}
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
import actionModal from "~/components/banner_position/modal.vue";
import { moduleKey } from "~/constants/moduleKey";
import { permissionConst } from "~/constants/permission";
import { appConst } from "~/constants/app";
import { bannerPositionAPI } from "~/constants/api";
definePageMeta({
  middleware: "alc",
  moduleKey: moduleKey.BANNER_POSITION,
});

const showModal = ref(false);
const actionType = ref(null);
const formHeader = ref(null);
const formTable = ref(null);
const modal = ref(null);
let tableHeader = [
  {
    label: "action",
    key: "action",
    sort: false,
    textAlign: "center",
    classes: "action-dropdown",
  },
  {
    label: "page",
    key: "page",
    sort: true,
    textAlign: "center",
  },
  {
    label: "position",
    key: "name",
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

// @fundtion block
onMounted(() => {
  getData();
});
const getData = async () => {
  let input = getInput();
  const data = await ifetch(bannerPositionAPI.get, input);
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

const closeModal = (isRefresh = false) => {
  showModal.value = false;
  actionType.value = null;
  if (isRefresh) {
    getData();
  }
};
const addNew = () => {
  showModal.value = true;
  actionType.value = appConst.modalAction.add;
  nextTick(() => {
    modal.value.showModal();
  });
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
        await ifetch(bannerPositionAPI.delete, { id: id });
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
    await ifetch(bannerPositionAPI.updateStatus, {
      id: row.id,
      status: value,
    });
    getData();
  }
};
</script>
