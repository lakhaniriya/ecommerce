import express from "express";
import { forgotPassword, login, register, resetPassword, verification } from "../controllers/authController.js";

const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.put("/verify", verification);
route.put("/reset", resetPassword);
route.put("/forgetpassword", forgotPassword);
export default route;