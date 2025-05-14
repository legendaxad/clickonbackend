import express from "express";
import { LaptopController } from "../../controllers/laptop.product.js";
import { validateProduct } from "../../validations/product.js";

const Laptoprouter = express.Router();

Laptoprouter.post("/add", validateProduct, LaptopController.addProduct);
Laptoprouter.get("/all", LaptopController.getAllProducts);
Laptoprouter.get("/all:id", validateProduct, LaptopController.getProductById);
Laptoprouter.put("/edit/:id", validateProduct, LaptopController.updateProduct);
Laptoprouter.delete(
  "/delete/:id",
  validateProduct,
  LaptopController.deleteProduct
);

export default Laptoprouter;
