// services/orderService.js
const { userTiers } = require('../utils/constants');
const { products, inventory } = require('./productService');
const { addNotification, trackLowStock } = require('./notificationService');

let purchaseRequests = [];

function enqueueRequest(req) {
  purchaseRequests.push(req);
  purchaseRequests.sort((a, b) => {
    const tierDiff = userTiers[b.user_tier] - userTiers[a.user_tier];
    return tierDiff !== 0
      ? tierDiff
      : new Date(a.created_at) - new Date(b.created_at);
  });
}

function initOrderProcessor() {
  setInterval(() => {
    if (purchaseRequests.length === 0) return;

    const req = purchaseRequests.shift();
    const response = { order_id: req.order_id, order_items: [], total_price: 0 };
    let canFulfill = true;

    for (const item of req.order_items) {
      const available = inventory.get(item.product_id) || 0;
      if (available < item.quantity) {
        canFulfill = false;
        response.order_items.push({
          product_id: item.product_id,
          quantity: item.quantity,
          message: `Not enough stock, only ${available} available`
        });
      }
    }

    if (canFulfill) {
      for (const item of req.order_items) {
        inventory.set(item.product_id, inventory.get(item.product_id) - item.quantity);
        const product = products.get(item.product_id);
        const cost = item.quantity * (product?.price || 0);
        response.total_price += cost;
        response.order_items.push({
          product_id: item.product_id,
          quantity: item.quantity,
          message: 'Fulfilled'
        });
        trackLowStock(item.product_id);
      }
    }

    addNotification({ order_id: req.order_id, result: response });
    console.log('Processed order:', response);
  }, 3000);
}

module.exports = {
  enqueueRequest,
  initOrderProcessor
};