<template>
    <div class="py-2 py-lg-4">
        <h2 class="text-blue mb-2 mb-lg-4 text-center fw-bold title">Our Shop Categories</h2>
        <div class="d-flex justify-content-between align-items-center gap-3">
            <button @click="scrollLeft" class="scroll-arrow cursor-pointer">
                <img src="/svg/arrow.svg" class="scroll-icon" alt="" />
            </button>
            <div class="d-flex flex-nowrap gap-2 gap-md-3 gap-lg-5 py-2 overflow-x-hidden" ref="scrollContainer">
                <div v-for="(category, index) in categories" :key="index" class="category-box text-center"
                    :class="{ active: activeCategory === category.id }" @click="setActiveCategory(category.id)">
                    <img :src="category.icon" class="cat-img img-fluid" alt="" />
                    <p class="mt-2 cat-text">{{ category.name }}</p>
                </div>
            </div>
            <button @click="scrollRight" class="scroll-arrow cursor-pointer" style="transform: rotate(180deg);">
                <img src="/svg/arrow.svg" class="scroll-icon" alt="" />
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
    list: {
        type: Array,
        required: false,
        default: []
    }
})

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
    flex-shrink: 0;
}

@media (max-width: 576px) {
    .category-box {
        width: 60px;
        height: 60px;
    }

    .title {
        font-size: large;
    }

    .cat-img {
        width: 40px;
        height: 40px;
    }

    .scroll-arrow {
        border: none;
        background-color: whitesmoke;
        padding: 5px;
        border-radius: 100%;
    }

    .cat-text {
        display: none;
    }

    .scroll-icon {
        width: 20px;
        height: 20px;
    }
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

.scrollbar-hide {
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.overflow-auto {
    cursor: grab;
    overflow-x: auto;
    white-space: nowrap;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.overflow-auto:active {
    cursor: grabbing;
}

.overflow-auto::-webkit-scrollbar {
    display: none;
}
</style>