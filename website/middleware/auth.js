import { useUserStore } from "~/store/user";
export default defineNuxtRouteMiddleware((to, from, route) => {
  const userStore = useUserStore();
  if (userStore.logged && userStore.token) {
    return true;
  } else {
    return navigateTo("/error/403");
  }
});
