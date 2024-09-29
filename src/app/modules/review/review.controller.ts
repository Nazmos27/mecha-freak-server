import { ReviewServices } from "./review.service";
import catchAsync from "../../utils/catchAsync";

const createReview = catchAsync(async (req, res) => {
  const result = await ReviewServices.createReviewIntoDB(req.body);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Review done successfully',
    data: result,
  });
});

const getAllReviews = catchAsync(async (req, res) => {
  const email = req.query.email;
  let emailString: string | undefined = undefined;

  if (typeof email === "string") {
    emailString = email;
  }
  const result = await ReviewServices.getAllReviewsFromDB(emailString);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'All Review retrieved successfully',
    data: result,
  });
});

const getSingleReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ReviewServices.getSingleReviewFromDB(id);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Review is retrieved successfully',
    data: result,
  });
});

const updateReview = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ReviewServices.updateReviewIntoDB(id, req.body);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Review updated successfully',
    data: result,
  });
});

const deleteReview = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = ReviewServices.deleteReviewFromDB(id);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Review deleted successfully',
    data: result,
  });
});

export const ReviewControllers = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};