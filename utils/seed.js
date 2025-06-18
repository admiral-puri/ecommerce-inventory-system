// utils/seed.js
const { addOrUpdateProduct } = require('../services/productService');
const { enqueueRequest } = require('../services/orderService');

function seedInitialProducts() {
  const products = [
    {
      id: 'prod-101',
      name: 'Wireless Mouse',
      price: 799,
      category: 'Electronics',
      quantity: 25
    },
    {
      id: 'prod-102',
      name: 'Mechanical Keyboard',
      price: 1499,
      category: 'Electronics',
      quantity: 15
    },
    {
      id: 'prod-103',
      name: 'Notebook',
      price: 99,
      category: 'Stationery',
      quantity: 100
    }
  ];

  products.forEach(addOrUpdateProduct);
}

function seedInitialOrders() {
  const orders = [
    {
      order_id: 'ORD-1',
      user_id: 'user-1',
      user_tier: 'PREMIUM',
      created_at: new Date().toISOString(),
      order_items: [
        { product_id: 'prod-101', quantity: 2 },
        { product_id: 'prod-103', quantity: 5 }
      ]
    },
    {
      order_id: 'ORD-2',
      user_id: 'user-2',
      user_tier: 'BASIC',
      created_at: new Date().toISOString(),
      order_items: [
        { product_id: 'prod-102', quantity: 1 }
      ]
    }
  ];

  orders.forEach(enqueueRequest);
}

module.exports = {
  seedInitialProducts,
  seedInitialOrders
};
