import { useState, useCallback } from "react";
import { useAuth } from "@clerk/clerk-react";

export function useMealPlanner() {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mahlzeit zum Plan hinzufügen
  const addMealToPlan = useCallback(
    async (mealData) => {
      setLoading(true);
      setError(null);
      try {
        const token = await getToken();
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/planner/meals`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
            body: JSON.stringify(mealData),
          }
        );

        if (!response.ok) {
          throw new Error("Fehler beim Hinzufügen der Mahlzeit");
        }

        return await response.json();
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [getToken]
  );

  // Mahlzeiten für einen Zeitraum abrufen
  const getMealPlan = useCallback(
    async (startDate, endDate) => {
      setLoading(true);
      setError(null);
      try {
        const token = await getToken();
        const params = new URLSearchParams();
        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/planner/meals?${params}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Fehler beim Abrufen des Mahlzeitenplans");
        }

        return await response.json();
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [getToken]
  );

  // Geplante Mahlzeit aktualisieren
  const updateMealPlan = useCallback(
    async (id, updateData) => {
      setLoading(true);
      setError(null);
      try {
        const token = await getToken();
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/planner/meals/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
            body: JSON.stringify(updateData),
          }
        );

        if (!response.ok) {
          throw new Error("Fehler beim Aktualisieren der Mahlzeit");
        }

        return await response.json();
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [getToken]
  );

  // Geplante Mahlzeit löschen
  const deleteMealPlan = useCallback(
    async (id) => {
      setLoading(true);
      setError(null);
      try {
        const token = await getToken();
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/planner/meals/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Fehler beim Löschen der Mahlzeit");
        }

        return await response.json();
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [getToken]
  );

  return {
    loading,
    error,
    addMealToPlan,
    getMealPlan,
    updateMealPlan,
    deleteMealPlan,
  };
}
