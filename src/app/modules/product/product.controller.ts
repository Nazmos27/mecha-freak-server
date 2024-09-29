import catchAsync from '../../utils/catchAsync';
import { ProductServices } from './product.service';

const createProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.createProductIntoDB(req.body);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Product created successfully',
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const { search, limit, page } = req.query;
  const { products, total } = await ProductServices.getAllProductsFromDB(
    search as string | undefined,
    limit as string | undefined,
    page as string | undefined
  );

  res.status(200).json({
    success: true,
    message: "All Products data are retrieved Successfully",
    data: products,
    totalProducts: total,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.getSingleProductFromDB(id);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Product info retreived successfully',
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ProductServices.updateProductIntoDB(id, req.body);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Products info updated successfully',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = ProductServices.deleteProductFromDB(id);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Products deleted successfully',
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
