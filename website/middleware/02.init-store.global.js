import { useInitStore } from "~/store/init";
import { useUserStore } from "~/store/user";
import Cookies from "js-cookie";

let alreadyDone = false;
export default defineNuxtRouteMiddleware(async (to) => {
  if (alreadyDone) {
    return null;
  }
  alreadyDone = true;

  /** Check User token */
  const token = useCookie(useRuntimeConfig().public.cookie_key);
  if (nullToVoid(token.value) != "") {
    const userStore = useUserStore();
    userStore.$patch({
      token: token.value,
      logged: true,
    });
    const data = await ifetch("auth/init_user_logged");

    userStore.setInitServer(data.data);
  }

  const initStore = useInitStore();
  initStore.fetchData();
});
