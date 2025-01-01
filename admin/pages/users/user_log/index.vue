<template>
  <div>
    <IFormHeader
      title="user_log"
      :sortColumn="tableHeader"
      :moduleKey="module_key"
      ref="formHeader"
      :enableFilter="true"
      :buttonAdd="false"
      :enableDatePicker="true"
      :filter="filter"
      @reloadData="getData"
      @filterClick="getData"
      @resetFilterClick="onResetFilter"
      @dateFilterChange="getData"
    >
      <template #filter>
        <div class="col-4">
          <div class="mb-3">
            <label>{{ $t("module") }}</label>
            <select class="form-control form-select" v-model="filter.module">
              <option :value="null" selected>{{ $t("please_select") }}</option>
              <option
                v-for="(item, index) in moduleList"
                :key="index"
                :value="item.value"
              >
                {{ $t(item.label) }}
              </option>
            </select>
          </div>
        </div>

        <div class="col-4">
          <div class="mb-3">
            <label>{{ $t("event") }}</label>
            <select class="form-control form-select" v-model="filter.event">
              <option :value="null" selected>{{ $t("please_select") }}</option>
              <option
                v-for="(item, index) in eventList"
                :key="index"
                :value="item.value"
              >
                {{ $t(item.label) }}
              </option>
            </select>
          </div>
        </div>

        <div class="col-4">
          <div class="mb-3">
            <label>{{ $t("created_by") }}</label>
            <select
              class="form-control form-select"
              v-model="filter.created_by"
            >
              <option :value="null" selected>{{ $t("please_select") }}</option>
              <option
                v-for="(item, index) in userList"
                :key="index"
                :value="item.id"
              >
                {{ item.full_name }}
              </option>
            </select>
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
      <template #action="row">
        <Icon
          @click="openAddModal(row)"
          class="text-info"
          size="20px"
          name="bi:info-circle"
        />
      </template>
      <template #subject_type="{ subject_type }">
        <div v-if="!empty(subject_type)">
          {{ subject_type.split("\\")[2] }}
        </div>
      </template>
      <template #old_data="{ properties }">
        <div v-if="!empty(properties.old)">
          <div v-for="(index, key) in properties.old" :key="index">
            <div v-if="properties.old.hasOwnProperty(key)">
              {{ key }} : {{ properties.old[key] }}
            </div>
          </div>
        </div>
      </template>
      <template #data="{ properties }">
        <div v-if="!empty(properties)">
          <div v-for="(index, key) in properties.attributes" :key="index">
            <div v-if="properties.attributes.hasOwnProperty(key)">
              {{ key }} : {{ properties.attributes[key] }}
            </div>
          </div>
        </div>
      </template>
      <template #event="{ event }">
        <span>{{ $t(event) }}</span>
      </template>
      <template #description="{ description }">
        <span v-html="description"></span>
      </template>
      <template #created_at="{ created_at }">
        {{ dateTimeFormat(created_at) }}
      </template>
    </IFormTable>
    <viewDetails
      ref="modal"
      :actionType="actionType"
      @closeModal="closeModal"
      :detailData="detailData"
    />
  </div>
</template>

<script setup>
  import { userLogAPI } from "~/constants/api";
  import { useUserTypeStore } from "~/store/user_type";
  import { get } from "@vueuse/core";
  import { moduleKey } from "~/constants/moduleKey";
  import viewDetails from "~/components/userLog/ViewDetail.vue";
  definePageMeta({
    middleware: "alc",
    moduleKey: moduleKey.USER_LOG,
  });
  const modal = ref(null);
  const detailData = ref(null);

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
      label: "Module",
      key: "subject_type",
      sort: true,
    },
    {
      label: "event",
      key: "event",
      sort: true,
      textAlign: "center",
    },
    {
      label: "description",
      key: "description",
      sort: true,
    },
    {
      label: "created_by",
      key: "username",
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
  const userList = ref([]);
  const filter = reactive({
    search: null,
    module: null,
    event: null,
    created_by: null,
  });
  const defaultFilter = reactive({
    search: null,
    module: null,
    event: null,
    created_by: null,
  });

  const moduleList = reactive([
    {
      value: "App\\Models\\Account",
      label: "account",
    },
    {
      value: "App\\Models\\Bank",
      label: "bank",
    },
    {
      value: "App\\Models\\BankAccount",
      label: "bank_account",
    },
    {
      value: "App\\Models\\BonusType",
      label: "bonus_type",
    },
    {
      value: "App\\Models\\Branch",
      label: "branch",
    },
    {
      value: "App\\Models\\Cashflow",
      label: "cashflow",
    },
    {
      value: "App\\Models\\Category",
      label: "category",
    },
    {
      value: "App\\Models\\Company",
      label: "company",
    },
    {
      value: "App\\Models\\ExpenseCategory",
      label: "expense_category",
    },
    {
      value: "App\\Models\\IpAddress",
      label: "ip_address",
    },
    {
      value: "App\\Models\\MemberLevel",
      label: "member_level",
    },
    {
      value: "App\\Models\\Product",
      label: "product",
    },
    {
      value: "App\\Models\\PromotionType",
      label: "promotion_type",
    },
    {
      value: "App\\Models\\Provider",
      label: "provider",
    },
    {
      value: "App\\Models\\RebateType",
      label: "rebate_type",
    },
    {
      value: "App\\Models\\Social",
      label: "social",
    },
    {
      value: "App\\Models\\Transaction",
      label: "transaction",
    },
    {
      value: "App\\Models\\User",
      label: "user",
    },
  ]);
  const eventList = reactive([
    {
      value: "created",
      label: "created",
    },
    {
      value: "updated",
      label: "updated",
    },
    {
      value: "deleted",
      label: "deleted",
    },
    {
      value: "log in",
      label: "log in",
    },
  ]);

  onMounted(() => {
    getData();
  });

  const getData = async () => {
    let input = getInput();
    const data = await ifetch(userLogAPI.get, input);
    setInput(data);
  };

  const setInput = (data) => {
    lists.value = data.data;
    userList.value = data.user;
    pagination.value = data.pagination;
  };
  const getInput = () => {
    return {
      page: formTable.value.currentPage,
      table_size: formHeader.value.tableSize,
      filter: formHeader.value.filter,
      sort_by: formHeader.value.sortBy,
      sort_type: formHeader.value.sortType,
      dateFilter: formHeader.value.dateFilter,
    };
  };

  const onResetFilter = () => {
    for (const key in defaultFilter) {
      filter[key] = defaultFilter[key];
    }
    formHeader.value.dateFilter = null;
    getData();
  };

  const openAddModal = (data) => {
    modal.value.showModal();
    detailData.value = data;
  };
</script>
