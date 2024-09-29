import { Types } from "mongoose";

export type TOrderInfo = {
  product: Types.ObjectId;
  price: number;
  quantity: number;
};

export type TOrder = {
  name: string;
  phone: string;
  email: string;
  deliveryAddress: string;
  totalPrice: number;
  orderStatus: "unpaid" | "paid" | "confirmed" | "delivered";
  orderInfo: TOrderInfo[];
  isDeleted?: boolean;
};