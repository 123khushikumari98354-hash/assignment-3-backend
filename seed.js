// Run: npm run seed  (inserts sample products)
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const data = [
  { name: 'Wireless Mouse', sku: 'ELEC-001', category: 'electronics', price: 799, quantity: 50, reorderLevel: 10, supplier: 'TechSupply' },
  { name: 'Mechanical Keyboard', sku: 'ELEC-002', category: 'electronics', price: 3499, quantity: 5, reorderLevel: 10, supplier: 'TechSupply' },
  { name: 'USB-C Cable', sku: 'ELEC-003', category: 'electronics', price: 299, quantity: 120, reorderLevel: 30 },
  { name: 'Notebook A5', sku: 'STAT-001', category: 'stationery', price: 60, quantity: 200, reorderLevel: 50 },
  { name: 'Gel Pen Pack', sku: 'STAT-002', category: 'stationery', price: 120, quantity: 8, reorderLevel: 20 },
  { name: 'Office Chair', sku: 'FURN-001', category: 'furniture', price: 6500, quantity: 12, reorderLevel: 5 },
  { name: 'Standing Desk', sku: 'FURN-002', category: 'furniture', price: 15000, quantity: 3, reorderLevel: 5 },
];

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Product.deleteMany();
  await Product.insertMany(data);
  console.log(`Seeded ${data.length} products`);
  await mongoose.disconnect();
})().catch((e) => { console.error(e); process.exit(1); });
