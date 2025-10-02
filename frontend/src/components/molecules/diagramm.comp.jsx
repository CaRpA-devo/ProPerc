// src/components/NutritionChart.jsx
import { Pie, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const NutritionChart = () => {
  // Beispielwerte
  const macroData = {
    labels: ["Proteine", "Kohlenhydrate", "Fette"],
    datasets: [
      {
        label: "Makronährstoffe",
        data: [30, 50, 20], // Prozentwerte
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        borderWidth: 1,
      },
    ],
  };

  const caloriesData = {
    labels: ["Verbraucht", "Rest"],
    datasets: [
      {
        label: "Kalorienfortschritt",
        data: [1800, 200], // z. B. 2000 kcal Tagesziel
        backgroundColor: ["#4CAF50", "#E0E0E0"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
      <div style={{ width: "250px", textAlign: "center" }}>
        <h3>Makros</h3>
        <Pie data={macroData} />
      </div>
      <div style={{ width: "250px", textAlign: "center" }}>
        <h3>Kalorienfortschritt</h3>
        <Doughnut data={caloriesData} />
      </div>
    </div>
  );
};

export default NutritionChart;
