# Assignment 3 – Inventory and Data Management System

Node.js + Express + MongoDB (Mongoose) + dotenv REST API.

## Setup
```bash
npm install
cp .env.example .env     # set MONGO_URI if needed
npm run seed             # optional sample data
npm run dev              # or: npm start
```
MongoDB must be running (default: `mongodb://127.0.0.1:27017/inventory_db`).

## Structure
```
config/db.js                  MongoDB connection
models/Product.js             Schema + validation
controllers/productController.js
routes/productRoutes.js
middleware/errorMiddleware.js  ID validation, 404, centralized error handler
server.js  seed.js
```

## Product Schema
name, sku (unique), category, price (>=0), quantity (integer >=0), reorderLevel, supplier, description, timestamps.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/products | Create product |
| GET | /api/products | List with filter/sort/pagination |
| GET | /api/products/:id | Single product |
| PUT | /api/products/:id | Update details |
| PATCH | /api/products/:id/stock | Restock / sale |
| DELETE | /api/products/:id | Delete product |
| GET | /api/products/reports/low-stock | Products with quantity <= reorderLevel |
| GET | /api/products/reports/category-summary | Aggregation by category |

### Query params (GET /api/products)
`category`, `minPrice`, `maxPrice`, `inStock=true|false`, `search`, `sort=price,-quantity`, `page`, `limit`

Example: `/api/products?category=electronics&minPrice=300&sort=-price&page=1&limit=5`

### Stock adjustment
```json
PATCH /api/products/:id/stock
{ "type": "restock", "quantity": 20 }
{ "type": "sale", "quantity": 5 }
```
Sales use an atomic conditional `$inc`, so stock never goes negative.

### Sample create body
```json
{
  "name": "Wireless Mouse",
  "sku": "ELEC-001",
  "category": "electronics",
  "price": 799,
  "quantity": 50,
  "reorderLevel": 10,
  "supplier": "TechSupply"
}
```
