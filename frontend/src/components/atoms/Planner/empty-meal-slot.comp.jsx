/**
 * EmptyMealSlot - Leerer Slot für Mahlzeiten
 * @param {function} onClick - Click Handler
 * @param {string} mealType - Typ der Mahlzeit
 */
export const EmptyMealSlot = ({ onClick, mealType }) => {
  return (
    <button
      onClick={onClick}
      className="w-full p-4 border-2 border-dashed border-base-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-base-content/50 hover:text-primary"
    >
      <div className="flex flex-col items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        <span className="text-sm font-medium">Mahlzeit hinzufügen</span>
      </div>
    </button>
  );
};
