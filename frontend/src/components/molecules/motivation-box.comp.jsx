import React from "react";

const MotivationBox = ({ userData, calculations }) => {
  if (!userData || !calculations) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-3 bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-green-800/30 rounded-lg">
        <div className="text-center">
          <h3 className="text-sm font-semibold text-white mb-2">
            💚 Motivation
          </h3>
          <p className="text-xs text-white/70">Lade Daten...</p>
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
            color: "from-green-500/20 to-blue-500/20",
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
      className={`w-full h-full flex flex-col p-3 bg-gradient-to-br ${motivation.color} backdrop-blur-sm border border-green-800/30 rounded-lg`}
    >
      {/* Hauptmotivation */}
      <div className="text-center mb-3">
        <div className="text-3xl mb-2">{motivation.emoji}</div>
        <h3 className="text-sm font-bold text-white mb-2">
          {motivation.title}
        </h3>
        <p className="text-xs text-white font-medium bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
          {motivation.message}
        </p>
      </div>

      {/* Aktivitäts-Tipp */}
      <div className="bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg p-2 mb-2">
        <p className="text-xs text-center font-bold text-white">
          {activityTip}
        </p>
      </div>

      {/* Kalorien-Status */}
      <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-2">
        <div className="text-center">
          <p className="text-xs font-bold text-white">{calorieStatus}</p>
          <p className="text-xs text-white font-medium">
            {calorieTarget} kcal/Tag
          </p>
        </div>
      </div>

      {/* Fortschritts-Bar (falls Zielgewicht vorhanden) */}
      {targetWeight && (
        <div className="mt-2">
          <div className="w-full bg-white/30 rounded-full h-1.5">
            <div
              className="bg-green-400 h-1.5 rounded-full transition-all duration-300"
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
          <p className="text-xs text-center text-white font-bold mt-1 bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg px-3 py-2 shadow-lg">
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
