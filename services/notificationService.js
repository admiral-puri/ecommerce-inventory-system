// services/notificationService.js
let getInventory = null;

function setInventoryAccessor(fn) {
  getInventory = fn;
}

const LOW_STOCK_THRESHOLD = 5;
const notificationInterval = 2 * 60 * 1000; // configurable

let lowStockProducts = new Set();
let notifications = [];

function trackLowStock(productId) {
  if (!getInventory) return;
  const qty = getInventory().get(productId) || 0;
  if (qty < LOW_STOCK_THRESHOLD) {
    lowStockProducts.add(productId);
  } else {
    lowStockProducts.delete(productId);
  }
}

function addNotification(entry) {
  notifications.push(entry);
}

function getNotifications() {
  return notifications;
}

function initLowStockNotifier() {
  setInterval(() => {
    if (!getInventory) return;

    if (lowStockProducts.size > 0) {
      const inventory = getInventory();
      const lowStockReport = Array.from(lowStockProducts).map(pid => ({
        product_id: pid,
        quantity: inventory.get(pid) || 0
      }));
      addNotification({ type: 'LOW_STOCK', products: lowStockReport });
      console.log('Low stock notification sent:', lowStockReport);
    }
  }, notificationInterval);
}

module.exports = {
  LOW_STOCK_THRESHOLD,
  setInventoryAccessor,
  trackLowStock,
  addNotification,
  getNotifications,
  initLowStockNotifier
};
