import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "../layouts/dashboard.layout";
import { Button } from "../atoms/button.comp";
import { useBackendFood } from "../../context/BackendFoodContext";
import FoodSearch from "../molecules/food-search.comp";

const AddFoodApiPage = () => {
  const navigate = useNavigate();
  const { addFood } = useBackendFood();
  const [quantity, setQuantity] = useState("1");
  const [selectedFood, setSelectedFood] = useState(null);

  const handleFoodSelect = (food) => {
    setSelectedFood(food);
  };

  const handleAddFood = () => {
    if (selectedFood) {
      const foodData = {
        name: selectedFood.name,
        calories: parseFloat(selectedFood.calories) * parseFloat(quantity),
        protein: parseFloat(selectedFood.protein || 0) * parseFloat(quantity),
        fat: parseFloat(selectedFood.fat || 0) * parseFloat(quantity),
        carbs: parseFloat(selectedFood.carbs || 0) * parseFloat(quantity),
        quantity: parseFloat(quantity),
      };

      addFood(foodData);
      // Navigation zurück zur Food Page
      navigate("/food");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Back Button */}
        <Button
          onClick={() => navigate("/food")}
          className="mb-4 bg-gray-500/20 backdrop-blur-sm border border-gray-500/30 hover:bg-gray-500/30 text-white"
        >
          ← Zurück
        </Button>

        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-2">
            🍽️ Essen hinzufügen
          </h1>
          <p className="text-base-content/80">
            Intelligente Suche mit Allergien- und Ernährungsweise-Filterung
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-base-100 border border-green-800/30 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">🔍 Suche</h2>
          <FoodSearch onFoodSelect={handleFoodSelect} />

          {selectedFood && (
            <div className="mt-4 p-4 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-lg">
              <p className="text-sm font-medium text-white/80 mb-2">
                Ausgewählt:
              </p>
              <p className="text-white font-bold text-lg">
                {selectedFood.name}
              </p>
              <p className="text-white/80">
                {selectedFood.calories} kcal / 100g
              </p>
            </div>
          )}
        </div>

        {/* Quantity Section */}
        {selectedFood && (
          <div className="bg-base-100 border border-green-800/30 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">⚖️ Menge</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Menge (in 100g)
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

              {/* Total Values */}
              {selectedFood && quantity && (
                <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-green-800/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-3">
                    📊 Gesamtwerte:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-lg text-blue-400">
                        {Math.round(
                          parseFloat(selectedFood.calories || 0) *
                            parseFloat(quantity)
                        )}
                      </div>
                      <div className="text-white/80">kcal</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-red-400">
                        {Math.round(
                          parseFloat(selectedFood.protein || 0) *
                            parseFloat(quantity) *
                            10
                        ) / 10}
                      </div>
                      <div className="text-white/80">Protein</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-yellow-400">
                        {Math.round(
                          parseFloat(selectedFood.fat || 0) *
                            parseFloat(quantity) *
                            10
                        ) / 10}
                      </div>
                      <div className="text-white/80">Fett</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-green-400">
                        {Math.round(
                          parseFloat(selectedFood.carbs || 0) *
                            parseFloat(quantity) *
                            10
                        ) / 10}
                      </div>
                      <div className="text-white/80">Carbs</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={() => navigate("/food")}
            className="flex-1 bg-gray-500/20 backdrop-blur-sm border border-gray-500/30 hover:bg-gray-500/30 text-white"
          >
            ❌ Abbrechen
          </Button>
          <Button
            onClick={handleAddFood}
            disabled={!selectedFood}
            className="flex-1 bg-green-500/20 backdrop-blur-sm border border-green-500/30 hover:bg-green-500/30 text-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ➕ Hinzufügen
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddFoodApiPage;
