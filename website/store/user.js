import Cookies from "js-cookie";
import { useUserTypeStore } from "./user_type";
import { useInitStore } from "./init";
import { getToken, onMessage, getMessaging } from "firebase/messaging";
// import { reference } from "@popperjs/core";
import { data } from "@/data/menu.json";
import { userDeviceApi, userClientAPI } from "~/constants/api";
const reactiveData = reactive(data);
// import serviceAccount from "~/public/voice-sport-firebase-admin.json";
// const userTypeStore = useUserTypeStore()

export const useUserStore = defineStore({
  id: "user",
  state: () => {
    return {
      user: {},
      token: null,
      logged: false,
      total_pending_transaction: {
        deposit: 0,
        withdraw: 0,
      },
      notification_list: [],
      notification_request: [],
      device_id: null,
    };
  },
  getters: {
    auth: (state) => state.user,
    authLevel: (state) => {
      const user = useUserTypeStore().getListAll.find(
        (obj) => obj.id == state.user.user_type_id
      );
      if (isEmpty(user)) {
        return 0;
      } else {
        return user.level;
      }
    },
    isSuperUser: (state) => state.user.user_type_id == useUserTypeStore().IDG,
    isCompanyUser: (state) =>
      state.user.user_type_id == useUserTypeStore().COMPANY,
    isBranchUser: (state) =>
      state.user.user_type_id == useUserTypeStore().BRANCH,
    getNotificationList: (state) => {
      return state.notification_list;
    },
    getNotificationRequest: (state) => {
      return state.notification_request;
    },
  },
  actions: {
    async login(request) {
      const data = await ifetch("/login", request);
      const initStore = useInitStore();
      initStore.setData(data);
      this.requestToken();
      useRouter().push({ path: "/" });
    },
    async requestToken() {
      try {
        const permission = await Notification.requestPermission();
        /** If allow notification */
        if (permission === "granted") {
          const { $messaging } = useNuxtApp();
          getToken($messaging, {
            vapidKey: useRuntimeConfig().public.vapidKey,
          }).then((token) => {
            if (token) {
              /**
               * Check and Generate Device Id
               */
              this.device_id = Cookies.get(useRuntimeConfig().public.deviceId);

              if (nullToVoid(this.device_id) == "") {
                this.device_id = generateUUID();
                Cookies.set(
                  useRuntimeConfig().public.deviceId,
                  this.device_id,
                  { expires: 365 }
                );
              }
              this.updateToken(token);
            } else {
              console.log("token can not generate");
            }
          });
        }
      } catch (e) {
        console.error(e);
      }
    },
    async updateToken($token) {
      const input = {
        fcm_token: $token,
        device_id: this.device_id,
        loading: false,
      };
      await ifetch(userDeviceApi.updateToken, input);
    },
    setData(data) {
      this.token = useCookie(useRuntimeConfig().public.cookie_key, {
        expires: new Date(data.expires_in),
      });
      this.token = data.token;
      this.user = data.user;
      this.logged = true;
    },
    setInitServer(data) {
      this.user = data.user;
      this.logged = true;
    },
    async logout() {
      await ifetch(userClientAPI.logout);
      this.clearToken();
    },
    clearToken() {
      this.user = {};
      this.token = null;
      this.logged = false;
      // Cookies.remove(useRuntimeConfig().public.cookie_key);
      let authCookie = useCookie(useRuntimeConfig().public.cookie_key);
      authCookie.value = "";
      authCookie.maxAge = 0;
      //navigateTo({ path: "/auth/login" });
    },
    setUser(data) {
      this.user = data;
    },
    setNotificationList(item) {
      this.notification_list = item;
    },
    setNotificationRequest(item) {
      this.notification_request = item;
    },
    setTotalPendingTransaction(item) {
      // Object.assign(this.total_pending_transaction, item);
      // reactiveData.find((obj) => {
      //   if (obj.key == "deposit") {
      //     obj.badgeValue = item.deposit;
      //   } else if (obj.key == "withdraw") {
      //     obj.badgeValue = item.withdraw;
      //   }
      // });
    },
  },
});
