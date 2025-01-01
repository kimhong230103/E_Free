<template>
  <div class="modal fade" id="modal">
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <h4>{{ $t("signup") }}</h4>
          <!-- <Icon name="material-symbols:keyboard-backspace-rounded" class="back btn" size="35" style="color: #a6a6a6;" /> -->
          <button
            class="btn-close color-mode-btn-close"
            type="button"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body p-l-25 p-r-25 py-4 pt-3">
          <img src="/e-free-logo.png" width="160px" alt="">
          <h5 class="fw-bold mt-2 welcome_to">{{ $t("start_to_shopping_with") }} <span style="color: var(--theme-default);">E-Free</span></h5>
          <div class="row mt-1">
            <div class="col-12 form-log">
              <form action="">
                <div class="row">
                  <div class="col-6">
                    <div class="form-group mb-2">
                      <label for="first_name" class="my-2 required">{{ $t("first_name") }}</label>
                      <input 
                        v-model="form.first_name"
                        type="text" 
                        id="first_name" 
                        class="form-control" 
                        :placeholder="$t('first_name')"
                        :class="{ 'is-invalid': v$.first_name.$error }"
                        @change="v$.first_name.$touch"
                      >
                      <span class="invalid-feedback" v-if="v$.first_name.$error">{{ v$.first_name.$errors[0].$message }}</span>
                  </div>
                  </div>
                  <div class="col-6">
                    <label for="last_name" class="my-2 required">{{ $t("lastname") }}</label>
                    <input 
                      v-model="form.last_name" 
                      type="text" 
                      id="last_name" 
                      class="form-control" 
                      :placeholder="$t('lastname')"
                      :class="{ 'is-invalid': v$.last_name.$error }"
                      @change="v$.last_name.$touch"
                    >
                    <span class="invalid-feedback" v-if="v$.last_name.$error">{{ v$.last_name.$errors[0].$message }}</span>
                  </div>
                </div>
                <label for="dob" class="my-2 required">{{ $t("date_of_birth") }}</label>
                <div class="form-group date-picker-range w-100">
                  <IDatePicker
                    v-model="form.dob"
                    :multi-calendars="false"
                    :date-only="true"
                    :range="false"
                    :placeholder="$t('date_of_birth')"
                    @dateChange="dateChange"
                    :class="{ 'is-invalid': v$.dob.$error }"
                    @change="v$.dob.$touch"
                  />
                  <span class="invalid-feedback" v-if="v$.dob.$error">{{ v$.dob.$errors[0].$message }}</span>
                </div>
                <label for="email" class="my-2 required">{{ $t("email") }}</label>
                <input 
                  v-model="form.email"
                  type="text" 
                  id="email" 
                  class="form-control" 
                  :placeholder="$t('email')"
                  :class="{ 'is-invalid': v$.email.$error }"
                  @change="v$.email.$touch"
                >
                <span class="invalid-feedback" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</span>
                <label for="password" class="my-2 required">{{ $t("password") }}</label>
                <input 
                  v-model="form.password"
                  type="password" 
                  id="password" 
                  class="form-control" 
                  :placeholder="$t('password')"
                  :class="{ 'is-invalid': v$.password.$error }"
                  @change="v$.password.$touch"
                >
                <span class="invalid-feedback" v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</span>
                <label for="confirm_password" class="my-2 required">{{ $t("confirm_password") }}</label>
                <input 
                  v-model="form.confirm_password"
                  type="password" 
                  id="confirm_password" 
                  class="form-control" 
                  :placeholder="$t('confirm_password')"
                  :class="{ 'is-invalid': v$.confirm_password.$error }"
                  @change="v$.confirm_password.$touch"
                >
                <span class="invalid-feedback" v-if="v$.confirm_password.$error">{{ v$.confirm_password.$errors[0].$message }}</span>
                <div class="w-100 text-center">
                  <span class="btn btn-primary mt-3 px-4" @click="save">{{ $t("signup") }}</span>
                  <p class="mt-2">{{ $t("dont_have_an_account") }} <span class="text-underline" style="color: #fb5d1f;">{{ $t("sign_in") }}</span></p>
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="recaptcha-container"></div>
    
  </div>
</template>
<script setup>
import moment from 'moment';
import {
    required,
    email,
    minLength,
    maxLength,
    url,
  } from "@vuelidate/validators";

const state = reactive({
  modal: null,
  recaptchaVerifier: null,
});
const emit = defineEmits(["closeModal", "goToSignIn"]);
let form = reactive({});
const defaultForm = {
  first_name: null,
  last_name: null,
  dob: null,
  email: null,
  password: null,
  confirm_password: null
}
onMounted(() => {
  const bootstrap = useNuxtApp().$bootstrap;
  state.modal_demo = new bootstrap.Modal("#modal");
  Object.assign(form, defaultForm);
});
const rules = computed(() => {
  return {
    first_name: {
      required,
    },
    last_name: {
      required
    },
    dob: {
      required
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(20)
    },
    confirm_password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(20)
    }
  };
});
const v$ = vuelidate(rules, form);
const save = async () => {
  let url = null;
  const result = await v$.value.$validate();
  if (result) {
    iAlert().success();
    closeModal(true);
  } else {
    useNuxtApp().$showToast({ msg: "Invalid Input.", type: "error" });
  }
};

const dateChange = async (date) => {
    form.dob =moment(date).format("DD-MM-YYYY");
    if (form.dob == "Invalid date") {
      form.dob = null
    }
};

const showModal = () => {
  state.modal_demo.show();
};

const closeModal = (isRefresh = false) => {
  emit("closeModal", isRefresh);
  state.modal_demo.hide();
};
const setDefaultForm = () => {
  Object.assign(form, defaultForm);
}


defineExpose({
  showModal,
});
</script>
<style lang="scss" scoped>
.form-log{
  color: var(--color-blue) !important;
}
html.dark .form-log{
  color: #fff !important;
}
.welcome_to{
  color: var(--color-blue) !important;
}
.forgot-password{
  transition: all 0.3s;
}
.forgot-password:hover{
  color: #fb5d1f !important;
}
html.dark .welcome_to{
  color: #fff !important;
}
html.dark .modal-dialog .modal-content {
  background-color: rgb(41, 41, 41);
  .color-mode-btn-close {
    background-color: #fb5d1f;
    opacity: 1;
    color: #ffffff !important;
  }
  label.required {
    color: #ffffff;
  }
  .back{
    background-color: #fb5d1f;
    opacity: 1;
    color: #ffffff !important;
  }
}
</style>
