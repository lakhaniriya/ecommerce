import express from "express";
import { protect } from "../middleware/AuthMiddleware.js";
import { createProduct, deleteProduct, getAllProducts, getProductById, getProductsByCategory, updateProduct } from "../controllers/productController.js";
import { admin } from "../middleware/AdminMiddleware.js";

const router = express.Router();

router.post("/", protect, admin, createProduct);

router.get("/", getAllProducts);

router.get("/:id", getProductById);
router.get("/category/:id", getProductsByCategory);
router.put("/:id", protect, admin, updateProduct);

router.delete("/:id", protect, admin, deleteProduct);

export default router;