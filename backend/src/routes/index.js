const routes = require("express").Router();
const productRoutes = require("../products/product.routes");

routes.use("/products", productRoutes);

module.exports = routes;
