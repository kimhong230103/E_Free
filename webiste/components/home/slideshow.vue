<template>
  <div class="owl-carousel owl-theme mb-3" id="owl-carousel-14">
    <div v-if="data.length == 0" class="placeholder-glow" aria-hidden="true" style="height:30vh; ">
          <div class="placeholder col-12 rounded-2" style="height: 100%;"></div>
    </div>
    <swiper 
      v-else
      autoHeight: true 
      :space-between="20" 
      :pagination="{clickable: true,}" 
      :autoplay="{ delay: 3000, disableOnInteraction: false }"
      >
      <swiper-slide v-for="(item, index) in data" :key="index">
        <div class="max-576-none item">
          <ClientOnly fallback-tag="span" fallback="Loading ...">
            <img :src="item.image" width="100%" alt="" class="img-fluid img-custom-height  rounded-3">
         </ClientOnly>
        </div>
        <div class="min-576-none item" style="height: 280px">
          <ClientOnly fallback-tag="span" fallback="Loading ...">
            <img :src="getImagePath(item.image_mobile,'banner')" width="100%" alt="" class="img-fluid img-custom-height  rounded-3">
         </ClientOnly>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay"; 
const data = [
  {
    image: "https://www.hubspot.com/hs-fs/hubfs/banner-ad-clicks_4.webp?width=700&height=180&name=banner-ad-clicks_4.webp",
  },
  {
    image: "https://www.hubspot.com/hs-fs/hubfs/banner-ad-clicks_4.webp?width=700&height=180&name=banner-ad-clicks_4.webp",
  },
  {
    image: "https://www.hubspot.com/hs-fs/hubfs/banner-ad-clicks_4.webp?width=700&height=180&name=banner-ad-clicks_4.webp",
  },
]
  
</script>
<style scoped>
.img-custom-height {
  height: 100%; 
  object-fit: cover; 
}
</style>