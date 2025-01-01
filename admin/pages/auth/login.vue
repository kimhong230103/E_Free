<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 p-0">
          <div class="login-card">
            <div>
              <div>
                <a class="logo">
                  <img
                    class="img-fluid"
                    src="/images/e-free-logo.png"
                    alt="looginpage"
                    width="220px"
                  />
                </a>
              </div>
              <div class="login-main">
                <form class="theme-form">
                  <h4>Sign in to account</h4>
                  <p>Enter your username & password to login</p>
                  <div class="form-group">
                    <label class="form-label">{{ $t("username") }}</label>
                    <input
                      class="form-control"
                      :class="{ 'is-invalid': v$.username.$error }"
                      name="username"
                      :placeholder="$t('username')"
                      v-model="form.username"
                      @change="v$.username.$touch"
                    />
                    <span class="invalid-feedback" v-if="v$.username.$error">{{
                      v$.username.$errors[0].$message
                    }}</span>
                  </div>
                  <div class="form-group">
                    <label class="col-form-label">{{ $t("password") }}</label>
                    <div class="form-input position-relative">
                      <input
                        class="form-control"
                        :class="{ 'is-invalid': v$.password.$error }"
                        type="password"
                        name="password"
                        placeholder="*********"
                        v-model="form.password"
                        @change="v$.password.$touch"
                      />
                      <span
                        class="invalid-feedback"
                        v-if="v$.password.$error"
                        >{{ v$.password.$errors[0].$message }}</span
                      >
                    </div>
                  </div>
                  <div class="form-group mb-0">
                    <!-- <div class="checkbox p-0">
                      <input id="checkbox1" type="checkbox" />
                      <label class="text-muted" for="checkbox1"
                        >Remember password</label
                      >
                    </div>
                    <nuxt-link class="link" to="/authentication/forget_password"
                      >Forgot password?</nuxt-link
                    > -->
                    <div class="text-end mt-3">
                      <button
                        class="btn btn-primary btn-block w-100"
                        @click.prevent="login"
                      >
                        Sign in
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";
import { required, minLength } from "@vuelidate/validators";
import { useUserStore } from "~/store/user";

// Set Layout
definePageMeta({
  layout: "login",
});

// Declare data
const form = reactive({
  username: "",
  password: "",
});

const userStore = useUserStore();

// Define validation rules
const rules = {
  username: {
    required,
  },
  password: {
    required,
    minLength: minLength(6),
  },
};

// Create validation object
const v$ = vuelidate(rules, form);

// Define login function
const login = () => {
  if (v$.value.$invalid) return; // Check if form is invalid
  userStore.login(form);
};
</script>
