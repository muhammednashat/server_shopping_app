const { Schema, model } = require('mongoose');

// Define the CartItem schema
const cartItemSchema = new Schema({
  productId: String,
  quantity: Number,
  size: String,
});

// Define the Cart schema and embed cart items
const cartSchema = new Schema({
  userId: String,
  items: [cartItemSchema], // Not List<CartItem>, use array of schema
});

// Export models
const Cart = model('Cart', cartSchema);
// const CartItem = model('CartItem', cartItemSchema);

module.exports = { Cart };
