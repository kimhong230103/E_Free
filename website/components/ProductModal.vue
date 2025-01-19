<template html>
  <div class="modal fade" tabindex="-1" :class="{ show: showModal, closing: isClosing }" style="display: inline;"
    v-if="showModal || isClosing">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-blue fw-bold">{{ product.title }}</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <div class="row">

            <div class="col-md-5 text-center">
              <img :src="product.image" alt="Product Image" class="img-fluid rounded fixed-size-img" />
            </div>

            <div class="col-md-7">
              <div class="d-flex align-items-center">
                <span>{{product.rate}}</span>
                <span>{{product.releaseDate}}</span>
              </div>
              <h5 class="text-orange">
                ${{ product.price }}
              </h5>
              <p class="text-gray py-1">
                <strong class="text-blue">{{ $t('category')}}:</strong> {{ product.category }}
              </p>
              <p class="text-gray py-1">
                <strong class="text-blue">{{ $t('stock') }}:</strong> {{ product.stock }}
              </p>
              <p class="text-gray py-1">
                <strong class="text-blue">{{ $t('discount') }}:</strong> {{ product.discount }}%
              </p>
              <p class="text-gray py-1">
                <strong class="text-blue">{{ $t('description')}}:</strong> {{ product.description }}
              </p>

              <div class="d-flex align-items-center">
                <button class="btn btn-secondary me-2" @click="decreaseQuantity">-</button>
                <span>{{ quantity }}</span>
                <button class="btn btn-secondary ms-2" @click="increaseQuantity">+</button>
                <button class="btn btn-blue ms-auto" @click="orderNow">
                  Order Now
                </button>
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
      rate: 123,
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