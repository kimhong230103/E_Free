<template>
  <div class="modal fade" id="modal">
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <div class="w-100 text-end cursor-pointer" type="button" data-bs-dismiss="modal" aria-label="Close">
            <Icon name="solar:close-circle-bold" size="2.5rem" style="color: #253696;" />
          </div>
        </div>
        <div class="modal-body p-l-25 p-r-25 py-4 pt-3">
          <img src="/e-free-logo.png" width="160px" alt="E-Free">
          <h5 class="fw-bold mt-2 welcome_to">
            {{ $t("welcome_back_to") }}
            <span style="color: var(--theme-default);">E-Free</span>
          </h5>
          <div class="row mt-1">
            <div class="col-12 form-log">
              <form>
                <label for="email" class="my-2 required">{{ $t("email") }}</label>
                <input v-model="form.email" type="text" id="email" class="form-control" :placeholder="$t('email')"
                  :class="{ 'is-invalid': v$.email.$error }" @change="v$.email.$touch">
                <span class="invalid-feedback" v-if="v$.email.$error">
                  {{ v$.email.$errors[0].$message }}
                </span>

                <label for="password" class="my-2 required">{{ $t("password") }}</label>
                <input v-model="form.password" type="password" id="password" class="form-control"
                  :placeholder="$t('password')" :class="{ 'is-invalid': v$.password.$error }"
                  @change="v$.password.$touch">
                <span class="invalid-feedback" v-if="v$.password.$error">
                  {{ v$.password.$errors[0].$message }}
                </span>

                <p class="forgot-password mt-2 text-underline cursor-pointer">
                  {{ $t("forgot_password") }}
                </p>

                <div class="w-100 text-center">
                  <span class="btn btn-blue mt-3 px-4" @click="save">
                    {{ $t("sign_in") }}
                  </span>
                  <p @click="switchToSignUp" class="mt-2">
                    {{ $t("dont_have_an_account") }}
                    <span class="text-underline" style="color: #fb5d1f;">{{ $t("signup") }}</span>
                  </p>
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
import {
  required,
  email,
  minLength,
  maxLength,
} from "@vuelidate/validators";
import { reactive, computed } from "vue";
import useVuelidate from "@vuelidate/core";

// Emits for switching modal and closing
const emit = defineEmits(["switchToSignUp", "closeModal"]);

// Reactive form data
const form = reactive({
  email: null,
  password: null,
});

// Validation rules
const rules = computed(() => ({
  email: { required, email },
  password: { required, minLength: minLength(8), maxLength: maxLength(20) },
}));

const v$ = useVuelidate(rules, form);

// State for Bootstrap modal
const state = reactive({
  modalInstance: null,
});

// On mounted, initialize Bootstrap modal
onMounted(() => {
  const bootstrap = useNuxtApp().$bootstrap;
  state.modalInstance = new bootstrap.Modal("#modal");
});

// Show the modal
const showModal = () => {
  state.modalInstance.show();
};

// Close the modal
const closeModal = (isRefresh = false) => {
  emit("closeModal", isRefresh);
  state.modalInstance.hide();
};

// Save form data
const save = async () => {
  const result = await v$.value.$validate();
  if (result) {
    // Handle successful sign-in logic
    alert("Sign-in successful!");
    closeModal(true);
  } else {
    // Show validation error message
    useNuxtApp().$showToast({ msg: "Invalid Input.", type: "error" });
  }
};

// Switch to the Sign-Up modal
const switchToSignUp = () => {
  closeModal();
  state.modalInstance.hide();
};

// Expose methods to parent
defineExpose({
  showModal,
  switchToSignUp
});
</script>

<style lang="scss" scoped>
.form-log {
  color: var(--color-blue) !important;
}

html.dark .form-log {
  color: #fff !important;
}

.welcome_to {
  color: var(--color-blue) !important;
}

.forgot-password {
  transition: all 0.3s;
}

.forgot-password:hover {
  color: #fb5d1f !important;
}

html.dark .welcome_to {
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

  .back {
    background-color: #fb5d1f;
    opacity: 1;
    color: #ffffff !important;
  }
}

.text-blue {
  color: #253696 !important;
}
</style>
