import { model, Schema } from "mongoose";
const Userschema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: String, unique: true, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  {
    timestamps: { createdAt: "create_at", updatedAt: "updated_at" },
    versionKey: false,
  }
);
export const userModel = model("Clicon", Userschema, "Clicon");
