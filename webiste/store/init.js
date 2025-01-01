import { useMenuStore } from "./menu";
import { initAPI } from "~/constants/api";
import { homeAPI } from "~/constants/api";
import { useEnumsStore } from "./enums";
import { useNotificationStore } from "./notification.js";
import { useSideBarStore } from "./sidebar_loading";
import { useUserStore } from "~/store/user";
import Cookies from "js-cookie";
export const useInitStore = defineStore("init", () => {
  const useEnums = useEnumsStore();
  const useSideBar = useSideBarStore();
  const useNotification = useNotificationStore();
  async function fetchData() {
    try {
      await ifetch(initAPI.get)
        .then((data) => {
          setData(data);
        })
        .then(() => {
          useSideBar.setSideBarLoading(false);
        });
    } catch (error) {
      console.log("Error in fetching posts" + error.message);
    }
  }

  function setData(data) {
    useEnums.setData(data.enums);
    useNotification.setData(data.notification);
  }

  return {
    fetchData,
    setData,
  };
});
