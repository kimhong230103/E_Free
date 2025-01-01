<template>
    <div>
        <roleAction :actionType="appConst.formAction.add" />
    </div>
</template>
<script setup>
import roleAction from '~/components/role/action'
import { appConst }  from '~/constants/app'
</script>
