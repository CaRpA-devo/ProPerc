import React from "react";

const MotivationBox = ({ userData, calculations }) => {
  if (!userData || !calculations) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg">
        <div className="text-center">
          <h3 className="text-sm font-semibold text-primary mb-2">
            Motivation
          </h3>
          <p className="text-xs text-gray-500">Lade Daten...</p>
        </div>
      </div>
    );
  }

  const { goal, weight, targetWeight, activityLevel } = userData;
  const { calorieTarget, bmr, tdee } = calculations;

  // Gewichtsunterschied berechnen
  const weightDiff = targetWeight ? weight - targetWeight : 0;

  // Motivationsnachrichten basierend auf Ziel
  const getMotivationMessage = () => {
    switch (goal) {
      case "lose":
        if (weightDiff > 0) {
          return {
            title: "Du schaffst das! 💪",
            message: `${Math.round(weightDiff)}kg bis zum Ziel`,
            emoji: "🔥",
            color: "from-red-500/20 to-orange-500/20",
          };
        } else {
          return {
            title: "Ziel erreicht! 🎉",
            message: "Halte dein Gewicht!",
            emoji: "🏆",
            color: "from-green-500/20 to-emerald-500/20",
          };
        }
      case "gain":
        if (weightDiff < 0) {
          return {
            title: "Muskelaufbau! 💪",
            message: `${Math.round(Math.abs(weightDiff))}kg bis zum Ziel`,
            emoji: "🏋️",
            color: "from-blue-500/20 to-purple-500/20",
          };
        } else {
          return {
            title: "Perfekt! 🎯",
            message: "Ziel erreicht!",
            emoji: "💪",
            color: "from-green-500/20 to-emerald-500/20",
          };
        }
      case "maintain":
      default:
        return {
          title: "Gewicht halten! ⚖️",
          message: "Du bist auf dem richtigen Weg",
          emoji: "✨",
          color: "from-emerald-500/20 to-teal-500/20",
        };
    }
  };

  // Aktivitätslevel-basierte Tipps
  const getActivityTip = () => {
    const tips = {
      sedentary: "Kleine Schritte, große Wirkung!",
      light: "Du machst schon viel richtig!",
      moderate: "Perfekte Balance!",
      active: "Du bist ein Vorbild!",
      very_active: "Du bist ein Athlet! 🏃‍♂️",
    };
    return tips[activityLevel] || "Bleib aktiv!";
  };

  // Kalorienziel-Status
  const getCalorieStatus = () => {
    if (calorieTarget < bmr * 1.1) {
      return "Defizit-Modus";
    } else if (calorieTarget > tdee * 1.1) {
      return "Überschuss-Modus";
    } else {
      return "Erhaltungs-Modus";
    }
  };

  const motivation = getMotivationMessage();
  const activityTip = getActivityTip();
  const calorieStatus = getCalorieStatus();

  return (
    <div
      className={`w-full h-full flex flex-col p-3 bg-gradient-to-br ${motivation.color} rounded-lg`}
    >
      {/* Hauptmotivation */}
      <div className="text-center mb-3">
        <div className="text-2xl mb-1">{motivation.emoji}</div>
        <h3 className="text-sm font-bold text-primary mb-1">
          {motivation.title}
        </h3>
        <p className="text-xs text-gray-700 font-medium">
          {motivation.message}
        </p>
      </div>

      {/* Aktivitäts-Tipp */}
      <div className="bg-white/30 rounded-lg p-2 mb-2">
        <p className="text-xs text-center font-medium text-gray-800">
          {activityTip}
        </p>
      </div>

      {/* Kalorien-Status */}
      <div className="bg-white/20 rounded-lg p-2">
        <div className="text-center">
          <p className="text-xs font-semibold text-gray-700">{calorieStatus}</p>
          <p className="text-xs text-gray-600">{calorieTarget} kcal/Tag</p>
        </div>
      </div>

      {/* Fortschritts-Bar (falls Zielgewicht vorhanden) */}
      {targetWeight && (
        <div className="mt-2">
          <div className="w-full bg-white/30 rounded-full h-1.5">
            <div
              className="bg-primary h-1.5 rounded-full transition-all duration-300"
              style={{
                width:
                  goal === "lose"
                    ? `${Math.max(
                        0,
                        Math.min(
                          100,
                          ((weight - targetWeight) /
                            (weight - targetWeight + 1)) *
                            100
                        )
                      )}%`
                    : goal === "gain"
                    ? `${Math.max(
                        0,
                        Math.min(
                          100,
                          ((targetWeight - weight) /
                            (targetWeight - weight + 1)) *
                            100
                        )
                      )}%`
                    : "50%",
              }}
            ></div>
          </div>
          <p className="text-xs text-center text-gray-600 mt-1">
            {goal === "lose" &&
              weightDiff > 0 &&
              `${Math.round(weightDiff)}kg übrig`}
            {goal === "gain" &&
              weightDiff < 0 &&
              `${Math.round(Math.abs(weightDiff))}kg übrig`}
            {goal === "maintain" && "Ziel erreicht"}
          </p>
        </div>
      )}
    </div>
  );
};

export default MotivationBox;
