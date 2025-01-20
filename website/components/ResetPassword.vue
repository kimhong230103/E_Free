<template>
    <div class="modal fade" id="modal">
        <div class="modal-dialog modal-dialog-centered modal-md">
            <div class="modal-content">
                <div class="modal-header d-flex justify-content-between align-items-center">
                    <div data-bs-dismiss="modal" aria-label="Close" class="cursor-pointer" @click="closeModal">
                      <Icon name="solar:round-alt-arrow-left-bold" size="2.5rem" style="color: #253696;" />
                    </div>
          
                    <div data-bs-dismiss="modal" aria-label="Close" class="cursor-pointer" @click="closeModal">
                      <Icon name="solar:close-circle-bold" size="2.5rem" style="color: #253696;" />
                    </div>
                  </div>
                <div class="modal-body p-l-25 p-r-25 py-4 pt-3">
                    <img src="/e-free-logo.png" width="160px" alt="">
                    <h5 class="fw-bold mt-2 welcome_to">{{ $t("reset_password") }}</h5>
                    <p>{{ $t("reset_password_text") }}</p>
                    <div class="row mt-1">
                        <div class="col-12 form-log">
                            <form action="">
                                <label for="password" class="my-2 required">{{ $t("new_password") }}</label>
                                <input v-model="form.password" type="password" id="password" class="form-control"
                                    :placeholder="$t('new_password')" :class="{ 'is-invalid': v$.password.$error }"
                                    @change="v$.password.$touch">
                                <span class="invalid-feedback" v-if="v$.password.$error">{{
                                    v$.password.$errors[0].$message }}</span>
                                <label for="confirm_password" class="my-2 required">{{ $t("confirm_password") }}</label>
                                <input v-model="form.confirm_password" type="password" id="confirm_password"
                                    class="form-control" :placeholder="$t('confirm_password')"
                                    :class="{ 'is-invalid': v$.confirm_password.$error }"
                                    @change="v$.confirm_password.$touch">
                                <span class="invalid-feedback" v-if="v$.confirm_password.$error">{{
                                    v$.confirm_password.$errors[0].$message }}</span>
                                <div class="w-100 text-center">
                                    <span class="btn btn-blue mt-3 px-4" @click="save">{{ $t("sign_in") }}</span>
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
import { ref, reactive, computed } from "vue";
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
const showSignInModal = ref(false);
const signInRef = ref(null);
const signIn = () => {
    drawer.value = false;
    showSignInModal.value = true;
    nextTick(() => {
        signInRef.value.showModal();
    });
};

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
    form.dob = moment(date).format("DD-MM-YYYY");
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
p {
    color: #6D7F88;
}

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