import Cookies from "js-cookie";
export default defineNuxtRouteMiddleware((to, from) => {
  console.log("router middleware");
  if (nullToVoid(Cookies.get(useRuntimeConfig().public.cookie_key)) != "") {
    if (to.path.includes("/auth/login")) {
      return navigateTo("/");
    }
  } else {
    if (!to.path.includes("/auth/login")) {
      return navigateTo("/auth/login");
    }
  }
});
