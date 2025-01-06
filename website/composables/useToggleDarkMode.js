import { useLocalStorage } from "@vueuse/core";
export function useToggleDarkMode() {
  const isDark = ref(false);

  const isdark = useLocalStorage("isdark", false);
  onMounted(() => {
    let htmlElement = document.documentElement;
    htmlElement.className = "";
    if (isdark.value) {
      htmlElement.classList.add("dark");
      isDark.value = true;
    } else {
      htmlElement.classList.add("light");
      isDark.value = false;
    }
  });
  function toggleDark() {
    let htmlElement = document.documentElement;
    htmlElement.className = "";
    isDark.value = !isDark.value;
    isdark.value = isDark.value;
    if (isDark.value) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.add("light");
    }
  }

  return {
    isDark,
    toggleDark,
  };
}
