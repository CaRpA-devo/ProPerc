import express from "express";
import {
  getTodayTracking,
  addFood,
  removeFood,
  updateWater,
  resetToday,
  getHistory,
  deactivateOldData,
} from "../controllers/dailyTracking.controller.js";
import { requireAuth } from "../middelwares/clerkauth.js";

const router = express.Router();

// Alle Routes erfordern Authentifizierung
router.use(requireAuth);

// Heute's Tracking-Daten abrufen
router.get("/today", getTodayTracking);

// Essen hinzufügen
router.post("/food", addFood);

// Essen entfernen
router.delete("/food/:foodId", removeFood);

// Wasser-Intake aktualisieren
router.patch("/water", updateWater);

// Tägliche Daten zurücksetzen
router.post("/reset", resetToday);

// Historische Daten abrufen
router.get("/history", getHistory);

// Alte Daten deaktivieren (für 24h Reset Service)
router.post("/deactivate-old", deactivateOldData);

export default router;
