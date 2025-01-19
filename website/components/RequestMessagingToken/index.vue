<template>
  <div class="modal fade" id="requestMessagingId">
    <div class="modal-dialog modal-md">
      <div class="modal-content box-notification-subscribe">
        <div class="modal-body p-l-25 p-r-25 py-4">
          <div class="row">
            <div class="col-3 px-1">
              <img src="/favicon.png" class="img-fluid" alt="" />
            </div>
            <div class="col-9">
              <p>
                {{ $t("subsribe_info") }}
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-6"></div>
            <div class="col-6 d-flex justify-content-end">
              <button
                class="btn btn-light btn-lg text-sm px-3 mx-2 btn-later-subscribe"
                @click="closeModal"
              >
                {{ $t("later") }}
              </button>
              <button
                class="btn btn-primary btn-lg text-sm px-3"
                @click="confirmAcceptToken"
              >
                {{ $t("subscribe") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useUserStore } from "~/store/user";
const userStore = useUserStore();
const state = reactive({
  modal: null,
});

onMounted(() => {
  const bootstrap = useNuxtApp().$bootstrap;
  state.modal = new bootstrap.Modal("#requestMessagingId", {
    backdrop: false,
  });
});

const confirmAcceptToken = async () => {
  await userStore.requestToken();
  closeModal();
};

const showModal = () => {
  state.modal.show();
};
const closeModal = () => {
  state.modal.hide();
};
defineExpose({
  showModal,
});
</script>
<style>
  html.dark .box-notification-subscribe{
    background-color: rgba(30, 30, 30, 1);
  }
  html.dark .btn-later-subscribe{
    background-color: rgba(43, 46, 51, 1) !important;
    color: white !important;
  }
</style>
