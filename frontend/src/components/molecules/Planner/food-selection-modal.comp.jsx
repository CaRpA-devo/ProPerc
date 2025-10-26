import { useState } from "react";
import { Button } from "../../atoms/button.comp.jsx";

/**
 * FoodSelectionModal - Modal zur Auswahl von Mahlzeiten
 * @param {boolean} isOpen - Modal offen
 * @param {function} onClose - Close Handler
 * @param {function} onSelect - Select Handler
 * @param {array} favorites - Favoriten-Liste
 * @param {array} recipes - Rezepte-Liste
 * @param {string} selectedDate - Ausgewähltes Datum
 * @param {string} selectedMealType - Ausgewählter Mahlzeittyp
 */
export const FoodSelectionModal = ({
  isOpen,
  onClose,
  onSelect,
  favorites = [],
  recipes = [],
  selectedDate,
  selectedMealType,
}) => {
  const [activeTab, setActiveTab] = useState("favorites");
  const [searchTerm, setSearchTerm] = useState("");
  const [customMeal, setCustomMeal] = useState({
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
  });

  if (!isOpen) return null;

  const mealTypeLabels = {
    breakfast: "Frühstück",
    lunch: "Mittagessen",
    dinner: "Abendessen",
    snack: "Snack",
  };

  const filteredFavorites = favorites.filter((food) =>
    food.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectFood = (food) => {
    onSelect({
      id: Date.now().toString(),
      name: food.description || food.name,
      calories: food.calories || 0,
      protein: food.protein || 0,
      carbs: food.carbs || 0,
      fat: food.fat || 0,
      mealType: selectedMealType,
      servings: 1,
    });
    onClose();
  };

  const handleAddCustomMeal = () => {
    if (customMeal.name && customMeal.calories) {
      onSelect({
        id: Date.now().toString(),
        name: customMeal.name,
        calories: parseFloat(customMeal.calories) || 0,
        protein: parseFloat(customMeal.protein) || 0,
        carbs: parseFloat(customMeal.carbs) || 0,
        fat: parseFloat(customMeal.fat) || 0,
        mealType: selectedMealType,
        servings: 1,
      });
      setCustomMeal({ name: "", calories: "", protein: "", carbs: "", fat: "" });
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="card bg-base-100 shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
          <div className="card-body">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="card-title text-2xl">Mahlzeit hinzufügen</h2>
                <p className="text-sm text-base-content/60 mt-1">
                  {mealTypeLabels[selectedMealType]} am{" "}
                  {new Date(selectedDate).toLocaleDateString("de-DE")}
                </p>
              </div>
              <button
                onClick={onClose}
                className="btn btn-ghost btn-sm btn-circle"
              >
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="tabs tabs-boxed mb-4">
              <button
                className={`tab ${activeTab === "favorites" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("favorites")}
              >
                💚 Favoriten ({favorites.length})
              </button>
              <button
                className={`tab ${activeTab === "recipes" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("recipes")}
              >
                👨‍🍳 Rezepte ({recipes.length})
              </button>
              <button
                className={`tab ${activeTab === "custom" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("custom")}
              >
                ✏️ Eigene Eingabe
              </button>
            </div>

            {/* Search Bar */}
            {activeTab !== "custom" && (
              <input
                type="text"
                placeholder="Suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full mb-4"
              />
            )}

            {/* Content */}
            <div className="overflow-y-auto max-h-96">
              {/* Favoriten Tab */}
              {activeTab === "favorites" && (
                <div className="space-y-2">
                  {filteredFavorites.length === 0 ? (
                    <div className="text-center py-8 text-base-content/60">
                      <p>Keine Favoriten gefunden.</p>
                      <p className="text-sm mt-2">
                        Füge Lebensmittel zu deinen Favoriten hinzu.
                      </p>
                    </div>
                  ) : (
                    filteredFavorites.map((food) => (
                      <button
                        key={food.fdcId}
                        onClick={() => handleSelectFood(food)}
                        className="w-full p-4 text-left bg-base-200 hover:bg-base-300 rounded-lg transition-colors"
                      >
                        <div className="font-semibold">{food.description}</div>
                        <div className="text-sm text-base-content/60 mt-1">
                          {Math.round(food.calories || 0)} kcal
                          {food.protein && ` • P: ${Math.round(food.protein)}g`}
                          {food.carbs && ` • K: ${Math.round(food.carbs)}g`}
                          {food.fat && ` • F: ${Math.round(food.fat)}g`}
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}

              {/* Rezepte Tab */}
              {activeTab === "recipes" && (
                <div className="space-y-2">
                  {filteredRecipes.length === 0 ? (
                    <div className="text-center py-8 text-base-content/60">
                      <p>Keine Rezepte gefunden.</p>
                      <p className="text-sm mt-2">
                        Speichere Rezepte im Food-Tracking.
                      </p>
                    </div>
                  ) : (
                    filteredRecipes.map((recipe) => (
                      <button
                        key={recipe.id}
                        onClick={() => handleSelectFood(recipe)}
                        className="w-full p-4 text-left bg-base-200 hover:bg-base-300 rounded-lg transition-colors"
                      >
                        <div className="font-semibold">{recipe.name}</div>
                        <div className="text-sm text-base-content/60 mt-1">
                          {Math.round(recipe.calories || 0)} kcal
                          {recipe.items && ` • ${recipe.items.length} Zutaten`}
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}

              {/* Eigene Eingabe Tab */}
              {activeTab === "custom" && (
                <div className="space-y-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Name der Mahlzeit *</span>
                    </label>
                    <input
                      type="text"
                      placeholder="z.B. Haferflocken mit Beeren"
                      value={customMeal.name}
                      onChange={(e) =>
                        setCustomMeal({ ...customMeal, name: e.target.value })
                      }
                      className="input input-bordered"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Kalorien (kcal) *</span>
                      </label>
                      <input
                        type="number"
                        placeholder="0"
                        value={customMeal.calories}
                        onChange={(e) =>
                          setCustomMeal({ ...customMeal, calories: e.target.value })
                        }
                        className="input input-bordered"
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Protein (g)</span>
                      </label>
                      <input
                        type="number"
                        placeholder="0"
                        value={customMeal.protein}
                        onChange={(e) =>
                          setCustomMeal({ ...customMeal, protein: e.target.value })
                        }
                        className="input input-bordered"
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Kohlenhydrate (g)</span>
                      </label>
                      <input
                        type="number"
                        placeholder="0"
                        value={customMeal.carbs}
                        onChange={(e) =>
                          setCustomMeal({ ...customMeal, carbs: e.target.value })
                        }
                        className="input input-bordered"
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Fett (g)</span>
                      </label>
                      <input
                        type="number"
                        placeholder="0"
                        value={customMeal.fat}
                        onChange={(e) =>
                          setCustomMeal({ ...customMeal, fat: e.target.value })
                        }
                        className="input input-bordered"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleAddCustomMeal}
                    disabled={!customMeal.name || !customMeal.calories}
                    className="w-full"
                  >
                    Mahlzeit hinzufügen
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
