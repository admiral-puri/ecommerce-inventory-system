// services/productService.js
const { trackLowStock } = require('./notificationService');

const products = new Map();
const inventory = new Map();

function addOrUpdateProduct({ id, name, price, category, quantity }) {
  products.set(id, { id, name, price, category });
  inventory.set(id, (inventory.get(id) || 0) + quantity);
  trackLowStock(id);
  return { message: 'Product added/updated' };
}

function getProductDetails(id) {
  const product = products.get(id);
  const qty = inventory.get(id) || 0;
  if (!product) return null;
  return { ...product, quantity: qty };
}

module.exports = {
  products,
  inventory,
  addOrUpdateProduct,
  getProductDetails
};

const { setInventoryAccessor } = require('./notificationService');
setInventoryAccessor(() => inventory);
