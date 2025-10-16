import express from "express";
import { clerkAuth } from "../middelwares/clerkauth.js";
import { addEntry, getEntries } from "../controllers/entry.controller.js";

export const EntryRouter = express.Router();

EntryRouter.get("/", clerkAuth, getEntries); // Alle Einträge holen
EntryRouter.post("/", clerkAuth, addEntry); // Neuen Eintrag erstellen
