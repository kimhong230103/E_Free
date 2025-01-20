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
                    <h5 class="fw-bold mt-2 welcome_to">{{ $t("verification_email_address") }}? </h5>
                    <p>{{ $t("verification_email_address_text") }}</p>
                    <div class="row mt-1">
                        <div class="col-12 form-log">
                            <div class="verification-code">
                                <div v-for="(digit, index) in 6" :key="index" class="code-box">
                                    {{ digit }}
                                </div>
                            </div>
                            <div class="w-100 text-center">
                                <span class="btn btn-blue mt-3 px-4" @click="save">{{ $t("verify_code") }}</span>
                                <p @click="resendEmail" class="mt-2">{{ $t("havent_got_code") }} <span class="text-underline" style="color: #fb5d1f;">{{ $t("resend_email") }}</span></p>
                            </div>
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
    url,
} from "@vuelidate/validators";
import { ref, onMounted } from "vue";
const state = reactive({
    modal: null,
    recaptchaVerifier: null,
});
let form = reactive({});
const defaultForm = {
    email: null,
    password: null
}
const setDefaultForm = () => {
    Object.assign(form, defaultForm);
}
const emit = defineEmits(["closeModal", "goToSignIn"]);

onMounted(() => {
    const bootstrap = useNuxtApp().$bootstrap;
    state.modal_demo = new bootstrap.Modal("#modal");
    setDefaultForm();
});
const rules = computed(() => {
    return {
        email: {
            required,
            email
        },
        password: {
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
const showModal = () => {
    state.modal_demo.show();
};

const closeModal = (isRefresh = false) => {
    emit("closeModal", isRefresh);
    state.modal_demo.hide();
};


defineExpose({
    showModal,
});


const verificationCode = ref([]);

const generateCode = () => {
  verificationCode.value = Array.from({ length: 6 }, () =>
    Math.floor(Math.random() * 10).toString()
  );
};


onMounted(() => {
  generateCode();
});

const loading = ref(false);

const resendEmail = async () => {
  try {
    loading.value = true; // Disable button and show loading state

    // Simulate API call to resend the email
    await useNuxtApp().$axios.post("/api/resend-verification-email", {
      email: "user@example.com", // Replace with actual email
    });

    // Regenerate the verification code
    generateCode();

    // Show success notification
    useNuxtApp().$showToast({
      msg: "Verification email sent successfully.",
      type: "success",
    });
  } catch (error) {
    // Show error notification
    useNuxtApp().$showToast({
      msg: "Failed to resend verification email. Please try again.",
      type: "error",
    });
  } finally {
    loading.value = false; // Re-enable the button
  }
};

// Generate the initial code when the component is mounted
onMounted(() => {
  generateCode();
});
</script>
<style lang="scss" scoped>
.verification-code {
    padding: 10px 0;
    display: flex;
    justify-content: center;
    gap: 12px;
    /* Spacing between the boxes */
}

.code-box {
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
    border: 2px solid #d0d0d0;
    /* Border color */
    border-radius: 6px;
    /* Rounded corners */
    background-color: #fff;
    /* Box background color */
    color: #6c757d;
    /* Text color */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    /* Optional shadow */
}

.code-box:hover {
    border-color: #253696;
    /* Highlight border on hover */
    background-color: #f0f8ff;
    /* Light blue background on hover */
}

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