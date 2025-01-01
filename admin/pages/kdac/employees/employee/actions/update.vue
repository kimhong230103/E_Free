<template>
    <div>
        <actionPage :acttionType="appConst.formAction.update"/>
    </div>
</template>

<script setup>
import { appConst } from "~/constants/app";
import actionPage from "../actions/index.vue";
</script>
