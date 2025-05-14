// controllers/CartController.js
import CartItem from "../models/cart/cart.laptop.js";

class CartController {
  static async addToCart(req, res) {
    try {
      const { userId, product } = req.body;

      if (!userId || !product || !product._id) {
        return res
          .status(400)
          .json({ message: "Missing userId or product._id" });
      }

      const existingItem = await CartItem.findOne({
        userId,
        productId: product._id,
      });

      if (existingItem) {
        existingItem.quantity += product.quantity || 1;
        await existingItem.save();
        return res.status(200).json(existingItem);
      }

      const newItem = new CartItem({
        userId,
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: product.quantity || 1,
      });

      await newItem.save();
      res.status(201).json(newItem);
    } catch (error) {
      console.error("Add to cart error:", error.message);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }

  // ✅ NEW METHOD: Get all cart items for a specific user
  static async getAllCartItems(req, res) {
    try {
      const { userId } = req.query;

      if (!userId) {
        return res.status(400).json({ message: "Missing userId in query" });
      }

      const cartItems = await CartItem.find({ userId });

      res.status(200).json(cartItems);
    } catch (error) {
      console.error("Get cart items error:", error.message);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
}

export default CartController;
