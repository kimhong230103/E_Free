<template>
  <div>
    <IFormHeader
      title="employee"
      :sortColumn="tableHeader"
      :moduleKey="moduleKey"
      :enableFilter="true"
      :button-add="true"
      ref="formHeader"
      :button-refresh="true"
      :enableDatePicker="true"
      :dateFormatNoTime="true"
      :multi-calendars="false"
      :date-range="false"
      :enableTimePicker="false"
      dateFormat="YYYY-MM-DD"
      :filter="filter"
      @dateFilterChange="dateFilterChange"
      @addClick="addClick"
      @toggleColumn="toggleColumn"
      @filterClick="getData"
      @reloadData="getData"
      @resetFilterClick="resetFilter"
    >
      <template #filter>
        <div class="col-6">
          <div class="form-group">
            <label for="department">{{ $t("department") }}</label>
            <select
              v-model="filter.department_id"
              class="form-select"
              id="department"
            >
              <option :value="null">{{ $t("please_select") }}</option>
              <option
                v-for="(item, idex) in departmentList"
                :key="idex"
                :value="item.id"
              >
                {{ getNameByLang(item.name) }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label for="job_position">{{ $t("position") }}</label>
            <select
              v-model="filter.job_position_id"
              class="form-select"
              id="job_position"
            >
              <option :value="null">{{ $t("please_select") }}</option>
              <option
                v-for="(item, idex) in jobPositionList"
                :key="idex"
                :value="item.id"
              >
                {{ getNameByLang(item.name) }}
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
      <template #action="{ row }">
        <IDropdown>
          <IDropdownOption
            label="edit"
            icon="material-symbols:edit-square-outline"
            v-can="permissionConst.UPDATE"
            @click="editItem(row)"
          />
          <IDropdownOption
            label="delete"
            icon="mdi:trash-can-outline"
            v-can="permissionConst.DELETE"
            @click="deleteItem(row.id)"
          />
        </IDropdown>
      </template>

      <template #image="{ image }">
        <img
          :src="getImagePath(image)"
          :alt="image"
          class="img-fluid rounded-circle ratio-1x1 object-fit-cover"
          style="width: 50px; height: 50px"
          @click="viewImageModal(image)"
        />
      </template>
      <template #emp_translate="{ emp_translate }">
        <span> {{ getNameByLang(emp_translate, "name") }} </span>
      </template>

      <template #department_name="{ department_name }">
        <span> {{ getNameByLang(department_name) }} </span>
      </template>
      <template #job_position_name="{ job_position_name }">
        <span> {{ getNameByLang(job_position_name) }} </span>
      </template>

      <template #hire_date="{ hire_date }">
        <span> {{ dateFormat(hire_date) }} </span>
      </template>

      <template #created_at="{ created_at }">
        <span> {{ dateTimeFormat(created_at) }} </span>
      </template>
    </IFormTable>

    <!-- view photo -->
    <IViewImage ref="viewImage" />
  </div>
</template>

<script setup>
import { moduleKey } from "~/constants/moduleKey";
import { employeeAPI } from "~/constants/api";
import { permissionConst } from "~/constants/permission";
import { appConst } from "~/constants/app";
import moment from "moment";
import { useDepartmentStore } from "~/store/department";
definePageMeta({
  middleware: "alc",
  moduleKey: moduleKey.EMPLOYEE,
});

const departmentList = useDepartmentStore().lists;

const tableHeader = [
  {
    label: "action",
    key: "action",
    sort: false,
    textAlign: "center",
    classes: "action-dropdown",
  },
  {
    label: "photo",
    key: "image",
    sort: false,
    textAlign: "center",
    classes: "name-col",
  },
  {
    label: "name",
    key: "emp_translate",
    sort: true,
    textAlign: "center",
    classes: "name-col",
  },
  {
    label: "department",
    key: "department_name",
    sort: false,
    textAlign: "center",
  },
  {
    label: "position",
    key: "job_position_name",
    sort: false,
    textAlign: "center",
  },
  {
    label: "hire_date",
    key: "hire_date",
    sort: true,
    textAlign: "center",
  },
  {
    label: "email",
    key: "email",
    sort: false,
    textAlign: "center",
  },
  {
    label: "phone",
    key: "phone",
    sort: false,
    textAlign: "center",
  },
  {
    label: "created_at",
    key: "created_at",
    sort: true,
    textAlign: "center",
    classes: "createdby-col",
    defaultSortBy: true,
    defaultSortType: "desc",
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
const lists = ref([]);
const formHeader = ref(null);
const formTable = ref(null);
const viewImage = ref(null);
const jobPositionList = ref([]);
const filter = reactive({
  department_id: null,
  job_position_id: null,
  dateFilter: null,
});
onMounted(() => {
  getData();
});

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
  await ifetch(employeeAPI.get, input).then((res) => {
    setInput(res);
  });
};

const viewImageModal = (image) => {
  viewImage.value.showModal(image);
};

const setInput = (data) => {
  lists.value = data.data;
  pagination.value = data.pagination;
  jobPositionList.value = data.job_positions;
};

const toggleColumn = () => {
  formTable.value.setShowColumn();
};

const addClick = () => {
  return navigateTo({ path: "/kdac/employees/employee/actions/create" }).then(
    (value) => {
      navigateTo({ path: "/kdac/employees/employee/actions/create" });
    }
  );
};

const editItem = (row) => {
  return navigateTo({
    path: "/kdac/employees/employee/actions/update",
    query: { id: row.id },
  }).then(() => {
    navigateTo({
      path: "/kdac/employees/employee/actions/update",
      query: { id: row.id },
    });
  });
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
        await ifetch(employeeAPI.delete, { id: id }).then(() => {
          getData();
        });
        resolve();
      });
    },
    allowOutsideClick: () => !swal.isLoading(),
  });
};

const dateFilterChange = (date) => {
  nextTick(() => {
    formHeader.value.filter.dateFilter = date;
  });
  getData();
};

const resetFilter = () => {
  filter.department_id = null;
  filter.job_position_id = null;
  formHeader.value.filter.dateFilter = null;
  getData();
};
</script>

<style scoped></style>
