const express = require("express");
const router = express.Router();

const {
  newOrder,
  getSingleOrder,
  myOrders,
  updateOrder,
  deleteOrder,
} = require("./order.controller");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../auth/auth.middleware");

router.route("/new").post(isAuthenticatedUser, newOrder);
router
  .route("/order/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder);
router.route("/me").get(isAuthenticatedUser, myOrders);

module.exports = router;
