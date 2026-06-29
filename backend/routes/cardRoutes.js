import express from "express";
import { protect } from "../middleware/AuthMiddleware.js";
import {
  addToCart,
  getMyCart,
  updateCart,
  removeCartItem,
  clearCart,
} from "../controllers/cardController.js";

const router = express.Router();

router.post("/", protect, addToCart);

router.get("/", protect, getMyCart);

router.put("/:productId", protect, updateCart);

router.delete("/:productId", protect, removeCartItem);

router.delete("/", protect, clearCart);

export default router;