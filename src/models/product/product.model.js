// models/Product.js
import mongoose from "mongoose";
import { model } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    id: {
      type: String,
      required: true,
      unique: true,
    },

    brand: { type: String, required: true },
    popular: { type: String },
    inventoryStatus: {
      type: String,
      enum: [
        "HOT",
        "BEST DEALS",
        "25% OFF",
        "SALE",
        "INSTOCK",
        "LOWSTOCK",
        "OUTOFSTOCK",
        "",
      ],
      default: "",
    },

    rating: { type: Number, min: 0, max: 5, default: 0 },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
export const productModel = model("laptop", productSchema, "laptop");
