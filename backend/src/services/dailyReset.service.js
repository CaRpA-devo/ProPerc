import { DailyTracking } from "../models/dailyTracking.mod.js";
import cron from "node-cron";

class DailyResetService {
  constructor() {
    this.isRunning = false;
  }

  // Startet den täglichen Reset Service
  start() {
    if (this.isRunning) {
      console.log("Daily Reset Service läuft bereits");
      return;
    }

    // Führe Reset jeden Tag um 00:01 Uhr aus
    cron.schedule(
      "1 0 * * *",
      async () => {
        console.log("🔄 Starte täglichen Reset Service...");
        await this.performDailyReset();
      },
      {
        timezone: "Europe/Berlin",
      }
    );

    // Zusätzlich: Führe Reset alle 5 Minuten aus (für Testing)
    // In Produktion sollte das deaktiviert werden
    if (process.env.NODE_ENV === "development") {
      cron.schedule("*/5 * * * *", async () => {
        console.log("🔄 [DEV] Prüfe auf täglichen Reset...");
        await this.checkAndResetIfNeeded();
      });
    }

    this.isRunning = true;
    console.log("✅ Daily Reset Service gestartet");
  }

  // Stoppt den Service
  stop() {
    cron.destroy();
    this.isRunning = false;
    console.log("⏹️ Daily Reset Service gestoppt");
  }

  // Prüft ob ein Reset nötig ist und führt ihn aus
  async checkAndResetIfNeeded() {
    try {
      const today = new Date().toISOString().split("T")[0];
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];

      // Finde alle aktiven Einträge von gestern und früher
      const oldEntries = await DailyTracking.find({
        date: { $lt: today },
        isActive: true,
      });

      if (oldEntries.length > 0) {
        console.log(
          `🔄 Gefunden ${oldEntries.length} alte Einträge zum Deaktivieren`
        );
        await this.performDailyReset();
      }
    } catch (error) {
      console.error("❌ Fehler beim Prüfen des täglichen Resets:", error);
    }
  }

  // Führt den täglichen Reset durch
  async performDailyReset() {
    try {
      console.log("🔄 Führe täglichen Reset durch...");

      // Deaktiviere alte Einträge
      const result = await DailyTracking.deactivateOldData();

      console.log(
        `✅ Täglicher Reset abgeschlossen: ${result.modifiedCount} Einträge deaktiviert`
      );

      // Optional: Hier könnten weitere Reset-Operationen hinzugefügt werden
      // z.B. Statistiken berechnen, Benachrichtigungen senden, etc.
    } catch (error) {
      console.error("❌ Fehler beim täglichen Reset:", error);
    }
  }

  // Manueller Reset (für Testing)
  async manualReset() {
    console.log("🔄 Manueller Reset gestartet...");
    await this.performDailyReset();
  }

  // Status des Services abrufen
  getStatus() {
    return {
      isRunning: this.isRunning,
      nextReset: this.getNextResetTime(),
    };
  }

  // Berechnet die nächste Reset-Zeit
  getNextResetTime() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 1, 0, 0); // 00:01 Uhr morgen

    return tomorrow.toISOString();
  }
}

// Singleton Instanz
const dailyResetService = new DailyResetService();

export default dailyResetService;
