<template>
  <div>
    <IFormHeader
      title="user_role"
      :sortColumn="tableHeader"
      :moduleKey="module_key"
      ref="formHeader"
      @reloadData="getData"
      @addClick="addNew"
    >
    </IFormHeader>
    <IFormTable
      :tableHeader="tableHeader"
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
      <template #user_type_id="{ user_type_id }">
        {{ $t(userTypeStore.getName(user_type_id)) }}
        <!-- {{ user_type_id }} -->
      </template>
      <template #created_at="{ row, created_at }">
        {{ row.created_by }}
        <br />
        {{ dateTimeFormat(created_at) }}
      </template>
    </IFormTable>
  </div>
</template>

<script setup>
  import { appConst, msgConst } from "~/constants/app";
  import { roleAPI } from "~/constants/api";
  import { useUserTypeStore } from "~/store/user_type";
  import { get } from "@vueuse/core";
  import { moduleKey } from "~/constants/moduleKey";
  definePageMeta({
    middleware: "alc",
    moduleKey: moduleKey.USER_ROLE,
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
      label: "role_name",
      key: "role_name",
      sort: true,
      textAlign: "center",
      classes: "name-col",
    },
    {
      label: "user_type",
      key: "user_type_id",
      sort: true,
      textAlign: "center",
    },
    {
      label: "created_at",
      key: "created_at",
      sort: true,
      defaultSortBy: true,
      classes: "date-class",
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
  const userTypeStore = useUserTypeStore();
  const localPath = useLocalePath();

  onMounted(() => {
    getData();
  });

  const getData = async () => {
    let input = getInput();
    const data = await ifetch(roleAPI.get, input);
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
    navigateTo({ path: localPath("/users/user_role/create") });
  };
  async function editItem(id) {
    return navigateTo(localPath("/users/user_role/update?id=" + id)).then(
      (value) => {
        navigateTo(localPath("/users/user_role/update?id=" + id));
      }
    );
  }

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
          await ifetch(roleAPI.delete, { id: id });
          iAlert().success();
          getData();
          resolve();
        });
      },
      allowOutsideClick: () => !swal.isLoading(),
    });
  };
</script>
