import express from "express";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../controllers/favorites.controller.js";
import { requireAuth } from "../middelwares/clerkauth.js";

const router = express.Router();

// Alle Routes erfordern Authentifizierung
router.use(requireAuth);

// Alle Favoriten abrufen
router.get("/", getFavorites);

// Favorit hinzufügen
router.post("/", addFavorite);

// Favorit entfernen
router.delete("/:foodName", removeFavorite);

export default router;
