// app.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());




const {
  enqueueRequest,
  processOrderQueue,
  initOrderProcessor
} = require('./services/orderService');

const {
  addOrUpdateProduct,
  getProductDetails
} = require('./services/productService');

const {
  trackLowStock,
  initLowStockNotifier,
  LOW_STOCK_THRESHOLD
} = require('./services/notificationService');

// CRUD for Product
app.post('/product', (req, res) => {
  const response = addOrUpdateProduct(req.body);
  res.json(response);
});

app.get('/product/:id', (req, res) => {
  const response = getProductDetails(req.params.id);
  if (!response) return res.status(404).json({ message: 'Not found' });
  res.json(response);
});

// Purchase Request
let orderCounter = 1;
app.post('/purchase', (req, res) => {
  const order_id = `ORD-${orderCounter++}`;
  const { user_id, user_tier, order_items, created_at } = req.body;
  const request = { order_id, user_id, user_tier, order_items, created_at };
  enqueueRequest(request);
  res.json({ message: 'Order received and queued', order_id });
});

// Inventory Notifications API
const { getNotifications } = require('./services/notificationService');
app.get('/notifications', (req, res) => {
  res.json(getNotifications());
});

// Initialize Background Workers
initOrderProcessor();
initLowStockNotifier();

const { seedInitialProducts, seedInitialOrders } = require('./utils/seed');

seedInitialProducts(); // preload inventory
seedInitialOrders();   // enqueue initial orders


app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
