import { DailyTracking } from "../models/dailyTracking.mod.js";
import { User } from "../models/profile.mod.js";
import { createError } from "../utils/createError.js";

// Heute's Tracking-Daten abrufen
export const getTodayTracking = async (req, res, next) => {
  try {
    const clerkId = req.auth.userId;

    const todayData = await DailyTracking.findOrCreateToday(clerkId);

    res.status(200).json({
      success: true,
      data: {
        foods: todayData.foods,
        waterIntake: todayData.waterIntake,
        totalCalories: todayData.totalCalories,
        totalProtein: todayData.totalProtein,
        totalFat: todayData.totalFat,
        totalCarbs: todayData.totalCarbs,
        date: todayData.date,
        lastUpdated: todayData.lastUpdated,
      },
    });
  } catch (error) {
    next(
      createError(500, "Fehler beim Laden der Tracking-Daten", error.message)
    );
  }
};

// Essen hinzufügen
export const addFood = async (req, res, next) => {
  try {
    const clerkId = req.auth.userId;
    const { foodData } = req.body;

    if (!foodData || !foodData.name) {
      return next(createError(400, "Essensdaten sind erforderlich"));
    }

    const todayData = await DailyTracking.findOrCreateToday(clerkId);

    const newFood = {
      id: Date.now().toString(),
      name: foodData.name,
      calories: foodData.calories || 0,
      protein: foodData.protein || 0,
      fat: foodData.fat || 0,
      carbs: foodData.carbs || 0,
      quantity: foodData.quantity || 1,
      timestamp: new Date(),
    };

    todayData.foods.push(newFood);
    await todayData.save();

    res.status(201).json({
      success: true,
      message: "Essen erfolgreich hinzugefügt",
      data: newFood,
    });
  } catch (error) {
    next(createError(500, "Fehler beim Hinzufügen des Essens", error.message));
  }
};

// Essen entfernen
export const removeFood = async (req, res, next) => {
  try {
    const clerkId = req.auth.userId;
    const { foodId } = req.params;

    const todayData = await DailyTracking.findOrCreateToday(clerkId);

    const foodIndex = todayData.foods.findIndex((food) => food.id === foodId);
    if (foodIndex === -1) {
      return next(createError(404, "Essen nicht gefunden"));
    }

    todayData.foods.splice(foodIndex, 1);
    await todayData.save();

    res.status(200).json({
      success: true,
      message: "Essen erfolgreich entfernt",
    });
  } catch (error) {
    next(createError(500, "Fehler beim Entfernen des Essens", error.message));
  }
};

// Wasser-Intake aktualisieren
export const updateWater = async (req, res, next) => {
  try {
    const clerkId = req.auth.userId;
    const { change } = req.body;

    if (typeof change !== "number") {
      return next(createError(400, "Wasser-Änderung muss eine Zahl sein"));
    }

    const todayData = await DailyTracking.findOrCreateToday(clerkId);

    const newWaterIntake = Math.max(
      0,
      Math.min(20, todayData.waterIntake + change)
    );
    todayData.waterIntake = newWaterIntake;
    await todayData.save();

    res.status(200).json({
      success: true,
      message: "Wasser-Intake aktualisiert",
      data: {
        waterIntake: newWaterIntake,
      },
    });
  } catch (error) {
    next(
      createError(
        500,
        "Fehler beim Aktualisieren des Wasser-Intakes",
        error.message
      )
    );
  }
};

// Tägliche Daten zurücksetzen (für neuen Tag)
export const resetToday = async (req, res, next) => {
  try {
    const clerkId = req.auth.userId;

    const todayData = await DailyTracking.findOrCreateToday(clerkId);

    todayData.foods = [];
    todayData.waterIntake = 0;
    await todayData.save();

    res.status(200).json({
      success: true,
      message: "Tägliche Daten zurückgesetzt",
    });
  } catch (error) {
    next(
      createError(
        500,
        "Fehler beim Zurücksetzen der täglichen Daten",
        error.message
      )
    );
  }
};

// Historische Daten abrufen (letzte 7 Tage)
export const getHistory = async (req, res, next) => {
  try {
    const clerkId = req.auth.userId;
    const { days = 7 } = req.query;

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const history = await DailyTracking.find({
      clerkId,
      date: {
        $gte: startDate.toISOString().split("T")[0],
        $lte: endDate.toISOString().split("T")[0],
      },
      isActive: true,
    }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      data: history,
    });
  } catch (error) {
    next(createError(500, "Fehler beim Laden der Historie", error.message));
  }
};

// Alte Daten deaktivieren (für 24h Reset Service)
export const deactivateOldData = async (req, res, next) => {
  try {
    const result = await DailyTracking.deactivateOldData();

    res.status(200).json({
      success: true,
      message: `${result.modifiedCount} alte Einträge deaktiviert`,
    });
  } catch (error) {
    next(
      createError(500, "Fehler beim Deaktivieren alter Daten", error.message)
    );
  }
};
