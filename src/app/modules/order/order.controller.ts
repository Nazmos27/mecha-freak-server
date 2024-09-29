import { OrderServices } from "./order.service";
import catchAsync from "../../utils/catchAsync";

const createOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.createOrderIntoDB(req.body);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Order is created Successfully',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const email = req.query.email;
  let emailString: string | undefined = undefined;

  if (typeof email === "string") {
    emailString = email;
  }
  const result = await OrderServices.getAllOrdersFromDB(emailString);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'All orders are retrieved Successfully',
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OrderServices.getSingleOrderFromDB(id);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Order data created Successfully',
    data: result,
  });
});

const updateOrder = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await OrderServices.updateOrderIntoDB(id, req.body);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Order is updated Successfully',
    data: result,
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = OrderServices.deleteOrderFromDB(id);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Order is deleted Successfully',
    data: result,
  });
});

export const OrderControllers = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};