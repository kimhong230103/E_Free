<template>
  <div></div>
</template>
<script setup>
const error = useError();
const router = useRouter();
const statusCode = error.value?.statusCode || 500;
if (statusCode === 404) {
  router.replace("/error/404");
} else if (statusCode === 403) {
  router.replace("/error/403");
}
</script>
