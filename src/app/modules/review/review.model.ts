import mongoose, { Schema } from "mongoose";
import { TReview } from "./review.interface";

const ReviewSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    location: { type: String, required: true },
    review: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

ReviewSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

ReviewSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

ReviewSchema.pre("findOneAndUpdate", function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

export const ReviewModel = mongoose.model<TReview>("Review", ReviewSchema);

