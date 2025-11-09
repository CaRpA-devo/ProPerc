import { MealBadge } from "../../atoms/Planner/meal-badge.comp.jsx";

/**
 * MealCard - Zeigt eine geplante Mahlzeit
 * @param {object} meal - Mahlzeit-Objekt
 * @param {function} onRemove - Handler zum Entfernen
 * @param {function} onClick - Handler zum Bearbeiten
 * @param {boolean} draggable - Drag & Drop aktiviert
 */
export const MealCard = ({ meal, onRemove, onClick, draggable = false }) => {
  return (
    <div
      onClick={onClick}
      draggable={draggable}
      className="card bg-base-100 shadow-sm border border-base-300 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="card-body p-3">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate">{meal.name || meal.description}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-bold text-primary">
                {Math.round(meal.calories || 0)} kcal
              </span>
              {meal.servings && (
                <span className="text-xs text-base-content/60">
                  {meal.servings}x
                </span>
              )}
            </div>
          </div>
          {onRemove && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="btn btn-ghost btn-xs btn-circle"
              aria-label="Entfernen"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
        
        {/* Makros */}
        {(meal.protein || meal.carbs || meal.fat) && (
          <div className="flex gap-2 mt-2 text-xs">
            {meal.protein && (
              <span className="badge badge-sm badge-ghost">
                P: {Math.round(meal.protein)}g
              </span>
            )}
            {meal.carbs && (
              <span className="badge badge-sm badge-ghost">
                K: {Math.round(meal.carbs)}g
              </span>
            )}
            {meal.fat && (
              <span className="badge badge-sm badge-ghost">
                F: {Math.round(meal.fat)}g
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
