import express from "express";
import { getProfile, saveProfile } from "../controllers/profile.controller.js";
import { requireAuth } from "../middelwares/clerkauth.js";

export const profilerouter = express.Router();

profilerouter.get("/me", requireAuth, getProfile);
profilerouter.post("/settings", requireAuth, saveProfile);
