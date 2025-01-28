<template>
  <div class="card header-card">
    <div class="px-2 px-md-5 py-2">
      <div class="row align-items-center">
        <div class="col-3">
          <h3 class="max-992-none" @click="navigateTo('/')" style="cursor: pointer">
            <img class="for-light" height="50px" src="/e-free-logo.png" alt="" />
          </h3>
          <div class="d-flex align-items-center">
            <el-button class="min-992-none" @click="toggleSidebar">
              <Icon name="solar:list-linear" size="30px" />
            </el-button>

            <!-- Sidebar -->
            <div class="sidebar-container" :class="{ 'show-sidebar': drawer }">
              <div class="sidebar-header">
                <h3 class="min-992-none" @click="navigateTo('/')" style="cursor: pointer">
                  <img class="for-light" height="50px" src="/e-free-logo.png" alt="" />
                </h3>
                <div @click="toggleSidebar">
                  <Icon name="solar:close-circle-bold" size="30px" style="color: #253696;" />
                </div>
              </div>
              <div class="d-block">
                <div class="d-flex justify-content-center btn fw-bold fs-6" :class="[
                  isMenuActive(menu) ? 'active-menu': 'non-active-menu',
                ]" v-for="menu in menus" @click="navigateTo({ path: menu.link })" :key="menu">
                  {{ $t(menu.title) }}
                </div>
                <div v-if="!nullToVoid(userStore.user.id) != ''" class="w-100 d-flex flex-column align-items-center">
                  <el-button @click="signUp()" type="primary" class="sidebar_button w-75 d-block" round>{{
                    $t("sign_up")
                  }}</el-button>
                  <el-button @click="signIn()" type="primary" class="sidebar_button w-75 d-block" round>{{
                    $t("sign_in")
                  }}</el-button>
                </div>
              </div>

            </div>

            <!-- Overlay for Sidebar -->
            <div class="sidebar-overlay" v-if="drawer" @click="toggleSidebar"></div>
          </div>
        </div>
        <div class="col-6">
          <div class="d-flex justify-content-center align-items-center">
            <h3 class="min-992-none" @click="navigateTo('/')" style="cursor: pointer">
              <img class="for-light" height="50px" src="/e-free-logo.png" alt="" />
            </h3>
            <div class="d-none d-lg-block menu w-100" id="menu-header-desktop">
              <div class="d-flex justify-content-center align-items-center gap-5">
                <div class="btn fw-bold fs-6" :class="[
                  isMenuActive(menu) ? 'active-menu': 'non-active-menu',
                ]" v-for="menu in menus" @click="navigateTo({ path: menu.link })" :key="menu">
                  {{ $t(menu.title) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="d-flex justify-content-end">
            <div class="d-flex align-items-center gap-2">
              <div v-if="nullToVoid(userStore.user.id) != ''" class="dropdown-center">
                <Icon v-if="userStore.user.profile_image == null" name="material-symbols:account-circle-full" size="27"
                  style="color: #7d7d7c; cursor: pointer" data-bs-toggle="dropdown" aria-expanded="false" />
                <img v-else :src="getImagePath(userStore.user.profile_image, 'user_client')
                  " class="rounded-circle img-thumbnail dropdown-toggle" style="cursor: pointer; width: 40px"
                  data-bs-toggle="dropdown" aria-expanded="false" />
                <ul class="dropdown-menu dropdown-menu-end">
                  <li @click="isFormProfilePopup = true, action_type = false">
                    <button class="dropdown-item" type="button">
                      <Icon name="material-symbols-light:account-circle" size="25"></Icon>
                      {{ $t("profile") }}
                    </button>
                  </li>
                  <li>
                    <button class="dropdown-item" type="button" @click="sign_out()">
                      <Icon name="material-symbols-light:logout-rounded" size="25"></Icon>
                      {{ $t("sign_out") }}
                    </button>
                  </li>
                </ul>
              </div>
              <div v-else>
                <el-button @click="signUp()" type="primary" class="btn-signup max-992-none" round>{{ $t("sign_up")
                  }}</el-button>
                <el-button @click="signIn()" class="btn-signin max-992-none" round>{{ $t("sign_in")
                  }}</el-button>
                <!-- <el-button @click="forgotPassword()" type="primary" class="btn-login max-992-none" round>{{
                  $t("forgot_password")
                  }}</el-button>
                <el-button @click="emailVerification()" type="primary" class="btn-login max-992-none" round>{{
                  $t("email_verification")
                  }}</el-button>
                <el-button @click="resetPassword()" type="primary" class="btn-login max-992-none" round>{{
                  $t("reset_password")
                  }}</el-button> -->
              </div>

              <!-- <el-switch size="large" v-model="darkMode" :active-action-icon="Moon" :inactive-action-icon="Sunny"
                @change="onDarkModeChange" /> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showSignUpModal">
      <SignUp ref="signUpRef" @closeModal="closeModalSignOut" @switchToSignIn="signIn" />
    </div>
    <div v-if="showSignInModal">
      <SignIn ref="signInRef" @closeModal="closeModalSignIn" @switchToSignUp="signUp" @switchToForgotPassword="openForgotPasswordModal" />
    </div>
    <ForgotPassword ref="forgotPasswordModal" />
    <!-- <div v-if="showForgotPasswordModal">
      <ForgotPassword ref="forgotPasswordRef" />
    </div>
    <div v-if="showEmailVerificationModal">
      <EmailVerification ref="EmailVerificationRef" />
    </div>
    <div v-if="showResetPasswordModal">
      <ResetPassword ref="ResetPasswordRef" />
    </div> -->
    <div v-if="isFormProfilePopup" class="control-profile-popup">
      <Modal :action_type="action_type" @closeProfilePopup="closeProfilePopup"></Modal>
    </div>
  </div>
</template>
<script setup>
import Cookies from "js-cookie";
import { useDark, useToggle } from "@vueuse/core";
import { Moon, Sunny, Bell } from "@element-plus/icons-vue";
import { useWindowSize, useLocalStorage } from "@vueuse/core";
import { menu } from "./menu.json";
import SignUp from "~/components/SignUp/modal.vue";
import SignIn from "~/components/SignIn/modal.vue";
import { useUserStore } from "~/store/user";
import { useNotificationStore } from "~/store/notification.js";
import { notificationApi } from "~/constants/api";
import { isSupported } from "firebase/messaging";
import Modal from '~/components/Profile/modal.vue';
import ForgotPassword from "~/components/ForgotPassword.vue";
import EmailVerification from "~/components/EmailVerification.vue";
import ResetPassword from "~/components/ResetPassword.vue";
const useNotification = useNotificationStore();
const userStore = useUserStore();
const darkMode = ref(false);
const showSignUpModal = ref(false);
const showSignInModal = ref(false);
const showForgotPasswordModal = ref(false);
const showEmailVerificationModal = ref(false);
const showResetPasswordModal = ref(false);
const showRequestMessagingToken = ref(false);
const signUpRef = ref(null);
const signInRef = ref(null);
const forgotPasswordModal = ref(null);
const EmailVerificationRef = ref(null);
const ResetPasswordRef = ref(null);
const requestMessagingTokenRef = ref(null);
const { isDark, toggleDark } = useToggleDarkMode();
const isFormProfilePopup = ref(false);
const action_type = ref(true);

const menus = ref([
  {
    title: "home",
    link: "/",
  },
  {
    title: "product",
    link: `/product`,
  },
  {
    title: "promotion",
    link: "/promotion",
  },
  {
    title: "order",
    link: "/order",
  },
]);

const router = useRouter();
const toggleSidebar = () => {
  drawer.value = !drawer.value;
};

const navigateTo = (link) => {
  drawer.value = false; // Close sidebar after navigation
  router.push(link);
};

onMounted(async () => {
  darkMode.value = isDark.value;
});
function onDarkModeChange() {
  toggleDark();
}


const isMenuActive = (item) => {
  if (nullToVoid(useRoute().params.slug) != "") {
    let path = useRouter().currentRoute.value.path.split("/");
    if (path[1] == "product" || path[1] == "promotion" || path[1] == "order" || path[1] == "history") {
      return `/` == item.link;
    }
    return `/${path[1]}` == item.link;
  }
  return useRouter().currentRoute.value.path == item.link;
};
const drawer = ref(false);

const signUp = () => {
  drawer.value = false;
  showSignUpModal.value = true;
  showSignInModal.value = false;
  
  nextTick(() => {
    signUpRef.value.showModal();
  });
};
const signIn = () => {
  drawer.value = false;
  showSignInModal.value = true;
  showSignUpModal.value = false;
  
  nextTick(() => {
    signInRef.value.showModal();
  });
};

const openForgotPasswordModal = () => {
  signInModal.value?.closeModal(); // Close Sign In Modal
  forgotPasswordModal.value?.showModal(); // Show Forgot Password Modal
};

const emailVerification = () => {
  drawer.value = false;
  showEmailVerificationModal.value = true;
  nextTick(() => {
    EmailVerificationRef.value.showModal();
  })
}

const resetPassword = () => {
  drawer.value = false;
  showResetPasswordModal.value = true;
  nextTick(() => {
    ResetPasswordRef.value.showModal();
  })
}

const sign_out = async () => {
  await userStore.logout();
};
const closeModalSignOut = (isRefresh) => {
  showSignUpModal.value = false;
  isFormProfilePopup.value = true;
  if (isRefresh) {
  }
};

const closeModalSignIn = (isRefresh) => {
  showSignInModal.value = false;
  if (isRefresh) {
  }
};


const closeProfilePopup = () => {
  isFormProfilePopup.value = false;
}
</script>
<style>
.btn-signup, .btn-signin:hover {
  background-color: var(--theme-default);
  color:white;
}
.btn-signin {
  background-color: transparent;
  color: var(--theme-default);
  border: 1px solid var(--theme-default);
}

.btn-signin:hover {
  background-color: var(--theme-default);
  color:white;
}

el-button.btn-close {
  padding: 0px !important;
}

/* Sidebar Container */
.sidebar-container {
  position: fixed;
  top: 0;
  left: -250px;
  /* Start off-screen */
  width: 250px;
  height: 100%;
  background-color: #E5F0FF;
  color: #253696;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
  z-index: 1050;
  overflow-y: auto;
  transition: left 0.3s ease;
  /* Smooth slide-in animation */
}

/* Sidebar Visible State */
.show-sidebar {
  left: 0;
  /* Slide into view */
}

.sidebar_button {
  margin: 5px 0px !important;

}

/* Sidebar Header */
.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #3b4a6b;
}

.active-menu, .active-menu:hover, .non-active-menu:hover {
  color: var(--theme-default);
}

/* Overlay for Sidebar */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1049;
}

.modal {
  background-color: rgba(0, 0, 0, 0.324) !important;
}

.modal-backdrop {
  display: none !important;
}


.header-card {
  background-color: #F0F4FF !important;
  border-radius: 0;
}

.menu li {
  cursor: pointer;
}

.menu .active {
  background-color: var(--theme-default) !important;
  border-color: var(--theme-default) !important;
  color: white;
  padding: 0.3rem 0.5rem;
  border-radius: 6px;
}

.el-overlay {
  background: none !important;
}

.sidebar-drawer {
  background-color: rgba(0, 0, 0, 0.808) !important;
  backdrop-filter: blur(2px);
}

html.light .sidebar-drawer {
  background-color: rgba(255, 255, 255, 0.918) !important;
  backdrop-filter: blur(2px);
}

.sidebar-drawer .el-drawer__header {
  margin-bottom: 0;
}

.sidebar-drawer .el-drawer__body {
  padding: 0;
  padding-top: 8px;
}

.mobile-drawer-menu ul {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #ffffff;
  padding-inline: 10px;
}

html.light .mobile-drawer-menu ul {
  color: black;
}

.mobile-drawer-menu ul li {
  cursor: pointer;
}

.mobile-drawer-menu ul li:active {
  color: white;
}

.mobile-drawer-menu .mobile-menu-left li {
  width: fit-content;
}

.list-Leagues {
  height: 52%;
  overflow-y: scroll;
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
}

.list-Leagues span {
  color: #ffffff;
}

html.light .list-Leagues span {
  color: black;
}

.border-none .is-active {
  background: none;
}

.border-none li .el-sub-menu__title {
  background: none;
}

.list-Leagues li .el-sub-menu__title i {
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
}

.list-Leagues .el-sub-menu__title {
  padding-left: 10px !important;
}

.list-Leagues .el-menu-item {
  padding-left: 30px !important;
}

html.light .list-Leagues li .el-sub-menu__title i {
  color: black;
  right: 7px !important;
}

.border-menu-left {
  margin-block: 18px;
  border: 1px solid transparent;
  border-image: linear-gradient(to right, #ffffff9a, rgba(0, 0, 255, 0));
  border-image-slice: 1;
  border-top: none;
  border-left: none;
  border-right: none;
}

html.light .border-menu-left {
  margin-block: 18px;
  border: 1px solid transparent;
  border-image: linear-gradient(to right,
      rgba(90, 96, 106, 1),
      rgba(90, 96, 106, 0));
  border-image-slice: 1;
  border-top: none;
  border-left: none;
  border-right: none;
}

.onhover-show-div ul {
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* Internet Explorer 10+ */
}

html.dark .onhover-show-div {
  background-color: rgba(43, 46, 51, 1);
}

.bg-notification {
  background: rgba(211, 219, 233, 1);
  border-radius: 7px;
}

html.dark .bg-notification {
  background: rgba(18, 18, 18, 1);
}

.border-notification {
  border-bottom: 1px solid rgba(211, 219, 233, 1);
}

html.dark .border-notification {
  border-bottom: 1px solid rgba(90, 96, 106, 1);
}

.control-profile-popup {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.623);
  z-index: 9999;
  padding: 40px 17%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* .control-profile-popup .card{
  height: 75vh !important;
} */
@media (max-width: 575.98px) {
  .notification-dropdown {
    width: 330px !important;
    left: -310px !important;
  }

  .notification-dropdown .text-notification {
    font-size: 12px;
  }
}
</style>
