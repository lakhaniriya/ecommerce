import express from "express";
import { protect } from "../middleware/AuthMiddleware.js";
import { admin } from "../middleware/AdminMiddleware.js";
import {
  placeOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

// User
router.post("/", protect, placeOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.put("/cancel/:id", protect, cancelOrder);

// Admin
router.get("/", protect, admin, getAllOrders);
router.put("/status/:id", protect, admin, updateOrderStatus);
router.delete("/:id", protect, admin, deleteOrder);

export default router;