<template>
  <div class="modal fade" id="signUpModal">
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <div data-bs-dismiss="modal" class="w-100 text-end cursor-pointer" aria-label="Close">
            <Icon name="solar:close-circle-bold" size="2.5rem" style="color: #253696;" />
          </div>
        </div>

        <!-- Modal Body -->
        <div class="modal-body p-l-25 p-r-25 py-4 pt-3">
          <img src="/e-free-logo.png" width="160px" alt="E-Free" />
          <h5 class="fw-bold mt-2 welcome_to">
            {{ $t("start_to_shopping_with") }} 
            <span style="color: var(--theme-default);">E-Free</span>
          </h5>

          <!-- Sign Up Form -->
          <div class="row mt-1">
            <div class="col-12 form-log">
              <form @submit.prevent="save">
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
                      />
                      <span v-if="v$.first_name.$error" class="invalid-feedback">
                        {{ v$.first_name.$errors[0].$message }}
                      </span>
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
                    />
                    <span v-if="v$.last_name.$error" class="invalid-feedback">
                      {{ v$.last_name.$errors[0].$message }}
                    </span>
                  </div>
                </div>

                <label for="dob" class="my-2 required">{{ $t("date_of_birth") }}</label>
                <div class="form-group date-picker-range w-100">
                  <IDatePicker 
                    v-model="form.dob" 
                    :placeholder="$t('date_of_birth')" 
                    :class="{ 'is-invalid': v$.dob.$error }"
                    @dateChange="dateChange" 
                    @change="v$.dob.$touch"
                  />
                  <span v-if="v$.dob.$error" class="invalid-feedback">
                    {{ v$.dob.$errors[0].$message }}
                  </span>
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
                />
                <span v-if="v$.email.$error" class="invalid-feedback">
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
                <span v-if="v$.password.$error" class="invalid-feedback">
                  {{ v$.password.$errors[0].$message }}
                </span>

                <label for="confirm_password" class="my-2 required">{{ $t("confirm_password") }}</label>
                <input 
                  v-model="form.confirm_password" 
                  type="password" 
                  id="confirm_password" 
                  class="form-control"
                  :placeholder="$t('confirm_password')" 
                  :class="{ 'is-invalid': v$.confirm_password.$error }"
                  @change="v$.confirm_password.$touch"
                />
                <span v-if="v$.confirm_password.$error" class="invalid-feedback">
                  {{ v$.confirm_password.$errors[0].$message }}
                </span>

                <div class="w-100 text-center">
                  <button type="submit" class="w-25 btn btn-blue mt-3 px-4">
                    {{ $t("signup") }}
                  </button>
                  <p @click="switchToSignIn" class="mt-2">
                    {{ $t("already_have_an_account") }}
                    <span class="text-underline" style="color: #fb5d1f;">{{ $t("signin") }}</span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
import { ref, reactive, computed, onMounted } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";

const emit = defineEmits(["switchToSignIn", "closeModal"]);

const form = reactive({
  first_name: "",
  last_name: "",
  dob: null,
  email: "",
  password: "",
  confirm_password: "",
});

const rules = computed(() => ({
  first_name: { required },
  last_name: { required },
  dob: { required },
  email: { required, email },
  password: { required, minLength: minLength(8), maxLength: maxLength(20) },
  confirm_password: { required, minLength: minLength(8), maxLength: maxLength(20) },
}));

const v$ = useVuelidate(rules, form);

const state = reactive({
  modalInstance: null,
});

// Initialize modal on mount
onMounted(() => {
  const bootstrap = useNuxtApp().$bootstrap;
  state.modalInstance = new bootstrap.Modal("#signUpModal");
});

// Show the modal
const showModal = () => {
  state.modalInstance.show();
};

// Close modal and emit event
const closeModal = () => {
  emit("closeModal");
  state.modalInstance.hide();
};

// Switch to Sign In modal
const switchToSignIn = () => {
  closeModal();
  emit("switchToSignIn");
};

// Handle form submission
const save = async () => {
  const valid = await v$.value.$validate();
  if (valid) {
    alert("Signup successful!");
    closeModal();
  } else {
    useNuxtApp().$showToast({ msg: "Invalid input.", type: "error" });
  }
};

// Expose methods for parent access
defineExpose({
  showModal,
  switchToSignIn,
});
</script>

<style lang="scss" scoped>
.form-log {
  color: var(--color-blue);
}

.welcome_to {
  color: var(--color-blue);
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
