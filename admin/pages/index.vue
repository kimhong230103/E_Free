<template>
  <div>
    <defaultDashboard />
  </div>
</template>
<script >
import defaultDashboard from "./dashboard/index.vue";
import { useUserStore } from "~/store/user";
  // const userStore = useUserStore();
  
export default {
  components: {
    defaultDashboard,
  },
};
</script>
