import React from "react";
import {
  RadialBarChart,
  RadialBar,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Einzelne Makro-Karte Komponente
const MacroCard = ({ title, value, grams, calories, color, icon }) => {
  const data = [
    {
      name: title,
      value: value,
      grams,
      calories,
      fill: color,
    },
  ];

  return (
    <div className="flex-1 p-3 bg-gradient-to-br from-green-500/10 to-blue-500/10 backdrop-blur-sm border border-green-800/30 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm text-white font-medium flex items-center gap-1">
          {icon} {title}
        </h4>
        <span className="text-xs text-white/80">{value}%</span>
      </div>

      <div className="h-[80px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="65%"
            outerRadius="100%"
            data={data}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar background dataKey="value" cornerRadius={15} />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center space-y-1 mt-1">
        <div className="text-sm font-semibold text-white">{grams}g</div>
        <div className="text-xs text-white/70">{calories} kcal</div>
      </div>
    </div>
  );
};

const MacroDiagram = ({ calculations }) => {
  if (!calculations || !calculations.macros) {
    return (
      <div className="p-2 rounded-lg h-full flex flex-col items-center justify-center bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-green-800/30">
        <h3 className="text-sm text-white font-semibold mb-2">
          📊 Makroverteilung
        </h3>
        <p className="text-xs text-white/70">Keine Daten verfügbar</p>
      </div>
    );
  }

  const { macros, calorieTarget, bmr, tdee } = calculations;
  const { protein, fat, carbs } = macros;

  return (
    <div className="p-2 rounded-lg h-full flex flex-col bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-green-800/30">
      <h3 className="text-sm text-white font-semibold mb-2 text-center">
        📊 Makroverteilung
      </h3>

      {/* Kalorienziel */}
      <div className="text-center mb-3">
        <div className="text-lg font-bold text-white">{calorieTarget}</div>
        <div className="text-xs text-white/80">kcal/Tag</div>
      </div>

      {/* Makro-Karten Grid */}
      <div className="grid grid-cols-3 gap-2 flex-1">
        <MacroCard
          title="Protein"
          value={protein.percent}
          grams={protein.g}
          calories={protein.calories}
          color="#FF6B6B" // Kräftiges Rot für Protein
          icon="🥩"
        />
        <MacroCard
          title="Fett"
          value={fat.percent}
          grams={fat.g}
          calories={fat.calories}
          color="#FFD93D" // Warmes Gelb für Fett
          icon="🥑"
        />
        <MacroCard
          title="Carbs"
          value={carbs.percent}
          grams={carbs.g}
          calories={carbs.calories}
          color="#6BCB77" // Frisches Grün für Kohlenhydrate
          icon="🌾"
        />
      </div>

      {/* Zusätzliche Infos */}
      <div className="border-t border-white/30 pt-2 mt-3">
        <div className="flex justify-between text-xs">
          <span className="text-white/70">BMR:</span>
          <span className="text-white font-medium">{bmr} kcal</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-white/70">TDEE:</span>
          <span className="text-white font-medium">{tdee} kcal</span>
        </div>
      </div>
    </div>
  );
};

export default MacroDiagram;
