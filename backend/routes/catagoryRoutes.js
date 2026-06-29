import express from "express";


import { protect } from "../middleware/authMiddleware.js";
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../controllers/catagoryController.js";

const router = express.Router();

router.post("/", protect, createCategory);

router.get("/", getAllCategories);

router.get("/:id", getCategoryById);

router.put("/:id", protect, updateCategory);

router.delete("/:id", protect, deleteCategory);

export default router;