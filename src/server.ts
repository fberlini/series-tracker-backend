import express from "express";
import { configureSession } from "./middleware/session";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/users.routes";
import seriesRoutes from "./routes/series.routes";
import seasonRoutes from "./routes/season.routes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // parse json bodies in the request
app.use(configureSession());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/series", seriesRoutes);
app.use("/api/seasons", seasonRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

