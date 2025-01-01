<template>
  <div class="modal fade" id="modal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">
            {{ props.actionType && $t(props.actionType) }} {{ $t("country") }}
          </h4>
          <button
            class="btn-close"
            type="button"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="closeModal"
          ></button>
        </div>
        <div class="modal-body p-l-25 p-r-25">
          <form class="theme-form">
            <div class="row">
              <div class="col-sm-12">
                
                <div class="row">
                  <div class="col-12">
                    <div class="form-group mb-3">
                      <label class="required">{{ $t("name") }}</label>
                      <input
                        type="text"
                        class="form-control"
                        :placeholder="$t('name')"
                        required
                        v-model="form.name"
                        :class="{ 'is-invalid': v$.name.$error }"
                        @change="v$.name.$touch"
                      />
                      <span
                        class="invalid-feedback"
                        v-if="v$.name.$error"
                        >{{ v$.name.$errors[0].$message }}</span
                      >
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group mb-3">
                      <label class="required">{{ $t("continent") }}</label>
                      <input
                        type="text"
                        class="form-control"
                        :placeholder="$t('continent')"
                        required
                        v-model="form.continent"
                        :class="{ 'is-invalid': v$.continent.$error }"
                        @change="v$.continent.$touch"
                      />
                      <span class="invalid-feedback" v-if="v$.continent.$error">{{
                        v$.continent.$errors[0].$message
                      }}</span>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group mb-3">
                      <label class="required">{{ $t("code") }}</label>
                      <input
                        type="text"
                        class="form-control"
                        :placeholder="$t('code')"
                        required
                        v-model="form.code"
                        :class="{ 'is-invalid': v$.code.$error }"
                        @change="v$.code.$touch"
                      />
                      <span
                        class="invalid-feedback"
                        v-if="v$.code.$error"
                        >{{ v$.code.$errors[0].$message }}</span
                      >
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
  import { branchAPI, countryApi } from "~/constants/api";
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
    name: null,
    code: null,
    continent: null,
  };
  let form = reactive({});

  const rules = computed(() => {
    return {
      name: {
        required,
        $autoDirty: true,
      },
      code: {
        $autoDirty: true,
        required,
      },
      continent: {
        required,
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
      form.country_id = userStore.auth.country_id;
    }
  });

  const showModal = async (editId = null, row) => {
    state.modal_demo.show();
    if (editId) {
      Object.assign(form, row);
    }
  };

  const save = async () => {
    const result = await v$.value.$validate();
    if (result) {
      let url = countryApi.store;
      if (props.actionType == appConst.modalAction.update) {
        url = countryApi.update;
      }
      await ifetch(url, form);
      iAlert().success();
      closeModal(true);
    } else {
      useNuxtApp().$showToast({ msg: "Invalid Input.", type: "error" });
    }
  };

  const closeModal = (isRefresh = false) => {
    setDefaultForm();
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
