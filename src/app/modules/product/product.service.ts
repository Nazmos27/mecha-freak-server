/* eslint-disable @typescript-eslint/no-explicit-any */

import { TProducts } from './product.interface';
import { ProductModel } from './product.model';

const createProductIntoDB = async (payload: TProducts) => {
  const result = await ProductModel.create(payload);
  return result;
};

const getAllProductsFromDB = async (
  search: string | undefined,
  limit: string | undefined,
  page: string | undefined,
) => {
  let query = {};
  if (search) {
    query = { $text: { $search: search } };
  }

  // set pagination options
  const options: any = {};
  if (limit && page) {
    options.limit = Number(limit);
    options.skip = (Number(page) - 1) * Number(limit);
  }
  const [products, total] = await Promise.all([
    ProductModel.find(query, null, options),
    ProductModel.countDocuments(query),
  ]);
  return { products, total };
};

const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findById(id);

  return result;
};

const updateProductIntoDB = async (id: string, payload: Partial<TProducts>) => {
  const result = await ProductModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await ProductModel.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );

  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
