<template>
    <div class="container mx-auto">
        <div class="row g-4">
            <!-- Payment Section -->
            <div class="col-lg-7 col-md-12">
                <div class="card p-4 shadow-sm">
                    <h3 class="fw-bold text-primary">Payment</h3>
                    <div class="card-image text-center my-4">
                        <img src="/images/visa.png" alt="Card" class="img-fluid" />
                        <div>
                            <img src="/svg/plus.svg" alt="">
                        </div>
                    </div>
                    <form>
                        <div class="d-flex justify-items-between align-items-center mb-3">
                            <label for="saved-card" class="form-label flex-shrink-0 w-50">Use saved card:</label>
                            <select class="form-select w-50" id="saved-card">
                                <option selected>MasterCard</option>
                                <option>Visa</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="name-card" class="form-label">Name of card</label>
                            <input type="text" id="name-card" class="form-control" placeholder="Name card" />
                        </div>
                        <div class="mb-3">
                            <label for="card-number" class="form-label">Card number</label>
                            <input type="text" id="card-number" class="form-control" placeholder="1234-5678-1234" />
                        </div>
                        <div class="row">
                            <div class="col-6 mb-3">
                                <label for="expiry-date" class="form-label">Date</label>
                                <input type="text" id="expiry-date" class="form-control" placeholder="MM / YY" />
                            </div>
                            <div class="col-6 mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" id="password" class="form-control" placeholder="••••••••" />
                            </div>
                        </div>
                    </form>
                    <div class="text-end mt-4">
                        <img src="/images/visa_master.png" alt="Cards" class="w-25" />
                    </div>
                </div>
            </div>

            <!-- My Card Section -->
            <div class="col-lg-5 col-md-12">
                <div class="card p-4 shadow-sm my-card">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h3 class="fw-bold text-primary">My Card</h3>
                        <a href="#"
                            class="d-flex justify-content-end align-items-center text-decoration-none text-primary fw-bold">
                            <img src="/svg/back.svg" alt="">
                            <p class="text-primary">Back</p>
                        </a>
                    </div>

                    <div class="form-check mb-4">
                        <input class="form-check-input" type="checkbox" id="select-all" v-model="selectAll"
                            @change="toggleAll" />
                        <label class="form-check-label" for="select-all">Select all</label>
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
                            <h6 class="mb-1 text-primary">{{ item.name }}</h6>
                            <small class="text-muted d-block">{{ item.description }}</small>
                            <button class="btn btn-sm btn-danger mt-2 px-3">cancel</button>
                        </div>

                        <!-- Quantity and Price -->
                        <div class="text-end justify-content-end" style="width: 30%;">
                            <div class="quantity">
                                <button class="btn btn-sm px-3" @click="decrement()">-</button>
                                <div class="quantity-input">
                                    <input type="text" class="form-control form-control-sm text-center" v-model="quantity"
                                        readonly />
                                </div>
                                <button class="btn btn-sm px-3" @click="increment()">+</button>
                            </div>
                            <p class="fw-bold mt-2 text-primary">${{ item.price.toFixed(2) }}</p>
                        </div>
                    </div>

                    <!-- Pricing Details -->
                    <div class="pricing-details py-3 mt-3">
                        <h5 class="text-primary">Pricing detail</h5>
                        <div class="d-flex justify-content-between">
                            <span>Discount</span>
                            <span>0%</span>
                        </div>
                        <div class="d-flex justify-content-between">
                            <span>Promotion</span>
                            <span>0%</span>
                        </div>
                        <div class="d-flex justify-content-between">
                            <span>Sub order</span>
                            <span>{{ totalQuantity }}</span>
                        </div>
                        <div class="d-flex justify-content-between fw-bold">
                            <span>Total</span>
                            <span>${{ totalPrice.toFixed(2) }}</span>
                        </div>
                    </div>

                    <!-- Order Button -->
                    <button class="btn btn-primary w-100 mt-4 py-2">Please Order</button>
                </div>
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
console.log(items.quantity);
// Increment quantity
const increment = () => {
    if(quantity <= items.quantity){
        quantity.value += 1;
    }
};



// Decrement quantity
const decrement = () => {
    if (quantity > 0) {
        quantity.value--;
    }
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
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.quantity .quantity-input {
    margin: 5px 3px;
}

.pricing-details {
    border-top: 1px solid #ddd;
}

.btn-outline-danger {
    font-size: 12px;
    border-radius: 6px;
}

.btn-primary {
    background-color: #274cfa !important;
    border: none;
    font-weight: bold;
}

.btn-primary:hover {
    background-color: #193ab7;
}
</style>