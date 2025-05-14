import { productModel } from "../models/product/product.model.js";
import { v4 as uuidv4 } from "uuid";
export class LaptopController {
  static async addProduct(req, res) {
    try {
      const productData = {
        ...req.body,
        id: uuidv4(),
      };
      const newProduct = new productModel(productData);
      await newProduct.save();
      res
        .status(201)
        .json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllProducts(req, res) {
    try {
      const products = await productModel.find().sort({ _id: -1 });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getProductById(req, res) {
    try {
      const product = await productModel.findOne({ id: req.params.id });
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateProduct(req, res) {
    try {
      const updatedProduct = await productModel.findOneAndUpdate(
        { id: req.params.id },
        req.body,
        { new: true }
      );
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res
        .status(200)
        .json({ message: "Product updated", product: updatedProduct });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const deletedProduct = await productModel.findOneAndDelete({
        id: req.params.id,
      });
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Product deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
