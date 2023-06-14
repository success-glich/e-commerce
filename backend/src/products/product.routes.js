const express = require("express");
const {
  getAllProducts,
  getProductDetails,
  createProduct,
  deleteProduct,
  updateProduct,
  createProductReview,
} = require("./product.controller");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../auth/auth.middleware");

const productRouter = express.Router();

productRouter.get(
  "/",

  getAllProducts
);
productRouter.post(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  createProduct
);
productRouter.route("/review").put(isAuthenticatedUser, createProductReview);
productRouter
  .route("/:id")
  .get(getProductDetails)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);

module.exports = productRouter;
