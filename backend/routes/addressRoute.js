import express from "express";
import { protect } from "../middleware/AuthMiddleware.js";
import {
  addAddress,
  getAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../controllers/addressController.js";

const router = express.Router();

router.post("/", protect, addAddress);

router.get("/", protect, getAddresses);

router.get("/:id", protect, getAddressById);

router.put("/:id", protect, updateAddress);

router.delete("/:id", protect, deleteAddress);

router.put("/default/:id", protect, setDefaultAddress);

export default router;