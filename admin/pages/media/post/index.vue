<template>
  <div>
    <IFormHeader
      title="news"
      :sortColumn="tableHeader"
      :moduleKey="moduleKey"
      :enableFilter="true"
      :filter="filter"
      ref="formHeader"
      @toggleColumn="toggleColumn"
      @addClick="addNew"
      @reloadData="getData"
      @filterClick="getData"
    >
      <template #filter>
        <div class="row">
          <div class="col-3">
            <div class="form-group">
              <label for="">{{ $t("category") }}</label>
              <select v-model="filter.category_id" class="form-control">
                <option :value="null">{{ $t("please_select") }}</option>
                <option
                  v-for="(item, index) in categoryList.lists"
                  :key="index"
                  :value="item.id"
                  v-show="item.type == 1"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-3">
            <div class="form-group">
              <label for="">{{ $t("created_at") }}</label>
              <IDatePicker
                v-model="filter.created_at"
                :multi-calendars="false"
                :range="true"
              />
            </div>
          </div>
        </div>
      </template>
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
          <li @click="editItem(row.id, row)">
            <a  class="dropdown-item">
              <div class="d-flex align-items-center">
                <Icon
                  size="18"
                  class="me-3"
                  name="material-symbols:edit-square-outline"
                />
                <span>Edit</span>
              </div>
            </a>
          </li>
          <!-- <IDropdownOption
            label="edit"
            icon="material-symbols:edit-square-outline"
            v-can="permissionConst.UPDATE"
            @click="editItem(row.id, row)"
          /> -->
          <IDropdownOption
            label="delete"
            icon="mdi:trash-can-outline"
            v-can="permissionConst.DELETE"
            @click="deleteItem(row.id)"
          />
        </IDropdown>
      </template>
      <template #name="{ name }">
        <Popper :content="name" :hover="true">
          <p>{{ truncate(name, 25) }}</p>
        </Popper>
      </template>
      <template #category_id="{ category_id }">
        <div v-for="item in categoryList.getList" :key="item.id">
          <span v-if="category_id === item.id">{{ item.name }}</span>
        </div>
      </template>
      <template #image="{ image }">
        <img
          :src="getImagePath(image)"
          alt="post_image"
          class="img-fulid rounded-2"
          width="auto"
          height="50px"
        />
        
      </template>
      <template #voice="{ voice }">
        <div class="">
          <audio controls>
            <source :src="getVoicePath(voice)" />
          </audio>
        </div>
      </template>

      <template #description="{ description }">
        <button
          v-if="description.length > 11"
          class="btn btn-outline-info"
          @click="openModal(description)"
        >
          <Icon name="clarity:eye-show-line" size="18"></Icon>
          {{ $t("detail") }}
        </button>
        <div v-else></div>
      </template>
      <template #created_at="{ created_at }">
        <span>{{ dateTimeFormat(created_at) }}</span>
      </template>
      <template #status="{ status, row }">
        <StatusToggle
          :status="status"
          :row="row"
          @on-status-change="handleStatusChange"
        />
      </template>
    </IFormTable>
    <ViewEditorDetail ref="modal" />
  </div>
</template>
<script setup>
import { moduleKey } from "~/constants/moduleKey";
import { appConst, msgConst } from "~/constants/app";
import { permissionConst } from "~/constants/permission";
import { postAPI, leagueApi } from "~/constants/api";
import { useCategoryList } from "~/store/category_list";
import ViewEditorDetail from "~/components/ViewEditorDetail.vue";

definePageMeta({
  middleware: "alc",
  moduleKey: moduleKey.POST,
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
    sort: true,
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
    label: "category",
    key: "category_id",
    sort: true,
    textAlign: "left",
    textAlign: "center",
  },

  {
    label: "voice",
    key: "voice",
    sort: true,
    textAlign: "center",
  },
  {
    label: "view_count",
    key: "view_count",
    sort: true,
    textAlign: "center",
  },
  {
    label: "description",
    key: "description",
    sort: true,
    textAlign: "center",
  },
  {
    label: "status",
    key: "status",
    sort: false,
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
let modal = ref([]);
const formHeader = ref(null);
const formTable = ref(null);
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
  category_id: null,
  created_at: null,
});
const categoryList = useCategoryList();

onMounted(() => {
  getData();
});

const getData = async () => {
  const input = getInput();
  const data = await ifetch(postAPI.get, input);
  setInput(data);
};

const setInput = (data) => {
  lists.value = data.data;
  pagination.value = data.pagination;
};
const getInput = () => {
  if (!Array.isArray(filter.created_at)) {
    filter.created_at = null;
  }
  return {
    page: formTable.value.currentPage,
    table_size: formHeader.value.tableSize,
    filter: formHeader.value.filter,
    sort_by: formHeader.value.sortBy,
    sort_type: formHeader.value.sortType,
  };
};
const addNew = () => {
  navigateTo({ path: "../../media/post/actions" });
};
const editItem = async (id, row) => {
  await navigateTo({ path: "../../media/post/actions", query: { id: id } });
};

const openModal = (data) => {
  modal.value.showModal(data);
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
        await ifetch(postAPI.delete, { id: id });
        iAlert().success();
        getData();
        resolve();
      });
    },
    allowOutsideClick: () => !swal.isLoading(),
  });
};
const toggleColumn = () => {
  formTable.value.setShowColumn();
};
const handleStatusChange = async (value, row, reload) => {
  if (row.id) {
    await ifetch(postAPI.updateStatus, {
      id: row.id,
      status: value,
    });
    getData();
  }
};
</script>
