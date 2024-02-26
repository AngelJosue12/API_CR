import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import morgan from "morgan";

import config from "./config";

const app = express();

// settings
app.set("port", config.port);

// Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRoutes);

// Routes
//app.use("/api", productRoutes);

export default app;
