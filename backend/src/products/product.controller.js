const Products = require("./product");

const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find({});
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "there was error while fetching products",
      error: error.message,
    });
  }
};

const getProductDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Products.findById(id);

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "no product found",
        error: error.message,
      });
    }
    return res.status(200).json({
      success: true,
      message: "product found successfully",
      product,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Failed to fetch product with id",
      error: err.message,
    });
  }
};

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
