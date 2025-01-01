<template>
  <div class="header-wrapper row m-0">
    <Logo />
  </div>
</template>
<script>
  import { mapState } from "pinia";
  import "swiper/css";
  import Logo from "./logo.vue";
  import { useMenuStore } from "~~/store/menu";

  export default {
    components: {
      Logo,
    },
    data() {
      return {
        bookmark: false,
      };
    },
    computed: {
      ...mapState(useMenuStore, {
        menuItems: "searchData",
        megamenuItems: "megamenu",
        searchOpen: "searchOpen",
      }),
    },
    methods: {},
  };
</script>
