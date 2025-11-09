import { MealPlan } from "../models/mealPlan.mod.js";
import { createError } from "../utils/createError.js";

// Neue Mahlzeit zum Plan hinzufügen
export const addMealToPlan = async (req, res, next) => {
  try {
    const { date, mealType, food, notes } = req.body;
    const userId = req.auth.userId;

    const mealPlan = new MealPlan({
      userId,
      date: new Date(date),
      mealType,
      food,
      notes,
    });

    await mealPlan.save();
    res.status(201).json(mealPlan);
  } catch (err) {
    next(createError(500, "Fehler beim Hinzufügen der Mahlzeit"));
  }
};

// Geplante Mahlzeiten für einen Zeitraum abrufen
export const getMealPlan = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    const { startDate, endDate } = req.query;

    const query = { userId };
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const meals = await MealPlan.find(query).sort({ date: 1, mealType: 1 });
    res.json(meals);
  } catch (err) {
    next(createError(500, "Fehler beim Abrufen des Mahlzeitenplans"));
  }
};

// Geplante Mahlzeit aktualisieren
export const updateMealPlan = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.auth.userId;
    const updateData = req.body;

    const meal = await MealPlan.findOne({ _id: id, userId });
    if (!meal) {
      return next(createError(404, "Mahlzeit nicht gefunden"));
    }

    Object.assign(meal, updateData);
    await meal.save();
    res.json(meal);
  } catch (err) {
    next(createError(500, "Fehler beim Aktualisieren der Mahlzeit"));
  }
};

// Geplante Mahlzeit löschen
export const deleteMealPlan = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.auth.userId;

    const meal = await MealPlan.findOneAndDelete({ _id: id, userId });
    if (!meal) {
      return next(createError(404, "Mahlzeit nicht gefunden"));
    }

    res.json({ message: "Mahlzeit erfolgreich gelöscht" });
  } catch (err) {
    next(createError(500, "Fehler beim Löschen der Mahlzeit"));
  }
};
