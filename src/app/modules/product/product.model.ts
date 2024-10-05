import mongoose, { Schema } from 'mongoose';
import { TProducts } from './product.interface';

const productSchema = new Schema(
  {
    image: { type: String, required: true },
    title: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    availableQuantity: { type: Number, required: true },
    price: { type: Number, required: true },
    ratings: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// Create compound text index for better search performance
productSchema.index({ title: 'text', brand: 'text', description: 'text' });

productSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

productSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

productSchema.pre('findOneAndUpdate', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

export const ProductModel = mongoose.model<TProducts>('Product', productSchema);
