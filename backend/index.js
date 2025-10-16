import express from "express";
import { env } from "./src/config/config.js";

import { mongoConnect } from "./src/config/db.js";

import { createError } from "./src/utils/createError.js";
// import { user_router } from "./src/endpoints/users/router.js";
import cors from "cors";
import { ProfileRouter } from "./src/routes/profil.route.js";
import { EntryRouter } from "./src/routes/entry.route.js";

const app = express();
app.use(express.json());
app.use(cors());

await mongoConnect();
// Hier binden wir unsere Routen ein:

// app.use("/user", user_router);

app.use("/api/profile", ProfileRouter);
app.use("/api/entries", EntryRouter);

// 404 Not Found

app.all("/{*splat}", (req, res, next) => {
  next(new createError("404 Not Found", 404));
});

// 500 Internal Server Error
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || "Internal Server Error",
  });
});

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
