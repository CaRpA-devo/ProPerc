import express from "express";

import { clerkAuth } from "../middelwares/clerkauth.js";
import { getProfile, saveProfile } from "../controllers/profile.controller.js";

export const ProfileRouter = express.Router();

ProfileRouter.get("/", clerkAuth, getProfile);
ProfileRouter.post("/", clerkAuth, saveProfile);
