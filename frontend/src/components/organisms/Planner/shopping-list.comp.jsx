import { useState } from "react";
import { ShoppingListItem } from "../../molecules/Planner/shopping-list-item.comp.jsx";

/**
 * ShoppingList - Einkaufsliste Organism
 * @param {array} items - Shopping List Items
 * @param {function} onToggleItem - Toggle Handler
 * @param {function} onRemoveItem - Remove Handler
 * @param {function} onAddItem - Add Handler
 */
export const ShoppingList = ({ items = [], onToggleItem, onRemoveItem, onAddItem }) => {
  const [newItemName, setNewItemName] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  // Gruppiere nach Kategorie
  const categories = {
    "Obst & Gemüse": items.filter(i => i.category === "produce"),
    "Proteine": items.filter(i => i.category === "protein"),
    "Milchprodukte": items.filter(i => i.category === "dairy"),
    "Getreide & Brot": items.filter(i => i.category === "grains"),
    "Sonstiges": items.filter(i => !i.category || i.category === "other"),
  };

  const totalItems = items.length;
  const checkedItems = items.filter(i => i.checked).length;
  const progress = totalItems > 0 ? (checkedItems / totalItems) * 100 : 0;

  const handleAddItem = () => {
    if (newItemName.trim()) {
      onAddItem({
        id: Date.now().toString(),
        name: newItemName.trim(),
        checked: false,
        category: "other",
      });
      setNewItemName("");
      setShowAddForm(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header mit Progress */}
      <div className="card bg-base-200 shadow-lg">
        <div className="card-body">
          <h2 className="card-title">Einkaufsliste</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{checkedItems} von {totalItems} erledigt</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <progress 
              className="progress progress-primary w-full" 
              value={progress} 
              max="100"
            />
          </div>

          {/* Add Item Form */}
          {showAddForm ? (
            <div className="flex gap-2 mt-4">
              <input
                type="text"
                placeholder="Neues Item..."
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddItem()}
                className="input input-bordered flex-1"
                autoFocus
              />
              <button onClick={handleAddItem} className="btn btn-primary">
                Hinzufügen
              </button>
              <button 
                onClick={() => {
                  setShowAddForm(false);
                  setNewItemName("");
                }} 
                className="btn btn-ghost"
              >
                Abbrechen
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowAddForm(true)} 
              className="btn btn-outline btn-primary w-full mt-4"
            >
              + Item hinzufügen
            </button>
          )}
        </div>
      </div>

      {/* Liste nach Kategorien */}
      {totalItems === 0 ? (
        <div className="text-center p-12 bg-base-200 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-base-content/30 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <h3 className="text-lg font-semibold mb-2">Keine Einkaufsliste</h3>
          <p className="text-base-content/60 mb-4">
            Füge Mahlzeiten zu deinem Wochenplan hinzu, um automatisch eine Einkaufsliste zu generieren.
          </p>
          <button onClick={() => setShowAddForm(true)} className="btn btn-primary">
            Manuell Items hinzufügen
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(categories).map(([categoryName, categoryItems]) => {
            if (categoryItems.length === 0) return null;
            
            return (
              <div key={categoryName} className="card bg-base-200">
                <div className="card-body p-4">
                  <h3 className="font-semibold text-lg mb-3">{categoryName}</h3>
                  <div className="space-y-2">
                    {categoryItems.map((item) => (
                      <ShoppingListItem
                        key={item.id}
                        item={item}
                        onToggle={onToggleItem}
                        onRemove={onRemoveItem}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Action Buttons */}
      {totalItems > 0 && (
        <div className="flex gap-4">
          <button 
            onClick={() => {
              items.forEach(item => {
                if (!item.checked) onToggleItem(item.id);
              });
            }}
            className="btn btn-outline flex-1"
          >
            Alle abhaken
          </button>
          <button 
            onClick={() => {
              items.filter(i => i.checked).forEach(item => onRemoveItem(item.id));
            }}
            className="btn btn-ghost flex-1"
          >
            Erledigte entfernen
          </button>
        </div>
      )}
    </div>
  );
};
