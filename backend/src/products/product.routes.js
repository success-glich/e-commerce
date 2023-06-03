const express = require("express");
const {
  getAllProducts,
  getProductDetails,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("./product.controller");

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.post("/", createProduct);
productRouter
  .route("/:id")
  .get(getProductDetails)
  .delete(deleteProduct)
  .put(updateProduct);

module.exports = productRouter;
