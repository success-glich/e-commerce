const routes = require("express").Router();
const productRoutes = require("../products/product.routes");
const userRoutes = require("../auth/auth.routes");
const orderRoutes = require("../order/order.routes");
routes.use("/products", productRoutes);
routes.use("/auth/", userRoutes);
routes.use("/orders", orderRoutes);
module.exports = routes;
