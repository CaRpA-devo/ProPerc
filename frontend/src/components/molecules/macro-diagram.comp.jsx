import React from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MacroDiagram = ({ calculations }) => {
  if (!calculations || !calculations.macros) {
    return (
      <div className="p-2 rounded-lg h-full flex flex-col items-center justify-center">
        <h3 className="text-sm text-primary font-semibold mb-2">
          Makroverteilung
        </h3>
        <p className="text-xs text-gray-500">Keine Daten verfügbar</p>
      </div>
    );
  }

  const { macros, calorieTarget, bmr, tdee } = calculations;
  const { protein, fat, carbs } = macros;

  // Daten für RadialBarChart vorbereiten
  const data = [
    {
      name: "Protein",
      value: protein.percent,
      grams: protein.g,
      calories: protein.calories,
      fill: "#ff6b6b",
    },
    {
      name: "Fett",
      value: fat.percent,
      grams: fat.g,
      calories: fat.calories,
      fill: "#4ecdc4",
    },
    {
      name: "Kohlenhydrate",
      value: carbs.percent,
      grams: carbs.g,
      calories: carbs.calories,
      fill: "#45b7d1",
    },
  ];

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-lg bg-base-100/90 p-3 shadow-xl border border-gray-600">
          <p className="text-white font-semibold text-sm">{data.name}</p>
          <p className="text-gray-300 text-xs">
            {data.grams}g ({data.value}%)
          </p>
          <p className="text-gray-300 text-xs">{data.calories} kcal</p>
        </div>
      );
    }
    return null;
  };

  // Custom Legend
  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-col gap-1 mt-2">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-1 text-xs">
            <div
              className="w-2 h-2 rounded"
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-gray-300">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-2 rounded-lg h-full flex flex-col">
      <h3 className="text-sm text-primary font-semibold mb-2 text-center">
        Makroverteilung
      </h3>

      {/* Kalorienziel */}
      <div className="text-center mb-2">
        <div className="text-lg font-bold text-primary">{calorieTarget}</div>
        <div className="text-xs text-gray-500">kcal/Tag</div>
      </div>

      {/* Diagramm */}
      <div className="flex-1">
        <ResponsiveContainer width="100%" height={120}>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="15%"
            outerRadius="90%"
            data={data}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar background dataKey="value" />
            <Tooltip
              content={<CustomTooltip />}
              position={{ x: "50%", y: "50%" }}
              wrapperStyle={{ transform: "translate(-50%, -50%)" }}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>

      {/* Legende unter dem Diagramm */}
      <div className="flex justify-center gap-4 mt-1">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-1 text-xs">
            <div
              className="w-2 h-2 rounded flex-shrink-0"
              style={{ backgroundColor: entry.fill }}
            ></div>
            <span className="text-gray-300">
              {entry.name} ({entry.value}%)
            </span>
          </div>
        ))}
      </div>

      {/* Zusätzliche Infos */}
      <div className="border-t border-gray-600 pt-1 mt-1">
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">BMR:</span>
          <span className="text-primary font-medium">{bmr} kcal</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">TDEE:</span>
          <span className="text-primary font-medium">{tdee} kcal</span>
        </div>
      </div>
    </div>
  );
};

export default MacroDiagram;
