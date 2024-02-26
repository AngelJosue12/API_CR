import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import morgan from "morgan";

import config from "./config";

const app = express();

// settings
app.set("port", config.port);

// Middlewares
// midelWare
app.use(express.json());

app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRoutes);

// Routes
//app.use("/api", productRoutes);

export default app;
