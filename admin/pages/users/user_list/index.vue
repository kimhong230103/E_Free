<template>
  <div>
    <IFormHeader
      title="user_list"
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
      :tableHeader="tableHeaderCustom"
      :tableData="lists"
      :pagination="pagination"
      @paginationChange="getData"
      ref="formTable"
    >
      <template #action="row">
        <IDropdown>
          <IDropdownOption
            icon="material-symbols:edit-square-outline"
            label="edit"
            @click="editItem(row.id)"
          />
          <IDropdownOption
            icon="mdi:trash-can-outline"
            label="delete"
            @click="deleteItem(row.id)"
          />
        </IDropdown>
      </template>
      <template #company_name="{ company_name }">
        {{ getNameByLocal(company_name) }}
      </template>
      <template #user_type_id="{ user_type_id }">
        {{ $t(userTypeStore.getName(user_type_id)) }}
      </template>
      <template #created_at="{ row, created_at }">
        {{ row.created_by }}
        <br />
        {{ dateTimeFormat(created_at) }}
      </template>
      <template #check_user="{ row }">
        <span v-if="row.check_user === checkUserEnum.check">
          <Icon
            name="material-symbols:check-box-outline"
            size="25"
            :color="iColor().primary"
          />
        </span>
        <span v-if="row.check_user === checkUserEnum.uncheck">
          <Icon name="material-symbols:check-indeterminate-small" size="15"
        /></span>
      </template>
    </IFormTable>
    <actionModal
      ref="modal"
      :actionType="actionType"
      @closeModal="closeModal"
    />
  </div>
</template>

<script setup>
  import actionModal from "~/components/userList/modal";
  import { appConst, msgConst } from "~/constants/app";
  import { userAPI } from "~/constants/api";
  import { moduleKey } from "~/constants/moduleKey";
  import { useUserTypeStore } from "~/store/user_type";
  import { useUserStore } from "~/store/user";
  definePageMeta({
    middleware: "alc",
    moduleKey: moduleKey.USER_ROLE,
  });
  const userStore = useUserStore();
  const user = useUserStore();
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
      label: "full_name",
      key: "full_name",
      sort: true,
      textAlign: "left",
    },
    {
      label: "username",
      key: "username",
      sort: true,
      textAlign: "left",
    },
    {
      label: "user_type",
      key: "user_type_id",
      sort: false,
      textAlign: "center",
    },
    {
      label: "role",
      key: "role_name",
      sort: false,
      textAlign: "left",
    },
    {
      label: "company",
      key: "company_name",
      sort: false,
      textAlign: "center",
      hide: !user.isSuperUser ? true : false,
    },
    {
      label: "branch",
      key: "branch_name",
      sort: false,
      textAlign: "center",
      hide: !user.isSuperUser && !user.isCompanyUser ? true : false,
    },
    {
      label: "check_ip_address",
      key: "check_user",
      sort: false,
      textAlign: "center",
    },
    {
      label: "created_at",
      key: "created_at",
      sort: true,
      defaultSortBy: true,
      defaultSortType: "DESC",
      textAlign: "center",
      textAlignHeader: "center",
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
  const formHeader = ref(null);
  const formTable = ref(null);
  const actionType = ref("");
  const modal = ref(null);
  const userTypeStore = useUserTypeStore();

  onMounted(() => {
    getData();
    console.log(user.isSuperUser);
  });

  let tableHeaderCustom = computed(() => {
    if (userStore.isCompanyUser) {
      return tableHeader.filter((obj) => obj.key != "company_id");
    } else if (userStore.isBranchUser) {
      return tableHeader.filter(
        (obj) => obj.key != "branch_id" || obj.key != "company_id"
      );
    } else {
      return tableHeader;
    }
  });

  const getData = async () => {
    let input = getInput();
    const data = await ifetch(userAPI.get, input);
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
    actionType.value = appConst.modalAction.add;
    modal.value.showModal();
  };

  const editItem = async (id) => {
    actionType.value = appConst.modalAction.update;
    modal.value.showModal(id);
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
          await ifetch(userAPI.delete, { id: id });
          iAlert().success();
          getData();
          resolve();
        });
      },
      allowOutsideClick: () => !swal.isLoading(),
    });
  };

  const closeModal = (refresh) => {
    if (refresh) {
      getData();
    }
  };
</script>
