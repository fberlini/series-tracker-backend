import express from "express";
import { configureSession } from "./core/auth/middleware/session";
import authRoutes from "./core/auth/auth.routes";
import userRoutes from "./core/users/users.routes";
import seriesRoutes from "./core/series/series.routes";
import seasonRoutes from "./core/seasons/season.routes";
import episodeRoutes from "./core/episodes/episode.routes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // parse json bodies in the request
app.use(configureSession());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/series", seriesRoutes);
app.use("/api/series/:seriesId/seasons", seasonRoutes);
app.use("/api/series/:seriesId/seasons/:seasonId/episodes", episodeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
