# 🛒 Ecommerce Inventory Management System (Node.js + Express.js)

A modular, in-memory ecommerce inventory system that supports product inventory management, purchase order queuing with user-tier-based prioritization, low stock notification, and auto restocking.

---

## 📁 Project Structure

```bash
├── index.js                  # App entry point
├── routes/
│   └── index.js             # API routes
├── services/
│   ├── productService.js    # Product & inventory logic
│   ├── orderService.js      # Order queue & processing
│   └── notificationService.js # Low stock notifications
├── utils/
│   ├── constants.js         # User tier priorities
│   └── seed.js              # Initial data
```

---

## 🚀 Features

- ✅ Product CRUD operations
- 🧮 Inventory quantity tracking
- 📥 Purchase orders handled by user-tier priority queue
- 🔔 Low stock alerts (tracked below threshold)
- 🔁 Auto-processing of queue (interval configurable)

---

## 🏷️ User Tier Priorities

```js
const userTiers = {
  PREMIUM: 3,
  GOLD: 2,
  BASIC: 1
};
```

---

## ⚙️ Setup Instructions

```bash
# 1. Clone repo and enter project
cd OrderApplication

# 2. Install dependencies
npm install

# 3. Run server
node index.js
```

---

## 📌 GitHub Push Commands

```bash
# Initialize repository (if needed)
git init

git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

---

## 🔄 Example cURL Request to Add Product

```bash
curl -X POST http://localhost:3000/product \
  -H "Content-Type: application/json" \
  -d '{
    "id": "prod-101",
    "name": "Wireless Mouse",
    "price": 799,
    "category": "Electronics",
    "quantity": 25
  }'
```

---

## 🧪 Submit Sample Order Request

```bash
curl -X POST http://localhost:3000/order \
  -H "Content-Type: application/json" \
  -d '{
    "order_id": "ORD-001",
    "user_id": "user-123",
    "user_tier": "GOLD",
    "created_at": "2025-06-18T10:00:00Z",
    "order_items": [
      {"product_id": "prod-101", "quantity": 2},
      {"product_id": "prod-103", "quantity": 5}
    ]
  }'
```

---

## 🧠 Notes

- Products are auto-added via seeding (`utils/seed.js`)
- Low stock threshold is configurable (default = 5)
- Low stock notifications print every 2 minutes
- Notification stops once stock is replenished

---

## 📬 Future Add-ons

- MongoDB/PostgreSQL persistence
- Swagger API docs
- Frontend dashboard
- RESTful auth system

---

✅ Use this system to simulate backend behavior of an ecommerce inventory with smart queuing and notifications.
