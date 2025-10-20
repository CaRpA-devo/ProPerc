import React, { useState } from "react";
import { useBackendFood } from "../../context/BackendFoodContext";

const DebugPanel = () => {
  const {
    todayFoods,
    waterIntake,
    resetDay,
    getTodayCalories,
    getTodayMacros,
  } = useBackendFood();
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition-colors z-50"
        title="Debug Panel"
      >
        🐛
      </button>
    );
  }

  const todayCalories = getTodayCalories();
  const todayMacros = getTodayMacros();

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50 max-w-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-800">Debug Panel</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>

      <div className="space-y-2 text-sm">
        <div>
          <strong>Heute's Essen:</strong> {todayFoods.length} Nahrungsmittel
        </div>
        <div>
          <strong>Kalorien:</strong> {todayCalories} kcal
        </div>
        <div>
          <strong>Wasser:</strong> {waterIntake} / 8 Gläser
        </div>
        <div>
          <strong>Makros:</strong> P: {Math.round(todayMacros.protein)}g, F:{" "}
          {Math.round(todayMacros.fat)}g, C: {Math.round(todayMacros.carbs)}g
        </div>
        <div>
          <strong>Letzter Reset:</strong>{" "}
          {localStorage.getItem("lastResetDate") || "Nie"}
        </div>
      </div>

      <div className="mt-3 space-y-2">
        <button
          onClick={resetDay}
          className="w-full bg-red-500 text-white py-1 px-3 rounded text-sm hover:bg-red-600 transition-colors"
        >
          Reset alle Daten
        </button>
        <button
          onClick={() => {
            console.log("LocalStorage Inhalt:", {
              todayFoods: localStorage.getItem("todayFoods"),
              waterIntake: localStorage.getItem("waterIntake"),
              lastResetDate: localStorage.getItem("lastResetDate"),
            });
          }}
          className="w-full bg-blue-500 text-white py-1 px-3 rounded text-sm hover:bg-blue-600 transition-colors"
        >
          Log LocalStorage
        </button>
      </div>
    </div>
  );
};

export default DebugPanel;
