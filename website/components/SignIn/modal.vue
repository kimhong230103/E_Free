<template>
  <div class="modal fade" id="signInModal">
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <div 
            class="w-100 text-end cursor-pointer" 
            type="button" 
            data-bs-dismiss="modal" 
            aria-label="Close"
          >
            <Icon name="solar:close-circle-bold" size="2.5rem" style="color: #253696;" />
          </div>
        </div>

        <!-- Modal Body -->
        <div class="modal-body p-l-25 p-r-25 py-4 pt-3">
          <img src="/e-free-logo.png" width="160px" alt="E-Free" />
          <h5 class="fw-bold mt-2 welcome_to">
            {{ $t("welcome_back_to") }} 
            <span style="color: var(--theme-default);">E-Free</span>
          </h5>

          <!-- Sign In Form -->
          <div class="row mt-1">
            <div class="col-12 form-log">
              <form @submit.prevent="handleSubmit">
                <label for="email" class="my-2 required">{{ $t("email") }}</label>
                <input 
                  v-model="form.email" 
                  type="text" 
                  id="email" 
                  class="form-control" 
                  :placeholder="$t('email')"
                  :class="{ 'is-invalid': v$.email.$error }" 
                  @change="v$.email.$touch"
                />
                <span class="invalid-feedback" v-if="v$.email.$error">
                  {{ v$.email.$errors[0].$message }}
                </span>

                <label for="password" class="my-2 required">{{ $t("password") }}</label>
                <input 
                  v-model="form.password" 
                  type="password" 
                  id="password" 
                  class="form-control"
                  :placeholder="$t('password')" 
                  :class="{ 'is-invalid': v$.password.$error }"
                  @change="v$.password.$touch"
                />
                <span class="invalid-feedback" v-if="v$.password.$error">
                  {{ v$.password.$errors[0].$message }}
                </span>

                <p 
                  class="forgot-password mt-2 text-underline cursor-pointer"
                  @click="switchToForgotPassword"
                >
                  {{ $t("forgot_password") }}
                </p>

                <div class="w-100 text-center">
                  <button type="submit" class="w-25 btn btn-blue mt-3 px-4">
                    {{ $t("sign_in") }}
                  </button>
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

    <!-- Google Recaptcha -->
    <div id="recaptcha-container"></div>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";

// Define component emits
const emit = defineEmits(["switchToSignUp", "closeModal"]);

// Reactive form data
const form = reactive({
  email: "",
  password: "",
});

// Validation rules
const rules = computed(() => ({
  email: { required, email },
  password: { required, minLength: minLength(8), maxLength: maxLength(20) },
}));

const v$ = useVuelidate(rules, form);

// Bootstrap modal instance
const state = reactive({
  modalInstance: null,
});

// Initialize Bootstrap modal on mount
onMounted(() => {
  const bootstrap = useNuxtApp().$bootstrap;
  state.modalInstance = new bootstrap.Modal("#signInModal");
});

// Show the modal
const showModal = () => {
  state.modalInstance.show();
};

// Close the modal and optionally refresh
const closeModal = (isRefresh = false) => {
  emit("closeModal", isRefresh);
  state.modalInstance.hide();
};

// Form submit handler
const handleSubmit = async () => {
  const isValid = await v$.value.$validate();
  if (isValid) {
    alert("Sign-in successful!");
    closeModal(true);
  } else {
    useNuxtApp().$showToast({ msg: "Invalid Input.", type: "error" });
  }
};

// Switch to the Sign-Up modal
const switchToSignUp = () => {
  closeModal();
  emit("switchToSignUp");
};

// Emit event to show Forgot Password modal
const switchToForgotPassword = () => {
  closeModal(); // Close the current modal
  emit("switchToForgotPassword"); // Notify parent to open Forgot Password modal
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
}

.text-blue {
  color: #253696 !important;
}
.text-underline {
  cursor: pointer;
  text-decoration: underline;
}

.btn-blue {
  background-color: var(--theme-default);
  color: white;
}
</style>
