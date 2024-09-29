import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";

const createOrderIntoDB = async (payload: TOrder) => {
  const result = await OrderModel.create(payload);
  return result;
};

const getAllOrdersFromDB = async (email?: string) => {
  let filter = {};
  if (email) {
    filter = { email };
  }
  const result = await OrderModel.find(filter);
  return result;
};

const getSingleOrderFromDB = async (id: string) => {
  const result = await OrderModel.findById(id);

  return result;
};

const updateOrderIntoDB = async (id: string, payload: Partial<TOrder>) => {
  const result = await OrderModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteOrderFromDB = async (id: string) => {
  const result = await OrderModel.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );

  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getSingleOrderFromDB,
  updateOrderIntoDB,
  deleteOrderFromDB,
};