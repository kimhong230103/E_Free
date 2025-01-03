<template>
    <div class="container mx-auto">
        <div class="hero-container d-flex align-items-center justify-content-center">
            <div class="overlay"></div>
            <div class="text-center content">
                <h1 class="display-10 fw-bold text-white mb-4">Finding your product Here!</h1>
                <div class="search-bar position-relative">
                    <input type="text" class="form-control rounded-pill px-4" placeholder="Search..." />
                    <button class="btn-search rounded-pill px-4 position-absolute end-0 top-50 translate-middle-y me-2">
                        Search
                    </button>
                </div>
            </div>
        </div>

        <div class="py-5">
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
        </div>

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
import { ref } from 'vue';

const categories = ref([
    { id: 1, name: 'Phones', icon: '/svg/cell-phone.svg' },
    { id: 2, name: 'Computers', icon: '/svg/pc.svg' },
    { id: 3, name: 'SmartWatch', icon: '/svg/watch.svg' },
    { id: 4, name: 'Camera', icon: '/svg/camera.svg' },
    { id: 5, name: 'HeadPhones', icon: '/svg/headphone.svg' },
    { id: 6, name: 'Gaming', icon: '/svg/gamepad.svg' },
    { id: 7, name: 'SmartWatch', icon: '/svg/watch.svg' },
    { id: 8, name: 'Camera', icon: '/svg/camera.svg' },
    { id: 9, name: 'HeadPhones', icon: '/svg/headphone.svg' },
    { id: 10, name: 'Gaming', icon: '/svg/gamepad.svg' },
    { id: 11, name: 'SmartWatch', icon: '/svg/watch.svg' },
    { id: 12, name: 'Camera', icon: '/svg/camera.svg' },
    { id: 13, name: 'HeadPhones', icon: '/svg/headphone.svg' },
    { id: 14, name: 'Gaming', icon: '/svg/gamepad.svg' }
]);

const activeCategory = ref(1);
const visibleElement = 7;
const scroll = ref(0);
const setActiveCategory = (id) => {
    activeCategory.value = id
}

const scrollContainer = ref(null);
const scrollLeft = () => {
    if (scroll.value > 0) {
        scroll.value -= 1;
        scrollToIndex(scroll.value);
    }
};

const scrollRight = () => {
    // if ((scroll.value + visibleElement) < categories.value.length)
    if (scroll.value < categories.value.length - visibleElement) {
        scroll.value += 1;
        scrollToIndex(scroll.value);
    }
};

const scrollToIndex = (index) => {
    const container = scrollContainer.value;
    const categoryBoxes = container.querySelectorAll(".category-box");
    if (categoryBoxes[index]) {
        const box = categoryBoxes[index];
        container.scrollTo({
            left: box.offsetLeft - container.offsetLeft, // Adjust scroll position based on the box's position
            behavior: "smooth",
        });
    }
};

</script>
<style scoped>
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

.scroll-arrow {
    border: none;
    background-color: whitesmoke;
    padding: 10px;
    border-radius: 100%;
}
.category-box {
    width: 120px;
    height: 120px;
    border: 1px solid #ddd;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f1f1f1;
    cursor: pointer;
    transition: all 0.3s;
    white-space: nowrap;
    flex-shrink: 0; /* Prevent shrinking in flexbox layout */
}

.category-box.active {
    background-color: #ff8c00;
    color: white;
}

.category-box:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-5px);
}

.cat-text {
    color: black;
}

.category-icon {
    width: 60px;
    height: 60px;
}

/* Scrollbar Hide */
.scrollbar-hide {
    scrollbar-width: none;
    /* Firefox */
    -ms-overflow-style: none;
    /* IE 10+ */
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
    /* Chrome, Safari */
}

.overflow-auto {
    cursor: grab;
    overflow-x: auto;
    white-space: nowrap;
    /* Prevent wrapping */
    scrollbar-width: none;
    /* Firefox */
    -ms-overflow-style: none;
    /* Internet Explorer 10+ */
}

.overflow-auto:active {
    cursor: grabbing;
    /* Change cursor while dragging */
}

.overflow-auto::-webkit-scrollbar {
    display: none;
    /* Safari and Chrome */
}
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