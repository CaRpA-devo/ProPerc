import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, ".env"), // 🔹 Absoluter Pfad zur .env Datei
});

// Debug: Zeige geladene Umgebungsvariablen
console.log(
  "🔧 [config.js] MONGO_URI:",
  process.env.MONGO_URI ? "✅ Gesetzt" : "❌ Nicht gesetzt"
);
console.log("🔧 [config.js] PORT:", process.env.PORT || "Nicht gesetzt");

export const env = {
  PORT: process.env.PORT || 4000,
  NODE_ENV: process.env.NODE_ENV || "development",
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/properc",
  JWT_SECRET: process.env.JWT_SECRET || "secret",
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
};
