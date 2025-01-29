<template>
    <div class="container mx-auto">
        <ProductModal ref="productModal" :product="selectedProduct" />

        <!-- Category -->
        <Category :list="categoryList" />
        <!-- <div class="py-5">
            <h2 class="text-primary mb-4 text-center fw-bold">Our Shop Categories</h2>
            <div class="d-flex justify-content-between align-items-center gap-3">
                <button @click="scrollLeft" class="scroll-arrow cursor-pointer">
                    <img src="/svg/arrow.svg" alt="">
                </button>
                <div class="d-flex flex-nowrap gap-5 overflow-hidden"
                ref="scrollContainer">
                    <div v-for="(category, index) in categories" :key="index" class="category-box text-center"
                        :class="{ active: activeCategory === category.id }" @click="setActiveCategory(category.id)">
                        <img :src="category.icon" class="img-fluid" alt="">
                        <p class="mt-2 cat-text">{{ category.name }}</p>
                    </div>
                </div>
                <button @click="scrollRight" class="scroll-arrow cursor-pointer" style="transform: rotate(180deg);">
                    <img src="/svg/arrow.svg" alt="">
                </button>
            </div>
        </div> -->

        <!-- <div class="card p-3">
            <div class="head-product w-100 pb-2 d-flex justify-content-between">
                <h5 class="fw-bold max-576-none text-product">{{ $t('filter') }}{{ $t('product') }}</h5>
                <h6 class="fw-bold min-576-none">{{ $t('product') }}</h6>
            </div>
            <div class="py-3 w-100 overflow-auto" @mousedown="startScroll" @mouseup="stopScroll"
                @mouseleave="stopScroll" @mousemove="scroll" ref="scrollContainer">
                <div class="d-flex">
                    <p class="px-3 me-1 rounded py-2 name-category category-active">
                        <span>{{ $t('all') }}</span>
                    </p>
                    <p class="px-3 me-1 rounded py-2 name-category" v-for="i in 30">
                        <span v-if="i % 2 == 0">Phone</span>
                        <span v-else>Computer</span>
                    </p>
                </div>
            </div>
            <div class="w-100 rounded d-flex justify-content-between p-3 filter-box">
                <div class="w-100 right-filter d-flex align-items-center">
                    <div class="row w-100">
                        <div class="col-12 col-lg-5">
                            <select name="" id="price_range" class="form-control">
                                <option v-for="i in 5" value="50-100">50 - 100</option>
                            </select>
                        </div>
                        <div class="col-12 col-lg-7 d-flex mt-2 mt-lg-0 align-items-center justify-content-end">
                            <select name="" id="sort_by" v-model="sort_by"
                                style="border: none;background: none;outline: none;">
                                <option :value="null">{{ $t('sort_by') }}</option>
                                <option v-for="i in 5" value="name">{{ $t('name') }} ({{ $t('asc') }})</option>
                            </select>
                            <input type="text" class="form-control ms-2 box-search"
                                :class="{ 'box-search-active': isSearch }" :placeholder="$t('search') + $t('product')"
                                v-model="search">
                            <Icon name="feather:search" size="36" class="btn-search p-2 rounded ms-2" v-if="!isSearch"
                                @click="showBoxSearch" />
                            <Icon name="material-symbols:close" size="36" class="btn-search p-2 rounded ms-2" v-else
                                @click="hideBoxSearch" />
                        </div>
                    </div>
                </div>
            </div>
        </div> -->

        <div class="col-12">
            <div class="w-100 card p-3">
                <div class="head-product-today w-100 d-flex justify-content-between">
                    <h5 class="text-primary fw-bold max-576-none">{{ $t('top_product') }}</h5>
                    <h6 class="fw-bold min-576-none">{{ $t('top_product') }}</h6>
                    <span>{{ $t('see_all') }}</span>
                </div>
                <div class="row">
                    <div v-for="(item, index) in productPromotion" :key="index"
                  class="col-6 col-md-4 col-xl-3 p-10 box-product-promotion rounded-10">
                  <figure class="p-10 box-shadow" @click="showProductDetails(item)">
                    <div class="img-card w-100">
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

        <div class="col-12">
            <div class="w-100 card p-3">
                <div class="head-product-today w-100 d-flex justify-content-between">
                    <h5 class="text-primary fw-bold max-576-none">{{ $t('top_product') }}</h5>
                    <h6 class="fw-bold min-576-none">{{ $t('top_product') }}</h6>
                    <span>{{ $t('see_all') }}</span>
                </div>
                <div class="row">
                    <div v-for="(item, index) in 4" :key="index"
                        class="col-6 col-md-4 col-xl-3 p-10 box-product-today box-product rounded-10">
                        <figure class="p-10 box-shadow">
                            <div class="w-100">
                                <img width="80%"
                                    src="https://off.com.ph/_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fscjohnsonana080-dart-production-40df%2Fmedia%2Fproject%2Fdart%2Foff%2Fphilippines%2Fhomepage%2Fcategory-images%2Foff_ph_4x3_720x540_category_card-overtime.png%3Fh%3D540%26iar%3D0%26w%3D720&w=3840&q=75"
                                    alt="">
                            </div>
                            <div class="txt py-2">
                                <div class="d-flex justify-content-between align-items-center mb-2">
                                    <p class="d-block product-name">
                                        Milk
                                    </p>
                                    <img class="dot-3" src="/svg/dot-3.svg" alt="">
                                </div>
                                <p class="pro-desc text-truncate mb-2">Our expert guides will take you on a knowledge
                                </p>
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
</template>

<script setup>

import { onMounted } from 'vue';
import ProductModal from '@/components/ProductModal.vue';
const categoryList = ref([])
const getCategory = async () => {

    await fetch("https://efree.cheakautomate.online/gateway/CATEGORY/api/v1/categories", {
        method: 'GET', // Specify the method as GET
        headers: {
            'Content-Type': 'application/json',
            Authorization: "",
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // Parse the JSON from the response
        })
        .then(data => {
            console.log("data", data);
            categoryList.value = data.payload;
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        })

}

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

onMounted(() => {
    getCategory();
})
</script>
<style scoped>

</style>
<style>
.box-search {
    width: 0px;
    opacity: 0;
    transition: all 0.3s ease;
}

.box-search-active {
    width: 180px;
    opacity: 1;
}

.head-product {
    border-bottom: 3px solid var(--color-blue);
}

html.dark .head-product {
    border-bottom: 3px solid var(--theme-default);
}

.text-product {
    color: var(--color-blue) !important;
}

html.dark .text-product {
    color: #fff !important;
}

.name-category {
    background-color: #cccccc67;
}

.name-category:last-child {
    margin-right: 0 !important;
}

.category-active {
    background-color: var(--color-blue);
    color: #fff !important;
}

html.dark .category-active {
    background-color: var(--theme-default);
    color: #fff !important;
}

.filter-box {
    background-color: #D3DBE9;
}

html.dark .filter-box {
    background-color: #2B2E33;
}

#price_range {
    text-align: center;
}

html.dark #price_range {
    background-color: #202020 !important;
    border: none !important;
    outline: none !important;
}

html.dark select {
    color: #fff !important;

}

html.dark option {
    color: #fff !important;
    background: black !important;
}

.btn-search {
    cursor: pointer;
    color: #fff;
    background-color: var(--theme-default);
}

@media (max-width: 991.98px) {
    .box-search-active {
        width: 140px;
        margin-left: 5px !important;
        opacity: 1;
    }

    #sort_by {
        width: 90px;
    }

    #sort_by option {
        width: 90px;
        font-size: 9px;
    }
}
</style>