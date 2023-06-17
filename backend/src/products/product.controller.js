const Products = require("./product");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeatures = require("../utils/apiFeature");

const getAllProducts = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await Products.countDocuments();
  const apiFeature = new ApiFeatures(Products.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;

  let filteredProductCount = products.length;
  apiFeature.pagination(resultPerPage);

  products = await apiFeature.query.clone();

  return res.status(200).json({
    success: true,
    filteredProductCount,
    resultPerPage,
    productsCount,
    products,
  });
});

const getProductDetails = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const product = await Products.findById(id);
  if (!product) {
    return next(new ErrorHandler("product not found !", 404));
  }

  return res.status(200).json({
    success: true,
    message: "product found successfully",
    product,
  });
});

// Create Product -- Admin
const createProduct = async (req, res) => {
  try {
    const product = await new Products(req.body).save();
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to upload products",
      error: error.message,
    });
  }
};
//Delete Product --Admin
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Products.findByIdAndDelete(id);
    console.log(product);
    return res.status(200).json({
      success: true,
      message: "product deleted successfully",
      product,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete product with id",
      error: err.message,
    });
  }
};

//Update Product --Admin
const updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedProduct = await Products.findByIdAndUpdate(id, {
      ...req.body,
    });
    return res.status(200).json({
      success: true,
      message: "product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete product with id",
      error: err.message,
    });
  }
};

//Create New Review or Update the review
const createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Products.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product does not exits with Id:", 400));
  }
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  product.ratings =
    product.reviews.reduce((acc, rev) => {
      acc += Number(rev.rating);
      return acc;
    }, 0) / product.reviews.length;

  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});
//Get All Reviews of a product
const getProductReviews = catchAsyncError(async (req, res, next) => {
  console.log("working");
  const product = await Products.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});
const deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Products.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );
  const ratings =
    reviews.reduce((acc, rev) => {
      acc += Number(rev.rating);
      return acc;
    }, 0) / reviews.length;

  const numOfReviews = reviews.length;
  await Products.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidator: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
  });
});
module.exports = {
  getAllProducts,
  getProductDetails,
  createProduct,
  deleteProduct,
  updateProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
};
