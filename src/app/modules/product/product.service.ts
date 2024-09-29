import { TProduct } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductIntoDB = async(payload : TProduct) => {
    const newProduct = await ProductModel.create(payload)
    return newProduct;
}

const getAllProductFromDB = async() => {
    const products = await ProductModel.find()
    return products
}

export const ProductServices = {
    createProductIntoDB,
    getAllProductFromDB,
}