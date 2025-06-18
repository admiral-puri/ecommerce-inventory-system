Ecommerce Inventory Management System (Node.js + Express)

This is a modular in-memory Ecommerce Inventory Management System built using Node.js and Express.js. It handles product inventory, purchase requests based on user tier priorities, low-stock notifications, and automatic order processing.

🚀 Features

🛒 Product Management (CRUD)

📦 Inventory Tracking with stock quantities

📥 Purchase Order Queue with user-tier-based priority

🔔 Low-Stock Notification System

🔄 Auto-Processing Queue + Configurable Interval

⚙️ Modular services with clean separation of concerns

📦 User Tiers (Priority)

const userTiers = {
  PREMIUM: 3,
  GOLD: 2,
  BASIC: 1
};

Orders from higher-tier users are processed first using a priority queue.

📁 Project Structure

├── index.js                  # App entry point
├── routes/
│   └── index.js             # Routes for products and orders
├── services/
│   ├── productService.js    # Inventory management
│   ├── orderService.js      # Order queuing and processing
│   └── notificationService.js # Low stock tracking & notifications
├── utils/
│   ├── constants.js         # User tier priority map
│   └── seed.js              # Initial product and order seeding
└── README.md

🛠️ Setup Instructions

1. Install dependencies

npm install

2. Start the server

node index.js

3. Preloaded on Startup

Initial products are added to the inventory

Initial purchase orders are queued and processed automatically

🔄 Sample Endpoints

✅ Add Product

curl -X POST http://localhost:3000/product \
  -H "Content-Type: application/json" \
  -d '{"id":"prod-101","name":"Wireless Mouse","price":799,"category":"Electronics","quantity":25}'

✅ Submit Purchase Order

curl -X POST http://localhost:3000/order \
  -H "Content-Type: application/json" \
  -d '{
    "order_id": "ORD-3",
    "user_id": "user-3",
    "user_tier": "GOLD",
    "created_at": "2025-06-18T12:00:00Z",
    "order_items": [
      {"product_id": "prod-101", "quantity": 2},
      {"product_id": "prod-103", "quantity": 10}
    ]
  }'

🧠 Logic Highlights

Priority Queue holds incoming orders based on user_tier

When stock of a product falls below threshold (default 5), it is tracked and notified

Every 2 minutes (configurable), low-stock alerts are printed

Circular dependencies are handled via dependency injection (using setInventoryAccessor)

📬 Future Improvements

Persistent database support (e.g., MongoDB or PostgreSQL)

REST API versioning

Swagger documentation

Frontend dashboard to visualize stock and queue

📧 Contact

Built by Shubham Kumar — feel free to reach out for contributions or improvements!

