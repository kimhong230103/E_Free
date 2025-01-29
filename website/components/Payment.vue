<!-- components/PaymentModal.vue -->
<template>
    <div>
      <!-- Bootstrap Modal -->
      <div class="modal fade" id="paymentModal" tabindex="-1" aria-labelledby="paymentModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content payment-card p-4">
            <div class="modal-header">
              <h3 class="fw-bold text-blue text-capitalize" id="paymentModalLabel">{{ $t('payment') }}</h3>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
  
            <div class="modal-body">
              <!-- Shipping Address -->
              <div class="mt-3">
                <label for="shippingAddress" class="fw-bold">{{ $t('shipping_address') }}</label>
                <div class="input-group">
                  <input type="text" id="shippingAddress" v-model="shippingAddress"
                    class="form-control" :placeholder="$t('shipping_address')" required>
                  <span class="input-group-text"><i class="bi bi-geo-alt"></i></span>
                </div>
                <small v-if="!shippingAddress && submitted" class="text-danger">{{ $t('shipping_address_required') }}</small>
              </div>
  
              <!-- Billing Address -->
              <div class="mt-3">
                <label for="billingAddress" class="fw-bold">{{ $t('billing_address') }}</label>
                <div class="input-group">
                  <input type="text" id="billingAddress" v-model="billingAddress"
                    class="form-control" :placeholder="$t('billing_address')" required>
                  <span class="input-group-text"><i class="bi bi-geo-alt"></i></span>
                </div>
                <small v-if="!billingAddress && submitted" class="text-danger">{{ $t('billing_address_required') }}</small>
              </div>
            </div>
  
            <div class="modal-footer">
              <button type="button" class="btn btn-warning px-4 py-2" data-bs-dismiss="modal">{{ $t('cancel') }}</button>
              <button class="btn btn-blue px-4 py-2" @click="submitPayment">
                {{ $t('pay_now') }} <i class="bi bi-credit-card"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const shippingAddress = ref("");
  const billingAddress = ref("");
  const submitted = ref(false);
  
  // Emit event to parent when payment is successful
  const emit = defineEmits(["paymentSuccess"]);
  
  const submitPayment = () => {
    submitted.value = true;
  
    if (!shippingAddress.value || !billingAddress.value) {
      return; // Stop if validation fails
    }
  
    // Emit event with payment data
    emit("paymentSuccess", {
      shipping: shippingAddress.value,
      billing: billingAddress.value,
    });
  
    // Close modal after successful payment
    document.querySelector("#paymentModal .btn-close").click();
  };
  </script>
  
  <style scoped>
  .payment-card {
    background-color: #ffffff;
    border-radius: 12px;
    max-width: 600px;
    margin: auto;
  }
  
  .text-blue {
    color: #253696;
  }
  
  .input-group-text {
    background-color: #f3f6fb;
    border: none;
  }
  
  .btn-primary {
    background-color: #253696;
    border: none;
  }
  
  .btn-primary:hover {
    background-color: #1b2a55;
  }
  </style>
  