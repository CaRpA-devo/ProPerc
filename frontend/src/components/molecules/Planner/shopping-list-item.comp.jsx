/**
 * ShoppingListItem - Einzelner Einkaufslisten-Eintrag
 * @param {object} item - Item-Objekt
 * @param {function} onToggle - Toggle Handler
 * @param {function} onRemove - Remove Handler
 */
export const ShoppingListItem = ({ item, onToggle, onRemove }) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-base-100 rounded-lg border border-base-300 hover:shadow-sm transition-shadow">
      <input
        type="checkbox"
        checked={item.checked || false}
        onChange={() => onToggle(item.id)}
        className="checkbox checkbox-primary"
      />
      <div className="flex-1 min-w-0">
        <p className={`font-medium ${item.checked ? "line-through text-base-content/50" : ""}`}>
          {item.name}
        </p>
        {item.amount && (
          <p className="text-sm text-base-content/60">
            {item.amount} {item.unit || ""}
          </p>
        )}
      </div>
      {item.category && (
        <span className="badge badge-sm badge-ghost">{item.category}</span>
      )}
      {onRemove && (
        <button
          onClick={() => onRemove(item.id)}
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
  );
};
