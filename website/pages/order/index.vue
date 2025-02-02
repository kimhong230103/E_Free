<template>
    <div class="container mx-auto" style="min-height: 80vh">
        <Payment @paymentSuccess="handlePaymentSuccess" />
        <div class="row g-4 d-flex flex-column justify-content-between align-items-center">
            <!-- My Card Section -->
            <div class="col-lg-8 col-md-12 p-4">
                <div class="d-flex justify-content-between align-items-center">
                    <h3 class="fw-bold text-blue">{{ $t('ordered_product') }}</h3>
                    <div class="d-flex gap-2">
                        <button class="btn btn-orange py-2 px-4">{{ $t('favorite') }}</button>
                        <a href="/history" class="btn btn-blue py-2 px-4">{{ $t('history') }}</a>
                    </div>
                </div>

                <div class="block">
                    <div class="form-check mb-2 mt-2">
                        <input class="form-check-input" type="checkbox" id="select-all" v-model="selectAll"
                            @change="toggleAll" />
                        <label class="form-check-label" for="select-all">{{ $t('select_all') }}</label>
                    </div>

                    <!-- Items List -->
                    <div v-for="(item, index) in items" :key="item.id"
                        class="item-card d-flex align-items-center py-3 mb-3 shadow-sm rounded">
                        <!-- Checkbox -->
                        <div>
                            <input type="checkbox" v-model="selectedItems" :value="item.id" class="form-check-input me-3" />
                        </div>

                        <!-- Product Image -->
                        <div>
                            <img :src="item.image" alt="Product Image" class="product-image me-3" />
                        </div>

                        <!-- Product Details -->
                        <div class="flex-grow-1">
                            <h6 class="mb-1 text-blue">{{ item.name }}</h6>
                            <small class="text-muted d-block">{{ item.description }}</small>
                            <button class="btn btn-sm btn-danger mt-2 px-3" @click="removeItem(index)">{{ $t('cancel') }}</button>
                        </div>

                        <!-- Quantity and Price -->
                        <div class="text-end justify-content-end">
                            <div class="quantity">
                                <button class="btn btn-sm px-3" @click="decreaseQuantity(index)">-</button>
                                <div class="quantity-input">
                                    <span class="rounded border px-3" style="font-size: 12px;">{{ item.quantity }}</span>
                                </div>
                                <button class="btn btn-sm px-3" @click="increaseQuantity(index)">+</button>
                            </div>
                            <p class="fw-bold mt-3 text-blue">${{ (item.price * item.quantity).toFixed(2) }}</p>
                        </div>
                    </div>
                </div>

                <h5 class="text-blue mt-2 mb-2 fw-bold">{{ $t('pricing_detail') }}</h5>
                <div class="card p-4 shadow-sm my-card">
                    <!-- Pricing Details -->
                    <div v-for="item in selectedPricingDetails" :key="item.id">
                        <div class="py-2">
                            <span class="fw-bold text-blue">{{ item.name }}</span>
                        </div>
                        <div class="py-2 d-flex justify-content-between">
                            <span>{{ $t('discount') }}</span>
                            <span>{{ item.discount }}%</span>
                        </div>
                        <div class="py-2 d-flex justify-content-between">
                            <span>{{ $t('promotion') }}</span>
                            <span>{{ item.promotion }}%</span>
                        </div>
                        <div class="py-2 d-flex justify-content-between">
                            <span>{{ $t('sub_total') }}</span>
                            <span>${{ calculateSubtotal(item) }}</span>
                        </div>
                        <hr />
                    </div>
                    <div class="py-2 d-flex justify-content-between fw-bold">
                        <span>{{ $t('total_price') }}</span>
                        <span>${{ totalPrice.toFixed(2) }}</span>
                    </div>
                </div>
                <div class="d-flex justify-content-between items-center mt-2">
                    <div class="d-flex gap-2 w-75">
                        <button class="btn btn-blue py-2 px-4">{{ $t('add_to_cart') }}</button>
                        <button class="btn btn-blue py-2 px-4">{{ $t('save_order') }}</button>
                    </div>
                    <button class="btn btn-orange py-2 px-4" data-bs-toggle="modal" data-bs-target="#paymentModal">{{ $t('click_to_order') }}</button>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import Payment from "@/components/Payment.vue";

const items = ref([
    { id: 1, image: "https://off.com.ph/_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fscjohnsonana080-dart-production-40df%2Fmedia%2Fproject%2Fdart%2Foff%2Fphilippines%2Fhomepage%2Fcategory-images%2Foff_ph_4x3_720x540_category_card-overtime.png%3Fh%3D540%26iar%3D0%26w%3D720&w=3840&q=75", name: "Strawberry Italy Soda", description: "Drink", price: 30.34, quantity: 2, discount: 5, promotion: 2 },
    { id: 2, image: "https://off.com.ph/_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fscjohnsonana080-dart-production-40df%2Fmedia%2Fproject%2Fdart%2Foff%2Fphilippines%2Fhomepage%2Fcategory-images%2Foff_ph_4x3_720x540_category_card-overtime.png%3Fh%3D540%26iar%3D0%26w%3D720&w=3840&q=75", name: "Chicken Pasta", description: "Food", price: 45.99, quantity: 1, discount: 10, promotion: 5 },
    { id: 3, image: "https://off.com.ph/_next/image?url=https%3A%2F%2Fedge.sitecorecloud.io%2Fscjohnsonana080-dart-production-40df%2Fmedia%2Fproject%2Fdart%2Foff%2Fphilippines%2Fhomepage%2Fcategory-images%2Foff_ph_4x3_720x540_category_card-overtime.png%3Fh%3D540%26iar%3D0%26w%3D720&w=3840&q=75", name: "Mango Juice", description: "Drink", price: 25.49, quantity: 3, discount: 8, promotion: 3 },
]);

const selectedItems = ref([]);
const selectAll = ref(false);

watch(selectedItems, (newVal) => {
    selectAll.value = newVal.length === items.value.length;
});

// Select All Function
const toggleAll = () => {
    if (selectAll.value) {
        selectedItems.value = items.value.map((item) => item.id);
    } else {
        selectedItems.value = [];
    }
};

// Increase Quantity
const increaseQuantity = (index) => {
    items.value[index].quantity++;
};

// Decrease Quantity
const decreaseQuantity = (index) => {
    if (items.value[index].quantity > 1) {
        items.value[index].quantity--;
    }
};

// Remove Item
const removeItem = (index) => {
    items.value.splice(index, 1);
    selectedItems.value = selectedItems.value.filter((id) => items.value.some((item) => item.id === id));
};

// Filter Selected Pricing Details
const selectedPricingDetails = computed(() => {
    return items.value.filter((item) => selectedItems.value.includes(item.id));
});

// Calculate Subtotal
const calculateSubtotal = (item) => {
    let discountedPrice = item.price * item.quantity * (1 - item.discount / 100);
    let finalPrice = discountedPrice * (1 - item.promotion / 100);
    return finalPrice.toFixed(2);
};

// Calculate Total Price
const totalPrice = computed(() => {
    return selectedPricingDetails.value.reduce((acc, item) => acc + parseFloat(calculateSubtotal(item)), 0);
});

const handlePaymentSuccess = (data) => {
  alert(`Payment processed with:
  Shipping Address: ${data.shipping}
  Billing Address: ${data.billing}`);
};
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

.btn-outline-danger {
    font-size: 12px;
    border-radius: 6px;
}
</style>
