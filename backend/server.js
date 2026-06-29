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

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});