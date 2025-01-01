<template>
    <div>
      <IFormHeader
        title="menu"
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
            <IDropdownOption
                label="edit"
                icon="material-symbols:edit-square-outline"
                v-can="permissionConst.UPDATE"
                @click="update(row)"
            />
            <IDropdownOption
                label="delete"
                icon="mdi:trash-can-outline"
                v-can="permissionConst.DELETE"
                @click="deleteItem(row)"
            />
            </IDropdown>
        </template>
        
        <template #title="{menu_translate}">
            <span>
              {{ getNameByLang(menu_translate, 'title') }}
            </span>
        </template>
        <template #menu_type="{menu_type}">
              <span>
                {{ $t( menuTypeEnum.getKey(menu_type)) }}
              </span>
        </template>
        <template #business_id="{business_id}">
            <span>{{ $t(businessTypeEnum.getKey(business_id)) }}</span>
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
        :business_id="businessTypeEnum.kdac"
      />
    </div>
  </template>
  
  <script setup>
  import ActionModal from "~/components/kdac_menu/modal.vue";
  import { moduleKey } from "~/constants/moduleKey";
  import { appConst } from "~/constants/app";
  import { permissionConst } from "~/constants/permission";
  import moment from "moment";
  import { KDACMenuAPI } from "~/constants/api";
  import { useBranchStore } from "~/store/branch";
  import { useLanguageStore } from "~/store/language";
  import menuTypeEnum from "~/composables/enum/menuTypeEnum";
  import businessTypeEnum from "~/composables/enum/businessTypeEnum";
  
  
  definePageMeta({
    middleware: "alc",
    moduleKey: moduleKey.KDAC_MENU,
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
      label: "business",
      key: "business_id",
      textAlign: "center",
    },
    {
      label: "title",
      key: "title",
      sort: true,
      textAlign: "center",
    },
    {
      label: "url",
      key: "url",
      textAlign: "center",
    },
    {
      label: "menu_type",
      key: "menu_type",
      textAlign: "center",
    },
    {
      label: "order",
      key: "order",
      textAlign: "center",
    },
    {
      label: "status",
      key: "status",
      textAlign: "center",
    }
  ]);
  
  
  
  
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
    category_id: null,
    menu_type: null,
    business_id: businessTypeEnum.kdac
  });
  
  const doneTypingInterval = ref(600);
  const typingTimer = ref(null);
  const onResetFilter = () => {
    filter.search = null;
    filter.category_id = null;
    filter.menu_type = null;
    filter.business_id = businessTypeEnum.KDAC
    getData();
  }
  
  let lists = ref([]);
  
  onMounted(() => {
    getData();
  });
  const openAddModal = () => {
    // branch_id.value=branchStore.branch_id
    // if(nullToVoid(branch_id.value)==""){
    //   const { $i18n } = useNuxtApp();
    //   swal({
    //     title: $i18n.t("branch_is_required"),
    //     text: $i18n.t("please_select_branch"),
    //     icon: "warning",
    //     cancelButtonText: $i18n.t("cancel"),
    //     reverseButtons: true,
    //     showLoaderOnConfirm: true,
    //     preConfirm: () => {},
    //     allowOutsideClick: () => !swal.isLoading(),
    //   });
    //   return;
    // }
    actionType.value = appConst.modalAction.add;
    modal.value.showModal(null,lists.value.length+1);
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
    input.filter.business_id=businessTypeEnum.kdac
    try {
      const data = await ifetch(KDACMenuAPI.get, input);
      
      setInput(data.original);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const setInput = (data) => {
    lists.value = data.data;
    pagination.value = data.pagination;
  };
  const update = (row) => {
    actionType.value = appConst.modalAction.update;
    modal.value.showModal(row);
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
          const data = await ifetch(KDACMenuAPI.delete, input);
          iAlert().success();
          // setInput(data);
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
  
  const closeModal = (refresh) => {
    if (refresh) {
      getData();
    }
  };
  
  const handleStatusChange = async (value, row, reload) => {
    if (row.id) {
      await ifetch(KDACMenuAPI.updateStatus, {
        id: row.id,
        status: value ? 1 : 0,
      });
      getData();
    }
  };
  
  
  </script>
  
  <style scoped>
  
  </style>