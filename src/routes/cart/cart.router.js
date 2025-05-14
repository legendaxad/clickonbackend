import express from "express";
import CartController from "../../controllers/cart.controller.js";
const CartRouter = express.Router();

CartRouter.post("/add", CartController.addToCart);
CartRouter.get("/user", CartController.getAllCartItems);

export default CartRouter;
