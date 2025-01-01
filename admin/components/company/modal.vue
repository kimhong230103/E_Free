<template>
  <div class="modal fade" id="modal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">{{ $t("company") }}</h4>
          <button
            class="btn-close"
            type="button"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="() => closeModal()"
          ></button>
        </div>
        <div class="modal-body p-l-25 p-r-25">
          <form class="theme-form">
            <div class="row">
              <div class="col-sm-8">
                <div class="row">
                  <div class="col">
                    <div class="form-group mb-3">
                      <label>{{ $t("company_name") }}</label>
                      <input
                        type="text"
                        class="form-control"
                        :placeholder="$t('company_name')"
                        required
                        v-model="form.local_name"
                        :class="{ 'is-invalid': v$.local_name.$error }"
                        @change="v$.local_name.$touch"
                      />
                      <span
                        class="invalid-feedback"
                        v-if="v$.local_name.$error"
                        >{{ v$.local_name.$errors[0].$message }}</span
                      >
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="form-group mb-3">
                      <label>{{ $t("latin_name") }}</label>
                      <input
                        type="text"
                        class="form-control"
                        :placeholder="$t('latin_name')"
                        required
                        v-model="form.latin_name"
                        :class="{ 'is-invalid': v$.latin_name.$error }"
                        @change="v$.latin_name.$touch"
                      />
                      <span
                        class="invalid-feedback"
                        v-if="v$.latin_name.$error"
                        >{{ v$.latin_name.$errors[0].$message }}</span
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
                  <div class="col">
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
                </div>
                <div class="row" v-if="rowID">
                  <div class="col">
                    <div class="mb-3">
                      <label class="required">{{ $t("status") }}</label>

                      <select
                        class="form-control form-select"
                        v-model="form.status"
                        @change="(e) => (form.status = e.target.value)"
                      >
                        <option
                          :value="status.value"
                          v-for="status in statusEnum.list"
                          :key="status.key"
                          :selected="status.value === form.status"
                        >
                          {{ $t(status.key) }}
                        </option>
                      </select>
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
                    :src="form.logo_display"
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
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="() => closeModal()"
          >
            {{ $t("close") }}
          </button>
          <button
            v-if="props.actionType && props.actionType !== 'update'"
            type="button"
            class="btn btn-primary"
            @click="() => save(true)"
          >
            {{ $t("save_new") }}
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="() => save(false)"
          >
            {{ $t("save") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { useVuelidate } from "@vuelidate/core";
  import { required, email, minLength, maxLength } from "@vuelidate/validators";
  import { appConst } from "~/constants/app";
  import { companyAPI } from "~/constants/api";

  const props = defineProps({
    actionType: String,
  });
  const state = reactive({
    modal: null,
  });

  const defaultForm = {
    local_name: null,
    latin_name: null,
    company_name: null,
    phone: null,
    alt_phone: null,
    email: null,
    address: null,
    logo: null,
    logo_display: appConst.defaultImage,
    status: statusEnum.enable,
  };
  const rowID = ref(null);
  const form = reactive({});

  const rules = computed(() => {
    return {
      latin_name: {
        required,
        maxLength: maxLength(100),
        $autoDirty: true,
      },
      local_name: {
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
        maxLength: maxLength(100),
        $autoDirty: true,
      },
      address: {
        maxLength: maxLength(255),
        $autoDirty: true,
      },
    };
  });

  const v$ = useVuelidate(rules, form);
  const emit = defineEmits(["closeModal"]);
  const fileInput = ref(null);

  onMounted(() => {
    setDefaultForm();
    const bootstrap = useNuxtApp().$bootstrap;
    state.modal = new bootstrap.Modal("#modal");
  });

  const showModal = async (editId = null) => {
    state.modal.show();
    rowID.value = editId;
    if (editId) {
      const data = await ifetch(companyAPI.get_by_id, { id: editId });
      Object.assign(form, data);
      form.local_name = getNameByLocal(form.company_name, "local_name");
      form.latin_name = getNameByLocal(form.company_name, "latin_name");
      form.logo_display = empty(data.logo)
        ? appConst.defaultImage
        : getImagePath(data.logo);
      form.logo = data.logo;
    }
  };

  const chooseImage = () => {
    fileInput.value.click();
  };
  const onFileChange = ($event) => {
    const files = $event.target.files || $event.dataTransfer.files;

    if (files[0]) {
      if (files[0].size > 2 * 1024 * 1024) {
        form.logo = appConst.defaultImage;
        return;
      }
      const reader = new FileReader();

      reader.onload = function (e) {
        form.logo = "";
        form.logo = e.target.result;
        form.logo_display = e.target.result;
      };
      reader.readAsDataURL(files[0]);
    } else {
      form.logo = appConst.defaultImage;
    }
  };

  const closeModal = (isRefresh = false) => {
    // setDefaultForm();
    state.modal.hide();
    emit("closeModal", isRefresh);
  };
  const save = async (isNew = false) => {
    const result = await v$.value.$validate();
    if (result) {
      // const data = ifetch('/branch/store', form)
      form.company_name = JSON.stringify({
        local_name: form.local_name,
        latin_name: form.latin_name,
      });
      let url = companyAPI.store;
      if (props.actionType === appConst.modalAction.update) {
        url = companyAPI.update;
      }
      // console.log(url, form);
      await ifetch(url, form);
      iAlert().success();
      setDefaultForm();
      emit("closeModal", true);
      if (!isNew) closeModal(true);
    } else {
      iAlert().error();
    }
  };

  const setDefaultForm = () => {
    Object.assign(form, defaultForm);

    v$.value.$reset();
  };

  defineExpose({
    showModal,
  });
</script>
