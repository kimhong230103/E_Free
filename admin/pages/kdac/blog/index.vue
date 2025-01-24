<template>
    <div>
      <IFormHeader
        title="blog"
        :sortColumn="tableHeader"
        :moduleKey="moduleKey"
        :enableFilter="false"
        :filter="filter"
        :button-add="true"
        ref="formHeader"
        :button-refresh="true"
        :enableDatePicker="false"
        @addClick="openAddModal"
        @toggleColumn="toggleColumn"
        @filterClick="getData"
        @reloadData="getData"
        @resetFilterClick="onResetFilter"
      >
        <!-- <template #filter>
          <div class="row">
            <div class="col-3">
              <div class="form-group">
                <label for="">{{ $t("question") }}</label>
                <select v-model="filter.question_id" class="form-control">
                  <option :value="null">{{ $t("please_select") }}</option>
                  <option
                    v-for="(item, index) in questions"
                    :key="index"
                    :value="item.id"
                  >
                    {{ item.title }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </template> -->
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
              <li @click="update(row)">
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
                @click="() => update(row)"
            /> -->
            <IDropdownOption
                label="delete"
                icon="mdi:trash-can-outline"
                v-can="permissionConst.DELETE"
                @click="deleteItem(row)"
            />
            <IDropdownOption
                :label="$t('view')+' '+ $t('description')"
                icon="material-symbols:visibility-outline"
                v-can="permissionConst.VIEW"
                @click="showModal(row)"
            />
            </IDropdown>
        </template>
        <template #business_id="{business_id}">
            <span>{{ $t(businessTypeEnum.getKey(business_id)) }}</span>
        </template>
        <!-- <template #description="{description}">
            <span class="btn btn-warning" @click="viewDescription(description)">{{ $t('view') }} {{ $t('description') }}</span>
        </template> -->
        <template #status="{ status, row }">
            <StatusToggle
            :status="status"
            :row="row"
            @on-status-change="handleStatusChange"
            />
        </template>
        <template #name="{ row }">
          <span>{{ getNameByLang(row.post_translate, 'name') }}</span>
        </template>
        <template #image="{ image }">
            <img height="40px":src="getImagePath(image, 'post')" alt="">
        </template>
        </IFormTable>
      <ActionModal
        ref="modal"
        @closeModal="closeModal"
        :listDescription="listDescription"
      />
    </div>
  </template>
  
  <script setup>
  import ActionModal from "~/components/blog/modal.vue";
  import { moduleKey } from "~/constants/moduleKey";
  import { appConst } from "~/constants/app";
  import { permissionConst } from "~/constants/permission";
  import moment from "moment";
  import { blogAPI } from "~/constants/api";
  import { useBranchStore } from "~/store/branch";
  import { useLanguageStore } from "~/store/language";
  import menuTypeEnum from "~/composables/enum/menuTypeEnum";
  import businessTypeEnum from "~/composables/enum/businessTypeEnum";
  import { useCategoryType } from "~/store/category_type";
  
  
import { ca } from "date-fns/locale";
  
  definePageMeta({
    middleware: "alc",
    moduleKey: moduleKey.BLOG,
  });
  const useLanguage = useLanguageStore();
  const languageList = ref(useLanguage.lists);
  const tableHeader = ref([
    {
      label: "action",
      key: "action",
      sort: false,
      textAlign: "center",
      classes: "action-dropdown",
    },
    {
      label: "name",
      key: "name",
      textAlign: "center",
    },
    {
      label: "image",
      key: "image",
      textAlign: "center",
    },
    {
      label: "publish_date",
      key: "publish_date",
      textAlign: "center",
    },
    {
      label: "slug",
      key: "slug",
      textAlign: "center",
    },
    {
      label: "meta_title",
      key: "meta_title",
      textAlign: "center",
    },
    {
      label: "status",
      key: "status",
      textAlign: "center",
    }
  ]);
  
  
  
  const listDescription = ref([]);
  const branchStore = useBranchStore();
  const modal = ref();
  const addModal = ref(null);
  const actionType = ref("");
  const branch_id=ref(null);
  
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
  
  let filter = reactive({
    search: null,
    category_id: useCategoryType().blog,
    menu_type: null,
    business_id: businessTypeEnum.kdas
  });
  
  const doneTypingInterval = ref(600);
  const typingTimer = ref(null);
  const onResetFilter = () => {
    filter.search = null;
    filter.category_id = null;
    filter.menu_type = null;
    filter.business_id = businessTypeEnum.KDAS
    getData();
  }
  
  let lists = ref([]);
  
  onMounted(() => {
    getData();
  });
  const openAddModal = () => {
    navigateTo({ path: "../../kdac/blog/actions" });
  };
  const update = async (row) => {
    await navigateTo({ path: "../../kdac/blog/actions", query: { id: row.id } });
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
  const showModal = (row) => {
    listDescription.value = row.post_translate;
    modal.value.showModal(listDescription.value);
  };
  const getData = async () => {
    const input = getInput();
    input.filter.business_id=businessTypeEnum.kdas
    try {
      const data = await ifetch(blogAPI.get, input);
      
      setInput(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const setInput = (data) => {
    lists.value = data.data;
    pagination.value = data.pagination;
  };
  
  
  const deleteItem = (row) => {
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
          let input = { id: row.id};
          const data = await ifetch(blogAPI.delete, input);
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
  
  const closeModal = (refresh) => {};
  
  const handleStatusChange = async (value, row, reload) => {
    if (row.id) {
      await ifetch(blogAPI.updateStatus, {
        id: row.id,
        status: value ? 1 : 0,
      });
      getData();
    }
  };
  
  
  </script>
  
  <style scoped>
  
  </style>