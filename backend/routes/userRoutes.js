import express from "express";
import { protect } from "../middleware/AuthMiddleware.js";
import { getProfile } from "../controllers/userController.js";


const route = express.Router();
route.get("/profile", protect, getProfile);

export default route;