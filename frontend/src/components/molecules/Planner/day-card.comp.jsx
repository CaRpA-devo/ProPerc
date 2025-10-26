import { CalorieIndicator } from "../../atoms/Planner/calorie-indicator.comp.jsx";
import { MealBadge } from "../../atoms/Planner/meal-badge.comp.jsx";
import { EmptyMealSlot } from "../../atoms/Planner/empty-meal-slot.comp.jsx";
import { MealCard } from "./meal-card.comp.jsx";

/**
 * DayCard - Zeigt einen Tag im Wochenplan
 * @param {object} day - Tag-Objekt mit date, meals
 * @param {number} calorieTarget - Ziel-Kalorien
 * @param {function} onAddMeal - Handler zum Hinzufügen
 * @param {function} onRemoveMeal - Handler zum Entfernen
 * @param {boolean} isToday - Ist heute
 */
export const DayCard = ({ 
  day, 
  calorieTarget = 2000,
  onAddMeal,
  onRemoveMeal,
  isToday = false 
}) => {
  const date = new Date(day.date);
  const dayName = date.toLocaleDateString("de-DE", { weekday: "short" });
  const dayNumber = date.getDate();
  const monthName = date.toLocaleDateString("de-DE", { month: "short" });

  // Berechne Gesamt-Kalorien
  const totalCalories = day.meals.reduce((sum, meal) => sum + (meal.calories || 0), 0);

  // Gruppiere Mahlzeiten nach Typ
  const mealsByType = {
    breakfast: day.meals.filter(m => m.mealType === "breakfast"),
    lunch: day.meals.filter(m => m.mealType === "lunch"),
    dinner: day.meals.filter(m => m.mealType === "dinner"),
    snack: day.meals.filter(m => m.mealType === "snack"),
  };

  return (
    <div className={`card bg-base-200 shadow-lg ${isToday ? "ring-2 ring-primary" : ""}`}>
      <div className="card-body p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <div>
            <h3 className="text-lg font-bold capitalize">
              {dayName}
              {isToday && (
                <span className="ml-2 badge badge-primary badge-sm">Heute</span>
              )}
            </h3>
            <p className="text-sm text-base-content/60">
              {dayNumber}. {monthName}
            </p>
          </div>
        </div>

        {/* Kalorien-Indikator */}
        <div className="mb-4">
          <CalorieIndicator 
            current={totalCalories} 
            target={calorieTarget}
            size="sm"
          />
        </div>

        {/* Mahlzeiten */}
        <div className="space-y-3">
          {/* Frühstück */}
          <div>
            <MealBadge type="breakfast" />
            <div className="mt-2 space-y-2">
              {mealsByType.breakfast.length > 0 ? (
                mealsByType.breakfast.map((meal, idx) => (
                  <MealCard
                    key={idx}
                    meal={meal}
                    onRemove={() => onRemoveMeal(day.date, meal.id, "breakfast")}
                  />
                ))
              ) : (
                <EmptyMealSlot
                  mealType="breakfast"
                  onClick={() => onAddMeal(day.date, "breakfast")}
                />
              )}
            </div>
          </div>

          {/* Mittagessen */}
          <div>
            <MealBadge type="lunch" />
            <div className="mt-2 space-y-2">
              {mealsByType.lunch.length > 0 ? (
                mealsByType.lunch.map((meal, idx) => (
                  <MealCard
                    key={idx}
                    meal={meal}
                    onRemove={() => onRemoveMeal(day.date, meal.id, "lunch")}
                  />
                ))
              ) : (
                <EmptyMealSlot
                  mealType="lunch"
                  onClick={() => onAddMeal(day.date, "lunch")}
                />
              )}
            </div>
          </div>

          {/* Abendessen */}
          <div>
            <MealBadge type="dinner" />
            <div className="mt-2 space-y-2">
              {mealsByType.dinner.length > 0 ? (
                mealsByType.dinner.map((meal, idx) => (
                  <MealCard
                    key={idx}
                    meal={meal}
                    onRemove={() => onRemoveMeal(day.date, meal.id, "dinner")}
                  />
                ))
              ) : (
                <EmptyMealSlot
                  mealType="dinner"
                  onClick={() => onAddMeal(day.date, "dinner")}
                />
              )}
            </div>
          </div>

          {/* Snacks */}
          {mealsByType.snack.length > 0 && (
            <div>
              <MealBadge type="snack" />
              <div className="mt-2 space-y-2">
                {mealsByType.snack.map((meal, idx) => (
                  <MealCard
                    key={idx}
                    meal={meal}
                    onRemove={() => onRemoveMeal(day.date, meal.id, "snack")}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Snack hinzufügen Button */}
          <button
            onClick={() => onAddMeal(day.date, "snack")}
            className="btn btn-ghost btn-sm w-full"
          >
            + Snack hinzufügen
          </button>
        </div>
      </div>
    </div>
  );
};
