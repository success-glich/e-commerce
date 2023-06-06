const Products = require("./product");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeatures = require("../utils/apiFeature");

const getAllProducts = catchAsyncError(async (req, res) => {
  const apiFeature = new ApiFeatures(Products.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;

  return res.status(200).json({
    success: true,
    numOfProduct: products.length,
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

module.exports = {
  getAllProducts,
  getProductDetails,
  createProduct,
  deleteProduct,
  updateProduct,
};
