<template>
  <div
    class="search-container"
    :style="{
      maxWidth: props.maxWidth,
    }"
  >
    <form @submit.prevent="onSearch" class="d-flex">
      <input
        v-model="search"
        class="input-search"
        :placeholder="props.placeholder"
        @keyup="onSearch"
      />
      <button class="btn btn-primary ripple" type="submit">
        <Icon name="material-symbols:search" />
      </button>
    </form>
  </div>
</template>
<script setup>
import { Search } from "@element-plus/icons-vue";
const props = defineProps({
  maxWidth: {
    default: "600px",
    type: String,
  },
  placeholder: {
    default: "Search",
    type: String,
  },
  class: {
    default: "input-with-select",
    type: String,
  },
});
const search = ref();
const emit = defineEmits(["onSearchChange"]);

const onSearch = () => {
  emit("onSearchChange", search);
};
</script>

<style>
.search-container {
  background: rgba(239, 244, 255, 1);
  border-radius: 8px;
  display: flex;
  border: 1px solid #ccc;
}
@media (max-width: 575.98px){
  .search-container {
    background: rgba(239, 244, 255, 1);
    width: 100% !important;
    margin-top: 15px;
  }
  html.dark .search-container {
    background: none;
  }
}
.search-container form{
  width: 100%;
}
.search-container .input-search {
  width: 100%;
  background: none;
}
.search-container button,
.search-container .input-search {
  padding: 8px;
  border-radius: 8px;
  border: none;
}

.search-container button {
  padding: 8px 12px;
  width: 40px;
}
</style>
