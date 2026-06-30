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
dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://ecommerce-kappa-sandy.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: false,
  })
);

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

connnetDb();

const PORT = process.env.PORT || 10000;



server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});