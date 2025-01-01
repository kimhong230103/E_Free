<template>
    <div>
      <IFormHeader
        :title="title"
        :sortColumn="tableHeader"
        :moduleKey="moduleKey"
        :enableFilter="false"
        :filter="filter"
        :button-add="serviceStore.isService"
        ref="formHeader"
        :button-refresh="serviceStore.isService"
        :enableDatePicker="false"
        @addClick="openAddModal"
        @toggleColumn="toggleColumn"
        @filterClick="getData"
        @reloadData="getData"
        @resetFilterClick="onResetFilter"
      >
        <template #top-button-action>
          <span v-if="!serviceStore.isService" class="btn btn-warning" @click="goBackToService">{{ $t('back_to_service') }}</span>
        </template>
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
        v-if="serviceStore.isService"
        >
        <template #action="{ row }">
            <IDropdown>
              <li @click="update(row)" v-if="serviceStore.getIsService">
                <a  class="dropdown-item">
                  <div class="d-flex align-items-center">
                    <Icon
                      size="18"
                      class="me-3"
                      name="material-symbols:edit-square-outline"
                    />
                    <span>{{ $t('update') }} {{ $t('service') }}</span>
                  </div>
                </a>
              </li>
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
                v-if="serviceStore.getIsService"
            />
            <IDropdownOption
                :label="$t('view')+' '+ $t('sub_service')"
                icon="material-symbols:visibility-rounded"
                v-can="permissionConst.VIEW"
                @click="viewSubService(row)"
                v-if="serviceStore.getIsService"
            />
            <li @click="addSubService(row)" v-if="serviceStore.getIsService">
                <a  class="dropdown-item">
                  <div class="d-flex align-items-center">
                    <Icon
                      size="18"
                      class="me-3"
                      name="material-symbols:add"
                    />
                    <span>{{ $t('add') }} {{ $t('sub_service') }}</span>
                  </div>
                </a>
              </li>
            </IDropdown>
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
        <template #title="{ service_translate }">
            <span>{{ getNameByLang(service_translate, 'title') }}</span>
        </template>
        <template #sub_title="{ service_translate }">
            <span>{{ getNameByLang(service_translate, 'sub_title') }}</span>
        </template>
        <template #image="{ image }">
            <img height="40px":src="getImagePath(image, 'service')" alt="">
        </template>
        <template #banner="{ banner }">
            <img height="40px":src="getImagePath(banner, 'service')" alt="">
        </template>
        <template #second_image="{ second_image }">
            <img height="40px":src="getImagePath(second_image, 'service')" alt="">
        </template>
        </IFormTable>
        <IFormTable
        :tableHeader="tableSubService"
        :tableData="lists"
        :pagination="pagination"
        @paginationChange="getData"
        ref="formTable"
        v-if="!serviceStore.isService"
        >
        <template #action="{ row }">
            <IDropdown>
              <li @click="updateSubService(row)" v-if="!serviceStore.getIsService">
                <a  class="dropdown-item">
                  <div class="d-flex align-items-center">
                    <Icon
                      size="18"
                      class="me-3"
                      name="material-symbols:edit-square-outline"
                    />
                    <span>{{ $t('update') }} {{ $t('sub_service') }}</span>
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
            </IDropdown>
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
        <template #title="{ service_translate }">
            <span>{{ getNameByLang(service_translate, 'title') }}</span>
        </template>
        <template #sub_title="{ service_translate }">
            <span>{{ getNameByLang(service_translate, 'sub_title') }}</span>
        </template>
        <template #image="{ image }">
            <img height="40px":src="getImagePath(image, 'service')" alt="">
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
  import { serviceAPI } from "~/constants/api";
  import { useBranchStore } from "~/store/branch";
  import { useLanguageStore } from "~/store/language";
  import menuTypeEnum from "~/composables/enum/menuTypeEnum";
  import businessTypeEnum from "~/composables/enum/businessTypeEnum";
  import { useCategoryType } from "~/store/category_type";
  import { useServiceStore } from "~/store/service";

  const serviceStore = useServiceStore();
  
import { ca, fi, ta } from "date-fns/locale";
import { get } from "@vueuse/core";
  
  definePageMeta({
    middleware: "alc",
    moduleKey: moduleKey.SERVICE,
  });
  const useLanguage = useLanguageStore();
  const languageList = ref(useLanguage.lists);
  const tableService =[
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
      textAlign: "center",
    },
    {
      label: "second_image",
      key: "second_image",
      textAlign: "center",
    },
    {
      label: "banner",
      key: "banner",
      textAlign: "center",
    },
    {
      label: "title",
      key: "title",
      textAlign: "center",
    },
    {
      label: "sub_title",
      key: "sub_title",
      textAlign: "center",
    },
    {
      label: "price",
      key: "price",
      sort: true,
      textAlign: "center",
    },
    {
      label: "slug",
      key: "slug",
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
  const tableSubService =[
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
      textAlign: "center",
    },
    {
      label: "title",
      key: "title",
      textAlign: "center",
    },
    {
      label: "sub_title",
      key: "sub_title",
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
  const tableHeader = ref(tableService);
  
  
  const title = ref('service');
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
    business_id: businessTypeEnum.kdas,
    parent_id: null
  });
  
  const doneTypingInterval = ref(600);
  const typingTimer = ref(null);
  const onResetFilter = () => {
    filter.search = null;
    filter.category_id = null;
    filter.menu_type = null;
    filter.business_id = businessTypeEnum.KDAS,
    filter.parent_id = null
    getData();
  }
  
  let lists = ref([]);
  
  onMounted(() => {
    if( serviceStore.isService){
      title.value = "service"
      filter.parent_id = null
    }else{
      title.value = "sub_service"
      filter.parent_id = serviceStore.parent_id
    }
    getData();
    
  });
  const openAddModal = () => {
    navigateTo({ path: "../../kdac/service/actions" });
  };
  const update = async (row) => {
    await navigateTo({ path: "../../kdac/service/actions", query: { id: row.id , type: "update_service"} });
  };
  const updateSubService = async (row) => {
    await navigateTo({ path: "../../kdac/service/actions", query: { id: row.id , type: "update_sub_service"} });
  };

  const addSubService = async (row) => {
    filter.parent_id = row.id
    getData()
    await navigateTo({ path: "../../kdac/service/actions", query: { id: row.id, type: "add_sub_service" } });
  };
  const viewSubService = async (row) => {
    serviceStore.setData(false);
    serviceStore.parent_id = row.id
    filter.parent_id = row.id
    title.value = "sub_service"
    getData()
  }
  const goBackToService = () => {
    title.value = "service"
    serviceStore.setData(true)
    filter.parent_id = null
    serviceStore.parent_id = null
    getData();
  }
  
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
    listDescription.value = row.service_translate;
    
    modal.value.showModal(listDescription.value);
  };
  const getData = async () => {
    const input = getInput();
    input.filter.business_id=businessTypeEnum.kdas
    try {
      const data = await ifetch(serviceAPI.get, input);
      
      setInput(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const setInput = (data) => {
    lists.value = data.data;
    serviceStore.array_length = lists.value.length
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
          const data = await ifetch(serviceAPI.delete, input);
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
      await ifetch(serviceAPI.updateStatus, {
        id: row.id,
        status: value ? 1 : 0,
      });
      getData();
    }
  };
  
  
  </script>
  
  <style scoped>
  
  </style>