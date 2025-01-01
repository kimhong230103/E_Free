<template>
    <div>
        <div class="card p-3">
            <div class="head-product w-100 pb-2 d-flex justify-content-between">
                <h5 class="fw-bold max-576-none text-product">{{ $t('filter') }}{{ $t('product') }}</h5>
                <h6 class="fw-bold min-576-none">{{ $t('product') }}</h6>
            </div>
            <div 
                class="py-3 w-100 overflow-auto"
                @mousedown="startScroll"
                @mouseup="stopScroll"
                @mouseleave="stopScroll"
                @mousemove="scroll"
                ref="scrollContainer"
                >
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
                            <select name="" id="sort_by" v-model="sort_by" style="border: none;background: none;outline: none;">
                                <option :value="null">{{ $t('sort_by') }}</option>
                                <option v-for="i in 5" value="name">{{ $t('name') }} ({{ $t('asc') }})</option>
                            </select>
                            <input type="text" class="form-control ms-2 box-search" :class="{ 'box-search-active' : isSearch }" :placeholder="$t('search')+$t('product')" v-model="search">
                            <Icon name="feather:search" size="36" class="btn-search p-2 rounded ms-2" v-if="!isSearch" @click="showBoxSearch" />
                            <Icon name="material-symbols:close" size="36" class="btn-search p-2 rounded ms-2" v-else @click="hideBoxSearch" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card p-3">
            <div class="row mt-3 mx-0">
                <div class="head-product w-100 pb-2 mb-3 d-flex justify-content-between">
                    <h5 class="fw-bold max-576-none text-product">{{ $t('product') }}</h5>
                    <h6 class="fw-bold min-576-none">{{ $t('product') }}</h6>
                </div>
                <div class="col-6 col-md-4 col-lg-3 col-xl-2 box-product" v-for="(item, index) in 20" :key="index">
                    <figure>
                        <div class="img w-100 p-3">
                            <img width="80%" src="https://off.com.ph/_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fscjohnsonana080-dart-production-40df%2Fmedia%2Fproject%2Fdart%2Foff%2Fphilippines%2Fhomepage%2Fcategory-images%2Foff_ph_4x3_720x540_category_card-overtime.png%3Fh%3D540%26iar%3D0%26w%3D720&w=3840&q=75" alt="">
                        </div>
                        <div class="txt mt-2 p-2">
                            <p class="d-block product-name">
                            Milk
                            </p>
                            <span class="d-flex align-items-center price">
                            <b class="fw-bold me-2">$30</b>
                            <del class="text-success me-2">$50</del>
                            <span style="color: var(--theme-default);"> 10%</span>
                            </span>
                            <span class="list-star d-flex">
                            <Icon name="material-symbols:star" size="20" style="color: var(--theme-default);" />
                            <Icon name="material-symbols:star" size="20" style="color: var(--theme-default);" />
                            <Icon name="material-symbols:star" size="20" style="color: var(--theme-default);" />
                            <Icon name="material-symbols:star" size="20" style="color: var(--theme-default);" />
                            <Icon name="material-symbols:star" size="20" />
                            </span>
                            <span class="d-flex justify-content-start mt-1">
                            <span class="btn text-light" style="background-color: dodgerblue;">{{ $t('buy_now') }}</span>
                            </span>
                        </div>
                    </figure>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>   

    // const price_range = ref(null);
    const sort_by = ref(null);
    const search = ref(null);
    const isSearch = ref(false);
    // scroll x category
    const isDragging = ref(false);
    const startX = ref(0);
    const scrollLeft = ref(0);
    const scrollContainer = ref(null);
    const showBoxSearch = () => {
        isSearch.value = true;
    }
    const hideBoxSearch = () => {
        isSearch.value = false;
    }
    const startScroll = (e) => {
    isDragging.value = true;
    startX.value = e.pageX - scrollContainer.value.offsetLeft;
    scrollLeft.value = scrollContainer.value.scrollLeft;
    };

    const stopScroll = () => {
    isDragging.value = false;
    };

    const scroll = (e) => {
    if (!isDragging.value) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.value.offsetLeft;
    const walk = (x - startX.value) * 1; // Adjust scroll speed
    scrollContainer.value.scrollLeft = scrollLeft.value - walk;
    };

</script>
<style scoped>
    .overflow-auto {
        cursor: grab;
        overflow-x: auto;
        white-space: nowrap; /* Prevent wrapping */
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* Internet Explorer 10+ */
    }
    .overflow-auto:active {
        cursor: grabbing; /* Change cursor while dragging */
    }
    .overflow-auto::-webkit-scrollbar {
        display: none; /* Safari and Chrome */
    }

</style>
<style>
    .box-search{
        width: 0px;
        opacity: 0;
        transition: all 0.3s ease;
    }
    .box-search-active{
        width: 180px;
        opacity: 1;
    }
    .head-product{
        border-bottom: 3px solid var(--color-blue);
    }
    html.dark .head-product{
        border-bottom: 3px solid var(--theme-default);
    }
    .text-product{
        color: var(--color-blue) !important;
    }
    html.dark .text-product{
        color: #fff !important;
    }
    .name-category{
        background-color: #cccccc67;
    }
    .name-category:last-child{
        margin-right: 0 !important;
    }
    .category-active{
        background-color: var(--color-blue);
        color: #fff !important;
    }
    html.dark .category-active{
        background-color: var(--theme-default);
        color: #fff !important;
    }
    .filter-box{
        background-color: #D3DBE9;
    }
    html.dark .filter-box{
        background-color: #2B2E33;
    }
    #price_range{
        text-align: center;
    }
    html.dark #price_range{
        background-color: #202020 !important;
        border: none !important;
        outline: none !important;
    }
    html.dark select{
        color: #fff !important;
        
    }
    html.dark option{
        color: #fff !important;
        background: black !important;
    }
    .btn-search{
        cursor: pointer;
        color: #fff;
        background-color: var(--theme-default);
    }
    @media (max-width: 991.98px) {
        .box-search-active{
            width: 140px;
            margin-left: 5px !important;
            opacity: 1;
        }
        #sort_by{
            width: 90px;
        }
        #sort_by option{
            width: 90px;
            font-size: 9px;
        }
    }
</style>