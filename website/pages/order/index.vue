<template>
    <div class="container mx-auto">
        <div class="row g-4 d-flex flex-column justify-content-between align-items-center">
            <!-- My Card Section -->
            <div class="col-lg-8 col-md-12 p-4">
                <div class="d-flex justify-content-between align-items-center">
                    <h3 class="fw-bold text-blue">{{ $t('ordered_product') }}</h3>
                    <a href="/product" class="d-flex justify-content-end align-items-center text-blue fw-bold">
                        <img src="/svg/back.svg" alt="">
                        <p class="text-blue">{{ $t('back') }}</p>
                    </a>
                </div>
                <div class="block">
                    <div class="form-check mb-2 mt-2">
                        <input class="form-check-input" type="checkbox" id="select-all" v-model="selectAll"
                            @change="toggleAll" />
                        <label class="form-check-label" for="select-all">{{ $t('select_all') }}</label>
                    </div>

                    <!-- Items List -->
                    <div v-for="(item, index) in items" :key="index"
                        class="item-card d-flex align-items-center py-3 mb-3 shadow-sm rounded">
                        <!-- Checkbox -->
                        <div>
                            <input type="checkbox" v-model="item.selected" class="form-check-input me-3" />
                        </div>

                        <!-- Product Image -->
                        <div>
                            <img :src="item.image" alt="Product Image" class="product-image me-3" />
                        </div>

                        <!-- Product Details -->
                        <div class="flex-grow-1">
                            <h6 class="mb-1 text-blue">{{ item.name }}</h6>
                            <small class="text-muted d-block">{{ item.description }}</small>
                            <button class="btn btn-sm btn-danger mt-2 px-3">{{ $t('cancel') }}</button>
                        </div>

                        <!-- Quantity and Price -->
                        <div class="text-end justify-content-end">
                            <div class="quantity">
                                <button class="btn btn-sm px-3" @click="decreaseQuantity">-</button>
                                <div class="quantity-input">
                                    <span class="rounded border px-3" style="font-size: 12px;">{{ quantity }}</span>
                                </div>
                                <button class="btn btn-sm px-3" @click="increaseQuantity">+</button>
                            </div>
                            <p class="fw-bold mt-3 text-blue">${{ item.price.toFixed(2) }}</p>
                        </div>
                    </div>
                </div>
                <h5 class="text-blue mt-2 mb-2">{{ $t('pricing_detail') }}</h5>
                <div class="card p-4 shadow-sm my-card">
                    <!-- Pricing Details -->
                    <div class="py-2 d-flex justify-content-between">
                        <span>{{ $t('discount') }}</span>
                        <span>0%</span>
                    </div>
                    <div class="py-2 d-flex justify-content-between">
                        <span>{{ $t('promotion') }}</span>
                        <span>0%</span>
                    </div>
                    <div class="py-2 d-flex justify-content-between">
                        <span>{{ $t('sub_total') }}</span>
                        <span>{{ totalQuantity }}</span>
                    </div>
                    <hr>
                    <div class="py-2 d-flex justify-content-between fw-bold">
                        <span>{{ $t('total_price') }}</span>
                        <span>${{ totalPrice.toFixed(2) }}</span>
                    </div>
                </div>
                <button class="btn btn-blue w-100 mt-4 py-2">{{ $t('click_to_order') }}</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";

const items = ref([
    { image: "https://off.com.ph/_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fscjohnsonana080-dart-production-40df%2Fmedia%2Fproject%2Fdart%2Foff%2Fphilippines%2Fhomepage%2Fcategory-images%2Foff_ph_4x3_720x540_category_card-overtime.png%3Fh%3D540%26iar%3D0%26w%3D720&w=3840&q=75", name: "Strawberry Italy Soda", description: "Drink", price: 30.34, quantity: 20, },
    { image: "https://off.com.ph/_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fscjohnsonana080-dart-production-40df%2Fmedia%2Fproject%2Fdart%2Foff%2Fphilippines%2Fhomepage%2Fcategory-images%2Foff_ph_4x3_720x540_category_card-overtime.png%3Fh%3D540%26iar%3D0%26w%3D720&w=3840&q=75", name: "Chicken Pasta", description: "Food", price: 45.99, quantity: 15, },
    { image: "https://off.com.ph/_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fscjohnsonana080-dart-production-40df%2Fmedia%2Fproject%2Fdart%2Foff%2Fphilippines%2Fhomepage%2Fcategory-images%2Foff_ph_4x3_720x540_category_card-overtime.png%3Fh%3D540%26iar%3D0%26w%3D720&w=3840&q=75", name: "Mango Juice", description: "Drink", price: 25.49, quantity: 35, },
]);

const quantity = ref(0);
// Toggle all items
const toggleAll = () => {
    items.value.forEach((item) => (item.selected = selectAll.value));
};

const increaseQuantity = () => {
  quantity.value++;
};

const decreaseQuantity = () => {
  if (quantity.value > 0) quantity.value--;
};

// Calculate total quantity
const totalQuantity = computed(() =>
    items.value.reduce((total, item) => total + quantity, 0)
);

// Calculate total price
const totalPrice = computed(() =>
    items.value.reduce((total, item) => total + item.price * quantity, 0)
);
</script>

<style scoped>
.payment-page {
    background-color: #eaf0f6;
    min-height: 100vh;
    padding: 20px;
}

.card-image {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.card-image img {
    max-width: 100%;
    border-radius: 12px;
}

.img-thumbnail {
    border-radius: 12px;
    object-fit: cover;
}

.my-card {
    border-radius: 12px;
    background-color: #f3f6fb;
}

.item-card {
    background-color: white;
    border-radius: 12px;
    padding: 15px;
}

.product-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid #ddd;
}

.quantity {
    border: 1px solid #ddd;
    border-radius: 8px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
}


.pricing-details {
    border-top: 1px solid #ddd;
}

.text-blue {
    color: #253696;
}

.btn-blue {
    background-color: #253696;
    color: white;
}

.btn-outline-danger {
    font-size: 12px;
    border-radius: 6px;
}
</style>