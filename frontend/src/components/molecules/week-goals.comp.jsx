import { useState, useEffect, useMemo } from "react";
import { useMealPlanner } from "../../hooks/useMealPlanner";
import { useCalculator } from "../../hooks/useCalculator";

export default function WeekGoals() {
  const { getMealPlan } = useMealPlanner();
  const { calculations } = useCalculator();
  const [weekDays, setWeekDays] = useState([]);
  const [loading, setLoading] = useState(true);

  // Berechne aktuelle Woche
  const currentWeek = useMemo(() => {
    const today = new Date();
    const week = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      week.push(date.toISOString().split("T")[0]);
    }
    return { start: week[0], end: week[6] };
  }, []);

  // Lade geplante Mahlzeiten für die aktuelle Woche
  useEffect(() => {
    const loadWeekData = async () => {
      setLoading(true);
      try {
        const plannedMeals = await getMealPlan(
          currentWeek.start,
          currentWeek.end
        );

        // Erstelle Wochenstruktur mit Mahlzeiten
        const week = [];
        for (let i = 0; i < 7; i++) {
          const date = new Date();
          date.setDate(date.getDate() + i);
          const dateStr = date.toISOString().split("T")[0];

          const dayMeals = plannedMeals.filter(
            (meal) => meal.date.split("T")[0] === dateStr
          );

          const calories = dayMeals.reduce(
            (sum, meal) =>
              sum + (meal.food.calories || 0) * (meal.food.portion || 1),
            0
          );

          const protein = dayMeals.reduce(
            (sum, meal) =>
              sum + (meal.food.protein || 0) * (meal.food.portion || 1),
            0
          );

          const carbs = dayMeals.reduce(
            (sum, meal) =>
              sum + (meal.food.carbs || 0) * (meal.food.portion || 1),
            0
          );

          const fat = dayMeals.reduce(
            (sum, meal) =>
              sum + (meal.food.fat || 0) * (meal.food.portion || 1),
            0
          );

          week.push({
            date: dateStr,
            calories,
            protein,
            carbs,
            fat,
            mealCount: dayMeals.length,
          });
        }

        setWeekDays(week);
      } catch (err) {
        console.error("Fehler beim Laden der Wochendaten:", err);
        setWeekDays([]);
      } finally {
        setLoading(false);
      }
    };

    loadWeekData();
  }, [getMealPlan, currentWeek]);

  const calorieTarget = calculations?.calorieTarget || 2000;
  const proteinTarget = calculations?.proteinTarget || 150;
  const carbsTarget = calculations?.carbsTarget || 200;
  const fatTarget = calculations?.fatTarget || 60;

  // Berechne Wochensummen
  const weekTotals = useMemo(() => {
    return weekDays.reduce(
      (acc, day) => ({
        calories: acc.calories + day.calories,
        protein: acc.protein + day.protein,
        carbs: acc.carbs + day.carbs,
        fat: acc.fat + day.fat,
        mealCount: acc.mealCount + day.mealCount,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0, mealCount: 0 }
    );
  }, [weekDays]);

  const weekTargets = {
    calories: calorieTarget * 7,
    protein: proteinTarget * 7,
    carbs: carbsTarget * 7,
    fat: fatTarget * 7,
  };

  // Berechne Fortschritt (0-100)
  const getProgress = (current, target) => {
    if (!target) return 0;
    return Math.min((current / target) * 100, 100);
  };

  const caloriesProgress = getProgress(
    weekTotals.calories,
    weekTargets.calories
  );
  const proteinProgress = getProgress(weekTotals.protein, weekTargets.protein);
  const carbsProgress = getProgress(weekTotals.carbs, weekTargets.carbs);
  const fatProgress = getProgress(weekTotals.fat, weekTargets.fat);

  if (loading) {
    return (
      <div className="p-2 rounded-lg h-full flex flex-col bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-green-800/30 justify-center items-center">
        <div className="loading loading-spinner loading-sm"></div>
      </div>
    );
  }

  return (
    <div className="p-2 rounded-lg h-full flex flex-col bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-green-800/30">
      <h3 className="text-sm text-white font-semibold mb-3 text-center">
        📅 Wochenziele
      </h3>

      <div className="flex-1 space-y-3">
        {/* Kalorien */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-white/90">🔥 Kalorien</span>
            <span className="text-white font-medium">
              {Math.round(weekTotals.calories).toLocaleString()} /{" "}
              {Math.round(weekTargets.calories).toLocaleString()} kcal
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${caloriesProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Protein */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-white/90">💪 Protein</span>
            <span className="text-white font-medium">
              {Math.round(weekTotals.protein)} /{" "}
              {Math.round(weekTargets.protein)} g
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${proteinProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Kohlenhydrate */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-white/90">🌾 Kohlenhydrate</span>
            <span className="text-white font-medium">
              {Math.round(weekTotals.carbs)} / {Math.round(weekTargets.carbs)} g
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${carbsProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Fett */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-white/90">🥑 Fett</span>
            <span className="text-white font-medium">
              {Math.round(weekTotals.fat)} / {Math.round(weekTargets.fat)} g
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${fatProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Zusatz-Info */}
      <div className="border-t border-white/30 pt-2 mt-2">
        <div className="flex justify-between text-xs">
          <span className="text-white/70">Geplante Mahlzeiten:</span>
          <span className="text-white font-medium">{weekTotals.mealCount}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-white/70">Prognose:</span>
          <span
            className={`font-medium ${
              caloriesProgress >= 80 && caloriesProgress <= 120
                ? "text-green-400"
                : caloriesProgress < 80
                ? "text-yellow-400"
                : "text-red-400"
            }`}
          >
            {caloriesProgress.toFixed(0)}% des Ziels
          </span>
        </div>
      </div>
    </div>
  );
}
