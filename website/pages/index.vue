<template>

  <div class="container mx-auto">
    <ProductModal ref="productModal" :product="selectedProduct" />
    
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="hero-container d-flex align-items-center justify-content-center">
            <div class="overlay"></div>
            
            <!-- Desktop View -->
            <div class="d-none d-lg-block text-center content">
                <h1 class="display-10 fw-bold text-white mb-4">Finding your product Here!</h1>
                <div class="search-bar position-relative">
                    <input type="text" class="form-control rounded-pill px-4 h-125" placeholder="Search..." />
                    <button class="btn-search rounded-pill px-4 position-absolute end-0 top-50 translate-middle-y me-2 h-75">
                        Search
                    </button>
                </div>
            </div>

            <!-- Mobile View -->
            <div class="d-block d-lg-none text-center content w-75">
              <h4 class="display-10 fw-bold text-white mb-2">Finding your product Here!</h4>
              <div class="search-bar position-relative">
                  <input type="text" class="form-control rounded-pill px-4 h-100" placeholder="Search..." />
                  <button class="btn-search rounded-pill px-4 position-absolute end-0 top-50 translate-middle-y me-2 h-75">
                      Search
                  </button>
              </div>
            </div>
        </div>
          <!-- Status -->
          <div class="col-12">
            <div class="w-100 card p-3">
              <div class="row border-round px-2 px-md-4 py-3 mx-0">
                <div
                  class="col-6 col-lg-3 mb-2 mb-lg-0 box-promote border-right">
                  <Icon name="material-symbols:location-on" size="43" style="color: var(--theme-default);" />
                  <div class="ms-2">
                    <span class="text-top d-block">{{ $t('free_delivery') }}</span>
                    <span class="text-bottom d-block">{{ $t('for_all_orders_over') }} $50</span>
                  </div>
                </div>
                <div
                  class="col-6 col-lg-3 mb-2 mb-lg-0 box-promote border-right no-border">
                  <Icon name="material-symbols:swap-horizontal-circle-outline-rounded" size="43"
                    style="color: var(--theme-default);" />
                  <div class="ms-2">
                    <span class="text-top d-block">30 {{ $t('day_return') }}</span>
                    <span class="text-bottom d-block">{{ $t('if_goods_have_problems') }}</span>
                  </div>
                </div>
                <div
                  class="col-6 col-lg-3 mb-2 mb-lg-0 box-promote border-right">
                  <Icon name="material-symbols:lock-sharp" size="43" style="color: var(--theme-default);" />
                  <div class="ms-2">
                    <span class="text-top d-block">{{ $t('security_payment') }}</span>
                    <span class="text-bottom d-block">100% {{ $t('security_payment') }}</span>
                  </div>
                </div>
                <div class="col-6 col-lg-3 mb-2 mb-lg-0 box-promote">
                  <Icon name="material-symbols:support" size="43" style="color: var(--theme-default);" />
                  <div class="ms-2">
                    <span class="text-top d-block">24/7 {{ $t('support') }}</span>
                    <span class="text-bottom d-block">{{ $t('support') }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Promotion -->
          <div class="col-12">
            <div class="w-100 card p-3">
              <div class="head-product-today w-100 d-flex justify-content-between">
                <h5 class="title fw-bold max-576-none">{{ $t('promotion') }}</h5>
                <h6 class="fw-bold min-576-none">{{ $t('promotion') }}</h6>
                <a href="/promotion">{{ $t('see_all') }}</a>
              </div>
              <div class="row">
                <div v-for="(item, index) in productPromotion" :key="index"
                  class="col-6 col-md-4 col-xl-3 p-10 box-product-promotion rounded-10">
                  <figure class="p-10 box-shadow" @click="showProductDetails(item)">
                    <div class="img-card img-promotion w-100">
                      <img width="80%" :src="item.image" alt="">
                    </div>
                    <div class="txt py-2">
                      <div class="d-flex justify-content-between align-items-center mb-2">
                        <p class="d-block product-name text-truncate">
                          {{ item.title }}
                        </p>
                      </div>
                      <p class="pro-desc text-truncate-two-lines mb-2">{{ item.description }}</p>
                      <hr class="hr-promotion">
                      <span class="d-flex justify-content-between gap-1 price my-1">
                        <p>{{ $t('price') }} <span class="item-price text-danger text-decoration-line-through">${{ item.price }}</span></p>
                        <b class="item-price fw-bold me-2">${{ item.price - (item.price * item.discount) / 100 }}</b>
                      </span>
                    </div>
                  </figure>
                </div>
              </div>
            </div>
          </div>

          <!-- Product Today -->
          <!-- <div class="col-12">
            <div class="w-100 card p-3">
              <div class="head-product-today w-100 d-flex justify-content-between">
                <h5 class="!text-blue-900 !font-bold  max-576-none">{{ $t('product_today') }}</h5>
                <h6 class="fw-bold min-576-none">{{ $t('product_today') }}</h6>
                <span>{{ $t('see_all') }}</span>
              </div>
              <div class="row">
                <div class="row">
                  <div v-for="(item, index) in 4" :key="index"
                    class="col-6 col-md-4 col-xl-3 p-10 box-product rounded-10">
                    <figure class="p-10 box-shadow">
                      <div class="img-card img-promotion w-100">
                        <img width="80%"
                          src="https://off.com.ph/_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fscjohnsonana080-dart-production-40df%2Fmedia%2Fproject%2Fdart%2Foff%2Fphilippines%2Fhomepage%2Fcategory-images%2Foff_ph_4x3_720x540_category_card-overtime.png%3Fh%3D540%26iar%3D0%26w%3D720&w=3840&q=75"
                          alt="">
                      </div>
                      <div class="txt py-2">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                          <p class="d-block product-name">
                            Milk
                          </p>

                        </div>
                        <p class="pro-desc mb-2">Our expert guides will take you on a knowledge</p>
                        <span class="list-star d-flex">
                          <Icon name="material-symbols:star" size="20" style="color: var(--theme-default);" />
                          <Icon name="material-symbols:star" size="20" style="color: var(--theme-default);" />
                          <Icon name="material-symbols:star" size="20" style="color: var(--theme-default);" />
                          <Icon name="material-symbols:star" size="20" style="color: var(--theme-default);" />
                          <Icon name="material-symbols:star" size="20" />
                        </span>
                        <hr class="hr-promotion">
                        <span class="d-flex justify-content-between align-items-center price my-1">
                          <p>price <span class="text-danger">$50</span></p>
                          <b class="fw-bold me-2">$30</b>
                        </span>
                      </div>
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div> -->

          <!-- Popular Product -->
          <!-- <div class="col-12">
            <div class="w-100 card p-3">
              <div class="head-product-today w-100 d-flex justify-content-between">
                <h5 class="text-blue fw-bold max-576-none">{{ $t('top_product') }}</h5>
                <h6 class="fw-bold min-576-none">{{ $t('top_product') }}</h6>
                <span>{{ $t('see_all') }}</span>
              </div>
              <div class="row">
                <div v-for="(item, index) in 4" :key="index"
                  class="col-6 col-md-4 col-xl-3 p-10 box-product rounded-10">
                  <figure class="p-10 box-shadow">
                    <div class="img-card img-promotion w-100">
                      <img width="80%"
                        src="https://off.com.ph/_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fscjohnsonana080-dart-production-40df%2Fmedia%2Fproject%2Fdart%2Foff%2Fphilippines%2Fhomepage%2Fcategory-images%2Foff_ph_4x3_720x540_category_card-overtime.png%3Fh%3D540%26iar%3D0%26w%3D720&w=3840&q=75"
                        alt="">
                    </div>
                    <div class="txt py-2">
                      <div class="d-flex justify-content-between align-items-center mb-2">
                        <p class="d-block product-name">
                          Milk
                        </p>
                      </div>
                      <p class="pro-desc mb-2">Our expert guides will take you on a knowledge</p>
                      <span class="list-star d-flex">
                        <Icon name="material-symbols:star" size="20" style="color: var(--theme-default);" />
                        <Icon name="material-symbols:star" size="20" style="color: var(--theme-default);" />
                        <Icon name="material-symbols:star" size="20" style="color: var(--theme-default);" />
                        <Icon name="material-symbols:star" size="20" style="color: var(--theme-default);" />
                        <Icon name="material-symbols:star" size="20" />
                      </span>
                      <hr class="hr-promotion">
                      <span class="d-flex justify-content-between align-items-center price my-1">
                        <p>price <span class="text-danger">$50</span></p>
                        <b class="fw-bold me-2">$30</b>
                      </span>
                    </div>
                  </figure>
                </div>
              </div>
            </div>
          </div> -->

          <!-- Top Category-->
          <div class="container w-100 col-12 pb-5">
            <p class="text-blue fw-bold text-2xl">Top Category</p>

            <!-- Desktop View -->
            <div class="d-none d-lg-flex row w-full h-full py-3">
              <!-- PlayStation Section -->
              <div class="col-lg-6 col-12 d-flex justify-content-center align-items-center">
                <a href="/product" class="cat-card w-100 h-100">
                  <img style="width: 60%;" src="/images/home/playstation.png" alt="PlayStation 5">
                  <div class="cat-desc bottom-30 left-30">
                    <h4>PlayStation 5</h4>
                    <p class="w-75" style="font-size: 12px;">Black and White version of the PS5 coming out on sale.</p>
                    <button class="cat-btn">Shop Now</button>
                  </div>
                </a>
              </div>
          
              <!-- Right Side Section -->
              <div class="col-lg-6 col-12 d-flex flex-column gap-4">
                <a href="/product" class="cat-card w-100 h-50">
                  <div class="w-100 d-flex justify-content-end">
                    <img style="width: 45%;" src="/images/home/women-collection.png" alt="Women's Collection">
                  </div>
                  <div class="cat-desc position-absolute bottom-30 left-30">
                    <h4>Women’s Collections</h4>
                    <p class="w-75" style="font-size: 12px;">Featured woman collections that give you another vibe.</p>
                    <button class="cat-btn">Shop Now</button>
                  </div>
                </a>
          
                <div class="d-flex gap-4 h-50">
                  <a href="/product" class="cat-card w-50 position-relative">
                    <img style="max-width: 150px; max-height: 100%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" src="/images/home/speaker.png" alt="Speaker">
                    <div class="cat-desc position-absolute bottom-30 left-30">
                      <h4>{{ $t('speaker') }}</h4>
                      <p style="font-size: 12px;">Amazon wireless speakers</p>
                      <button class="cat-btn">Shop Now</button>
                    </div>
                  </a>
                  <a href="/product" class="cat-card w-50 position-relative">
                    <img style="max-width: 150px; max-height: 100%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" src="/images/home/perfume.png" alt="Perfume">
                  </a>
                </div>
              </div>
            </div>

            <!-- Mobile View -->
            <div class="d-flex d-lg-none flex-column gap-1 w-full h-full py-3">
              <!-- PlayStation Section -->
              <a href="/product" class="cat-card w-100 h-100">
                <div class="w-100 d-flex justify-content-end">
                  <img style="width: 60%;" src="/images/home/playstation.png" alt="PlayStation 5">
                </div>
                <div class="cat-desc bottom-10 left-10">
                  <h5 class="text-white">PlayStation 5</h5>
                  <p class="w-75" style="font-size: 11px;">Black and White version of the PS5 coming out on sale.</p>
                  <button class="cat-btn">Shop Now</button>
                </div>
              </a>
              <a href="/product" class="cat-card w-100 h-50">
                <div class="w-100 d-flex justify-content-end">
                  <img style="width: 45%;" src="/images/home/women-collection.png" alt="Women's Collection">
                </div>
                <div class="cat-desc position-absolute bottom-10 left-10">
                  <h5 class="text-white">Women’s Collections</h5>
                  <p class="w-75" style="font-size: 12px;">Featured woman collections that give you another vibe.</p>
                  <button class="cat-btn">Shop Now</button>
                </div>
              </a>
              <div class="d-flex gap-1 h-50">
                <a href="/product" class="cat-card w-50 position-relative">
                  <div class="w-100 d-flex justify-content-center">
                    <img style="width: 50%;" class="p-10" src="/images/home/speaker.png" alt="Speaker">
                  </div>
                  <div class="cat-desc position-absolute bottom-10 left-10">
                    <h5 class="text-white">{{ $t('speaker') }}</h5>
                    <p style="font-size: 12px;">Amazon wireless speakers</p>
                    <button class="cat-btn">Shop Now</button>
                  </div>
                </a>
                <a href="/product" class="cat-card w-50 position-relative">
                  <img style="max-width: 150px; max-height: 100%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 10px" src="/images/home/perfume.png" alt="Perfume">
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import ProductModal from "@/components/ProductModal.vue";

const productPromotion = ref([
  {
    title: "iPhone 14 Pro Max",
    price: 1450,
    category: "Mobile Phone",
    stock: 60,
    discount: 10,
    description: `
      Screen Size: 6.7 inches, 128 GB Storage,
      A16 Bionic Chip, Dual Camera System.
    `,
    image: "/images/sample.png",
    review: 1200,
    releaseDate: "September 14, 2023",
  },
  {
    title: "Samsung Galaxy S23 Ultra",
    price: 1250,
    category: "Mobile Phone",
    stock: 80,
    discount: 15,
    description: `Dynamic AMOLED, Snapdragon 8 Gen 2, 200MP Camera.`,
    image: "/images/sample.png",
    review: 875,
    releaseDate: "February 17, 2023",
  },
  {
    title: "MacBook Pro 16 M2 Max",
    price: 3499,
    category: "Laptop",
    stock: 30,
    discount: 8,
    description: `16-inch Liquid Retina XDR display, M2 Max Chip.`,
    image: "/images/sample.png",
    review: 340,
    releaseDate: "January 24, 2023",
  },
  {
    title: "Sony WH-1000XM5",
    price: 399,
    category: "Headphone",
    stock: 100,
    discount: 12,
    description: `Wireless Noise-Canceling Headphones, 30-hour battery.`,
    image: "/images/sample.png",
    review: 652,
    releaseDate: "May 20, 2022",
  },
  {
    title: "Amazon Echo Dot 5th Gen",
    price: 49,
    category: "Smart Home",
    stock: 300,
    discount: 20,
    description: `Smart speaker with Alexa, compact size.`,
    image: "/images/sample.png",
    review: 1980,
    releaseDate: "October 12, 2022",
  },
  {
    title: "Apple Watch Series 9",
    price: 529,
    category: "Wearable",
    stock: 90,
    discount: 10,
    description: `GPS + Cellular, Always-On Retina display.`,
    image: "/images/sample.png",
    review: 1023,
    releaseDate: "September 18, 2023",
  },
  {
    title: "Dell XPS 13 Plus",
    price: 1199,
    category: "Laptop",
    stock: 50,
    discount: 10,
    description: `13.4-inch OLED, 12th Gen Intel i7, Ultra Thin.`,
    image: "/images/sample.png",
    review: 520,
    releaseDate: "March 1, 2022",
  },
  {
    title: "JBL Flip 6",
    price: 129,
    category: "Speaker",
    stock: 150,
    discount: 15,
    description: `Portable Bluetooth speaker with deep bass.`,
    image: "/images/sample.png",
    review: 380,
    releaseDate: "September 1, 2022",
  },
  {
    title: "Logitech MX Master 3S",
    price: 99,
    category: "Accessories",
    stock: 200,
    discount: 10,
    description: `Advanced wireless mouse, ergonomic design.`,
    image: "/images/sample.png",
    review: 785,
    releaseDate: "May 25, 2022",
  },
  {
    title: "GoPro Hero 11",
    price: 399,
    category: "Camera",
    stock: 80,
    discount: 12,
    description: `5.3K video, waterproof, HyperSmooth 5.0.`,
    image: "/images/sample.png",
    review: 912,
    releaseDate: "September 15, 2022",
  },
  {
    title: "PlayStation 5",
    price: 499,
    category: "Gaming Console",
    stock: 40,
    discount: 8,
    description: `Next-gen console, DualSense Controller.`,
    image: "/images/sample.png",
    review: 2300,
    releaseDate: "November 12, 2020",
  },
]);


const productModal = ref(null);
const selectedProduct = ref({});

const showProductDetails = (product) => {
  selectedProduct.value = product;
  productModal.value.openModal();
};

useSeoMeta({
  title: "E-Free",
  ogTitle: "E-Free",
  ogImage: "/e-free-logo.png",
  twitterCard: "/e-free-logo.png",
  description: "ផលិតផលល្អ លឿន រហ័ស ទាន់ចិត្ត",
  ogDescription: "ផលិតផលល្អ លឿន រហ័ស ទាន់ចិត្ត",
});


</script>

<style>

.left-10 {
  left: 10px;
}

.bottom-10 {
  bottom: 10px;
}

.left-20 {
  left: 20px;
}

.bottom-20 {
  bottom: 20px;
}

.left-30 {
  left: 30px;
}

.bottom-30 {
  bottom: 30px;
}

.hero-container {
  background-image: url('/images/product-banner.png');
  /* Replace with your image URL */
  background-size: cover;
  background-position: center;
  height: 500px;
  position: relative;
  overflow: hidden;
  margin: 10px 0;
  border-radius: 20px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /* Adjust darkness */
  z-index: 1;
}

.content {
  position: relative;
  z-index: 2;
}

.search-bar {
  display: flex;
  align-items: center;
  max-width: 550px;
  margin: 0 auto;
  position: relative;
}

input.form-control {
  flex: 1;
  padding-right: 100px;
  height: 5vh;
  /* Add space for the button */
}

.btn-search {
  height: 4vh;
  background-color: #0D394F;
  color: white;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.box-promote {
  display: flex;
  justify-content: center;
  align-items: center;
}

.text-blue {
  color: #253696;
}

.btn-blue {
  background-color: #253696 !important;
  color: white;
  border: none;
  font-weight: bold;
}

.text-truncate-two-lines {
  display: -webkit-box;
  --webkit-line-clamp: 2;
  --webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5;
  /* Adjust line height if needed */
  max-height: 3em;
  /* 2 lines x line-height (1.5em) */
}

figure {
  cursor: pointer;
  border-radius: 10px;
  border: solid 2px rgba(0, 0, 255, 0);
  transition: all 0.3s;
  margin: 0 auto !important;
  background-color: #FDFDFD;
}

figure:hover {
  border: solid 2px var(--theme-default);
}

.today-border:hover {
  border: solid 2px blue !important;
}

html.dark figure {
  background-color: black;
}

html.dark span {
  color: white;
}

.title {
  color: var(--theme-default);
}

.cat-title {
  color: var(--theme-default)
}

.cat-card {
  position: relative;
  display: block;
  overflow: hidden;
  background-color: black;
}
.cat-desc {
  position: absolute;
}

.cat-desc h4 {
  color: white
}

.cat-desc p {
  color: white;
}
.cat-btn {
  padding: 0px;
  background: transparent;
  color: white;
  border: none;
  border-bottom: 1px solid;
}

.row {
  margin: auto -9px;
}

.border-right {
  border-right: 2px solid var(--color-blue);
}

html.dark .border-right {
  border-right: 2px solid var(--theme-default);
}

.border-round {
  border: 2px solid var(--color-blue);
}

html.dark .border-round {
  border: 2px solid var(--theme-default);
}

.price b {
  color: var(--color-blue);
  font-size: 17px;
}

html.dark .price b {
  color: dodgerblue;
  font-size: 17px;
}

.border-round .text-top {
  font-weight: bold;
  font-size: 17px;
}

.border-round .text-bottom {
  font-size: 13.5px;
  color: rgb(41, 41, 41);
}

html.dark .border-round .text-bottom {
  color: white;
}

.head-product-today {
  padding-bottom: 10px;
}

html.dark .head-product-today {
  border-bottom: 2px solid var(--theme-default);
}

.head-product-today span {
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: all 0.3s ease;
  color: rgb(41, 41, 41);
}

.head-product-today span:hover {
  color: var(--theme-default);
  text-decoration: underline;
}

html .dark .head-product-today span:hover {
  color: var(--theme-default);
  text-decoration: underline;
}

.p-10 {
  padding: 10px;
}

.card {
  background-color: white !important;
}

.img-card {
  border-radius: 10px;
}

.rounded-10 {
  border-radius: 10px;
}

.box-product .img {
  background-color: #fb5d1f10;
  text-align: center;
}

.box-product-promotion .img-promotion {
  background-color: #D0E7D2;
  text-align: center;
}

html:dark .img-promotion {
  background-color: #2B2E33;
}

.box-shadow {
  box-shadow: 0px 0px 5px rgb(214, 214, 214);
}

.product-name {
  font-size: larger;
  font-weight: 600;
  color: #253696;
  text-decoration: underline;
}

.dot-3 {
  background-color: white;
  padding: 1px;
  border-radius: 50%;
  box-shadow: 0px 0px 5px rgb(214, 214, 214);
}

.pro-desc {
  color: gray;
  width: 95%;
}

.hr-promotion {
  border: 1px solid #0c8617;
}

html.dark .box-product .img {
  background-color: #2B2E33;
  text-align: center;
}

@media (max-width: 992px) {
  .hero-container {
    height: 250px;
    margin: 0 0 12px 0;
    border-radius: 20px;
  }

  .product-name {
    font-size: smaller;
  }

  .pro-desc {
    font-size: 12px;
  }

  .item-price {
    font-size: smaller;
  }

  .no-border {
    border: none !important;
    border-right: none !important;
  }
  .box-promote {
    display: flex;
    justify-content: start;
    align-items: center;
  }
}

@media (max-width: 991.98px) {
  .border-round .text-top {
    font-weight: bold;
    font-size: 15px;
  }

  .border-round .text-bottom {
    font-size: 12.5px;
  }

  .border-round svg {
    width: 40px !important;
    height: 40px !important;
  }
}

@media (max-width: 767.98px) {
  .border-round .text-top {
    font-weight: bold;
    font-size: 14px;
  }

  .border-round .text-bottom {
    font-size: 12px;
  }

  .border-round svg {
    width: 35px !important;
    height: 35px !important;
  }
}

@media (max-width: 575.98px) {
  .border-round .text-top {
    font-weight: bold;
    font-size: 13px;
  }

  .border-round .text-bottom {
    font-size: 10.5px;
  }

  .border-round svg {
    width: 30px !important;
    height: 30px !important;
  }
}
</style>
