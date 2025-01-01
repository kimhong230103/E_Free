<template>
  <div class="col-sm-12 pt-3 col-xl-12">
    <div class="card b-t-primary border-3">
      <div class="card-header">
        <div class="row gy-3 gy-lg-0 align-items-center">
          <div class="col-6">
            <h4 class="mb-0">{{ $t("notification") }}</h4>
          </div>
          <div class="col-6">
            <div class="form-group d-flex justify-content-end">
              <button class="btn btn-primary mx-2" @click="readAll">
                {{ $t("read_all") }}
              </button>
              <button class="btn btn-danger" @click="clearAll">
                {{ $t("clear_all") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-for="item in notification_lists"
      :key="item.id"
      @click="readNotification(item)"
      class="row m-2 p-2 shadow rounded-2 border border-1"
      style="cursor: pointer"
      :class="[
        item.status == statusEnum.disable ? 'bg-body' : 'bg-transparent',
      ]"
    >
      <div class="col-1 d-flex justify-content-center">
        <Icon
          v-if="
            item.noti_type == notificationTypeEnum.deposit_check_bank ||
            item.noti_type == notificationTypeEnum.deposit_topup ||
            item.noti_type == notificationTypeEnum.deposit_complete
          "
          :name="`solar:round-arrow-right-down-broken`"
          size="50"
          class="text-success"
        />
        <Icon
          v-else-if="
            item.noti_type == notificationTypeEnum.deposit_reject ||
            item.noti_type == notificationTypeEnum.withdraw_reject
          "
          :name="`material-symbols:cancel-outline-rounded`"
          size="50"
          class="text-danger"
        />
        <Icon
          v-else-if="
            item.noti_type == notificationTypeEnum.withdraw_check_bank ||
            item.noti_type == notificationTypeEnum.withdraw_topup ||
            item.noti_type == notificationTypeEnum.withdraw_complete ||
            item.noti_type == notificationTypeEnum.withdraw_reject
          "
          name="solar:round-arrow-left-up-broken"
          size="50"
          class="text-danger"
        />
        <Icon
          v-else-if="
            item.noti_type == notificationTypeEnum.new_account_registration
          "
          name="fluent:people-add-32-regular"
          size="50"
          class="text-primary"
        />
      </div>
      <div class="col-9">
        <h5 class="pb-2">
          {{ item.title }}
        </h5>
        <p>{{ item.description }}</p>
      </div>
      <div class="col-2 d-flex align-items-center justify-content-end">
        <p>{{ moment(item.created_at).fromNow() }}.</p>
      </div>
    </div>

    <div
      class="d-flex justify-content-between align-items-center mt-2 ipagination p-2"
    >
      <div class="d-flex align-items-center gap-2">
        <div class="dropdown mb-0">
          <button
            class="btn btn-lightGray"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {{ tableSize }}
            <span class="ms-1">
              <Icon name="fluent:caret-down-20-filled" />
            </span>
          </button>
          <ul class="dropdown-menu">
            <li
              v-for="row in pageOption"
              :key="row.index"
              @click="pageOptionChange(row)"
            >
              <a class="dropdown-item" href="#">{{ row }}</a>
            </li>
          </ul>
        </div>
        <p class="fw-bold text-gray mb-0 text-sm">
          {{ pagination.from }} {{ $t("of") }} {{ pagination.to }}
        </p>
      </div>

      <div class="pagination">
        <vue-awesome-paginate
          :total-items="pagination.total"
          :items-per-page="pagination.per_page"
          :max-pages-shown="4"
          v-model="pagination.current_page"
          :on-click="paginationChange"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import moment from "moment";
import { notificationApi } from "~/constants/api";
import { useUserStore } from "@/store/user.js";
const tableSize = ref("10");
const pageOption = ref([5, 10, 20, 50, 100]);
const userStore = useUserStore();
let notification_lists = ref([]);

let pagination = ref({
  current_page: 1,
  per_page: 2,
  total: 0,
  to: 0,
  from: 0,
  last_page: 0,
});

onMounted(async () => {
  await getNotificationLists();
});

const pageOptionChange = async (row) => {
  tableSize.value = row;
  await getNotificationLists();
};
const paginationChange = (pageNum) => {
  pagination.value.current_page = pageNum;
  getNotificationLists();
};

const getNotificationLists = async () => {
  let input = getInput();
  await ifetch(notificationApi.getNotificationList, input).then((res) => {
    setInput(res);
  });
};

const setInput = (data) => {
  notification_lists.value = data.notification_list;
  pagination.value = data.pagination;
};

const getInput = () => {
  return {
    page: pagination.value.current_page,
    table_size: tableSize.value,
  };
};

//read notification
const readNotification = async (item) => {
  await ifetch(notificationApi.readNotification, {
    id: item.id,
  }).then((res) => {
    userStore.setNotificationList(res.notification_list.data);
    if (
      item.noti_type == notificationTypeEnum.deposit_check_bank ||
      item.noti_type == notificationTypeEnum.deposit_topup ||
      item.noti_type == notificationTypeEnum.deposit_reject ||
      item.noti_type == notificationTypeEnum.deposit_complete
    ) {
      // checkBankDepositAction({});
      return navigateTo("/deposit");
    } else if (
      item.noti_type == notificationTypeEnum.withdraw_check_bank ||
      item.noti_type == notificationTypeEnum.withdraw_complete ||
      item.noti_type == notificationTypeEnum.withdraw_reject ||
      item.noti_type == notificationTypeEnum.withdraw_topup
    ) {
      // checkBankWithdrawAction({});
      return navigateTo("/withdraw");
    } else if (
      item.noti_type == notificationTypeEnum.new_account_registration
    ) {
      return navigateTo("/account/account");
    }
  });
};

//read all notification
const readAll = async () => {
  let input = getInput();
  await ifetch(notificationApi.readAllNotification, input).then((res) => {
    setInput(res.notification_list);
    userStore.setNotificationList(res.notification_list.notification_list);
    userStore.setTotalPendingTransaction(res.total_pending_transaction);
    userStore.setNotificationRequest(res.total_notification_request);
  });
};

//read all notification
const clearAll = async () => {
  let input = getInput();
  await ifetch(notificationApi.clearAllNotification, {
    table_size: tableSize.value,
  }).then((res) => {
    setInput(res.notification_list);
    userStore.setNotificationList(res.notification_list.notification_list);
    userStore.setTotalPendingTransaction(res.total_pending_transaction);
    userStore.setNotificationRequest(res.total_notification_request);
  });
};
</script>
