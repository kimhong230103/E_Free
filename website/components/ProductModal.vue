<template html>
  <div class="modal fade" tabindex="-1" :class="{ show: showModal, closing: isClosing }" style="display: inline;"
    v-if="showModal || isClosing">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-blue fw-bold w-100">{{ product.title }}</h5>
          <div class="cursor-pointer" @click="closeModal">
            <Icon name="solar:close-circle-bold" size="30px" style="color: #253696;" />
          </div>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-5 text-center position-relative">
              <img :src="product.image" alt="Product Image" class="h-75 img-fluid rounded fixed-size-img" />
              <div class="position-absolute bottom-0 d-flex justify-content-center">
                <img style="height: 60px;" :src="product.image" alt="Product Image" class="rounded" />
                <img style="height: 60px;" :src="product.image" alt="Product Image" class="rounded" />
              </div>
            </div>

            <div class="col-md-7">
              <div class="d-flex justify-content-between py-2">
                <h6>{{ product.review }} {{ $t('reviews') }} </h6>
                <h6>{{ product.releaseDate }}</h6>
              </div>
              <h5 class="text-orange">
                ${{ product.price - (product.price * product.discount) / 100 }}
              </h5>
              <h6 class="text-gray py-2">
                <strong class="text-blue">{{ $t('category') }}:</strong> {{ product.category }}
              </h6>
              <h6 class="text-gray py-2">
                <strong class="text-blue">{{ $t('stock') }}:</strong> {{ product.stock }}
              </h6>
              <h6 class="text-gray py-2">
                <strong class="text-blue">{{ $t('discount') }}:</strong> {{ product.discount }}%
              </h6>
              <h6 class="text-gray py-2">
                <strong class="text-blue">{{ $t('description') }}:</strong> {{ product.description }}
              </h6>

              <hr>
              <div class="d-flex justify-content-between align-items-center">
                <div class="quantity">
                  <button class="btn btn-sm px-2" @click="decreaseQuantity">-</button>
                  <div class="quantity-input">
                      <span class="rounded border px-3" style="font-size: 12px;">{{ quantity }}</span>
                  </div>
                  <button class="btn btn-sm px-2" @click="increaseQuantity">+</button>
              </div>
                <div class="w-100 h-100 d-flex align-items-center gap-3">
                  <button class="btn btn-blue ms-auto py-2" @click="orderNow">
                    {{ $t("order_now") }}
                  </button>
                  <div class="btn btn-blue py-1">
                    <img style="height: 30px;" src="/svg/cart.svg" alt="">
                  </div>
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
import { ref, defineExpose } from "vue";

// Props for dynamic product data
defineProps({
  product: {
    type: Object,
    required: false,
    default: () => ({
      title: "Product Title",
      price: 0,
      category: "Unknown Category",
      stock: 0,
      discount: 0,
      releaseDate: "12, December, 2024",
      review: 123,
      description: "No description provided",
      image: "/images/sample.png",
    }),
  },
});

// State
const showModal = ref(false);
const isClosing = ref(false);
const quantity = ref(1);

// Methods
const openModal = () => {
  showModal.value = true;
  isClosing.value = false; // Reset the closing state
};

const closeModal = () => {
  isClosing.value = true; // Trigger the zoom-out animation
  setTimeout(() => {
    showModal.value = false; // Fully hide the modal after animation
    isClosing.value = false; // Reset closing state
  }, 300); // Match animation duration (0.3s)
};

const increaseQuantity = () => {
  quantity.value++;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) quantity.value--;
};

const orderNow = () => {
  alert(`Ordered ${quantity.value} of ${product.title}`);
  closeModal();
};

// Expose methods to the parent
defineExpose({
  openModal,
});
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

.quantity {
  border: 1px solid #ddd;
  border-radius: 8px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.modal.show::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  animation: fadeIn 0.3s ease-out;
  z-index: 1040;

}

.modal.closing::before {
  animation: fadeOut 0.3s ease-in forwards;
}


@keyframes zoomIn {
  from {
    transform: scale(0.5);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes zoomOut {
  from {
    transform: scale(1);
    opacity: 1;
  }

  to {
    transform: scale(0.5);
    opacity: 0;
  }
}

.modal {
  position: fixed !important;
}

/* Modal content animation */
.modal.show .modal-content {
  animation: zoomIn 0.3s ease-out;
  z-index: 1050;
  /* Higher than backdrop */
  position: relative;
  /* Ensure it stays above the backdrop */
}

.modal.closing .modal-content {
  animation: zoomOut 0.3s ease-in forwards;
  z-index: 1050;
  /* Higher than backdrop */
}

/* Ensure the modal container allows stacking */
.modal {
  position: relative;
  /* Ensure pseudo-elements and content align correctly */
}

/* Other styles */
.text-blue {
  color: #253696 !important;
}

.text-gray {
  color: #6D7F88 !important;
}

.text-orange {
  color: #FF8400;
}

.fixed-size-img {
  width: 100%;
  max-width: 300px;
  height: auto;
  object-fit: cover;
}

.btn-blue {
  background-color: #253696 !important;
  color: white;
  border: none;
  font-weight: bold;
}
</style>