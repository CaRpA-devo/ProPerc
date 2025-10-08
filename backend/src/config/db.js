import mongoose from "mongoose";
import { env } from "./config.js";

export async function mongoConnect() {
  try {
    await mongoose.connect(env.MONGO_URI, {
      dbName: "ProPerc1",
    });
    console.log("📢 [db.js:10]", "Verbindung hergestellt");

    mongoose.connection.on("disconnected", () => {
      console.error("⚠️ Verbindung zu MongoDB verloren. Versuche erneut...");
      reconnectDB();
    });

    mongoose.connection.on("error", (err) => {
      console.log("📢 [db.js:13]", `MongoDB-Error: ${err}`);
      process.exit(1);
    });
  } catch (error) {
    console.error("❌ Fehler beim Verbinden mit MongoDB:", error);
    process.exit(1);
  }
}

const reconnectDB = async () => {
  setTimeout(async () => {
    try {
      await mongoose.connect(env.MONGO_URI, {
        dbName: "test",
      });
      console.log("✅ Neuverbindung zu MongoDB erfolgreich!");
    } catch (error) {
      console.error("❌ Fehler beim erneuten Verbinden mit MongoDB:", error);
      reconnectDB();
    }
  }, 5000); // Warte 5 Sekunden vor dem erneuten Versuch
};
