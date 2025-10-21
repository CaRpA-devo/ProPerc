import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBackendFood } from "../../context/BackendFoodContext";

const TodayStatusBox = ({ calculations, userData }) => {
  const navigate = useNavigate();
  const {
    todayFoods,
    waterIntake,
    getTodayCalories,
    getTodayMacros,
    updateWater,
  } = useBackendFood();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Funktionen für Wasser
  const handleWaterChange = (change) => {
    updateWater(change);
  };

  // Update Zeit jede Minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Echte Daten aus Context
  const caloriesConsumed = getTodayCalories();
  const macroConsumed = getTodayMacros();

  if (!calculations) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-3 bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-green-800/30 rounded-lg">
        <div className="text-center">
          <h3 className="text-sm font-semibold text-white mb-2">
            📊 Heute's Status
          </h3>
          <p className="text-xs text-white/70">Lade Daten...</p>
        </div>
      </div>
    );
  }

  const { calorieTarget, macros } = calculations;
  const { protein, fat, carbs } = macros;

  // Berechne Fortschritt
  const calorieProgress = Math.min(
    (caloriesConsumed / calorieTarget) * 100,
    100
  );
  const waterProgress = Math.min((waterIntake / 8) * 100, 100);

  // Makro-Fortschritt basierend auf tatsächlichen Daten
  const proteinTarget = macros?.protein?.g || 150;
  const fatTarget = macros?.fat?.g || 80;
  const carbsTarget = macros?.carbs?.g || 200;

  const proteinProgress = Math.min(
    (macroConsumed.protein / proteinTarget) * 100,
    100
  );
  const fatProgress = Math.min((macroConsumed.fat / fatTarget) * 100, 100);
  const carbsProgress = Math.min(
    (macroConsumed.carbs / carbsTarget) * 100,
    100
  );

  // Status-Farben
  const getStatusColor = (progress) => {
    if (progress >= 100) return "text-green-600";
    if (progress >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const getProgressBarColor = (progress) => {
    if (progress >= 100) return "bg-green-500";
    if (progress >= 75) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Tageszeit-basierte Nachricht
  const getTimeMessage = () => {
    const hour = currentTime.getHours();
    if (hour < 6) return "Gute Nacht! 🌙";
    if (hour < 12) return "Guten Morgen! ☀️";
    if (hour < 18) return "Guten Tag! 🌤️";
    return "Guten Abend! 🌆";
  };

  return (
    <div className="w-full h-full flex flex-col p-3 bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-green-800/30 rounded-lg">
      {/* Header */}
      <div className="text-center mb-3">
        <h3 className="text-sm font-bold text-white mb-1">📊 Heute's Status</h3>
        <p className="text-xs text-white/80">{getTimeMessage()}</p>
      </div>

      {/* Kalorien-Status */}
      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 mb-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-semibold text-white">🔥 Kalorien</span>
          <span
            className={`text-xs font-bold ${getStatusColor(calorieProgress)}`}
          >
            {caloriesConsumed} / {calorieTarget}
          </span>
        </div>
        <div className="w-full bg-white/30 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(
              calorieProgress
            )}`}
            style={{ width: `${Math.min(calorieProgress, 100)}%` }}
          ></div>
        </div>
        <p className="text-xs text-white/80 mt-1 text-center">
          {calorieProgress >= 100
            ? "Ziel erreicht! 🎉"
            : `${Math.round(calorieTarget - caloriesConsumed)} kcal übrig`}
        </p>
      </div>

      {/* Wasser-Status */}
      <div
        className="bg-white/20 backdrop-blur-sm rounded-lg p-2 mb-2"
        key={`water-section-${waterIntake}`}
      >
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-semibold text-white">💧 Wasser</span>
          <span
            className={`text-xs font-bold ${getStatusColor(waterProgress)}`}
          >
            {waterIntake} / 8 Gläser
          </span>
        </div>
        <div className="w-full bg-white/30 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(
              waterProgress
            )}`}
            style={{ width: `${Math.min(waterProgress, 100)}%` }}
          ></div>
        </div>
        <p className="text-xs text-white/80 mt-1 text-center">
          {waterProgress >= 100
            ? "Hydriert! 💧"
            : `${8 - waterIntake} Gläser übrig`}
        </p>

        {/* Wasser-Buttons */}
        <div className="flex gap-1 mt-2">
          <button
            onClick={() => handleWaterChange(-1)}
            className="flex-1 bg-blue-500/50 backdrop-blur-sm border-2 border-blue-300 hover:bg-blue-500/60 text-white text-xs py-1 px-2 rounded transition-colors disabled:opacity-50 font-bold"
            disabled={waterIntake <= 0}
          >
            ➖ Wasser
          </button>
          <button
            onClick={() => handleWaterChange(1)}
            className="flex-1 bg-blue-500/50 backdrop-blur-sm border-2 border-blue-300 hover:bg-blue-500/60 text-white text-xs py-1 px-2 rounded transition-colors disabled:opacity-50 font-bold"
            disabled={waterIntake >= 8}
          >
            ➕ Wasser
          </button>
        </div>
      </div>

      {/* Makro-Status (kompakt) */}
      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
        <p className="text-xs font-semibold text-white mb-1 text-center">
          📊 Makros heute
        </p>
        <div className="grid grid-cols-3 gap-1 text-xs">
          <div className="text-center">
            <div className="text-red-400 font-bold">
              {Math.round(proteinProgress)}%
            </div>
            <div className="text-white/80">Protein</div>
          </div>
          <div className="text-center">
            <div className="text-yellow-400 font-bold">
              {Math.round(fatProgress)}%
            </div>
            <div className="text-white/80">Fett</div>
          </div>
          <div className="text-center">
            <div className="text-blue-400 font-bold">
              {Math.round(carbsProgress)}%
            </div>
            <div className="text-white/80">Carbs</div>
          </div>
        </div>
      </div>

      {/* Schnellzugriff-Buttons */}
      <div className="flex gap-1 mt-2">
        <button
          onClick={() => navigate("/food")}
          className="w-full bg-green-500/20 backdrop-blur-sm border border-green-500/30 hover:bg-green-500/30 text-green-400 text-xs py-1 px-2 rounded transition-colors"
        >
          🍽️ Essen hinzufügen
        </button>
      </div>

      {/* Heute gegessene Nahrungsmittel */}
      {todayFoods.length > 0 && (
        <div className="mt-2 bg-white/20 backdrop-blur-sm rounded-lg p-2">
          <p className="text-xs font-semibold text-white mb-1">
            🍽️ Heute gegessen:
          </p>
          <div className="space-y-1 max-h-20 overflow-y-auto">
            {todayFoods.map((food) => (
              <div
                key={food.id}
                className="flex justify-between items-center text-xs"
              >
                <span className="text-white/90 truncate">{food.name}</span>
                <span className="text-white/70">
                  {Math.round(food.calories)} kcal
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodayStatusBox;
