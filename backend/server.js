import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { connnetDb } from './config/db.js';
import authRoutes from './routes/AuthRoutes.js';
import userRoutes from './routes/userRoutes.js';
import catagoryRoutes from './routes/catagoryRoutes.js';
import productRoutes from "./routes/protectRoutes.js";
import cardRoutes from './routes/cardRoutes.js';
import addressRoutes from './routes/addressRoute.js';
import orderRoutes from './routes/orderRoute.js';
import paymentRoutes from './routes/paymentRoute.js'
dotenv.config()
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/catagory", catagoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/card", cardRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/payment", paymentRoutes);
const server = http.createServer(app);

connnetDb()
server.listen(8000,() =>{
 console.log("server connect")
})