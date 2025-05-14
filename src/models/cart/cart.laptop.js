// models/cart/cart.laptop.js
import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // You can use String instead of ObjectId for flexibility
    productId: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: String,
    price: Number,
    image: String,
    quantity: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const CartItem = mongoose.model("CartItem", cartItemSchema);
export default CartItem;
