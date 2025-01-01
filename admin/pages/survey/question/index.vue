<template>
    <div>
      <IFormHeader
        title="question"
        :sortColumn="tableHeader"
        :moduleKey="moduleKey"
        :enableFilter="true"
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
        <template #filter>
          <div class="row">
            <div class="col-3">
              <div class="form-group">
                <label for="">{{ $t("category") }}</label>
                <select v-model="filter.category_id" class="form-control">
                  <option :value="null">{{ $t("please_select") }}</option>
                  <option
                    v-for="(item, index) in categories"
                    :key="index"
                    :value="item.id"
                  >
                    {{ item.name }}
                  </option>
                </select>
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
              <IDropdownOption
                  label="view_answer"
                  icon="material-symbols:visibility-outline"
                  @click="viewAnswer(row)"
              />
              <IDropdownOption
                  label="clone"
                  icon="solar:copy-outline"
                  @click="cloneQuestion(row)"
              />
            </IDropdown>
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
        :questions="lists"
      />
    </div>
  </template>
  
  <script setup>
  import ActionModal from "~/components/question/modal.vue";
  import { moduleKey } from "~/constants/moduleKey";
  import { appConst } from "~/constants/app";
  import { permissionConst } from "~/constants/permission";
  import moment from "moment";
  import { useCategoryList } from "~/store/category_list";
  import { questionAPI } from "~/constants/api";
  import { useBranchStore } from "~/store/branch";
import { get } from "@vueuse/core";
  
  definePageMeta({
    middleware: "alc",
    moduleKey: moduleKey.QUESTION,
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
      label: "category",
      key: "category_name",
      textAlign: "left",
    },
    {
      label: "title",
      key: "title",
      sort: true,
      textAlign: "left",
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
  ];
  
  
  
  
  const categoryList = useCategoryList();
  const branchStore = useBranchStore();
  const modal = ref();
  const addModal = ref(null);
  const actionType = ref("");
  const branch_id=ref(null);
  const categories = ref([]);
  
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
    branch_id: null
  });
  
  const doneTypingInterval = ref(600);
  const typingTimer = ref(null);
  const onResetFilter = () => {
    filter.search = null;
    filter.category_id = null;
    getData();
  }
  
  let lists = ref([]);
  
  onMounted(() => {
    getData();
    getCategoryList();
  });
  const getCategoryList = async () => {
    branch_id.value = branchStore.branch_id
    if(nullToVoid(branch_id.value)==""){
      categories.value = categoryList.lists
      return
    }
    let category = computed(() => {
      return categoryList.lists.filter((item) => {
        return item.branch_id == branch_id.value
      });
    })
    categories.value = category.value
  }
  const openAddModal = () => {
    branch_id.value=branchStore.branch_id
    if(nullToVoid(branch_id.value)==""){
      const { $i18n } = useNuxtApp();
      swal({
        title: $i18n.t("branch_is_required"),
        text: $i18n.t("please_select_branch"),
        icon: "warning",
        cancelButtonText: $i18n.t("cancel"),
        reverseButtons: true,
        showLoaderOnConfirm: true,
        preConfirm: () => {},
        allowOutsideClick: () => !swal.isLoading(),
      });
      return;
    }
    actionType.value = appConst.modalAction.add;
    modal.value.showModal();
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
    branch_id.value=branchStore.branch_id
    input.filter.branch_id=branch_id.value
    try {
      const data = await ifetch(questionAPI.get, input);
      
      
      setInput(data.original);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const setInput = (data) => {
    lists.value = data.data;
    
    pagination.value = data.pagination;
  };
  

  watch(
  () => branchStore.branch_id,
  (val) => {
    filter.category_id = null
    getCategoryList();
    getData();
  }
);
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
          await ifetch(questionAPI.delete, input);
          getData();
          iAlert().success();
          resolve();
        });
      },
      allowOutsideClick: () => !swal.isLoading(),
    });
  };

  const viewAnswer = (row) => {
    actionType.value = "view_answer_in" ;
    modal.value.showModal(row);
  };
  const cloneQuestion = (row) => {
    actionType.value = appConst.modalAction.update ;
    var questionFilter = lists.value.filter((item) => {
      return item.category_id == row.category_id
    })
    var maxOrderValue = Math.max(...questionFilter.map(item => item.order));
    row.order = maxOrderValue + 1;
    modal.value.showModal(row, "clone");
    
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
      await ifetch(questionAPI.updateStatus, {
        id: row.id,
        status: value ? 1 : 0,
      });
      getData();
    }
  };
  
  </script>
  
  <style scoped>
  
  </style>