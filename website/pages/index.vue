<template>

  <div class="container mx-auto">
    <ProductModal ref="productModal" :product="selectedProduct" />
    
    <div class="row">
      <div class="col-12" style="padding-right: 14px">
        <div class="row">

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
                <div v-for="(item, index) in productPromotion.slice(0,4)" :key="index"
                  class="col-6 col-md-4 col-xl-3 p-10 box-product-promotion rounded-10">
                  <figure class="p-10 box-shadow" @click="showProductDetails(item)">
                    <div class="img-card img-promotion w-100">
                      <img width="80%" :src="item.image" alt="">
                    </div>
                    <div class="txt py-2">
                      <div class="d-flex justify-content-between align-items-center mb-2">
                        <p class="d-block product-name">
                          {{ item.title }}
                        </p>
                      </div>
                      <p class="pro-desc text-truncate-two-lines mb-2">{{ item.description }}</p>
                      <hr class="hr-promotion">
                      <span class="d-flex align-items-center gap-1 price my-1">
                        <p>{{ $t('price') }} <span class="text-danger text-decoration-line-through">${{ item.price }}</span></p>
                        <b class="fw-bold me-2">${{ item.price - (item.price * item.discount) / 100 }}</b>
                      </span>
                    </div>
                  </figure>
                </div>
              </div>
            </div>
          </div>

          <!-- Product Today -->
          <div class="col-12">
            <div class="w-100 card p-3">
              <div class="head-product-today w-100 d-flex justify-content-between">
                <h5 class="text-blue fw-bold max-576-none">{{ $t('product_today') }}</h5>
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
          </div>

          <!-- Popular Product -->
          <div class="col-12">
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
          </div>

          <!-- Top Category-->
          <div style="height: 500px;" class="container w-100 col-12 pb-5">
            <h2 class="cat-title fw-bold text-center">Top Category</h2>
            <div style="height: 100%; width: 100%;"
              class="w-full d-flex flex-column flex-lg-row justify-content-center align-items-center gap-4 py-3">
              <a href="/product" style="width: 50%; height: 100%;" class="cat-card">
                <img style="display: absolute; max-height: 100%;" width="80%" src="/images/home/playstation.png" alt="">
                <div style="display: absolute; bottom: 10%; left: 5%" class="cat-desc">
                  <h4>PlayStation 5</h4>
                  <p style="font-size: 12px;" class="w-75">Black and White version of the PS5 coming out on sale.</p>
                  <button class="cat-btn">Shop Now</button>
                </div>
              </a>
              <div style="height: 100%; width: 50%" class="d-flex flex-column justify-content-between gap-4">
                <a href="/product" class="cat-card" style="height: 50%;">
                  <img style="position: absolute; right: 0; bottom: 0px; max-width: 280px; max-height: 100%;"
                    src="/images/home/women-collection.png" alt="">
                  <div style="display: absolute; bottom: 10%; left: 5%" class="cat-desc">
                    <h4>Women’s Collections</h4>
                    <p style="font-size: 12px;" class="w-75">Featured woman collections that give you another vibe.</p>
                    <button class="cat-btn">Shop Now</button>
                  </div>
                </a>
                <div style="height: 50%;" class="d-flex justify-content-between align-items-center gap-4">
                  <a href="/product" style="height: 100%; width: 50%;" class="cat-card">
                    <img width="150px"
                      style="max-width: 150px; max-height: 100%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); "
                      src="/images/home/speaker.png" alt="">
                    <div style="display: absolute; bottom: 10%; left: 5%" class="cat-desc">
                      <h4>{{ $t('speaker') }}</h4>
                      <p style="font-size: 12px;">Amazon wireless speakers</p>
                      <button class="cat-btn">Shop Now</button>
                    </div>
                  </a>
                  <a href="/product" style="height: 100%; width: 50%;" class="cat-card">
                    <img width="150px"
                      style="max-width: 150px; max-height: 100%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); "
                      src="/images/home/perfume.png" alt="">
                  </a>
                </div>
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
    title: "Iphone 14 Pro Max",
    price: 1450,
    category: "Mobile Phone",
    stock: 60,
    discount: 10,
    description: `
    Screen Size: 6.7 inches, 128 GB Storage,
    A16 Bionic Chip, Dual Camera System.
  `,
    image: "/images/sample.png",
  },
  {
    title: "Milk",
    price: 1450,
    category: "Mobile Phone",
    stock: 60,
    discount: 10,
    description: `
    Screen Size: 6.7 inches, 128 GB Storage,
    A16 Bionic Chip, Dual Camera System.
  `,
    image: "/images/sample.png",
  },
  {
    title: "Iphone 14 Pro Max",
    price: 1450,
    category: "Mobile Phone",
    stock: 60,
    discount: 10,
    description: `
    Screen Size: 6.7 inches, 128 GB Storage,
    A16 Bionic Chip, Dual Camera System.
  `,
    image: "/images/sample.png",
  },
  {
    title: "Iphone 14 Pro Max",
    price: 1450,
    category: "Mobile Phone",
    stock: 60,
    discount: 10,
    description: `
    Screen Size: 6.7 inches, 128 GB Storage,
    A16 Bionic Chip, Dual Camera System.
  `,
    image: "/images/sample.png",
  },
  {
    title: "Iphone 14 Pro Max",
    price: 1450,
    category: "Mobile Phone",
    stock: 60,
    discount: 10,
    description: `
    Screen Size: 6.7 inches, 128 GB Storage,
    A16 Bionic Chip, Dual Camera System.
  `,
    image: "/images/sample.png",
  },
  {
    title: "Iphone 14 Pro Max",
    price: 1450,
    category: "Mobile Phone",
    stock: 60,
    discount: 10,
    description: `
    Screen Size: 6.7 inches, 128 GB Storage,
    A16 Bionic Chip, Dual Camera System.
  `,
    image: "/images/sample.png",
  },
  {
    title: "Iphone 14 Pro Max",
    price: 1450,
    category: "Mobile Phone",
    stock: 60,
    discount: 10,
    description: `
    Screen Size: 6.7 inches, 128 GB Storage,
    A16 Bionic Chip, Dual Camera System.
  `,
    image: "/images/sample.png",
  },
  {
    title: "Iphone 14 Pro Max",
    price: 1450,
    category: "Mobile Phone",
    stock: 60,
    discount: 10,
    description: `
    Screen Size: 6.7 inches, 128 GB Storage,
    A16 Bionic Chip, Dual Camera System.
  `,
    image: "/images/sample.png",
  },
  {
    title: "Iphone 14 Pro Max",
    price: 1450,
    category: "Mobile Phone",
    stock: 60,
    discount: 10,
    description: `
    Screen Size: 6.7 inches, 128 GB Storage,
    A16 Bionic Chip, Dual Camera System.
  `,
    image: "/images/sample.png",
  },
  {
    title: "Iphone 14 Pro Max",
    price: 1450,
    category: "Mobile Phone",
    stock: 60,
    discount: 10,
    description: `
    Screen Size: 6.7 inches, 128 GB Storage,
    A16 Bionic Chip, Dual Camera System.
  `,
    image: "/images/sample.png",
  },
])

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

.box-promote {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 991.98px) {
  .box-promote {
    display: flex;
    justify-content: start;
    align-items: center;
  }
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
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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
  background-color: black;
}

.cat-desc {
  position: absolute;
}

.cat-desc h4 {
  color: white
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
  .no-border {
    border: none !important;
    border-right: none !important;
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
