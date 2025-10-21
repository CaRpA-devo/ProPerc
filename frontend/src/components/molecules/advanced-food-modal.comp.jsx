import React, { useState } from "react";
import { useBackendFood } from "../../context/BackendFoodContext";
import FoodSearch from "./food-search.comp";

const AdvancedFoodModal = ({ isOpen, onClose }) => {
  const { addFood, saveRecipe, addToFavorites } = useBackendFood();
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [fat, setFat] = useState("");
  const [carbs, setCarbs] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [saveAsRecipe, setSaveAsRecipe] = useState(false);
  const [addToFavs, setAddToFavs] = useState(false);
  const [useApiSearch, setUseApiSearch] = useState(true);

  // Erweiterte Nahrungsmittel-Datenbank
  const commonFoods = [
    {
      name: "Apfel",
      calories: 52,
      protein: 0.3,
      fat: 0.2,
      carbs: 14,
      category: "Obst",
    },
    {
      name: "Banane",
      calories: 89,
      protein: 1.1,
      fat: 0.3,
      carbs: 23,
      category: "Obst",
    },
    {
      name: "Vollkornbrot",
      calories: 247,
      protein: 13,
      fat: 3.4,
      carbs: 41,
      category: "Brot",
    },
    {
      name: "Hähnchenbrust",
      calories: 165,
      protein: 31,
      fat: 3.6,
      carbs: 0,
      category: "Fleisch",
    },
    {
      name: "Lachs",
      calories: 208,
      protein: 25,
      fat: 12,
      carbs: 0,
      category: "Fisch",
    },
    {
      name: "Reis (gekocht)",
      calories: 130,
      protein: 2.7,
      fat: 0.3,
      carbs: 28,
      category: "Getreide",
    },
    {
      name: "Eier",
      calories: 155,
      protein: 13,
      fat: 11,
      carbs: 1.1,
      category: "Eier",
    },
    {
      name: "Joghurt",
      calories: 59,
      protein: 10,
      fat: 0.4,
      carbs: 3.6,
      category: "Milchprodukte",
    },
    {
      name: "Nüsse (30g)",
      calories: 180,
      protein: 6,
      fat: 16,
      carbs: 4,
      category: "Nüsse",
    },
    {
      name: "Avocado",
      calories: 160,
      protein: 2,
      fat: 15,
      carbs: 9,
      category: "Gemüse",
    },
    {
      name: "Quinoa",
      calories: 120,
      protein: 4.4,
      fat: 1.9,
      carbs: 22,
      category: "Getreide",
    },
    {
      name: "Süßkartoffel",
      calories: 86,
      protein: 1.6,
      fat: 0.1,
      carbs: 20,
      category: "Gemüse",
    },
  ];

  const categories = [...new Set(commonFoods.map((food) => food.category))];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!foodName || !calories) return;

    const foodData = {
      name: foodName,
      calories: parseFloat(calories) * parseFloat(quantity),
      protein: parseFloat(protein || 0) * parseFloat(quantity),
      fat: parseFloat(fat || 0) * parseFloat(quantity),
      carbs: parseFloat(carbs || 0) * parseFloat(quantity),
      quantity: parseFloat(quantity),
    };

    // Essen hinzufügen
    addFood(foodData);

    // Als Rezept speichern
    if (saveAsRecipe) {
      saveRecipe(foodData);
    }

    // Zu Favoriten hinzufügen
    if (addToFavs) {
      addToFavorites(foodData);
    }

    handleClose();
  };

  const handleClose = () => {
    setFoodName("");
    setCalories("");
    setProtein("");
    setFat("");
    setCarbs("");
    setQuantity("1");
    setSaveAsRecipe(false);
    setAddToFavs(false);
    onClose();
  };

  const quickAddFood = (food) => {
    setFoodName(food.name);
    setCalories(food.calories.toString());
    setProtein(food.protein.toString());
    setFat(food.fat.toString());
    setCarbs(food.carbs.toString());
  };

  const handleApiFoodSelect = (food) => {
    setFoodName(food.name);
    setCalories(food.calories.toString());
    setProtein(food.protein.toString());
    setFat(food.fat.toString());
    setCarbs(food.carbs.toString());
    setQuantity("1");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-base-100 border border-green-800/30 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">🍽️ Essen hinzufügen</h3>
          <button
            onClick={handleClose}
            className="text-white/60 hover:text-white text-2xl bg-red-500/20 backdrop-blur-sm border border-red-500/30 hover:bg-red-500/30 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
          >
            ×
          </button>
        </div>

        {/* Suchmodus Toggle */}
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                checked={useApiSearch}
                onChange={() => setUseApiSearch(true)}
                className="w-4 h-4 text-green-500 border-green-800/30 focus:ring-green-500"
              />
              <span className="text-sm font-medium text-white">
                🔍 API-Suche (empfohlen)
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                checked={!useApiSearch}
                onChange={() => setUseApiSearch(false)}
                className="w-4 h-4 text-green-500 border-green-800/30 focus:ring-green-500"
              />
              <span className="text-sm font-medium text-white">
                💾 Lokale Datenbank
              </span>
            </label>
          </div>
        </div>

        {/* API-Suche */}
        {useApiSearch && (
          <div className="mb-6">
            <p className="text-sm font-medium text-white/80 mb-3">
              🔍 Intelligente Suche mit Allergien- und
              Ernährungsweise-Filterung:
            </p>
            <FoodSearch onFoodSelect={handleApiFoodSelect} />
          </div>
        )}

        {/* Lokale Datenbank */}
        {!useApiSearch && (
          <>
            {/* Kategorien */}
            <div className="mb-6">
              <p className="text-sm font-medium text-white/80 mb-3">
                📂 Kategorien:
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className="px-3 py-1 bg-gray-500/20 backdrop-blur-sm border border-green-800/30 text-white hover:bg-gray-500/30 rounded-full text-sm transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick-Add Buttons */}
            <div className="mb-6">
              <p className="text-sm font-medium text-white/80 mb-3">
                ⚡ Schnellauswahl:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                {commonFoods.map((food, index) => (
                  <button
                    key={index}
                    onClick={() => quickAddFood(food)}
                    className="text-xs bg-gray-500/20 backdrop-blur-sm border border-green-800/30 hover:bg-gray-500/30 p-3 rounded-lg text-left transition-colors"
                  >
                    <div className="font-medium text-white">{food.name}</div>
                    <div className="text-white/80">{food.calories} kcal</div>
                    <div className="text-white/60 text-xs">{food.category}</div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Grunddaten */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                🍎 Nahrungsmittel *
              </label>
              <input
                type="text"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                className="w-full p-3 bg-base-200 border border-green-800/30 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500/50 text-white placeholder-white/60"
                placeholder="z.B. Apfel, Hähnchenbrust..."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                ⚖️ Menge (in 100g)
              </label>
              <input
                type="number"
                step="0.1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full p-3 bg-base-200 border border-green-800/30 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500/50 text-white placeholder-white/60"
                placeholder="1"
              />
            </div>
          </div>

          {/* Nährwerte */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              🔥 Kalorien (pro 100g) *
            </label>
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="w-full p-3 bg-base-200 border border-green-800/30 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500/50 text-white placeholder-white/60"
              placeholder="52"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                💪 Protein (g)
              </label>
              <input
                type="number"
                step="0.1"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                className="w-full p-3 bg-base-200 border border-green-800/30 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500/50 text-white placeholder-white/60"
                placeholder="0.3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                🧈 Fett (g)
              </label>
              <input
                type="number"
                step="0.1"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
                className="w-full p-3 bg-base-200 border border-green-800/30 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500/50 text-white placeholder-white/60"
                placeholder="0.2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                🍞 Kohlenhydrate (g)
              </label>
              <input
                type="number"
                step="0.1"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                className="w-full p-3 bg-base-200 border border-green-800/30 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500/50 text-white placeholder-white/60"
                placeholder="14"
              />
            </div>
          </div>

          {/* Berechnete Gesamtwerte */}
          {calories && quantity && (
            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-green-800/30 p-4 rounded-lg">
              <p className="text-sm font-medium text-white mb-3">
                📊 Gesamtwerte:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-bold text-lg text-blue-400">
                    {Math.round(
                      parseFloat(calories || 0) * parseFloat(quantity)
                    )}
                  </div>
                  <div className="text-white/80">kcal</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg text-red-400">
                    {Math.round(
                      parseFloat(protein || 0) * parseFloat(quantity) * 10
                    ) / 10}
                  </div>
                  <div className="text-white/80">Protein</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg text-yellow-400">
                    {Math.round(
                      parseFloat(fat || 0) * parseFloat(quantity) * 10
                    ) / 10}
                  </div>
                  <div className="text-white/80">Fett</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg text-green-400">
                    {Math.round(
                      parseFloat(carbs || 0) * parseFloat(quantity) * 10
                    ) / 10}
                  </div>
                  <div className="text-white/80">Carbs</div>
                </div>
              </div>
            </div>
          )}

          {/* Optionen */}
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={saveAsRecipe}
                onChange={(e) => setSaveAsRecipe(e.target.checked)}
                className="w-4 h-4 text-green-500 border-green-800/30 rounded focus:ring-green-500"
              />
              <span className="text-sm text-white">
                👨‍🍳 Als Rezept speichern für später
              </span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={addToFavs}
                onChange={(e) => setAddToFavs(e.target.checked)}
                className="w-4 h-4 text-green-500 border-green-800/30 rounded focus:ring-green-500"
              />
              <span className="text-sm text-white">
                💚 Zu Favoriten hinzufügen
              </span>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-6 py-3 bg-gray-500/20 backdrop-blur-sm border border-gray-500/30 text-white rounded-lg hover:bg-gray-500/30 transition-colors"
            >
              ❌ Abbrechen
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-green-500/20 backdrop-blur-sm border border-green-500/30 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors font-medium"
            >
              ➕ Hinzufügen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdvancedFoodModal;
