<template>
    <div style="min-height: 80vh; overflow-x: auto;" class="container py-4">
        <h2 class="text-primary fw-bold">Purchase History</h2>
        <div class="table-responsive">
            <table class="table table-bordered bg-light shadow rounded mt-3" style="min-width: 900px; min-height: 200px">
                <thead class="bg-primary text-black">
                <tr class="text-center text-capitalize">
                    <th>#</th>
                    <th>{{ $t("product_name") }}</th>
                    <th>{{ $t("category") }}</th>
                    <th>{{ $t("amount") }}</th>
                    <th>{{ $t("date") }}</th>
                    <th>{{ $t("description") }}</th>
                    <th>{{ $t("price")}}</th>
                </tr>
                </thead>
                <tbody class="text-black">
                <tr v-for="item in purchaseHistory" :key="item.id">
                    <td class="text-center">{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td class="text-center">{{ item.category }}</td>
                    <td class="text-center">{{ item.amount }}</td>
                    <td class="text-center">{{ item.date }}</td>
                    <td style="max-width: 300px" class="text-truncate">{{ item.description }}</td>
                    <td class="text-primary fw-bold">${{ item.price.toFixed(2) }}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const purchaseHistory = ref([
  { id: 1, name: "Strawberry Italy Soda", category: "Drink", amount: 2, date: "2024-02-01", description: "Refreshing fruit soda with a tangy taste.Refreshing fruit soda with a tangy taste.Refreshing fruit soda with a tangy taste.Refreshing fruit soda with a tangy taste.", price: 30.34 },
  { id: 2, name: "Chicken Pasta", category: "Food", amount: 1, date: "2024-02-01", description: "Delicious Italian pasta with grilled chicken.", price: 45.99 },
  { id: 3, name: "Mango Juice", category: "Drink", amount: 3, date: "2024-02-01", description: "Pure mango juice with no added sugar.", price: 76.47 },
  { id: 4, name: "Green Tea Latte", category: "Drink", amount: 1, date: "2024-01-28", description: "Smooth and creamy green tea latte.", price: 52.75 },
  { id: 5, name: "Beef Steak", category: "Food", amount: 2, date: "2024-01-27", description: "Juicy grilled beef steak with special sauce.", price: 89.99 },
  { id: 6, name: "Blueberry Muffin", category: "Snack", amount: 5, date: "2024-01-25", description: "Soft and fluffy blueberry-filled muffins.", price: 19.99 },
  { id: 7, name: "Espresso Coffee", category: "Drink", amount: 3, date: "2024-01-20", description: "Strong and aromatic espresso coffee.", price: 15.99 },
  { id: 8, name: "Salmon Sushi", category: "Food", amount: 8, date: "2024-01-15", description: "Freshly made salmon sushi rolls.", price: 95.49 },
  { id: 9, name: "Avocado Toast", category: "Food", amount: 2, date: "2024-01-12", description: "Healthy avocado spread over whole-grain toast.", price: 27.99 },
  { id: 10, name: "Chocolate Cake", category: "Dessert", amount: 1, date: "2024-01-10", description: "Rich and moist chocolate cake with fudge topping.", price: 49.99 }
]);
  </script>
  
  <style scoped>
  .table {
    font-size: 1rem;
    border-radius: 10px;
  }
  
  .bg-primary {
    background-color: #253696 !important;
    
  }
  tr td {
    color: #253696 !important;
  }
  
  .text-primary {
    color: #253696 !important;
  }
  
  .bg-light {
    background-color: #f8f9fa !important;
  }
  
  .shadow {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
  .table-responsive {
    overflow: auto;
  }

  @media (max-width: 992px) {
    .table {
      font-size: 0.8rem;
    }
  }
  
  @media (max-width: 768px) {
    .table {
      font-size: 0.7rem;
    }
  }
  </style>
  