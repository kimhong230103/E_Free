<template>
  <div class="modal fade" id="modal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">{{ $t("branch") }}</h4>
          <button
            class="btn-close"
            type="button"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body p-l-25 p-r-25">
          <form class="theme-form">
            <div class="row">
              <div class="col-sm-8">
                <div class="row">
                  <div class="col" v-show="userStore.isSuperUser">
                    <div class="form-group mb-3">
                      <label>{{ $t("company") }}</label>
                      <select
                        class="form-control"
                        v-model="form.company_id"
                        :class="{ 'is-invalid': v$.company_id.$error }"
                        @change="v$.company_id.$touch"
                      >
                        <option value="" selected disabled>
                          {{ $t("please_select") }}
                        </option>
                        <option
                          v-for="obj in companyStore.getList"
                          :key="obj.index"
                          :value="obj.id"
                        >
                          {{ getNameByLocal(obj.company_name) }}
                        </option>
                      </select>
                      <span
                        class="invalid-feedback"
                        v-if="v$.company_id.$error"
                        >{{ v$.company_id.$errors[0].$message }}</span
                      >
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="form-group mb-3">
                      <label class="required">{{ $t("name") }}</label>
                      <input
                        type="text"
                        class="form-control"
                        :placeholder="$t('name')"
                        required
                        v-model="form.branch_name"
                        :class="{ 'is-invalid': v$.branch_name.$error }"
                        @change="v$.branch_name.$touch"
                      />
                      <span
                        class="invalid-feedback"
                        v-if="v$.branch_name.$error"
                        >{{ v$.branch_name.$errors[0].$message }}</span
                      >
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <label>{{ $t("phone") }}</label>
                      <input
                        type="text"
                        class="form-control"
                        :placeholder="$t('phone')"
                        v-model="form.phone"
                        :class="{ 'is-invalid': v$.phone.$error }"
                        @change="v$.phone.$touch"
                      />
                      <span class="invalid-feedback" v-if="v$.phone.$error">{{
                        v$.phone.$errors[0].$message
                      }}</span>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <label>{{ $t("alt_phone") }}</label>
                      <input
                        type="text"
                        class="form-control"
                        :placeholder="$t('alt_phone')"
                        v-model="form.alt_phone"
                        :class="{ 'is-invalid': v$.alt_phone.$error }"
                        @change="v$.alt_phone.$touch"
                      />
                      <span
                        class="invalid-feedback"
                        v-if="v$.alt_phone.$error"
                        >{{ v$.alt_phone.$errors[0].$message }}</span
                      >
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6">
                    <div class="mb-3">
                      <label>{{ $t("email") }}</label>
                      <input
                        type="text"
                        class="form-control"
                        :placeholder="$t('email')"
                        v-model="form.email"
                        :class="{ 'is-invalid': v$.email.$error }"
                        @change="v$.email.$touch"
                      />
                      <span class="invalid-feedback" v-if="v$.email.$error">{{
                        v$.email.$errors[0].$message
                      }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div style="margin-top: 35px">
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          v-model="form.status"
                          role="switch"
                          id="status"
                        />
                        <label class="form-check-label" for="status">{{
                          $t("status")
                        }}</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="required">{{ $t("address") }}</label>
                      <textarea
                        class="form-control"
                        rows="3"
                        :placeholder="$t('address')"
                        v-model="form.address"
                        :class="{ 'is-invalid': v$.address.$error }"
                        @change="v$.address.$touch"
                      />
                      <span class="invalid-feedback" v-if="v$.address.$error">{{
                        v$.address.$errors[0].$message
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="text-center m-t-25">
                  <img
                    :src="getImagePath(form.logo)"
                    width="200"
                    class="rounded mx-auto d-block"
                  />
                </div>
                <div class="file-content text-center m-t-20">
                  <div class="media-body">
                    <div style="height: 0px; width: 0px; overflow: hidden">
                      <input
                        ref="fileInput"
                        style="display: none"
                        type="file"
                        accept=".jpg, .jpeg, .gif, .png, .webp, .svg"
                        :multiple="false"
                        @change="onFileChange"
                      />
                    </div>
                    <div
                      class="btn btn-outline-primary ms-2"
                      @click="chooseImage"
                    >
                      <vue-feather type="upload" class="text-top"></vue-feather>
                      Upload
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeModal()">
            {{ $t("close") }}
          </button>
          <button class="btn btn-primary" @click="save">
            {{ $t("save") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { required, email, minLength, maxLength } from "@vuelidate/validators";
import { appConst } from "~/constants/app";
import { branchAPI } from "~/constants/api";
import { useCompanyStore } from "~/store/company";
import { useUserStore } from "~/store/user";
import { useBranchStore } from "~/store/branch";

const props = defineProps({
  actionType: appConst.modalAction.add,
});
const state = reactive({
  modal: null,
});
const defaultForm = {
  id: null,
  branch_name: null,
  company_id: null,
  phone: null,
  alt_phone: null,
  email: null,
  address: null,
  status: true,
  logo: null,
};
let form = reactive({});

const rules = computed(() => {
  let company_id = {};
  if (useUserStore().isSuperUser) {
    company_id = {
      required,
      maxLength: maxLength(100),
      $autoDirty: true,
    };
  }
  return {
    company_id,
    branch_name: {
      required,
      maxLength: maxLength(100),
      $autoDirty: true,
    },
    phone: {
      maxLength: maxLength(20),
      $autoDirty: true,
    },
    alt_phone: {
      maxLength: maxLength(20),
      $autoDirty: true,
    },
    email: {
      email,
      minLength: maxLength(100),
      $autoDirty: true,
    },
    address: {
      maxLength: maxLength(255),
      $autoDirty: true,
    },
  };
});

const v$ = vuelidate(rules, form);
const emit = defineEmits(["closeModal"]);
const fileInput = ref(null);
const companyStore = useCompanyStore();
const userStore = useUserStore();
const branchStore = useBranchStore();

onMounted(() => {
  setDefaultForm();

  const bootstrap = useNuxtApp().$bootstrap;
  state.modal_demo = new bootstrap.Modal("#modal");
  if (!userStore.isSuperUser) {
    form.company_id = userStore.auth.company_id;
  }
});

const showModal = async (editId = null) => {
  state.modal_demo.show();
  if (editId) {
    const data = await ifetch(branchAPI.get_by_id, { id: editId });
    Object.assign(form, data);
    if (form.status == 1) form.status = true;
    else form.status = false;
  }
};
const chooseImage = () => {
  fileInput.value.click();
};
const onFileChange = ($event) => {
  const files = $event.target.files || $event.dataTransfer.files;
  console.log(files[0].size);
  console.log(2 * 1024 * 1024);
  if (files[0]) {
    if (files[0].size > 4 * 1024 * 1024) {
      form.logo = "";
      return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
      form.logo = "";
      form.logo = e.target.result;
    };
    reader.readAsDataURL(files[0]);
  } else {
    form.logo = "";
  }
};

const save = async () => {
  const result = await v$.value.$validate();
  if (result) {
    if (userStore.isCompanyUser) {
      form.company_id = userStore.auth.company_id;
    }
    let url = branchAPI.store;
    if (props.actionType == appConst.modalAction.update) {
      url = branchAPI.update;
    }
    await ifetch(url, form);
    iAlert().success();
    branchStore.reload();
    closeModal(true);
  } else {
    useNuxtApp().$showToast({ msg: "Invalid Input.", type: "error" });
  }
};

const closeModal = (isRefresh = false) => {
  // setDefaultForm();
  state.modal_demo.hide();
  emit("closeModal", isRefresh);
};

const setDefaultForm = () => {
  Object.assign(form, defaultForm);
  v$.value.$reset();
};

defineExpose({
  showModal,
});
</script>
