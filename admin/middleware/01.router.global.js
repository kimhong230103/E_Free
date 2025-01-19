// import Cookies from "js-cookie";
// export default defineNuxtRouteMiddleware((to, from) => {
//   console.log("router middleware");
//   if (nullToVoid(Cookies.get(useRuntimeConfig().public.cookie_key)) != "") {
//     if (to.path.includes("/auth/login")) {
//       return navigateTo("/");
//     }
//   } else {
//     if (!to.path.includes("/auth/login")) {
//       return navigateTo("/auth/login");
//     }
//   }
// });
import Cookies from "js-cookie";

export default defineNuxtRouteMiddleware((to, from) => {
  console.log("router middleware");
alert(0)
  // Ensure `to` is defined before accessing `to.path`
  if (!to || !to.path) {
    return;
  }

  // Ensure `useRuntimeConfig()` is called safely
  const runtimeConfig = useRuntimeConfig();
  if (!runtimeConfig?.public?.cookie_key) {
    console.error("Runtime config is missing!");
    return;
  }

  // Check if we are on the client before accessing Cookies
  const cookieValue = process.client ? Cookies.get(runtimeConfig.public.cookie_key) : null;

  if (cookieValue && cookieValue !== "") {
    if (to.path.includes("/auth/login")) {
      return navigateTo("/");
    }
  } else {
    if (!to.path.includes("/auth/login")) {
      return navigateTo("/auth/login");
    }
  }
});

