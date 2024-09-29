import mongoose, { Schema } from "mongoose";
import { TOrder } from "./order.interface";

const OrderInfoSchema = new Schema({
  product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
});

const OrderSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    totalPrice: { type: Number, required: true, min: 0 },
    orderStatus: {
      type: String,
      required: true,
      enum: ["unpaid", "paid", "confirmed", "delivered"],
    },
    orderInfo: { type: [OrderInfoSchema], required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

OrderSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

OrderSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

OrderSchema.pre("findOneAndUpdate", function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

// Create the model
export const OrderModel = mongoose.model<TOrder>("Order", OrderSchema);

