import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve("./src/config/.env"), // 🔹 Pfad zur .env Datei
});

export const env = {
  PORT: process.env.PORT || 4000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET || "secret",
};
