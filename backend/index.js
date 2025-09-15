import express from "express";
import { env } from "./config/config.js";
import { AppError } from "./utils/AppError.js";
import { mongoConnect } from "./config/db.js";
import { user_router } from "./endpoints/user/router.js";

const app = express();
app.use(express.json());

await mongoConnect();

app.use("/user", user_router);

// 404 Not Found

app.all("/{*splat}", (req, res, next) => {
  next(new AppError("404 Not Found", 404));
});

// 500 Internal Server Error
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || "Internal Server Error",
  });
});

app.listen(env.port, () => {
  console.log(`Server is running on port ${env.port}`);
});