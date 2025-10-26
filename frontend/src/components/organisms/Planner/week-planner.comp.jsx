import { useState } from "react";
import { DayCard } from "../../molecules/Planner/day-card.comp.jsx";

/**
 * WeekPlanner - Wochenplaner mit 7 Tagen
 * @param {array} weekDays - Array mit 7 Tag-Objekten
 * @param {number} calorieTarget - Ziel-Kalorien pro Tag
 * @param {function} onAddMeal - Handler zum Hinzufügen
 * @param {function} onRemoveMeal - Handler zum Entfernen
 */
export const WeekPlanner = ({ 
  weekDays, 
  calorieTarget,
  onAddMeal,
  onRemoveMeal 
}) => {
  const today = new Date().toDateString();

  return (
    <div className="space-y-6">
      {/* Week Summary */}
      <div className="stats shadow bg-base-200 w-full">
        <div className="stat">
          <div className="stat-title">Wochenziel</div>
          <div className="stat-value text-2xl text-primary">
            {(calorieTarget * 7).toLocaleString()} kcal
          </div>
          <div className="stat-desc">Durchschnitt: {calorieTarget} kcal/Tag</div>
        </div>

        <div className="stat">
          <div className="stat-title">Geplante Mahlzeiten</div>
          <div className="stat-value text-2xl">
            {weekDays.reduce((sum, day) => sum + day.meals.length, 0)}
          </div>
          <div className="stat-desc">Diese Woche</div>
        </div>

        <div className="stat">
          <div className="stat-title">Kalorien geplant</div>
          <div className="stat-value text-2xl text-success">
            {Math.round(
              weekDays.reduce(
                (sum, day) => 
                  sum + day.meals.reduce((s, m) => s + (m.calories || 0), 0),
                0
              )
            ).toLocaleString()}
          </div>
          <div className="stat-desc">Gesamt diese Woche</div>
        </div>
      </div>

      {/* Week Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {weekDays.map((day) => (
          <DayCard
            key={day.date}
            day={day}
            calorieTarget={calorieTarget}
            onAddMeal={onAddMeal}
            onRemoveMeal={onRemoveMeal}
            isToday={new Date(day.date).toDateString() === today}
          />
        ))}
      </div>
    </div>
  );
};
