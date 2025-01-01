<template>
    <div>
      <IFormHeader
        title="answer"
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
            </IDropdown>
        </template>
        <template #image="{image}">
            <img :src="getImagePath(image, 'answer')" height="80" :alt="image">
        </template>
        <template #status="{ status, row }">
            <StatusToggle
            :status="status"
            :row="row"
            @on-status-change="handleStatusChange"
            />
        </template>
        <template #order="{ order, row }">
            <StatusToggle
            :status="order"
            :row="row"
            @on-status-change="handleOrderChange"
            />
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
  import ActionModal from "~/components/answer/modal.vue";
  import { moduleKey } from "~/constants/moduleKey";
  import { appConst } from "~/constants/app";
  import { permissionConst } from "~/constants/permission";
  import moment from "moment";
  import { questionAPI } from "~/constants/api";
  import { answerAPI } from "~/constants/api";
  import { useBranchStore } from "~/store/branch";
import { ca } from "date-fns/locale";
  
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
      label: "question",
      key: "question_title",
      textAlign: "center",
    },
    {
      label: "image",
      key: "image",
      textAlign: "center",
    },
    {
      label: "title",
      key: "title",
      sort: true,
      textAlign: "center",
    },
    {
      label: "count",
      key: "count",
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
  ];
  
  
  
  
  const branchStore = useBranchStore();
  const modal = ref();
  const addModal = ref(null);
  const actionType = ref("");
  const branch_id=ref(null);
  const questions = ref([]);
  
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
    question_id: null,
    branch_id: null
  });
  
  const doneTypingInterval = ref(600);
  const typingTimer = ref(null);
  const onResetFilter = () => {
    filter.search = null;
    filter.category_id = null;
  }
  
  let lists = ref([]);
  
  onMounted(() => {
    getData();
    getQuestionList();
  });
  const getQuestionList = async () => {
    branch_id.value = branchStore.branch_id
    try {
      const data = await ifetch(questionAPI.get_by_branch_id, { branch_id: branch_id.value });
      questions.value = data.data;
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
      const data = await ifetch(answerAPI.get, input);
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
    filter.question_id = null
    getQuestionList();
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
          const data = await ifetch(answerAPI.delete, input);
          iAlert().success();
          setInput(data);
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
      await ifetch(answerAPI.updateStatus, {
        id: row.id,
        status: value ? 1 : 0,
      });
      getData();
    }
  };
  const handleOrderChange = async (value, row, reload) => {
    if (row.id) {
      await ifetch(answerAPI.updateOrder, { 
        id: row.id,
        order: value ? 1 : 0,
      });
      getData();
    }
  };
  
  
  </script>
  
  <style scoped>
  
  </style>