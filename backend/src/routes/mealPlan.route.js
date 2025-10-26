import express from "express";
import { requireAuth } from "../middelwares/clerkauth.js";
import {
  addMealToPlan,
  getMealPlan,
  updateMealPlan,
  deleteMealPlan,
} from "../controllers/mealPlan.controller.js";

export const mealPlanRouter = express.Router();

// Alle Routes benötigen Authentifizierung
mealPlanRouter.use(requireAuth);

// Mahlzeitenplan CRUD Operationen
mealPlanRouter.post("/meals", addMealToPlan);
mealPlanRouter.get("/meals", getMealPlan);
mealPlanRouter.put("/meals/:id", updateMealPlan);
mealPlanRouter.delete("/meals/:id", deleteMealPlan);
