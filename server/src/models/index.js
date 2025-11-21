const models = {};

// Mảng Categories
const categories = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Books" },
  { id: 3, name: "Clothing" },
  { id: 4, name: "Home & Kitchen" },
  { id: 5, name: "Sports & Outdoors" },
];

// Mảng Products
const products = [
  {
    id: 1,
    name: "Smartphone",
    description: "High-end smartphone with 128GB storage",
    price: 699.99,
    categoryId: 1, // Electronics
  },
  {
    id: 2,
    name: "Laptop",
    description: "Lightweight laptop with 16GB RAM",
    price: 1199.99,
    categoryId: 1, // Electronics
  },
  {
    id: 3,
    name: "Wireless Headphones",
    description: "Noise-cancelling over-ear wireless headphones",
    price: 199.99,
    categoryId: 1, // Electronics
  },
  {
    id: 4,
    name: "Programming Book",
    description: "Comprehensive guide to modern JavaScript",
    price: 39.99,
    categoryId: 2, // Books
  },
  {
    id: 5,
    name: "Novel",
    description: "Bestselling fiction novel with hardcover",
    price: 24.99,
    categoryId: 2, // Books
  },
  {
    id: 6,
    name: "T-Shirt",
    description: "100% cotton unisex t-shirt",
    price: 14.99,
    categoryId: 3, // Clothing
  },
  {
    id: 7,
    name: "Jeans",
    description: "Slim-fit stretch denim jeans",
    price: 49.99,
    categoryId: 3, // Clothing
  },
  {
    id: 8,
    name: "Blender",
    description: "High-speed kitchen blender with glass jar",
    price: 89.99,
    categoryId: 4, // Home & Kitchen
  },
  {
    id: 9,
    name: "Coffee Maker",
    description: "Automatic drip coffee maker with timer",
    price: 79.99,
    categoryId: 4, // Home & Kitchen
  },
  {
    id: 10,
    name: "Yoga Mat",
    description: "Non-slip exercise mat for yoga and fitness",
    price: 29.99,
    categoryId: 5, // Sports & Outdoors
  },
];

models.Product = products;
models.Category = categories;

module.exports = models;