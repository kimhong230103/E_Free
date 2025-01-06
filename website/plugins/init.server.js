import { useUserStore } from "~/store/user";

export default defineNuxtPlugin(async () => {
  // if (isServer()) {
  //   const userStore = useUserStore();

  //   const token = useCookie(useRuntimeConfig().public.cookie_key);
  //   console.log('init.server token', token);
  //   if (nullToVoid(token.value) != "") {
  //     userStore.$patch({
  //       token: token.value,
  //       logged: true,
  //     });
  //     const data = await ifetch("auth/init_user_logged");

  //     userStore.setInitServer(data.data);
  //   }
  // }
});
