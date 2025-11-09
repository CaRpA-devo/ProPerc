import React, { useState } from "react";

const FoodModal = ({ isOpen, onClose, onAddFood }) => {
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [fat, setFat] = useState("");
  const [carbs, setCarbs] = useState("");
  const [quantity, setQuantity] = useState("1");

  // Häufige Nahrungsmittel für Quick-Add
  const commonFoods = [
    { name: "Apfel", calories: 52, protein: 0.3, fat: 0.2, carbs: 14 },
    { name: "Banane", calories: 89, protein: 1.1, fat: 0.3, carbs: 23 },
    { name: "Vollkornbrot", calories: 247, protein: 13, fat: 3.4, carbs: 41 },
    { name: "Hähnchenbrust", calories: 165, protein: 31, fat: 3.6, carbs: 0 },
    {
      name: "Reis (gekocht)",
      calories: 130,
      protein: 2.7,
      fat: 0.3,
      carbs: 28,
    },
    { name: "Eier", calories: 155, protein: 13, fat: 11, carbs: 1.1 },
    { name: "Joghurt", calories: 59, protein: 10, fat: 0.4, carbs: 3.6 },
    { name: "Nüsse (30g)", calories: 180, protein: 6, fat: 16, carbs: 4 },
  ];

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

    onAddFood(foodData);
    handleClose();
  };

  const handleClose = () => {
    setFoodName("");
    setCalories("");
    setProtein("");
    setFat("");
    setCarbs("");
    setQuantity("1");
    onClose();
  };

  const quickAddFood = (food) => {
    setFoodName(food.name);
    setCalories(food.calories.toString());
    setProtein(food.protein.toString());
    setFat(food.fat.toString());
    setCarbs(food.carbs.toString());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Essen hinzufügen
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        {/* Quick-Add Buttons */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Schnellauswahl:
          </p>
          <div className="grid grid-cols-2 gap-2">
            {commonFoods.map((food, index) => (
              <button
                key={index}
                onClick={() => quickAddFood(food)}
                className="text-xs bg-gray-100 hover:bg-gray-200 p-2 rounded text-left transition-colors"
              >
                <div className="font-medium">{food.name}</div>
                <div className="text-gray-600">{food.calories} kcal</div>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nahrungsmittel
            </label>
            <input
              type="text"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="z.B. Apfel, Hähnchenbrust..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kalorien (pro 100g)
              </label>
              <input
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="52"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Menge (in 100g)
              </label>
              <input
                type="number"
                step="0.1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="1"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Protein (g)
              </label>
              <input
                type="number"
                step="0.1"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="0.3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fett (g)
              </label>
              <input
                type="number"
                step="0.1"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="0.2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kohlenhydrate (g)
              </label>
              <input
                type="number"
                step="0.1"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="14"
              />
            </div>
          </div>

          {/* Berechnete Gesamtwerte */}
          {calories && quantity && (
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Gesamtwerte:
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  Kalorien:{" "}
                  {Math.round(parseFloat(calories || 0) * parseFloat(quantity))}{" "}
                  kcal
                </div>
                <div>
                  Protein:{" "}
                  {Math.round(
                    parseFloat(protein || 0) * parseFloat(quantity) * 10
                  ) / 10}
                  g
                </div>
                <div>
                  Fett:{" "}
                  {Math.round(
                    parseFloat(fat || 0) * parseFloat(quantity) * 10
                  ) / 10}
                  g
                </div>
                <div>
                  Carbs:{" "}
                  {Math.round(
                    parseFloat(carbs || 0) * parseFloat(quantity) * 10
                  ) / 10}
                  g
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Hinzufügen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FoodModal;
