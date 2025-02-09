<!-- <template>
    <div class="container mx-auto">
        <ProductModal ref="productModal" :product="selectedProduct" />

       
        <Category :list="categoryList" />

        

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
</template> -->

<template>
    <div class="container mx-auto">
        <ProductModal ref="productModal" :product="selectedProduct" />

        <!-- Category Component -->
        <Category :list="categoryList" @categorySelected="setActiveCategory" />

        <!-- Product List -->
        <div class="col-12">
            <div class="w-100 card p-3">
                <div class="head-product-today w-100 d-flex justify-content-between">
                    <h5 class="text-primary fw-bold max-576-none">Filtered Products</h5>
                    <span v-if="selectedCategory">Showing products for category: {{ selectedCategory }}</span>
                </div>

                <div class="row">
                    <div v-if="filteredProducts.length === 0" class="text-center py-4">
                        No products available for this category.
                    </div>
                    <div v-for="(item, index) in filteredProducts" :key="index"
                        class="col-6 col-md-4 col-xl-3 p-10 box-product-promotion rounded-10">
                        <figure class="p-10 box-shadow" @click="showProductDetails(item)">
                            <div class="img-card w-100">
                                <img width="80%" :src="item.basedImageUrl" alt="">
                            </div>
                            <div class="txt py-2">
                                <div class="d-flex justify-content-between align-items-center mb-2">
                                    <p class="d-block product-name text-truncate">
                                        {{ item.nameEn }}
                                    </p>
                                </div>
                                <p class="pro-desc text-truncate-two-lines mb-2">{{ item.descriptionEn }}</p>
                                <hr class="hr-promotion">
                                <span class="d-flex justify-content-between gap-1 price my-1">
                                    <p>Price <span class="item-price text-danger text-decoration-line-through">${{ item.price }}</span></p>
                                    <b class="item-price fw-bold me-2">${{ item.price - (item.price * item.discount) / 100 }}</b>
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
import { ref, computed, onMounted } from "vue";
import ProductModal from "@/components/ProductModal.vue";
import Category from "@/components/Category.vue";

const categoryList = ref([]);
const selectedCategory = ref(null); // Store selected category
const products = ref([]); // Store all products

const productModal = ref(null);
const selectedProduct = ref({});

const showProductDetails = (product) => {
  selectedProduct.value = product;
  productModal.value.openModal();
};

const filteredProducts = computed(() => {
    if (!selectedCategory.value) return products.value;
    return products.value.filter(product => product.category.id === selectedCategory.value);
});

const getCategory = async () => {
    try {
        const response = await fetch("https://efree.cheakautomate.online/gateway/CATEGORY/api/v1/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        categoryList.value = data.payload;

        // Set the default category as the first one
        if (categoryList.value.length > 0) {
            selectedCategory.value = categoryList.value[0].id;
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
};

const getProducts = async () => {
    try {
        const response = await fetch("https://efree.cheakautomate.online/gateway/PRODUCT/api/v1/products/paginate?page=1&size=3&sortBy=createdAt&direction=desc");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        products.value = data.payload.content; // Store all products
    } catch (error) {
        console.error("Fetch error:", error);
    }
};

// Set selected category and update products list
const setActiveCategory = (categoryId) => {
    selectedCategory.value = categoryId;
};

onMounted(() => {
    getCategory();
    getProducts();
});
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