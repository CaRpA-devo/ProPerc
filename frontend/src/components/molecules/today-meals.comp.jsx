import { useState, useEffect, useMemo } from "react";
import { useMealPlanner } from "../../hooks/useMealPlanner";
import { useCalculator } from "../../hooks/useCalculator";
import { useBackendFood } from "../../context/BackendFoodContext";

export default function TodayMeals() {
  const { getMealPlan } = useMealPlanner();
  const { calculations } = useCalculator();
  const { addFood, removeFood } = useBackendFood();
  const [plannedMeals, setPlannedMeals] = useState([]);
  const [consumedMeals, setConsumedMeals] = useState([]);
  const [consumedInTracking, setConsumedInTracking] = useState([]);
  const [loading, setLoading] = useState(true);

  const today = new Date().toISOString().split("T")[0];
  const calorieTarget = calculations?.calorieTarget || 2000;

  // Lade geplante Mahlzeiten für heute
  useEffect(() => {
    const loadTodayMeals = async () => {
      setLoading(true);
      try {
        const meals = await getMealPlan(today, today);
        setPlannedMeals(meals);

        // Lade verbrauchte Mahlzeiten aus localStorage (tagespezifisch)
        const consumed = JSON.parse(
          localStorage.getItem(`consumedMeals_${today}`) || "[]"
        );
        setConsumedMeals(consumed);

        // Lade Mahlzeiten, die bereits ins Tracking aufgenommen wurden
        const tracking = JSON.parse(
          localStorage.getItem(`trackingMeals_${today}`) || "[]"
        );
        setConsumedInTracking(tracking);
      } catch (err) {
        console.error("Fehler beim Laden der heutigen Mahlzeiten:", err);
        setPlannedMeals([]);
      } finally {
        setLoading(false);
      }
    };

    loadTodayMeals();
  }, [getMealPlan, today]);

  // Toggle Konsum einer Mahlzeit
  const toggleMealConsumption = async (mealId) => {
    const meal = plannedMeals.find((m) => (m._id || m.id) === mealId);
    if (!meal) return;

    const isConsumed = consumedMeals.includes(mealId);
    const isInTracking = consumedInTracking.includes(mealId);

    setConsumedMeals((prev) => {
      const newConsumed = isConsumed
        ? prev.filter((id) => id !== mealId)
        : [...prev, mealId];
      localStorage.setItem(
        `consumedMeals_${today}`,
        JSON.stringify(newConsumed)
      );
      return newConsumed;
    });

    // Wenn abgehakt und noch nicht im Tracking: Füge hinzu
    if (!isConsumed && !isInTracking) {
      try {
        const foodData = {
          name: meal.food.name,
          calories: (meal.food.calories || 0) * (meal.food.portion || 1),
          protein: (meal.food.protein || 0) * (meal.food.portion || 1),
          carbs: (meal.food.carbs || 0) * (meal.food.portion || 1),
          fat: (meal.food.fat || 0) * (meal.food.portion || 1),
          quantity: meal.food.portion || 1,
        };

        await addFood(foodData);

        // Markiere als ins Tracking aufgenommen
        setConsumedInTracking((prev) => {
          const newTracking = [...prev, mealId];
          localStorage.setItem(
            `trackingMeals_${today}`,
            JSON.stringify(newTracking)
          );
          return newTracking;
        });
      } catch (err) {
        console.error("Fehler beim Hinzufügen zum Tracking:", err);
      }
    }

    // Wenn abgehakt wurde: Entferne aus Tracking
    if (isConsumed && isInTracking) {
      try {
        setConsumedInTracking((prev) => {
          const newTracking = prev.filter((id) => id !== mealId);
          localStorage.setItem(
            `trackingMeals_${today}`,
            JSON.stringify(newTracking)
          );
          return newTracking;
        });

        // TODO: Entferne auch aus dem Backend-Tracking
        // Dies erfordert eine bessere ID-Tracking-Strategie
      } catch (err) {
        console.error("Fehler beim Entfernen aus Tracking:", err);
      }
    }
  };

  // Gruppiere Mahlzeiten nach Typ
  const mealsByType = useMemo(() => {
    const groups = {
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: [],
    };

    plannedMeals.forEach((meal) => {
      const mealType = meal.mealType;
      if (groups[mealType]) {
        // Unterstütze sowohl _id als auch id
        const mealId = meal._id || meal.id;
        const isConsumed = consumedMeals.includes(mealId);
        groups[mealType].push({
          ...meal,
          isConsumed,
          mealId, // Füge die verwendete ID hinzu
        });
      }
    });

    return groups;
  }, [plannedMeals, consumedMeals]);

  // Berechne Fortschritt
  const consumedCalories = plannedMeals
    .filter((meal) => {
      const mealId = meal._id || meal.id;
      return consumedMeals.includes(mealId);
    })
    .reduce(
      (sum, meal) => sum + (meal.food.calories || 0) * (meal.food.portion || 1),
      0
    );

  const totalPlannedCalories = plannedMeals.reduce(
    (sum, meal) => sum + (meal.food.calories || 0) * (meal.food.portion || 1),
    0
  );

  const progress =
    totalPlannedCalories > 0
      ? (consumedCalories / totalPlannedCalories) * 100
      : 0;

  if (loading) {
    return (
      <div className="p-2 rounded-lg h-full flex flex-col bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-green-800/30 justify-center items-center">
        <div className="loading loading-spinner loading-sm"></div>
      </div>
    );
  }

  if (plannedMeals.length === 0) {
    return (
      <div className="p-2 rounded-lg h-full flex flex-col bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-green-800/30 justify-center items-center text-center">
        <div className="text-4xl mb-2">🍽️</div>
        <p className="text-sm text-white/80">
          Keine Mahlzeiten für heute geplant
        </p>
        <p className="text-xs text-white/60 mt-1">
          Gehe zum Planer, um Mahlzeiten hinzuzufügen
        </p>
      </div>
    );
  }

  const mealIcons = {
    breakfast: "🌅",
    lunch: "☀️",
    dinner: "🌙",
    snack: "🍎",
  };

  const mealLabels = {
    breakfast: "Frühstück",
    lunch: "Mittagessen",
    dinner: "Abendessen",
    snack: "Snack",
  };

  // Formatiere heute's Datum
  const todayDate = new Date(today);
  const dayName = todayDate.toLocaleDateString("de-DE", { weekday: "long" });
  const dayNumber = todayDate.getDate();
  const monthName = todayDate.toLocaleDateString("de-DE", { month: "short" });

  return (
    <div className="p-2 rounded-lg h-full flex flex-col bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-green-800/30">
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm text-white font-semibold">🍽️ Heute</h3>
          <div className="text-xs text-white/70">
            {consumedMeals.length} / {plannedMeals.length} gegessen
          </div>
        </div>
        <div className="text-xs text-white/80 capitalize">
          {dayName.charAt(0).toUpperCase() + dayName.slice(1)}, {dayNumber}.{" "}
          {monthName}
        </div>
      </div>

      {/* Fortschrittsbalken */}
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-white/80">Fortschritt</span>
          <span className="text-white font-medium">
            {Math.round(consumedCalories)} / {Math.round(totalPlannedCalories)}{" "}
            kcal
          </span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Mahlzeiten */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {Object.entries(mealsByType).map(([type, meals]) => {
          if (meals.length === 0) return null;

          return (
            <div key={type}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{mealIcons[type]}</span>
                <span className="text-xs font-semibold text-white">
                  {mealLabels[type]}
                </span>
                <span className="text-xs text-white/60">({meals.length})</span>
              </div>

              <div className="space-y-1.5">
                {meals.map((meal) => (
                  <div
                    key={meal.mealId}
                    className={`bg-white/10 rounded-lg p-2 border transition-all duration-200 cursor-pointer hover:bg-white/15 ${
                      meal.isConsumed
                        ? "border-green-400/50 bg-green-500/10"
                        : "border-white/20"
                    }`}
                    onClick={() => toggleMealConsumption(meal.mealId)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={meal.isConsumed}
                            onChange={() => {}}
                            className="checkbox checkbox-xs checkbox-primary"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <span
                            className={`text-xs truncate ${
                              meal.isConsumed
                                ? "text-white/60 line-through"
                                : "text-white"
                            }`}
                          >
                            {meal.food.name}
                          </span>
                        </div>
                        <div className="flex gap-3 mt-1 text-xs text-white/70">
                          <span>
                            {Math.round(
                              meal.food.calories * (meal.food.portion || 1)
                            )}{" "}
                            kcal
                          </span>
                          <span>
                            P:{" "}
                            {Math.round(
                              meal.food.protein * (meal.food.portion || 1)
                            )}
                            g
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Zusätzliche Infos */}
      <div className="border-t border-white/30 pt-2 mt-2">
        <div className="flex justify-between text-xs">
          <span className="text-white/70">Ziel heute:</span>
          <span className="text-white font-medium">{calorieTarget} kcal</span>
        </div>
      </div>
    </div>
  );
}
