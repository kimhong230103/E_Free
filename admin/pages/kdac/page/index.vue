
<template>
  
    <div class="container-fluid pt-4">
      <div class="card b-t-primary border-3">
        <div class="row product-page-main">
          <allSection />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
    import allSection from '~/components/page/allSection.vue';
    import { moduleKey } from "~/constants/moduleKey";
    definePageMeta({
        middleware: "alc",
        moduleKey: moduleKey.PAGE,
    });
  </script>