<template>
  <div>
    <defaultDashboard />
  </div>
</template>
<script setup>
import defaultDashboard from "./dashboard/index.vue";
import { useUserStore } from "~/store/user"
onMounted(() => {
  if (checkCookieExpiration()) {
    console.log('Access token is still valid.');
  } else {
    console.error('Access token has expired or does not exist.');
    useUserStore().clearToken();
  }
})
</script>
