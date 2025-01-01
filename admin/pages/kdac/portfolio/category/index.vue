<template>
  <div class="">
    <IFormHeader
      title="category"
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
      <template #action="{ row }">
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
      <!-- <template #type="{type}">
        <div v-for="item in categoryType.getList" :key="item.id">
          <span v-if="type === item.id">{{ $t(item.name) }}</span>
        </div>
      </template> -->
      <template #name="row">
        <span>{{ getNameByLang(row.name) }}</span>
      </template>
      <template #created_at="{created_at}">
        <span>{{dateTimeFormat(created_at)}}</span>
      </template>
      <template #image="{image}">
        <img :src="getImagePath(image,'category')" height="40px" :alt="image">
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
import ActionModal from "~/components/category_portfolio/modal.vue";
import { categoryPortfolioAPI } from "~/constants/api";
import { moduleKey } from "~/constants/moduleKey";
import { appConst, msgConst } from "~/constants/app";
import { permissionConst } from "~/constants/permission";
import { useCategoryList } from "~/store/category_list.js";
import { useCategoryType } from "~/store/category_type.js";
import { useBranchStore } from "~/store/branch";
definePageMeta({
  middleware: "alc",
  moduleKey: moduleKey.CATEGORY_PORTFOLIO,
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
    label: "image",
    key: "image",
    sort: false,
    textAlign: "left",
    textAlign: "center",
  },

  {
    label: "name",
    key: "name",
    sort: true,
    textAlign: "left",
    textAlign: "center",
  },
  {
    label: "created_at",
    key: "created_at",
    sort: true,
    classes: "createdby-col",
    textAlign: "center",
    textAlignHeader: "center",
  },
];
let lists = ref([]);
const formHeader = ref(null);
const modal = ref();
const formTable = ref(null);
const actionType = ref("add");
const categoryList = useCategoryList();
const categoryType = useCategoryType();
const branchStore = useBranchStore();

const branch_id = ref(null)
const pagination = ref({
  currentPage: 1,
  per_page: 10,
  total: 0,
  to: 0,
  from: 0,
  last_page: 0,
});
const filter = reactive({
  search: "",
  branch_id: null,
});

const addNew = () => {
  actionType.value = appConst.modalAction.add;
  modal.value.showModal();
};

onMounted(() => {
  getData();
  // getTest()
});
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
const getData = async () => {
  const input = getInput();
  // branch_id.value=branchStore.branch_id
  input.filter.branch_id=1
  
  const data = await ifetch(categoryPortfolioAPI.get, input);
  setInput(data);
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
       const data = await ifetch(categoryPortfolioAPI.delete, { id: id });
        iAlert().success();
        categoryList.setData(data.data);
        getData();
        resolve();
      });
    },
    allowOutsideClick: () => !swal.isLoading(),
  });
};

const editItem = async (id, row) => {
  actionType.value = appConst.modalAction.update;
  modal.value.showModal(id, row);
};

const closeModal = (refresh) => {
  if (refresh) getData();
};

const toggleColumn = () => {
  formTable.value.setShowColumn();
};
</script>
