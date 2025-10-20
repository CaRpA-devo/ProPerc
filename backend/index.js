import express from "express";
import { env } from "./src/config/config.js";
import { Clerk } from "@clerk/clerk-sdk-node";

Clerk({ apiKey: process.env.CLERK_SECRET_KEY });

import { mongoConnect } from "./src/config/db.js";
import dailyResetService from "./src/services/dailyReset.service.js";

import { createError } from "./src/utils/createError.js";
// import { user_router } from "./src/endpoints/users/router.js";
import cors from "cors";
import { profilerouter } from "./src/routes/profil.route.js";
import calcRouter from "./src/routes/calc.route.js";
import dailyTrackingRouter from "./src/routes/dailyTracking.route.js";
import favoritesRouter from "./src/routes/favorites.route.js";

const app = express();

// CORS konfigurieren: erlaubt Zugriff vom Frontend
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    credentials: true,
  })
);
app.use(express.json());

// Datenbank verbinden
await mongoConnect();

// Daily Reset Service starten
dailyResetService.start();

// Routen einbinden
app.use("/api/profile", profilerouter);
app.use("/api/calc", calcRouter);
app.use("/api/daily-tracking", dailyTrackingRouter);
app.use("/api/favorites", favoritesRouter);

// 404 Not Found Middleware
app.all("/", (req, res, next) => {
  next(new createError("404 Not Found", 404));
});

// 500 Internal Server Error Middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || "Internal Server Error",
  });
});

// Server starten
app.listen(env.PORT, () => {
  console.log(`Server läuft auf Port ${env.PORT}`);
});
