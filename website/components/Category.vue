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
                    <img :src="category.icon || defaultIcon" class="cat-img img-fluid" alt="" />
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
import { ref, onMounted } from "vue";

const categories = ref([]);
const activeCategory = ref(null);
const scrollContainer = ref(null);
const scroll = ref(0);
const visibleElement = 7;
const defaultIcon = '/svg/default-category.svg'; // Default category icon

const fetchCategories = async () => {
    try {
        const response = await fetch("https://efree.cheakautomate.online/gateway/CATEGORY/api/v1/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        
        categories.value = data.payload.map(category => ({
            id: category.id,
            name: category.name,
            icon: category.imageUrl || defaultIcon // Use default icon if none provided
        }));

        if (categories.value.length > 0) {
            activeCategory.value = categories.value[0].id;
        }
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
};

onMounted(fetchCategories);

const setActiveCategory = (id) => {
    activeCategory.value = id;
};

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
            left: box.offsetLeft - container.offsetLeft,
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
.cat-img {
    height: 100%;
    width: 100%;
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
        padding: 5px;
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
</style>
