import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/clerk-react";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const useCalculator = () => {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [calculations, setCalculations] = useState(null);

  const calculateMacros = useCallback(
    async (userData) => {
      setLoading(true);
      setError(null);

      try {
        const token = await getToken();

        const response = await fetch(`${API_URL}/api/calc`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({
            weight: userData.weight,
            height: userData.height,
            age: userData.age,
            sex: userData.gender === "male" ? "male" : "female",
            activityFactor: getActivityFactor(userData.activityLevel),
            goal: mapGoal(userData.goal),
            proteinFactor: getProteinFactor(userData.goal),
            fatPercent: 0.22, // 22% Fettanteil
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Calculator - Received result:", result);
        console.log("Calculator - Macros:", result.macros);
        setCalculations(result);
        return result;
      } catch (err) {
        console.error("Calculator Fehler:", err);
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [getToken]
  );

  return {
    calculateMacros,
    calculations,
    loading,
    error,
    setCalculations,
  };
};

// Helper-Funktionen für Activity Factor
const getActivityFactor = (activityLevel) => {
  const factors = {
    sedentary: 1.2, // Wenig bis keine Bewegung
    light: 1.375, // Leichte Bewegung 1-3 Tage/Woche
    moderate: 1.55, // Moderate Bewegung 3-5 Tage/Woche
    active: 1.725, // Intensive Bewegung 6-7 Tage/Woche
    very_active: 1.9, // Sehr intensive Bewegung, körperliche Arbeit
  };
  return factors[activityLevel] || 1.55;
};

// Helper-Funktion für Goal-Mapping
const mapGoal = (goal) => {
  const goalMap = {
    lose: "lose",
    maintain: "maintain",
    gain: "muscle_gain",
  };
  return goalMap[goal] || "maintain";
};

// Helper-Funktion für Protein-Faktor
const getProteinFactor = (goal) => {
  const proteinFactors = {
    lose: 2.2, // Höherer Proteinanteil beim Abnehmen
    maintain: 1.8, // Standard Proteinanteil
    gain: 2.0, // Erhöhter Proteinanteil beim Muskelaufbau
  };
  return proteinFactors[goal] || 1.8;
};
