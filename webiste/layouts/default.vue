<template>
  <div>
    <div class="loader-index"><span></span></div>
    <div class="header">
      <WebHeader />
    </div>
    <div>
      <div class="px-2 px-md-4">
        <div class="page-body-wrapper">
          <div class="page-body" @click="hidesecondmenu()">
            <div class="row">
              <!-- <div class="col-2 pe-0 max-992-none">
                <Sidebar />
              </div> -->
              <div class="col-1 d-none d-lg-block"></div>
              <div class="col-12 col-lg-10">
                <slot></slot>
              </div>
              <div class="col-1 d-none d-lg-block"></div>
            </div>
          </div>
        </div>
        <Teleport to="body">
          <!-- <TapTop /> -->
        </Teleport>
        <loading
          loader="Dots"
          v-model:active="inProgress"
          :can-cancel="true"
          :is-full-page="true"
          color="#FB5D1F"
        >
          <img src="/shopping-loader1.gif" width="400" />
        </loading>
      </div>
    </div>
    <div class="mt-2">
      <WebFooter />
    </div>
    <div class="box-fix-telegram">
      <div class="img" style="width: 60px;">
        <a href="https://t.me/Him_Kimhong" target="_blank">
          <img width="100%" src="/telegram_logo.png" alt="">
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "pinia";
import { layoutClasses } from "../constants/layout";
import WebHeader from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import WebFooter from "@/components/layout/footer.vue";
import { useLayoutStore } from "~~/store/layout";
import { useMenuStore } from "~~/store/menu";
import Customizer from "@/components/customizer";
import TapTop from "@/components/tapTop.vue";
import { useWindowScroll, useWindowSize } from "@vueuse/core";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import { useLoadingStore } from "~/store/loading";
import Cookies from "js-cookie";
export default {
  setup(props) {
    const { width, height } = useWindowSize();

    return {
      width,
      height,
    };
  },
  components: {
    Loading,
    WebHeader,
    Sidebar,
    WebFooter,
    Customizer,
    TapTop,
  },
  data() {
    return {
      inProgress: false,
    };
  },

  computed: {
    isLoading() {
      if (this.inProgress === true) return false;
      else if (this.inProgresss === false) return true;
    },
  },
};
</script>
<style>
.box-fix-telegram{
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  cursor: pointer;
}
.box-fix-telegram .img{
  border: 3px solid var(--color-blue);
  border-radius: 50%;
  box-shadow: 0px 0px 14px 2px var(--color-blue);
}
.box-fix-telegram .img:hover{
  animation: telegram_light 1s;
}
html.dark .box-fix-telegram .img{
  border: 3px solid var(--theme-default);
  border-radius: 50%;
  box-shadow: 0px 0px 14px 2px var(--theme-default);
}
html.dark .box-fix-telegram .img:hover{
  animation: telegram_dark 1s;
}

@keyframes telegram_light {
  0% {
    box-shadow: 0px 0px 20px 2px var(--color-blue);
    
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes telegram_dark {
  0% {
    box-shadow: 0px 0px 20px 2px var(--theme-default);
    
  }
  100% {
    transform: rotate(360deg);
  }
}
.header{
  position: sticky;
  top: 0;
  z-index: 999 !important;
}
@keyframes slideUpFromBottom {
  0% {
    bottom: -105px; /* Start off-screen */
  }
  100% {
    bottom: 40px; /* End position */
  }
}
@media (max-width: 991.98px) {
  .audio-fixed {
    width: 100%;
    bottom: 0px !important;
    left: 0;
    transform: translate(0, 0);
  }
  .title-mobile p {
    color: #fff;
  }
  .audio-container {
    padding-block: 0 !important;
    padding-top: 4px !important;
  }
}
</style>
