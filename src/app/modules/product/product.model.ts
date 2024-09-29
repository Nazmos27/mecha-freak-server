import { model, Schema } from "mongoose";
import { TProduct } from "./product.interface";

const productModelSchema = new Schema<TProduct>({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    brand : {
        type : String,
        required : true
    },
    availableQuantity : {
        type : Number,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    rating : {
        type : Number,
        required : true
    },
    image : {
        type : String,
        required : true
    },

})

export const ProductModel = model<TProduct>('products', productModelSchema)