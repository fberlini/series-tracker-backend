import express from "express";
import userRoutes from "./routes/users.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // parse json bodies in the request
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

